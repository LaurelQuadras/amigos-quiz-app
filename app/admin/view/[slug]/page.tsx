import AdminViewPage from "@/app/components/admin/AdminViewPage/AdminViewPage";

export default function Home({ params }: { params: { slug: string } }) {
  return (
    <main className="h-full w-full mt-8">
      <AdminViewPage sectionId={params.slug} />
    </main>
  );
}
