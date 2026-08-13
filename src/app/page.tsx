import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { Packages } from "@/components/packages";
import { Process } from "@/components/process";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { Contact } from "@/components/contact";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, services, packages, testimonials] = await Promise.all([
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.service.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.package.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <main className="min-h-screen">
      <Loader />
      <Navbar />
      
      <Hero />
      <Portfolio projects={projects} />
      <Services services={services} />
      <Packages packages={packages} />
      <Process />
      <Testimonials testimonials={testimonials} />
      <FAQ />
      <Contact />

      <Footer />
    </main>
  );
}
