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
      description: "This dish could not be found on Addis Eats.",
    };
  }

  return {
    title: dish.name,
    description: dish.summary,
    openGraph: {
      title: dish.name,
      description: dish.summary,
      type: "website",
    },
  };
}