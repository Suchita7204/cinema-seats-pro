import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Wifi, Car, Utensils } from "lucide-react";
import { movies, theaters } from "@/data/movies";

export const TheaterSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center">Movie not found</div>;
  }

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'parking': return <Car className="w-4 h-4" />;
      case 'food & beverage': 
      case 'food court': return <Utensils className="w-4 h-4" />;
      case 'wifi': return <Wifi className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center space-x-4">
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="w-16 h-24 object-cover rounded"
            />
            <div>
              <h1 className="text-2xl font-bold">{movie.title}</h1>
              <p className="text-muted-foreground">{movie.language} • {movie.duration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Theater List */}
      <div className="container mx-auto px-8 py-8">
        <div className="space-y-6">
          {theaters.map((theater) => (
            <Card key={theater.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">{theater.name}</h3>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{theater.location}</span>
                    </div>
                    <span>•</span>
                    <span>{theater.distance}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {theater.facilities.map((facility) => (
                      <div key={facility} className="flex items-center space-x-1 text-sm text-muted-foreground">
                        {getFacilityIcon(facility)}
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Showtimes */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Show Times</h4>
                  <Badge variant="outline">Today</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {theater.showtimes.map((showtime) => (
                    <Button
                      key={showtime.id}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-start space-y-1 hover:border-primary hover:bg-primary/5"
                      onClick={() => navigate(`/movie/${movie.id}/seats?theater=${theater.id}&showtime=${showtime.id}`)}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-semibold">{showtime.time}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ₹{showtime.price}
                      </div>
                      <div className="text-xs text-seat-available">
                        {showtime.availableSeats} seats available
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};