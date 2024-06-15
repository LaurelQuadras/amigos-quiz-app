export interface ProjectsBooks {
  id: string;
  title: string;
  authors: string[];
  publishDate: string;
  publisher: string;
}

export default function ProjectsBooks({
  id,
  title,
  authors,
  publishDate,
  publisher,
}: ProjectsBooks) {
  return (
    <div key={id} className="flex gap-8 w-fit">
      <span className="w-32 flex justify-start">{title}</span>
      <span className="w-32 flex justify-start">
        {authors.map((author: string) => (
          <span key={author}>{author}</span>
        ))}
      </span>
      <span className="w-32 flex justify-start">{publishDate}</span>
      <span className="w-32 flex justify-start">{publisher}</span>
    </div>
  );
}
