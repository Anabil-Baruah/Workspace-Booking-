import { Room, Booking, CreateBookingRequest, Analytics } from "@/types/booking";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  // Rooms
  async getRooms(): Promise<Room[]> {
    const response = await fetch(`${API_BASE_URL}/rooms`);
    if (!response.ok) throw new Error("Failed to fetch rooms");
    return response.json();
  },

  // Bookings
  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to create booking");
    return result;
  },

  async getBookings(): Promise<Booking[]> {
    const response = await fetch(`${API_BASE_URL}/bookings`);
    if (!response.ok) throw new Error("Failed to fetch bookings");
    return response.json();
  },

  async cancelBooking(bookingId: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
      method: "POST",
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to cancel booking");
    return result;
  },

  // Analytics
  async getAnalytics(from: string, to: string): Promise<Analytics[]> {
    const response = await fetch(`${API_BASE_URL}/analytics?from=${from}&to=${to}`);
    if (!response.ok) throw new Error("Failed to fetch analytics");
    return response.json();
  },
};
