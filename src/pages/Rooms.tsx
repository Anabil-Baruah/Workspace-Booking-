import { RoomsList } from "@/components/RoomsList";

const Rooms = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Available Rooms</h1>
          <p className="text-muted-foreground">Browse our workspace rooms and their pricing</p>
        </div>
        <RoomsList />
      </div>
    </div>
  );
};

export default Rooms;
