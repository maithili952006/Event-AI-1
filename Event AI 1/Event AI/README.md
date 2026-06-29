# 1. Navigate to the correct project directory
cd "Event AI 1\Event AI"

# 2. Start the development server
npm run dev


# Event AI - AI-Powered Event Management Platform

A modern, full-stack event management platform that leverages artificial intelligence to streamline event creation, poster generation, and attendee management. Built with React, Vite, and Tailwind CSS.

## Features

### 🎨 AI Poster Generation
- Generate stunning event posters using advanced AI
- Customizable styles (Cyberpunk, Minimalist, Vibrant, Synthwave)
- Real-time preview and editing capabilities
- Export high-quality images for marketing

### 📅 Smart Event Management
- Create and manage multiple events
- AI-powered deadline management and scheduling
- Real-time progress tracking
- Comprehensive event analytics

### 👥 Attendee Management
- Role-based authentication (Organizer/Attendee)
- Event registration and ticketing
- Attendee analytics and insights
- Automated communication workflows

### 🎯 Modern UI/UX
- Dark theme optimized interface
- Responsive design for all devices
- Smooth animations with Framer Motion
- Accessible and intuitive navigation

## Tech Stack

- **Frontend**: React 19, Vite 6
- **Styling**: Tailwind CSS 4, Custom CSS variables
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router DOM 7
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd event-ai
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   └── HostedEventCard.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── UploadEvent.jsx
│   ├── PosterStudio.jsx
│   ├── EventDetails.jsx
│   └── HostedEvents.jsx
├── App.jsx
├── main.jsx
├── tailwind.css
└── output.css
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:css` - Build Tailwind CSS
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Deployment

This app can be deployed to any static hosting service like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Example: Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. Your app will be live!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.
