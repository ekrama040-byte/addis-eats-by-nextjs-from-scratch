// app/menu/page.js
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import FilterShell from "./FilterShell";

async function fetchMenuDishes() {
  return [
    { id: "kitfo", name: "Special Kitfo", price: "$18" },
    { id: "doro-wat", name: "Doro Wat", price: "$20" },
    { id: "tibis", name: "Beef Tibis", price: "$16" }
  ];
}

export default async function MenuPage() {
  const dishes = await fetchMenuDishes();

  return (
    <main>
      <h1>📋 Day 38: Boundary Isolation Architecture</h1>
      <CategoryBar />
      
      {/* Pipe the server component tree through the client shell wrapper */}
      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}
