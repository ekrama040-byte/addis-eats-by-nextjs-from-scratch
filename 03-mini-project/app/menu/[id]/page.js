// app/menu/[id]/page.js
export default async function DishDetailPage({ params }) {
  const { id } = await params;

  return (
    <main style={{ padding: '2rem' }}>
      <h2>🍽️ Dish Specifications</h2>
      <p>Dish Identifer: <strong>{id}</strong></p>
    </main>
  );
}
