import { useState, useEffect } from 'react';

export default function SuggestionsPanel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handler = e => setItems(prev => [e.detail, ...prev]);
    window.addEventListener('suggestion', handler);
    return () => window.removeEventListener('suggestion', handler);
  }, []);

  return (
    <div className="flex-1 border p-2 rounded overflow-auto">
      <h2 className="font-semibold">AI Suggestions</h2>
      <ul>
        {items.map((it, i) => (
          <li key={i} className="my-1">{it}</li>
        ))}
      </ul>
    </div>
  );
}
