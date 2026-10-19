import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const dish = await getDishBySlug(slug);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "This dish is not available on Addis Eats.",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: dish.name,
    description: ${dish.name} — ${dish.summary} Price: ${dish.price} ETB.,
    alternates: {
      canonical: /dishes/${encodeURIComponent(slug)},
    },
    openGraph: {
      title: dish.name,
      description: ${dish.summary} Price: ${dish.price} ETB.,
      type: "website",
    },
  };
}