import { Metadata } from "next";
import FeaturedProducts from "@modules/home/components/featured-products";
import Hero from "@modules/home/components/hero";
import { listCollections } from "@lib/data/collections";
import { getRegion } from "@lib/data/regions";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Medusa Next.js Store",
  description: "A real e-commerce store with live products.",
};

export default async function Home(props: {
  params: Promise<{ countryCode: string }>;
}) {
  const params = await props.params;
  const { countryCode } = params;

  // 这些现在会连到真实的后端！
  const region = await getRegion(countryCode);
  const { collections } = await listCollections({
    fields: "id, handle, title",
  });

  if (!collections || !region) {
    return <div className="py-12 text-center">Failed to load store.</div>;
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <FeaturedProducts collections={collections} region={region} />
      </div>
    </>
  );
}
