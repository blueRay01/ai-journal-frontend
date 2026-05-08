# AI Journal Frontend

A React-based journaling application with AI-powered insights, built with Vite and Firebase.

## Features

- **Daily Journaling**: Write and track daily journal entries
- **AI Analysis**: Get intelligent insights and patterns from your entries
- **Mood Tracking**: Monitor emotional patterns over time
- **Firebase Backend**: Secure authentication and data storage
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **AI**: Anthropic AI SDK for journal analysis
- **Routing**: React Router DOM

## Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Anthropic API key (for AI features)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-journal-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```
   ANTHROPIC_API_KEY=your-api-key-here
   ```
   
   Get your API key from [Anthropic Console](https://console.anthropic.com)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## Firebase Configuration

The app is pre-configured to use the Firebase project `aura-journal-845eb`. No additional Firebase setup is required - the connection works automatically.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── config/             # Firebase configuration
├── pages/              # Page components
├── services/           # API and data services
├── assets/             # Static assets
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

### Vercel/Netlify

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables in your hosting dashboard

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Deploy
firebase deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
