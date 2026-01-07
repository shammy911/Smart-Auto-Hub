"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, User, Car, CheckCircle, Clock, Truck } from "lucide-react";

interface MataraModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MataraModal({
  isOpen,
  onOpenChange,
}: MataraModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
            <MapPin className="h-6 w-6" />
            Matara Branch
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Left Column: Image & Info */}
          <div className="space-y-4">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-secondary border border-border shadow-md">
              <img
                src="/luxury-showroom-interior.jpg"
                alt="Matara Showroom"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="bg-card p-4 rounded-lg border border-border shadow-sm">
                <h3 className="font-semibold text-lg mb-3 border-b border-border pb-2">Branch Details</h3>
                <div className="space-y-3">
                    <div className="flex items-start gap-3">
                        <MapPin className="text-primary h-5 w-5 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm text-muted-foreground">Address</p>
                            <p className="text-foreground">No. 45, Galle Road, Matara</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <User className="text-primary h-5 w-5 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm text-muted-foreground">Branch Manager</p>
                            <p className="text-foreground">Mr. Ruwan Silva</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone className="text-primary h-5 w-5 mt-0.5" />
                        <div>
                            <p className="font-medium text-sm text-muted-foreground">Contact</p>
                            <p className="text-foreground">041-2223456</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Right Column: Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-secondary/20 border border-border rounded-lg flex flex-col items-center justify-center text-center hover:bg-secondary/40 transition">
                  <Car className="h-8 w-8 text-primary mb-2" />
                  <p className="text-3xl font-bold">55</p>
                  <p className="text-sm text-muted-foreground">Total Vehicles</p>
               </div>
               <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex flex-col items-center justify-center text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400">35</p>
                  <p className="text-sm text-green-700/80 dark:text-green-400/80">Available</p>
               </div>
               <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex flex-col items-center justify-center text-center">
                  <Truck className="h-8 w-8 text-orange-600 mb-2" />
                  <p className="text-3xl font-bold text-orange-700 dark:text-orange-400">13</p>
                  <p className="text-sm text-orange-700/80 dark:text-orange-400/80">Shipped</p>
               </div>
               <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex flex-col items-center justify-center text-center">
                  <Clock className="h-8 w-8 text-blue-600 mb-2" />
                  <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">7</p>
                  <p className="text-sm text-blue-700/80 dark:text-blue-400/80">Reserved</p>
               </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    Recent Inventory
                </h4>
                <ul className="space-y-2">
                    <li className="flex items-center justify-between text-sm p-2 bg-background rounded border border-border/50">
                        <span>Toyota Axio 2017</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">Available</span>
                    </li>
                    <li className="flex items-center justify-between text-sm p-2 bg-background rounded border border-border/50">
                        <span>Mitsubishi Montero 2015</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full dark:bg-blue-900/30 dark:text-blue-400">Reserved</span>
                    </li>
                     <li className="flex items-center justify-between text-sm p-2 bg-background rounded border border-border/50">
                        <span>Honda Civic 2020</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full dark:bg-green-900/30 dark:text-green-400">Available</span>
                    </li>
                </ul>
            </div>
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
