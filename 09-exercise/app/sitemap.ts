import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.SITE_URL ?? "http://localhost:3000";

  const dishes = await getAllPublicDishes();

  const staticRoutes = [
    "",
    "/menu",
    "/about",
    "/contact",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: ${siteUrl}${route},
      lastModified: new Date(),
    })),
    ...dishes.map((dish) => ({
      url: ${siteUrl}/dishes/${dish.slug},
      lastModified: dish.updatedAt
        ? new Date(dish.updatedAt)
        : new Date(),
    })),
  ];
}