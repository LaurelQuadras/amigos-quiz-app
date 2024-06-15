"use client";

import ProjectsCode from "./Projects";
import ProjectsHOC from "./ProjectsHOC";
import { useApi } from "./useApi";

export default function Projects() {
  return (
    <div className="w-full h-fit bg-white p-16">
      <ProjectsHOC useHook={useApi} CustomComponent={<ProjectsCode />} />
    </div>
  );
}
