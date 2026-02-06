"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export default function BranchInventoryPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Branch-wise Inventory</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {["Nugegoda", "Matara", "Colombo"].map((branch, idx) => (
                    <div
                        key={idx}
                        className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <MapPin size={24} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">{branch}</h3>
                                <p className="text-sm text-muted-foreground">Branch</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    Total Vehicles
                                </span>
                                <span className="font-bold text-lg">
                                    {45 + idx * 10}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    Available
                                </span>
                                <span className="font-semibold text-green-600 dark:text-green-500">
                                    {30 + idx * 5}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    Shipped
                                </span>
                                <span className="font-semibold text-orange-600 dark:text-orange-500">
                                    {10 + idx * 3}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">
                                    Reserved
                                </span>
                                <span className="font-semibold text-blue-600 dark:text-blue-500">
                                    {5 + idx * 2}
                                </span>
                            </div>
                        </div>

                        <Button className="w-full mt-4" variant="outline">
                            View Details
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
