# AI Meeting Assistant

This is a Next.js + Tailwind CSS web app that records meetings, transcribes audio via OpenAI Whisper, provides proactive AI suggestions based on uploaded documents, and generates meeting minutes.

## Features

- Upload reference documents (PDF, DOCX, TXT)
- Live audio recording & streaming transcription
- AI-driven suggestions during meetings
- Customizable prompts in Settings
- Post-meeting Minutes-of-Meeting generation
- Mobile-responsive & PWA-ready

## Getting Started

1. Clone the repo and open in GitHub Codespaces.
2. Create a `.env.local` file at the root with your API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the dev server:
   ```
   npm run dev
   ```
5. Open the provided Codespaces URL in your browser.

## Deployment

- Build for production: `npm run build`
- Start server: `npm start`
