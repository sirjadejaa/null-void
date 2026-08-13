import { prisma } from "@/lib/prisma";
import { ServiceModal } from "@/components/admin/service-modal";
import { ServiceActions } from "@/components/admin/service-actions";

export const dynamic = "force-dynamic";

export default async function AdminServices() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-heading font-bold">Manage Services</h2>
        <ServiceModal />
      </div>

      <div className="bg-secondary/20 border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="p-4 font-medium text-muted-foreground text-sm">Order</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Title</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Icon</th>
              <th className="p-4 font-medium text-muted-foreground text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No services found. Add your first service!
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 text-muted-foreground">{service.order}</td>
                  <td className="p-4 font-semibold">{service.title}</td>
                  <td className="p-4 text-muted-foreground">{service.icon}</td>
                  <td className="p-4">
                    <ServiceActions service={service} />
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
