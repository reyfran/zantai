import { openai } from '../../utils/openai';

export default async function handler(req, res) {
  // TODO: Load full transcript from storage
  const transcript = ''; // Placeholder
  const summary = await openai.createChatCompletion({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Summarize this meeting into structured minutes:' },
      { role: 'user', content: transcript }
    ]
  });
  res.status(200).json({ minutes: summary.data.choices[0].message.content });
}
