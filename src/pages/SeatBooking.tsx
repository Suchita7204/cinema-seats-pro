import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SeatSelection } from "@/components/SeatSelection";
import { movies, theaters } from "@/data/movies";
import { MapPin, Clock, Calendar } from "lucide-react";

export const SeatBooking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  
  const theaterId = searchParams.get('theater');
  const showtimeId = searchParams.get('showtime');
  
  const movie = movies.find(m => m.id === id);
  const theater = theaters.find(t => t.id === theaterId);
  const showtime = theater?.showtimes.find(s => s.id === showtimeId);

  if (!movie || !theater || !showtime) {
    return <div className="min-h-screen flex items-center justify-center">Booking details not found</div>;
  }

  // Mock occupied seats
  const occupiedSeats = [5, 6, 15, 16, 17, 25, 26, 35, 36, 45, 55, 56, 67, 68];

  const handleBooking = () => {
    if (selectedSeats.length === 0) return;
    
    // Navigate to confirmation page
    navigate(`/booking-confirmation?movie=${movie.id}&theater=${theater.id}&showtime=${showtime.id}&seats=${selectedSeats.join(',')}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-12 h-16 object-cover rounded"
              />
              <div>
                <h1 className="text-xl font-bold">{movie.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{theater.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{showtime.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Price per seat</p>
              <p className="text-lg font-bold">₹{showtime.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Selection */}
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-center">Select Your Seats</h2>
              <SeatSelection
                totalSeats={showtime.totalSeats}
                occupiedSeats={occupiedSeats}
                onSeatSelect={setSelectedSeats}
                ticketPrice={showtime.price}
              />
            </Card>
          </div>
          
          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4">Booking Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Movie</span>
                  <span className="font-medium">{movie.title}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Theater</span>
                  <span className="font-medium">{theater.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Show time</span>
                  <span className="font-medium">{showtime.time}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">Today</span>
                </div>
                
                {selectedSeats.length > 0 && (
                  <>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Seats</span>
                        <span className="font-medium">
                          {selectedSeats.sort((a, b) => a - b).join(', ')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity</span>
                        <span className="font-medium">{selectedSeats.length}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per seat</span>
                        <span className="font-medium">₹{showtime.price}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{selectedSeats.length * showtime.price}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
            
            <Button 
              className="w-full" 
              size="lg"
              disabled={selectedSeats.length === 0}
              onClick={handleBooking}
            >
              Proceed to Payment
            </Button>
            
            {selectedSeats.length === 0 && (
              <p className="text-sm text-muted-foreground text-center">
                Please select at least one seat to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};