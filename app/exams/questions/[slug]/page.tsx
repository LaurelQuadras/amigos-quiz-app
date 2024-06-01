import ExamsQuestions from "@/app/home/ExamsQuestions";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="h-full w-full">
      <ExamsQuestions subSubject={params.slug} />
    </main>
  );
}
