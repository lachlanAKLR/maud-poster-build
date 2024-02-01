import { SanityDocument } from "next-sanity";
import Link from "next/link";

export default function Projects({ projects }: { projects: SanityDocument[] }) {
  return (
    <main className="flex flex-col text-center">
      {projects?.length > 0 ? (
        projects.map((project) => (
          <Link key={project._id} href={project.slug.current}>
            <h1 className="text-xl py-10">{project.title}</h1>
          </Link>
        ))
      ) : (
        <div className="p-4 text-red-500">No projects found</div>
      )}
    </main>
  );
}
