import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar, Clock } from "lucide-react";

export const BookingForm = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    roomId: "",
    userName: "",
    startTime: "",
    endTime: "",
  });

  const { data: rooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: api.getRooms,
  });

  const createBookingMutation = useMutation({
    mutationFn: api.createBooking,
    onSuccess: (data) => {
      toast.success("Booking Confirmed!", {
        description: `Booking ID: ${data.bookingId} | Total: ₹${data.totalPrice}`,
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setFormData({ roomId: "", userName: "", startTime: "", endTime: "" });
    },
    onError: (error: Error) => {
      toast.error("Booking Failed", {
        description: error.message,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.roomId || !formData.userName || !formData.startTime || !formData.endTime) {
      toast.error("Please fill all fields");
      return;
    }

    const startTime = new Date(formData.startTime).toISOString();
    const endTime = new Date(formData.endTime).toISOString();

    createBookingMutation.mutate({
      ...formData,
      startTime,
      endTime,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Booking</CardTitle>
        <CardDescription>Book a workspace for your team</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room">Room</Label>
            <Select value={formData.roomId} onValueChange={(value) => setFormData({ ...formData, roomId: value })}>
              <SelectTrigger id="room">
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {rooms?.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name} (₹{room.baseHourlyRate}/hr)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="userName">Your Name</Label>
            <Input
              id="userName"
              placeholder="Enter your name"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Time
              </Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                End Time
              </Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={createBookingMutation.isPending}>
            {createBookingMutation.isPending ? "Creating..." : "Create Booking"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
