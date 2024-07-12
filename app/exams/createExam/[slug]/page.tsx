"use client";

import ExamsQuestions, { QuestionMode } from "@/app/home/ExamsQuestions";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="my-6 h-full w-full">
      <ExamsQuestions examId={params.slug} mode={QuestionMode.Createmode} />
    </main>
  );
}
