import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { movies } from "@/data/movies";
import { Flame, TrendingUp, Clock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Movies", icon: null },
    { id: "trending", label: "Trending", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "latest", label: "Latest", icon: <Clock className="w-4 h-4" /> },
    { id: "popular", label: "Popular", icon: <Flame className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 py-16">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Book Your Movie Tickets
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover and book tickets for the latest movies in theaters near you. 
            Experience cinema like never before with our premium booking platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Latest Movies
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Premium Theaters
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Best Prices
            </Badge>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-center space-x-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                {category.icon}
                <span>{category.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Now Showing</h2>
            <p className="text-muted-foreground">
              {movies.length} movies available
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                {...movie}
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-8 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">BM</span>
            </div>
            <span className="font-bold text-xl">BookMyShow</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Your ultimate destination for movie ticket booking
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About Us</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
