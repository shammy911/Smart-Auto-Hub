"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { vehicleAPI } from "@/lib/api/vehicles";

interface DeleteVehicleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVehicleDeleted: () => void;
  vehicle: any;
}

export default function DeleteVehicleModal({
  isOpen,
  onOpenChange,
  onVehicleDeleted,
  vehicle,
}: DeleteVehicleModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!vehicle) return;
    
    setIsDeleting(true);
    setError("");

    try {
      const result = await vehicleAPI.deleteVehicle(vehicle.id);
      if (result.success) {
        onVehicleDeleted();
        onOpenChange(false);
      } else {
        setError(result.error || "Failed to delete vehicle.");
      }
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      setError("An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
             <AlertTriangle className="h-6 w-6" />
             <DialogTitle>Delete Vehicle</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete <strong>{vehicle.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-sm text-destructive mt-2">{error}</p>}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Vehicle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
