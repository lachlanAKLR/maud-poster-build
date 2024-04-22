"use client";

import Layout from "../Layout/Layout";

interface ProjectLayoutsAndCreditsProps {
  layouts: any;
}

const ProjectLayouts: React.FC<ProjectLayoutsAndCreditsProps> = ({
  layouts,
}) => {
  return <div>{layouts ? <Layout layouts={layouts} /> : null}</div>;
};

export default ProjectLayouts;
