"use client";

import Layout from "../Layout/Layout";

interface ProjectLayoutsAndCreditsProps {
  layouts: any;
}

const ProjectLayouts: React.FC<ProjectLayoutsAndCreditsProps> = ({
  layouts,
}) => {
  return <>{layouts ? <Layout layouts={layouts} /> : null}</>;
};

export default ProjectLayouts;
