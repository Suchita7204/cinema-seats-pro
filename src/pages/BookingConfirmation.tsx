import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Share, Calendar, MapPin, Clock, Ticket } from "lucide-react";
import { movies, theaters } from "@/data/movies";
import { useEffect } from "react";

export const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const movieId = searchParams.get('movie');
  const theaterId = searchParams.get('theater');
  const showtimeId = searchParams.get('showtime');
  const seatNumbers = searchParams.get('seats')?.split(',').map(Number) || [];
  
  const movie = movies.find(m => m.id === movieId);
  const theater = theaters.find(t => t.id === theaterId);
  const showtime = theater?.showtimes.find(s => s.id === showtimeId);
  
  // Generate booking ID
  const bookingId = `BMS${Date.now().toString().slice(-6)}`;
  const totalAmount = seatNumbers.length * (showtime?.price || 0);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  if (!movie || !theater || !showtime || seatNumbers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">Booking details not found</h2>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 text-seat-available mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your movie tickets have been booked successfully
            </p>
          </div>

          {/* Booking Details */}
          <Card className="p-8 mb-6">
            <div className="flex items-start space-x-6 mb-6">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-24 h-36 object-cover rounded"
              />
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{theater.name}, {theater.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Today</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{showtime.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ticket className="w-4 h-4" />
                    <span>Seats: {seatNumbers.sort((a, b) => a - b).join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <Badge variant="outline" className="mb-2">
                  {movie.language}
                </Badge>
                <p className="text-sm text-muted-foreground">Booking ID</p>
                <p className="font-mono font-bold">{bookingId}</p>
              </div>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tickets ({seatNumbers.length})</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Convenience Fee</span>
                      <span>₹0</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-border pt-2">
                      <span>Total Paid</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Important Notes</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Please arrive 15 minutes before showtime</li>
                    <li>• Carry a valid ID for verification</li>
                    <li>• No cancellation or refunds</li>
                    <li>• Screenshots will not be accepted</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button className="flex-1" size="lg">
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
            
            <Button variant="outline" size="lg">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/')}
            >
              Book More
            </Button>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Thank you for choosing BookMyShow! Enjoy your movie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};