"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Car, MapPin, Gauge, Fuel, Calendar, Zap, DollarSign } from "lucide-react";

interface ViewVehicleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: any;
}

export default function ViewVehicleModal({
  isOpen,
  onOpenChange,
  vehicle,
}: ViewVehicleModalProps) {
  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Car className="text-primary" />
            Vehicle Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Left Column: Image */}
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-secondary border border-border shadow-md">
              {vehicle.image ? (
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center flex-col text-muted-foreground bg-muted/30">
                  <Car size={64} className="mb-2 opacity-50" />
                  <p>No Image Available</p>
                </div>
              )}
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Price</span>
                <DollarSign className="text-primary h-4 w-4" />
              </div>
              <p className="text-3xl font-bold text-primary">
                 {typeof vehicle.price === "number"
                  ? `LKR ${vehicle.price.toLocaleString()}`
                  : vehicle.price}
              </p>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{vehicle.name}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                 <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      vehicle.status === "Available"
                        ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                        : vehicle.status === "Shipped"
                        ? "bg-orange-500/10 text-orange-600 border-orange-500/20"
                        : vehicle.status === "Reserved"
                        ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                        : "bg-red-500/10 text-red-600 border-red-500/20"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border flex items-center gap-1">
                    <MapPin size={14} />
                    {vehicle.location || vehicle.branch || "N/A"}
                  </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-3 bg-card border border-border rounded-md">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                     <Car size={12} /> Make
                  </p>
                  <p className="font-semibold">{vehicle.make}</p>
               </div>
               <div className="p-3 bg-card border border-border rounded-md">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                     <Car size={12} /> Model
                  </p>
                  <p className="font-semibold">{vehicle.model}</p>
               </div>
               <div className="p-3 bg-card border border-border rounded-md">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                     <Calendar size={12} /> Year
                  </p>
                  <p className="font-semibold">{vehicle.year}</p>
               </div>
               <div className="p-3 bg-card border border-border rounded-md">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                     <Gauge size={12} /> Mileage
                  </p>
                  <p className="font-semibold">{vehicle.mileage?.toLocaleString()} km</p>
               </div>
               <div className="p-3 bg-card border border-border rounded-md">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                     <Fuel size={12} /> Fuel Type
                  </p>
                  <p className="font-semibold">{vehicle.fuelType}</p>
               </div>
               <div className="p-3 bg-card border border-border rounded-md">
                  <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                     <Zap size={12} /> Transmission
                  </p>
                  <p className="font-semibold">{vehicle.transmission}</p>
               </div>
            </div>
            
            {vehicle.description && (
               <div className="p-4 bg-muted/30 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2 text-sm">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     {vehicle.description}
                  </p>
               </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
