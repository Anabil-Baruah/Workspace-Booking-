export interface Room {
  id: string;
  name: string;
  baseHourlyRate: number;
  capacity: number;
}

export interface Booking {
  bookingId: string;
  roomId: string;
  roomName?: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: "CONFIRMED" | "CANCELLED";
}

export interface CreateBookingRequest {
  roomId: string;
  userName: string;
  startTime: string;
  endTime: string;
}

export interface Analytics {
  roomId: string;
  roomName: string;
  totalHours: number;
  totalRevenue: number;
}
