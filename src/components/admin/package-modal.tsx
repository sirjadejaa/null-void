"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPackage, updatePackage } from "@/app/admin/actions";
import { Package } from "@/generated/prisma/client";
import { Edit, Plus } from "lucide-react";

interface PackageModalProps {
  pkg?: Package;
}

export function PackageModal({ pkg }: PackageModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: pkg?.name || "",
    price: pkg?.price || "",
    description: pkg?.description || "",
    features: pkg?.features || "",
    highlight: pkg?.highlight || false,
    cta: pkg?.cta || "",
    order: pkg?.order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const data = {
        ...formData,
        order: Number(formData.order),
      };
      if (pkg) {
        await updatePackage(pkg.id, data);
      } else {
        await createPackage(data);
      }
      setOpen(false);
      if (!pkg) {
        setFormData({ name: "", price: "", description: "", features: "", highlight: false, cta: "", order: 0 });
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
        className={pkg 
          ? "p-2 rounded-lg bg-background border border-border hover:text-primary transition-colors inline-flex items-center justify-center" 
          : "flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        }
      >
        {pkg ? (
          <Edit className="w-4 h-4" />
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Add Package
          </>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background border-border text-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{pkg ? "Edit Package" : "Create New Package"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (e.g. $999)</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features (comma separated)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cta">CTA Text</Label>
              <Input
                id="cta"
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="highlight"
              checked={formData.highlight}
              onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
              className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary focus:ring-offset-background"
            />
            <Label htmlFor="highlight">Highlight this package (e.g. "Most Popular")</Label>
          </div>

          <div className="flex justify-end pt-4 gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
