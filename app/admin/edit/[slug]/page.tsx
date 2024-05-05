import AdminEditPage from "@/app/components/admin/AdminEditPage/AdminEditPage";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="h-full w-full">
      <AdminEditPage sectionId={params.slug} />
    </main>
  );
}
