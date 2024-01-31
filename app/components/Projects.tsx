import { SanityDocument } from "next-sanity";
import Link from "next/link";

export default function Projects({ projects }: { projects: SanityDocument[] }) {
  return (
    <main className="container mx-auto grid grid-cols-1 divide-y divide-blue-100">
      {projects?.length > 0 ? (
        projects.map((project) => (
          <Link key={project._id} href={project.slug.current}>
            <h2 className="p-4 hover:bg-blue-50">{project.title}</h2>
          </Link>
        ))
      ) : (
        <div className="p-4 text-red-500">No projects found</div>
      )}
    </main>
  );
}
