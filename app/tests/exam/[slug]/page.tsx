import TestsExamPage from "./TestsExamPage";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="h-full w-full my-8">
      <TestsExamPage examId={params.slug} />
    </main>
  );
}
