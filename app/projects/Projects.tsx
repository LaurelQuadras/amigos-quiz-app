"use client";

import { useEffect, useState } from "react";
import ProjectsBooks from "./ProjectsBooks";
import { useApi } from "./useApi";

export interface ProjectsCodeInterface {
  booksResults: any;
}

export default function ProjectsCode() {
  const [loading, error, booksResults] = useApi();

  const [currentPage, setCurrentPage] = useState<number>(0);

  const [currentBooksResults, setCurrentBooksResults] = useState<any>();

  const setNextPage = () => {
    console.log(currentPage + 3);
    if (currentPage + 6 >= booksResults.items.length) {
      return;
    }
    setCurrentPage((currentPage) => currentPage + 3);
    console.log(currentPage + 3);
  };

  const setPrevioustPage = () => {
    if (currentPage - 3 < 0) {
      return;
    }
    setCurrentPage((currentPage) => currentPage - 3);
    console.log(currentPage - 3);
  };

  useEffect(() => {
    if (booksResults) {
      console.log(booksResults.items[currentPage]);
      const newCuurentBooks = [
        booksResults.items[currentPage],
        booksResults.items[currentPage + 1],
        booksResults.items[currentPage + 2],
      ];
      setCurrentBooksResults(newCuurentBooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    if (booksResults) {
      const currentBookValues = [
        booksResults.items[currentPage],
        booksResults.items[currentPage + 1],
        booksResults.items[currentPage + 2],
      ];
      setCurrentBooksResults(currentBookValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booksResults]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-16">
      <div className="flex gap-8 w-fit">
        <span className="w-32 flex justify-start">Title</span>
        <span className="w-32 flex justify-start">Authors</span>
        <span className="w-32 flex justify-start">Published Date</span>
        <span className="w-32 flex justify-start">Publishers</span>
      </div>
      {currentBooksResults &&
        currentBooksResults.map((itemResult: any) => (
          <ProjectsBooks
            key={itemResult.id}
            id={itemResult.id}
            title={itemResult.volumeInfo.title}
            authors={itemResult.volumeInfo.authors}
            publishDate={itemResult.volumeInfo.publishedDate}
            publisher={itemResult.volumeInfo.publisher}
          />
        ))}
      <div className="flex gap-16">
        <button
          className="border rounded border-red-400 p-4"
          onClick={setPrevioustPage}
        >
          Previous
        </button>
        <button
          className="border rounded border-red-400 p-4"
          onClick={setNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
