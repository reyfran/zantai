import { openai } from '../../utils/openai';
let SETTINGS = {};

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(SETTINGS);
  }
  if (req.method === 'POST') {
    SETTINGS = req.body;
    return res.status(200).json({ ok: true });
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(\`Method \${req.method} Not Allowed\`);
}
