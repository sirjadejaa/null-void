"use client";

import { Package } from "@prisma/client";
import { deletePackage } from "@/app/admin/actions";
import { Edit, Trash2 } from "lucide-react";
import { PackageModal } from "./package-modal";
import { useState } from "react";

export function PackageActions({ pkg }: { pkg: Package }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this package?")) {
      setIsDeleting(true);
      try {
        await deletePackage(pkg.id);
      } catch (e) {
        console.error(e);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <PackageModal pkg={pkg} />
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
