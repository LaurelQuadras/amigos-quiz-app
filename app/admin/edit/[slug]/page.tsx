import AdminEditPage from "@/app/components/admin/AdminEditPage/AdminEditPage";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="h-full w-11/12">
      <AdminEditPage sectionId={params.slug} />
    </main>
  );
}
