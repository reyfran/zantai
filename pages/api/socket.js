import { Server } from 'socket.io';
import { openai } from '../../utils/openai';

export const config = {
  api: {
    bodyParser: false
  }
};

let io;

export default function handler(req, res) {
  if (!io) {
    io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', socket => {
      let buffer = [];

      socket.on('audio-chunk', async data => {
        buffer.push(data);
        const transcript = await openai.createTranscription(Buffer.from(data), 'whisper-1');
        socket.emit('transcript', transcript.data.text);

        const suggestion = await openai.createChatCompletion({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'Use uploaded docs and settings to suggest questions or answers.' },
            { role: 'user', content: transcript.data.text }
          ]
        });
        socket.emit('suggestion', suggestion.data.choices[0].message.content);
      });

      socket.on('end', () => {
        // Could save buffer or finalize transcript
      });
    });
  }
  res.end();
}
