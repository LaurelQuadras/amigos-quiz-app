import AdminEditPage from "@/app/components/admin/AdminEditPage/AdminEditPage";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="h-full w-full mt-8">
      <AdminEditPage subSubject={params.slug} />
    </main>
  );
}
