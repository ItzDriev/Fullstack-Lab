import { API_URL } from "../config.ts";
export async function login(username: string, password: string) {
  if (
    username.trim() === "" ||
    password.trim() === "" ||
    password.trim().length <= 8
  ) {
    return { success: false, error: "Invalid username or password format" };
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    const res = await response.json();

    if (res.success) {
      return { success: true, data: res.data };
    } else {
      return { success: false, error: res.error };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to contact server" };
  }
}
