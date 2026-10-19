export type Food = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  prepTime: number;
  image: string;
  description: string;
};

export const foods: Food[] = [
  {
    id: 1,
    name: "Doro Wat",
    category: "Traditional",
    price: 450,
    rating: 4.9,
    prepTime: 40,
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
    description: "A rich, spicy Ethiopian chicken stew.",
  },
  {
    id: 2,
    name: "Shiro Wat",
    category: "Vegetarian",
    price: 180,
    rating: 4.7,
    prepTime: 25,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    description: "A comforting chickpea stew served with injera.",
  },
  {
    id: 3,
    name: "Kitfo",
    category: "Traditional",
    price: 380,
    rating: 4.8,
    prepTime: 20,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    description: "A classic Ethiopian minced-beef dish.",
  },
  {
    id: 4,
    name: "Beyaynet",
    category: "Vegetarian",
    price: 250,
    rating: 4.8,
    prepTime: 30,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    description: "A colorful assortment of Ethiopian vegetable stews.",
  },
  {
    id: 5,
    name: "Tibs",
    category: "Traditional",
    price: 400,
    rating: 4.6,
    prepTime: 30,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
    description: "Sautéed meat with onions and Ethiopian spices.",
  },
  {
    id: 6,
    name: "Misir Wat",
    category: "Vegetarian",
    price: 200,
    rating: 4.7,
    prepTime: 25,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
    description: "Red lentils simmered with berbere spices.",
  },
  {
    id: 7,
    name: "Injera Combo",
    category: "Traditional",
    price: 320,
    rating: 4.8,
    prepTime: 20,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    description: "Injera served with a selection of Ethiopian dishes.",
  },
  {
    id: 8,
    name: "Special Tibs",
    category: "Traditional",
    price: 500,
    rating: 4.9,
    prepTime: 35,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    description: "A generous serving of sizzling, seasoned meat.",
  },
];

export function getFoods(search = "", page = 1, pageSize = 3) {
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = foods.filter((food) => {
    return (
      food.name.toLowerCase().includes(normalizedSearch) ||
      food.category.toLowerCase().includes(normalizedSearch) ||
      food.description.toLowerCase().includes(normalizedSearch)
    );
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    data: filtered.slice(start, start + pageSize),
    pagination: {
      page: safePage,
      pageSize,
      totalItems,
      totalPages,
    },
  };
}