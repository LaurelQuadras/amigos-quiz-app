"use client";

import ProjectsCode from "./Projects";
import { useApi } from "./useApi";

export interface ProjectsHOCInterface {
  useHook: any;
  CustomComponent: any;
}

export default function ProjectsHOC({
  useHook,
  CustomComponent,
}: ProjectsHOCInterface) {
  const [loading, error, booksResults] = useHook();
  return (
    <>
      {error !== "" && <h1>{error}</h1>}
      {loading && <h1>Loading</h1>}
      {booksResults && <div>{CustomComponent}</div>}
    </>
  );
}
