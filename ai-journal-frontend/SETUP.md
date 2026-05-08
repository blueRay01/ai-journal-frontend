# AI Journal Frontend - Setup Instructions

This is a **frontend-only** React application that uses Firebase as the backend service. There is no separate API/server to set up - all backend functionality is handled by Firebase.

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- A Firebase project (or access to the existing one)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

The app is configured to use the Firebase project `aura-journal-845eb`. If you want to use your own Firebase project:

1. Create a new Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password or Google Sign-In)
3. Enable Firestore Database
4. Get your Firebase configuration from the Firebase console
5. Update the configuration in `src/config/firebase.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. Environment Variables

The application uses the Anthropic AI SDK for AI functionality. You'll need to set up an Anthropic API key:

1. Create a `.env.local` file in the root directory
2. Add your Anthropic API key:

```
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

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
