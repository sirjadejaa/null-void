import { prisma } from "@/lib/prisma";
import { Plus, Edit, Trash2 } from "lucide-react";

import { ProjectModal } from "@/components/admin/project-modal";
import { ProjectActions } from "@/components/admin/project-actions";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-heading font-bold">Manage Projects</h2>
        <ProjectModal />
      </div>

      <div className="bg-secondary/20 border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="p-4 font-medium text-muted-foreground text-sm">Title</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Category</th>
              <th className="p-4 font-medium text-muted-foreground text-sm">Date</th>
              <th className="p-4 font-medium text-muted-foreground text-sm text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No projects found. Add your first project!
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-semibold">{project.title}</td>
                  <td className="p-4 text-muted-foreground">{project.category}</td>
                  <td className="p-4 text-muted-foreground">{project.date}</td>
                  <td className="p-4">
                    <ProjectActions project={project} />
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
