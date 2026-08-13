"use client";

import { Service } from "@prisma/client";
import { deleteService } from "@/app/admin/actions";
import { Edit, Trash2 } from "lucide-react";
import { ServiceModal } from "./service-modal";
import { useState } from "react";

export function ServiceActions({ service }: { service: Service }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this service?")) {
      setIsDeleting(true);
      try {
        await deleteService(service.id);
      } catch (e) {
        console.error(e);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <ServiceModal service={service} />
      <button 
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 rounded-lg bg-background border border-border text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
