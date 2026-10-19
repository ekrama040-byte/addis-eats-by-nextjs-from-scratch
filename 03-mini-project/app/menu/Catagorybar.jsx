// app/menu/CategoryBar.jsx
"use client";
import { useState } from 'react';

export default function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Beef", "Chicken", "Vegetarian"];

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            border: '1px solid #ccc',
            background: activeCategory === cat ? '#0070f3' : '#f5f5f5',
            color: activeCategory === cat ? 'white' : 'black',
            cursor: 'pointer'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
