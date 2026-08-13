"use client";

import { Testimonial } from "@prisma/client";
import { deleteTestimonial } from "@/app/admin/actions";
import { Edit, Trash2 } from "lucide-react";
import { TestimonialModal } from "./testimonial-modal";
import { useState } from "react";

export function TestimonialActions({ testimonial }: { testimonial: Testimonial }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setIsDeleting(true);
      try {
        await deleteTestimonial(testimonial.id);
      } catch (e) {
        console.error(e);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <TestimonialModal testimonial={testimonial} />
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
