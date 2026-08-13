"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

// -- Projects --

export async function createProject(data: {
  title: string;
  category: string;
  tech: string;
  date: string;
  link?: string;
  color: string;
  imageUrl?: string;
}) {
  await checkAuth();
  await prisma.project.create({ data });
  revalidatePath("/admin/projects");
}

export async function updateProject(id: string, data: {
  title: string;
  category: string;
  tech: string;
  date: string;
  link?: string;
  color: string;
  imageUrl?: string;
}) {
  await checkAuth();
  await prisma.project.update({ where: { id }, data });
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await checkAuth();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

// -- Services --

export async function createService(data: {
  title: string;
  description: string;
  icon: string;
  order: number;
}) {
  await checkAuth();
  await prisma.service.create({ data });
  revalidatePath("/admin/services");
}

export async function updateService(id: string, data: {
  title: string;
  description: string;
  icon: string;
  order: number;
}) {
  await checkAuth();
  await prisma.service.update({ where: { id }, data });
  revalidatePath("/admin/services");
}

export async function deleteService(id: string) {
  await checkAuth();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
}

// -- Packages --

export async function createPackage(data: {
  name: string;
  price: string;
  description: string;
  features: string;
  highlight: boolean;
  cta: string;
  order: number;
}) {
  await checkAuth();
  await prisma.package.create({ data });
  revalidatePath("/admin/packages");
}

export async function updatePackage(id: string, data: {
  name: string;
  price: string;
  description: string;
  features: string;
  highlight: boolean;
  cta: string;
  order: number;
}) {
  await checkAuth();
  await prisma.package.update({ where: { id }, data });
  revalidatePath("/admin/packages");
}

export async function deletePackage(id: string) {
  await checkAuth();
  await prisma.package.delete({ where: { id } });
  revalidatePath("/admin/packages");
}

// -- Testimonials --

export async function createTestimonial(data: {
  name: string;
  company: string;
  text: string;
  rating: number;
}) {
  await checkAuth();
  await prisma.testimonial.create({ data });
  revalidatePath("/admin/testimonials");
}

export async function updateTestimonial(id: string, data: {
  name: string;
  company: string;
  text: string;
  rating: number;
}) {
  await checkAuth();
  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await checkAuth();
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
}

// -- Settings --

export async function updateSettings(data: {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  const updateData: any = {
    name: data.name,
    email: data.email,
  };

  if (data.newPassword && data.currentPassword) {
    const passwordsMatch = await bcrypt.compare(data.currentPassword, user.password);
    if (!passwordsMatch) {
      throw new Error("Incorrect current password");
    }
    updateData.password = await bcrypt.hash(data.newPassword, 10);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });
  
  // Note: if email changes, the current session might become invalid on next check
}
