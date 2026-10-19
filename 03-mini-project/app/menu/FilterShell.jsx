// app/menu/FilterShell.jsx
"use client";
import { useState } from "react";

export default function FilterShell({ children }) {
  const [search, setSearch] = useState("");

  return (
    <div style={{ border: '1px solid #eaeaea', padding: '1rem', borderRadius: '8px' }}>
      <input 
        type="text" 
        placeholder="Filter dishes..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
      />
      {/* Server-rendered components pass through here cleanly */}
      {children}
    </div>
  );
}
