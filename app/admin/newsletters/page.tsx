"use client";

import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import NewsletterTable from "../NewsletterTable";

export default function NewsletterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Newsletter Subscribers</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your email subscriber list
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/admin/newsletters")}
          >
            View Newsletters
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/admin/newsletters/create")}
          >
            <Plus size={18} className="mr-2" />
            Create
          </Button>
          <Button onClick={() => window.open("/api/subscribers/export")}>
            <FileText size={18} className="mr-2" />
            Export List
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden p-6">
        <NewsletterTable />
      </div>
    </div>
  );
}
