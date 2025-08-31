import avengersImg from "@/assets/movie-avengers.jpg";
import batmanImg from "@/assets/movie-batman.jpg";
import inceptionImg from "@/assets/movie-inception.jpg";
import spidermanImg from "@/assets/movie-spiderman.jpg";

export interface Movie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  duration: string;
  genre: string[];
  language: string;
  releaseDate: string;
  description: string;
  cast: string[];
  director: string;
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
  facilities: string[];
  showtimes: ShowTime[];
}

export interface ShowTime {
  id: string;
  time: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
}

export const movies: Movie[] = [
  {
    id: "1",
    title: "Avengers: Endgame",
    poster: avengersImg,
    rating: 8.4,
    duration: "3h 1m",
    genre: ["Action", "Adventure", "Drama"],
    language: "English",
    releaseDate: "2019-04-26",
    description: "The grave course of events set in motion by Thanos that wiped out half the universe and fractured the Avengers ranks compels the remaining Avengers to take one final stand.",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"],
    director: "Anthony Russo, Joe Russo"
  },
  {
    id: "2", 
    title: "The Dark Knight",
    poster: batmanImg,
    rating: 9.0,
    duration: "2h 32m",
    genre: ["Action", "Crime", "Drama"],
    language: "English",
    releaseDate: "2008-07-18",
    description: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"],
    director: "Christopher Nolan"
  },
  {
    id: "3",
    title: "Inception",
    poster: inceptionImg,
    rating: 8.8,
    duration: "2h 28m",
    genre: ["Action", "Sci-Fi", "Thriller"],
    language: "English", 
    releaseDate: "2010-07-16",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy", "Elliot Page"],
    director: "Christopher Nolan"
  },
  {
    id: "4",
    title: "Spider-Man: No Way Home",
    poster: spidermanImg,
    rating: 8.2,
    duration: "2h 28m",
    genre: ["Action", "Adventure", "Sci-Fi"],
    language: "English",
    releaseDate: "2021-12-17",
    description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear.",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"],
    director: "Jon Watts"
  }
];

export const theaters: Theater[] = [
  {
    id: "1",
    name: "PVR Cinemas",
    location: "Phoenix MarketCity, Kurla",
    distance: "2.5 km",
    facilities: ["Parking", "Food & Beverage", "Wheelchair Accessible"],
    showtimes: [
      { id: "1", time: "10:00 AM", price: 250, availableSeats: 45, totalSeats: 100 },
      { id: "2", time: "1:30 PM", price: 350, availableSeats: 23, totalSeats: 100 },
      { id: "3", time: "6:15 PM", price: 400, availableSeats: 67, totalSeats: 100 },
      { id: "4", time: "9:45 PM", price: 350, availableSeats: 89, totalSeats: 100 }
    ]
  },
  {
    id: "2", 
    name: "INOX Multiplex",
    location: "R City Mall, Ghatkopar",
    distance: "4.2 km",
    facilities: ["Parking", "Food Court", "Premium Seating"],
    showtimes: [
      { id: "5", time: "11:15 AM", price: 280, availableSeats: 34, totalSeats: 150 },
      { id: "6", time: "2:45 PM", price: 380, availableSeats: 12, totalSeats: 150 },
      { id: "7", time: "7:00 PM", price: 450, availableSeats: 78, totalSeats: 150 },
      { id: "8", time: "10:30 PM", price: 380, availableSeats: 92, totalSeats: 150 }
    ]
  },
  {
    id: "3",
    name: "Cinepolis",
    location: "Viviana Mall, Thane",
    distance: "8.1 km", 
    facilities: ["Valet Parking", "Luxury Recliner", "Dolby Atmos"],
    showtimes: [
      { id: "9", time: "12:00 PM", price: 320, availableSeats: 56, totalSeats: 120 },
      { id: "10", time: "3:20 PM", price: 420, availableSeats: 28, totalSeats: 120 },
      { id: "11", time: "7:30 PM", price: 500, availableSeats: 41, totalSeats: 120 },
      { id: "12", time: "11:00 PM", price: 420, availableSeats: 73, totalSeats: 120 }
    ]
  }
];