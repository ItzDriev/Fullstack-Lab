import { API_URL } from "../config.ts";

export async function fetchProfile() {
  try {
    const response = await fetch(`${API_URL}/api/auth/profile`, {
      credentials: "include",
    });

    const res = await response.json();

    if (res.success) {
      return { success: true, data: res.data };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    return { success: false, error: "Failed to load profile" };
  }
}

export async function fetchUpcomingSessions() {
  try {
    const response = await fetch(`${API_URL}/api/sessions/upcoming`, {
      credentials: "include",
    });

    const res = await response.json();

    if (res.success) {
      const mapped = res.data.map((s: any) => ({
        id: s._id,
        title: s.topic || s.tierName,
        coach: s.coach || "TBD",
        date: new Date(s.createdAt)
          .toLocaleDateString("en-US", { month: "short", day: "numeric" })
          .toUpperCase(),
        time: "TBD",
        isUpcoming: true,
      }));
      return { success: true, data: mapped };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    return { success: false, error: "Failed to fetch upcoming sessions" };
  }
}

export async function fetchSessionHistory() {
  try {
    const response = await fetch(`${API_URL}/api/sessions/history`, {
      credentials: "include",
    });

    const res = await response.json();

    if (res.success) {
      const mapped = res.data.map((s: any) => ({
        id: s._id,
        topic: s.topic || s.tierName,
        date: new Date(s.createdAt)
          .toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
          .toUpperCase(),
        coach: s.coach || "TBD",
      }));
      return { success: true, data: mapped };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    return { success: false, error: "Failed to fetch session history" };
  }
}

export async function uploadProfilePicture(base64: string) {
  try {
    const response = await fetch(`${API_URL}/api/auth/profile/picture`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profilePicture: base64 }),
      credentials: "include",
    });

    const res = await response.json();

    if (res.success) {
      return { success: true, data: res.data };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    return { success: false, error: "Failed to upload picture" };
  }
}
