import { useState, useEffect } from 'react';

export default function Settings() {
  const [prompts, setPrompts] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setPrompts(data));
  }, []);

  const save = async () => {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prompts),
    });
    alert('Prompts saved');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">AI Prompt Settings</h1>
      <div className="mb-2">
        <label>Question Prompt:</label>
        <textarea
          className="w-full border p-2"
          value={prompts.question}
          onChange={e => setPrompts({ ...prompts, question: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label>Answer Prompt:</label>
        <textarea
          className="w-full border p-2"
          value={prompts.answer}
          onChange={e => setPrompts({ ...prompts, answer: e.target.value })}
        />
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={save}>
        Save Prompts
      </button>
    </div>
  );
}
