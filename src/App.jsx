import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import NotificationCenter from './components/NotificationCenter';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UploadEvent from './pages/UploadEvent';
import PosterStudio from './pages/PosterStudio';
import EventDetails from './pages/EventDetails';
import HostedEvents from './pages/HostedEvents';
import LiveHub from './pages/LiveHub';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/live-hub" />;
  }

  return children;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background-light dark:bg-background-dark font-display selection:bg-primary/30">
          {/* <NotificationCenter /> */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/event-details" element={<EventDetails />} />
            <Route path="/live-hub" element={<LiveHub />} />
            
            {/* Organizer Only Routes */}
            <Route 
              path="/upload-event" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <UploadEvent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/poster-studio" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <PosterStudio />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/hosted-events" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <HostedEvents />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
