import { API_URL } from "../config.ts";

export async function purchaseSession(
  type: string,
  tierName: string,
  price: string,
  duration: string,
) {
  if (!type || !tierName || !price || !duration) {
    return { success: false, error: "All fields are required" };
  }

  try {
    const response = await fetch(`${API_URL}/api/sessions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, tierName, price, duration }),
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
