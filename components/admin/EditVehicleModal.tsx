"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { vehicleAPI } from "@/lib/api/vehicles";
import { Edit } from "lucide-react";

const typeOptions = ["Sedan", "SUV", "Van", "Hybrid", "Hatchback"];
const transmissionOptions = ["Automatic", "Manual"];
const fuelTypeOptions = ["Petrol", "Diesel", "Hybrid", "EV"];
const statusOptions = ["Available", "Sold", "Shipped", "Reserved"];
const branchOptions = ["Nugegoda", "Jayawardenapura", "Matara", "Colombo"];

interface EditVehicleModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onVehicleUpdated: () => void;
  vehicle: any;
}

export default function EditVehicleModal({
  isOpen,
  onOpenChange,
  onVehicleUpdated,
  vehicle,
}: EditVehicleModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    type: "Sedan",
    mileage: "",
    transmission: "Automatic",
    fuelType: "Petrol",
    price: "",
    status: "Available",
    branch: "Nugegoda",
  });

  useEffect(() => {
    if (vehicle) {
      setFormData({
        make: vehicle.make || "",
        model: vehicle.model || "",
        year: vehicle.year || "",
        type: vehicle.type || "Sedan",
        mileage: vehicle.mileage || "",
        transmission: vehicle.transmission || "Automatic",
        fuelType: vehicle.fuelType || "Petrol",
        price: vehicle.price || "",
        status: vehicle.status || "Available",
        branch: vehicle.location || vehicle.branch || "Nugegoda",
      });
    }
  }, [vehicle]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    // Basic validation
    if (
      !formData.make.trim() ||
      !formData.model.trim() ||
      !formData.year ||
      !formData.mileage ||
      !formData.price
    ) {
      setError("Please fill in all required fields.");
      setIsSaving(false);
      return;
    }

    const nameParts = [formData.year, formData.make, formData.model].filter(
      Boolean
    );
    const vehicleName = nameParts.join(" ");

    const updatedVehicle = {
      ...vehicle, // Keep existing fields like id, images, views
      name: vehicleName,
      make: formData.make.trim(),
      model: formData.model.trim(),
      year: Number(formData.year),
      type: formData.type,
      mileage: Number(formData.mileage),
      transmission: formData.transmission,
      fuelType: formData.fuelType,
      location: formData.branch,
      price: Number(formData.price),
      status: formData.status,
    };

    try {
      const result = await vehicleAPI.updateVehicle(vehicle.id, updatedVehicle);
      if (result.success) {
        onVehicleUpdated();
        onOpenChange(false);
      } else {
        setError(result.error || "Failed to update vehicle.");
      }
    } catch (err) {
      console.error("Error updating vehicle:", err);
      setError("An unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!vehicle) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Edit Vehicle
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Make (Name) */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Make (Name)
              </label>
              <Input
                value={formData.make}
                onChange={(e) => handleChange("make", e.target.value)}
                placeholder="e.g., Toyota"
                required
              />
            </div>

            {/* Model */}
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <Input
                value={formData.model}
                onChange={(e) => handleChange("model", e.target.value)}
                placeholder="e.g., Prius"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => handleChange("year", e.target.value)}
                placeholder="2024"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Mileage */}
            <div>
              <label className="block text-sm font-medium mb-2">Mileage</label>
              <Input
                type="number"
                value={formData.mileage}
                onChange={(e) => handleChange("mileage", e.target.value)}
                placeholder="e.g., 50000"
                required
              />
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Transmission
              </label>
              <select
                value={formData.transmission}
                onChange={(e) => handleChange("transmission", e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {transmissionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Fuel Type
              </label>
              <select
                value={formData.fuelType}
                onChange={(e) => handleChange("fuelType", e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {fuelTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="e.g., 7500000"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-sm font-medium mb-2">Branch</label>
              <select
                value={formData.branch}
                onChange={(e) => handleChange("branch", e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {branchOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
