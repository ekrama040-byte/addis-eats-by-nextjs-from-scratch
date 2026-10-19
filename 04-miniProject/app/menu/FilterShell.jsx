// app/menu/FilterShell.jsx
"use client";
import { useState } from "react";

export default function FilterShell({ children }) {
  const [search, setSearch] = useState("");

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '6px', background: '#fafafa' }}>
      <input 
        type="text" 
        placeholder="Search traditional dishes..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem', boxSizing: 'border-box' }}
      />
      {/* Streaming the static Server-rendered list directly through here */}
      <div style={{ opacity: search ? 0.8 : 1 }}>
        {children}
      </div>
    </div>
  );
}
