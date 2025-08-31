import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SeatSelectionProps {
  totalSeats: number;
  occupiedSeats: number[];
  onSeatSelect: (selectedSeats: number[]) => void;
  ticketPrice: number;
}

export const SeatSelection = ({ 
  totalSeats, 
  occupiedSeats, 
  onSeatSelect, 
  ticketPrice 
}: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  
  const rows = 10;
  const seatsPerRow = Math.ceil(totalSeats / rows);
  
  const handleSeatClick = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber)) return;
    
    const newSelected = selectedSeats.includes(seatNumber)
      ? selectedSeats.filter(seat => seat !== seatNumber)
      : [...selectedSeats, seatNumber];
    
    setSelectedSeats(newSelected);
    onSeatSelect(newSelected);
  };
  
  const getSeatType = (seatNumber: number) => {
    if (occupiedSeats.includes(seatNumber)) return 'occupied';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };
  
  const renderSeat = (seatNumber: number) => {
    const seatType = getSeatType(seatNumber);
    
    return (
      <button
        key={seatNumber}
        onClick={() => handleSeatClick(seatNumber)}
        disabled={seatType === 'occupied'}
        className={cn(
          "w-6 h-6 rounded-t-lg border-2 transition-all duration-200 text-xs font-medium",
          {
            "bg-seat-available border-seat-available hover:bg-seat-available/80": seatType === 'available',
            "bg-seat-selected border-seat-selected": seatType === 'selected', 
            "bg-seat-occupied border-seat-occupied cursor-not-allowed": seatType === 'occupied'
          }
        )}
      >
        {seatNumber}
      </button>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="text-center">
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-cinema-gold to-transparent rounded-full mb-2" />
        <p className="text-sm text-muted-foreground">SCREEN</p>
      </div>
      
      {/* Seat Map */}
      <div className="flex flex-col items-center space-y-2 bg-secondary/30 p-6 rounded-lg">
        {Array.from({ length: rows }, (_, rowIndex) => {
          const rowLetter = String.fromCharCode(65 + rowIndex);
          const startSeat = rowIndex * seatsPerRow + 1;
          const endSeat = Math.min(startSeat + seatsPerRow - 1, totalSeats);
          
          return (
            <div key={rowIndex} className="flex items-center space-x-2">
              <span className="w-6 text-center text-sm font-medium text-muted-foreground">
                {rowLetter}
              </span>
              <div className="flex space-x-1">
                {Array.from({ length: endSeat - startSeat + 1 }, (_, seatIndex) => {
                  const seatNumber = startSeat + seatIndex;
                  if (seatNumber > totalSeats) return null;
                  return renderSeat(seatNumber);
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-seat-available rounded-t border-2 border-seat-available" />
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-seat-selected rounded-t border-2 border-seat-selected" />
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-seat-occupied rounded-t border-2 border-seat-occupied" />
          <span>Occupied</span>
        </div>
      </div>
      
      {/* Booking Summary */}
      {selectedSeats.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {selectedSeats.length} Seat{selectedSeats.length > 1 ? 's' : ''} Selected
              </p>
              <p className="text-sm text-muted-foreground">
                Seats: {selectedSeats.sort((a, b) => a - b).join(', ')}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹{selectedSeats.length * ticketPrice}</p>
              <Badge variant="secondary" className="text-xs">
                ₹{ticketPrice} per seat
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};