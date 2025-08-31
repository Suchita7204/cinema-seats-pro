import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, Play, Share, Heart } from "lucide-react";
import { movies } from "@/data/movies";

export const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center">Movie not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-end space-x-6">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-48 h-72 object-cover rounded-lg shadow-2xl"
              />
              
              <div className="flex-1 text-white">
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                
                <div className="flex items-center space-x-6 mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-cinema-gold text-cinema-gold" />
                    <span className="text-xl font-semibold">{movie.rating}/10</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{movie.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{movie.language}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mb-6">
                  {movie.genre.map((g) => (
                    <Badge key={g} variant="secondary" className="bg-secondary/80">
                      {g}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate(`/movie/${movie.id}/theaters`)}
                  >
                    Book Tickets
                  </Button>
                  
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Trailer
                  </Button>
                  
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                    <Heart className="w-5 h-5" />
                  </Button>
                  
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                    <Share className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About the Movie</h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Cast & Crew</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Director</h4>
                  <p className="text-muted-foreground">{movie.director}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Cast</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor) => (
                      <Badge key={actor} variant="outline">
                        {actor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Movie Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Date</span>
                  <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{movie.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span>{movie.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span>{movie.rating}/10</span>
                </div>
              </div>
            </Card>
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={() => navigate(`/movie/${movie.id}/theaters`)}
            >
              Book Tickets Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};