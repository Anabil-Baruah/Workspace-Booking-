import { BookingForm } from "@/components/BookingForm";

const Booking = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Book a Room</h1>
          <p className="text-muted-foreground">Reserve a workspace for your meeting or work session</p>
        </div>
        <BookingForm />
      </div>
    </div>
  );
};

export default Booking;
