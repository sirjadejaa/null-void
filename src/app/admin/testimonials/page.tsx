import { prisma } from "@/lib/prisma";
import { TestimonialModal } from "@/components/admin/testimonial-modal";
import { TestimonialActions } from "@/components/admin/testimonial-actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-heading font-bold">Manage Testimonials</h2>
        <TestimonialModal />
      </div>

      <div className="bg-secondary/20 border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="p-4 font-medium text-muted-foreground text-sm">Author</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Company</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Rating</th>
              <th className="p-4 font-medium text-muted-foreground text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No testimonials found. Add your first testimonial!
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-semibold">{testimonial.name}</td>
                  <td className="p-4 text-muted-foreground">{testimonial.company}</td>
                  <td className="p-4 text-muted-foreground">{testimonial.rating} / 5</td>
                  <td className="p-4">
                    <TestimonialActions testimonial={testimonial} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
