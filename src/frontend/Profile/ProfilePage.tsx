import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import UpcomingSessions from "./UpcomingSessions";
import SessionHistory from "./SessionHistory";
import ProfileHeader from "./ProfileHeader";
import RatingModal from "./RatingModal";
import type { Session } from "./types.ts";
import {
  fetchProfile,
  fetchUpcomingSessions,
  fetchSessionHistory,
  cancelSession,
  completeSession,
  fetchReviewStats,
} from "./profileApi.ts";

interface ProfileData {
  fullName: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: string;
}

function ProfilePage() {
  const { isLoggedIn, loading, updateProfilePicture } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [upcoming, setUpcoming] = useState([]);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [ratingSession, setRatingSession] = useState<Session | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    fiveStarCount: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isLoggedIn) {
      loadProfileData();

      const interval = setInterval(() => {
        loadProfileData();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn, loading, navigate]);

  async function loadProfileData() {
    const profileResult = await fetchProfile();
    if (profileResult.success) setProfile(profileResult.data);
    else setError(profileResult.error);

    const upcomingResult = await fetchUpcomingSessions();
    if (upcomingResult.success) setUpcoming(upcomingResult.data);

    const historyResult = await fetchSessionHistory();
    if (historyResult.success) setHistory(historyResult.data);

    const statsResult = await fetchReviewStats();
    if (statsResult.success) setStats(statsResult.data);
  }

  async function handleCancelSession(sessionId: string) {
    const result = await cancelSession(sessionId);
    if (result.success) {
      setUpcoming((prev) => prev.filter((s: any) => s.id !== sessionId));
    }
  }

  function handleCompleteClick(sessionId: string) {
    const session = upcoming.find((s: any) => s.id === sessionId) as
      | Session
      | undefined;
    if (session) {
      setRatingSession(session);
    }
  }

  async function handleRatingSubmit(sessionId: string, rating: number) {
    const result = await completeSession(sessionId, rating);

    if (result.success) {
      setRatingSession(null);
      setUpcoming((prev) => prev.filter((s: any) => s.id !== sessionId));

      const historyResult = await fetchSessionHistory();
      if (historyResult.success) setHistory(historyResult.data);
    } else {
      setError(result.error);
    }
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be smaller than 2MB");
      return;
    }

    setUploading(true);
    setError("");

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const success = await updateProfilePicture(base64);

      if (success) {
        setProfile((prev) =>
          prev ? { ...prev, profilePicture: base64 } : null,
        );
      } else {
        setError("Failed to upload picture");
      }
      setUploading(false);
    };

    reader.onerror = () => {
      setError("Failed to read file");
      setUploading(false);
    };

    reader.readAsDataURL(file);
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="w-full h-[calc(100vh-4rem)] bg-(--mainBG) flex justify-center items-center">
          <p className="text-[#94A3B8]">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-4rem)] bg-(--mainBG) flex flex-col items-center pb-20">
        <ProfileHeader
          uploading={uploading}
          onAvatarClick={handleAvatarClick}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

        <div className="flex gap-12 mt-8">
          <div className="text-center">
            <span className="font-bold text-red-400 text-3xl">
              {stats.totalReviews}
            </span>
            <p className="mt-1 text-[#4a6274] text-xs uppercase tracking-wider">
              Sessions reviewed
            </p>
          </div>
          <div className="text-center">
            <span className="font-bold text-red-400 text-3xl">
              {stats.averageRating}
            </span>
            <p className="mt-1 text-[#4a6274] text-xs uppercase tracking-wider">
              Avg rating
            </p>
          </div>
          <div className="text-center">
            <span className="font-bold text-red-400 text-3xl">
              {stats.fiveStarCount}
            </span>
            <p className="mt-1 text-[#4a6274] text-xs uppercase tracking-wider">
              5-star reviews
            </p>
          </div>
        </div>

        <section className="mt-16 px-8 w-full max-w-5xl">
          <div className="flex gap-8">
            <div className="shrink-0">
              <UpcomingSessions
                sessions={upcoming}
                onCancel={handleCancelSession}
                onComplete={handleCompleteClick}
              />
            </div>
            <div className="flex-1 min-w-0">
              <SessionHistory sessions={history} />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {ratingSession && (
        <RatingModal
          session={ratingSession}
          onSubmit={handleRatingSubmit}
          onClose={() => setRatingSession(null)}
        />
      )}
    </>
  );
}

export default ProfilePage;
