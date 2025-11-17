import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, IndianRupee } from "lucide-react";

export const RoomsList = () => {
  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: api.getRooms,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-32 bg-muted" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rooms?.map((room) => (
        <Card key={room.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>Room ID: {room.id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Capacity: {room.capacity} people</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-lg text-primary">
              <IndianRupee className="h-5 w-5" />
              <span>{room.baseHourlyRate}/hour</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
