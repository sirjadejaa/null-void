"use client";

import { Project } from "@prisma/client";
import { deleteProject } from "@/app/admin/actions";
import { Edit, Trash2 } from "lucide-react";
import { ProjectModal } from "./project-modal";
import { useState } from "react";

export function ProjectActions({ project }: { project: Project }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      try {
        await deleteProject(project.id);
      } catch (e) {
        console.error(e);
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex justify-end gap-3">
      <ProjectModal project={project} />
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
