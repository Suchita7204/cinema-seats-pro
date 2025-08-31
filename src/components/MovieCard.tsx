import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  genre: string[];
  language: string;
  releaseDate: string;
  onClick: () => void;
}

export const MovieCard = ({
  title,
  poster,
  rating,
  duration,
  genre,
  language,
  releaseDate,
  onClick
}: MovieCardProps) => {
  return (
    <Card 
      className="bg-gradient-to-b from-card to-secondary border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={poster} 
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 fill-cinema-gold text-cinema-gold" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex flex-wrap gap-1">
          {genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="secondary" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{language}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};