import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { format } from "date-fns";
import { X } from "lucide-react";

export const BookingsList = () => {
  const queryClient = useQueryClient();
  
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: api.getBookings,
  });

  const cancelMutation = useMutation({
    mutationFn: api.cancelBooking,
    onSuccess: () => {
      toast.success("Booking cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (error: Error) => {
      toast.error("Cancellation failed", {
        description: error.message,
      });
    },
  });

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading bookings...</div>;
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No bookings found
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.bookingId}>
                  <TableCell className="font-mono text-sm">{booking.bookingId}</TableCell>
                  <TableCell>{booking.roomName || booking.roomId}</TableCell>
                  <TableCell>{booking.userName}</TableCell>
                  <TableCell>{format(new Date(booking.startTime), "MMM dd, HH:mm")}</TableCell>
                  <TableCell>{format(new Date(booking.endTime), "MMM dd, HH:mm")}</TableCell>
                  <TableCell className="font-semibold">₹{booking.totalPrice}</TableCell>
                  <TableCell>
                    <Badge variant={booking.status === "CONFIRMED" ? "default" : "secondary"}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {booking.status === "CONFIRMED" && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => cancelMutation.mutate(booking.bookingId)}
                        disabled={cancelMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
