import { SanityDocument } from "next-sanity";
import SingleProjectThumb from "./SingleProjectThumb";

interface MoreProjectsProps {
  id: string;
  projects: SanityDocument[];
  thumbnailImageLQIP: string;
}

export default function MoreProjects({ projects, id }: MoreProjectsProps) {
  const filterProjects = projects.filter((project) => project._id !== id);
  const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];

      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  const randProjects = shuffle(filterProjects);

  return (
    <div className="pt-10 md:pt-32">
      <div className="bg-maud-grey">
        <h3 className="text-center pt-20 md:text-sm">More Projects</h3>
        <div className="flex flex-col md:grid grid-cols-6 gap-x-20 gap-y-24 md:gap-y-72 pt-20 px-10 md:px-20 pb-36 content-center">
          {randProjects.slice(0, 3).map((project, index) => (
            // @ts-ignore
            <SingleProjectThumb key={index} project={project} index={index} />
          ))}
          {randProjects.length === 0 && (
            <div className="col-span-6 text-center">No projects found</div>
          )}
        </div>
      </div>
    </div>
  );
}
