"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createTestimonial, updateTestimonial } from "@/app/admin/actions";
import { Testimonial } from "@/generated/prisma/client";
import { Edit, Plus } from "lucide-react";

interface TestimonialModalProps {
  testimonial?: Testimonial;
}

export function TestimonialModal({ testimonial }: TestimonialModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: testimonial?.name || "",
    company: testimonial?.company || "",
    text: testimonial?.text || "",
    rating: testimonial?.rating || 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = {
        ...formData,
        rating: Number(formData.rating),
      };
      if (testimonial) {
        await updateTestimonial(testimonial.id, data);
      } else {
        await createTestimonial(data);
      }
      setOpen(false);
      if (!testimonial) {
        setFormData({ name: "", company: "", text: "", rating: 5 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger 
        className={testimonial 
          ? "p-2 rounded-lg bg-background border border-border hover:text-primary transition-colors inline-flex items-center justify-center" 
          : "flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        }
      >
        {testimonial ? (
          <Edit className="w-4 h-4" />
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add Testimonial
          </>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background border-border text-foreground">
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit Testimonial" : "Create New Testimonial"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Author Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company / Role</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="text">Testimonial Text</Label>
            <Textarea
              id="text"
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input
              id="rating"
              type="number"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
              required
            />
          </div>

          <div className="flex justify-end pt-4 gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Testimonial"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
