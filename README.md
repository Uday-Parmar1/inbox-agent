# InboxAgent

InboxAgent is your AI-powered assistant for managing job applications and email communications during your job search. It automatically scans your inbox, tracks job applications, and provides clear insights into your job-hunting progress.

## Features

- 📧 **Email Integration**: Seamlessly connects with Gmail/Outlook to scan job-related emails
- 📊 **Application Tracking**: Automatically categorizes and tracks job applications
- 📅 **Status Management**: Organizes applications by status (Applied, Waiting, Interview, Rejected)
- 📈 **Weekly Reports**: Get comprehensive weekly updates on your job search progress
- 🎯 **Action Items**: Receive timely reminders for follow-ups and upcoming interviews

## Tech Stack

- Frontend: React + TailwindCSS
- Backend: Node.js + Express
- Authentication: Google OAuth / Microsoft Graph
- Database: Firebase
- Email Processing: OpenAI GPT-3.5
- Deployment: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/inbox-agent.git
   cd inbox-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with:
   ```
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
inbox-agent/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API and external service integrations
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Helper functions
│   └── App.js         # Main application component
├── public/            # Static assets
└── api/              # Backend API code
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for GPT-3.5 API
- Firebase for backend services
- React and TailwindCSS communities
