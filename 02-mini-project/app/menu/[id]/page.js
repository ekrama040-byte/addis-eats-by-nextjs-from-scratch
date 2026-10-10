// app/menu/[id]/page.js
export default async function DynamicItemPage({ params }) {
  const { id } = await params;

  return (
    <main style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '5px' }}>
      <h2>Dynamic Route Target</h2>
      <p>Path parameter extracted successfully: <strong>{id}</strong></p>
    </main>
  );
}
