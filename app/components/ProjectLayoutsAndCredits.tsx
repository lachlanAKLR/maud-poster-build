"use client";

import Layout from "./Layout";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface ProjectLayoutsAndCreditsProps {
  layouts: any;
  projectCredits: any;
}

const ProjectLayoutsAndCredits: React.FC<ProjectLayoutsAndCreditsProps> = ({
  layouts,
  projectCredits,
}) => {
  return (
    <>
      {layouts ? <Layout layouts={layouts} /> : null}
      {projectCredits ? (
        <div className="block md:grid grid-cols-8 gap-x-20 px-20">
          <div className="pt-24 pb-14 md:pb-8 md:pt-32 col-start-3 col-span-4 text-center text-xs">
            <PortableText value={projectCredits} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProjectLayoutsAndCredits;
