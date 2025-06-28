import { useState } from 'react';

export default function DocumentsUploader() {
  const [files, setFiles] = useState([]);

  const upload = async () => {
    const form = new FormData();
    files.forEach(f => form.append('docs', f));
    await fetch('/api/upload', { method: 'POST', body: form });
    alert('Documents uploaded');
  };

  return (
    <div className="border p-2 rounded">
      <h2 className="font-semibold">Upload Reference Docs</h2>
      <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files))} />
      <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded" onClick={upload}>
        Upload
      </button>
    </div>
  );
}
