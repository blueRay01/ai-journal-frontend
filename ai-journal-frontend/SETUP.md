# AI Journal Frontend - Setup Instructions

This is a **frontend-only** React application that uses Firebase as the backend service. There is no separate API/server to set up - all backend functionality is handled by Firebase.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Anthropic API key (for AI features)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

**No setup required!** The app is already configured to use the Firebase project `aura-journal-845eb`. The Firebase connection works automatically for all developers.

If you want to use your own Firebase project instead, you can update `src/config/firebase.js` with your project's configuration.

### 3. Environment Variables (REQUIRED)

The application uses the Anthropic AI SDK for AI functionality. **Each developer must use their own API key**:

1. Create a `.env` file in the root directory (this file is already gitignored)
2. Get your own Anthropic API key from https://console.anthropic.com
3. Add your API key to the `.env` file:

```
ANTHROPIC_API_KEY=your-personal-api-key-here
```

**IMPORTANT**: 
- Never share API keys between developers
- Never commit `.env` files to version control
- Each developer must obtain their own API key

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Firebase Setup Details

### Required Firebase Services

1. **Authentication**: Enable at least one sign-in method (Email/Password recommended)
2. **Firestore Database**: Create the database in test mode initially
3. **Storage**: Optional, for file uploads

### Firestore Database Structure

The app expects the following collection structure:
```
users/{userId}/entries/{entryId}
```

Each entry document contains:
- `content`: The journal entry text
- `mood`: User's mood rating
- `tags`: Array of tags
- `createdAt`: Timestamp (auto-generated)
- `analysis`: AI-generated insights (optional)

## Production Deployment

### Deploy to Vercel/Netlify

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting platform

3. Update your Firebase configuration to use your production Firebase project

### Firebase Hosting

Alternatively, you can deploy directly to Firebase Hosting:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Hosting in your project
firebase init hosting

# Deploy
firebase deploy
```

## Troubleshooting

### Common Issues

1. **Firebase Authentication Errors**: Make sure Authentication is enabled in your Firebase console
2. **Firestore Permission Denied**: Check your Firestore security rules in the Firebase console
3. **Anthropic API Errors**: Verify your API key is correctly set in `.env.local`
4. **Build Errors**: Make sure all dependencies are installed with `npm install`

### Getting API Keys

- **Firebase**: Create a project at https://console.firebase.google.com
- **Anthropic**: Get API key at https://console.anthropic.com

## Development Notes

- This is a Vite-based React application
- Uses Tailwind CSS for styling
- Firebase handles all backend operations (auth, database, storage)
- Anthropic AI SDK provides AI analysis capabilities
- No server-side code required - everything runs in the browser
