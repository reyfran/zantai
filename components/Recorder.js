import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

let socket;

export default function Recorder() {
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef(null);

  useEffect(() => {
    socket = io();
    socket.on('transcript', msg => {
      console.log('Transcript:', msg);
    });
    socket.on('suggestion', msg => {
      const event = new CustomEvent('suggestion', { detail: msg });
      window.dispatchEvent(event);
    });
    return () => socket.disconnect();
  }, []);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    mediaRef.current = recorder;
    recorder.ondataavailable = e => {
      const reader = new FileReader();
      reader.onload = () => socket.emit('audio-chunk', reader.result);
      reader.readAsArrayBuffer(e.data);
    };
    recorder.start(1000);
    setRecording(true);
  };

  const stop = () => {
    mediaRef.current.stop();
    setRecording(false);
    socket.emit('end');
  };

  return (
    <div className="flex-1 border p-2 rounded">
      <h2 className="font-semibold">Live Recorder</h2>
      {recording ? (
        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={stop}>
          Stop
        </button>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={start}>
          Record
        </button>
      )}
    </div>
  );
}
