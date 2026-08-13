"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettings } from "@/app/admin/actions";
import { Loader2 } from "lucide-react";

export default function AdminSettings() {
  const { data: session, update } = useSession();
  
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    currentPassword: "",
    newPassword: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await updateSettings(formData);
      setMessage({ type: "success", text: "Settings updated successfully" });
      
      // Update NextAuth session if name/email changed
      if (formData.name !== session?.user?.name || formData.email !== session?.user?.email) {
        await update({ name: formData.name, email: formData.email });
      }
      
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "" }));
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update settings" });
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <div className="text-muted-foreground animate-pulse flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4"/> Loading settings...</div>;
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold">Account Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your admin profile and security preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-secondary/20 p-8 rounded-2xl border border-border">
        {message.text && (
          <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-destructive/10 border-destructive/20 text-destructive'}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">Profile Information</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">Change Password</h3>
          <p className="text-sm text-muted-foreground">Leave blank if you don't want to change your password.</p>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button type="submit" disabled={loading} className="px-8">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
