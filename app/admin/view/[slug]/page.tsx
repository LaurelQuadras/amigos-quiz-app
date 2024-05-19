import AdminViewPage from "@/app/components/admin/AdminViewPage/AdminViewPage";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="h-full w-full mt-8">
      <AdminViewPage subSubject={params.slug} />
    </main>
  );
}
