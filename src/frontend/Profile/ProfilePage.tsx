import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import Navbar from "../Navigation/Navbar";
import Footer from "../Navigation/Footer";
import UpcomingSessions from "./UpcomingSessions";
import SessionHistory from "./SessionHistory";
import ProfileHeader from "./ProfileHeader";

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
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
      return;
    }

    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn, loading, navigate]);

  async function fetchProfile() {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        credentials: "include",
      });

      const res = await response.json();

      if (res.success) {
        setProfile(res.data);
      } else {
        setError(res.error);
      }
    } catch (e) {
      setError("Failed to load profile");
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
      <main className="w-full h-[calc(100vh-4rem)] bg-(--mainBG) flex flex-col items-center">
        <ProfileHeader
          uploading={uploading}
          onAvatarClick={handleAvatarClick}
        />

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}

        <section className="flex gap-40 mt-20">
          <UpcomingSessions />
          <SessionHistory />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ProfilePage;
