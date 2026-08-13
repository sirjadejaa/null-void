import { prisma } from "@/lib/prisma";
import { PackageModal } from "@/components/admin/package-modal";
import { PackageActions } from "@/components/admin/package-actions";

export const dynamic = "force-dynamic";

export default async function AdminPackages() {
  const packages = await prisma.package.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-heading font-bold">Manage Packages</h2>
        <PackageModal />
      </div>

      <div className="bg-secondary/20 border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="p-4 font-medium text-muted-foreground text-sm">Order</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Name</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Price</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Highlight</th>
              <th className="p-4 font-medium text-muted-foreground text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  No packages found. Add your first package!
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr key={pkg.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 text-muted-foreground">{pkg.order}</td>
                  <td className="p-4 font-semibold">{pkg.name}</td>
                  <td className="p-4 text-muted-foreground">{pkg.price}</td>
                  <td className="p-4">
                    {pkg.highlight ? (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md font-medium">Yes</span>
                    ) : (
                      <span className="text-muted-foreground text-sm">No</span>
                    )}
                  </td>
                  <td className="p-4">
                    <PackageActions pkg={pkg} />
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
