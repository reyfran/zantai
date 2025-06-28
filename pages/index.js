import Recorder from '../components/Recorder';
import DocumentsUploader from '../components/DocumentsUploader';
import SuggestionsPanel from '../components/SuggestionsPanel';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col p-4">
      <h1 className="text-2xl font-bold text-center mb-4">AI Meeting Assistant</h1>
      <DocumentsUploader />
      <div className="flex-1 flex flex-col md:flex-row gap-4 mt-4">
        <Recorder />
        <SuggestionsPanel />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={async () => {
          const res = await fetch('/api/transcribe');
          const data = await res.json();
          alert(data.minutes);
        }}
      >
        Get Minutes of Meeting
      </button>
    </div>
  );
}
