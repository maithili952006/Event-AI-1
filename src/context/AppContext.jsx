import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';


const AppContext = createContext();

// Firebase is disabled; always use local storage fallback
const isFirebaseConfigured = () => false;

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('nexushub-user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Error parsing saved user:", e);
        localStorage.removeItem('nexushub-user');
      }
    }
    return {
      id: 'admin-organizer',
      name: 'Event AI Admin',
      email: 'admin@eventai.com',
      role: 'organizer',
      createdAt: new Date().toISOString()
    };
  });

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('nexushub-events');
    try {
      return savedEvents ? JSON.parse(savedEvents) : [];
    } catch (e) {
      console.error("Error parsing saved events:", e);
      return [];
    }
  });

  const [registrations, setRegistrations] = useState(() => {
    const savedRegs = localStorage.getItem('nexushub-registrations');
    try {
      return savedRegs ? JSON.parse(savedRegs) : [];
    } catch (e) {
      return [];
    }
  });

  const [notifications, setNotifications] = useState(() => {
    const savedNotifs = localStorage.getItem('nexushub-notifications');
    try {
      return savedNotifs ? JSON.parse(savedNotifs) : [];
    } catch (e) {
      return [];
    }
  });

  const [categories, setCategories] = useState([
    'Technology', 'Sports', 'Music', 'Food', 'Arts', 'Business',
    'Education', 'Health', 'Travel', 'Networking'
  ]);

  const generateQRCode = useCallback((text) => {
    try {
      // Safer btoa handling for non-ASCII characters
      const encoded = btoa(unescape(encodeURIComponent(text || 'Event')));
      return `QR-${encoded.substring(0, 8)}`;
    } catch (e) {
      console.warn("btoa failed, using fallback for QR code", e);
      return `QR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }
  }, []);

  const addNotification = useCallback(async (message, type = 'info') => {
    const newNotification = {
      id: `notif-${Date.now()}`,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Always update local state for immediate UI feedback
    setNotifications(prev => [newNotification, ...prev]);

    if (isFirebaseConfigured()) {
      try {
        await addDoc(collection(db, "notifications"), newNotification);
      } catch (error) {
        console.error("Error adding notification to Firebase: ", error);
      }
    }
  }, []);

  const createEvent = useCallback(async (eventData, options = { silent: false }) => {
    try {
      const newEvent = {
        id: `event-${Date.now()}`, // Still generate ID for fallback
        organizerId: currentUser?.id,
        organizer: currentUser?.name,
        registrations: [],
        attendees: [],
        qrCode: generateQRCode(eventData.title),
        status: 'live',
        createdAt: new Date().toISOString(),
        checkedIn: [],
        ...eventData,
      };

      // Local only – add event to state
      setEvents(prev => [newEvent, ...prev]);
      if (!options.silent) {
        addNotification(`Event "${eventData.title}" created locally!`, 'success');
      }
      return newEvent;
    } catch (error) {
      console.error("Critical error in createEvent:", error);
      throw error;
    }
  }, [currentUser, generateQRCode, addNotification]);

  const seedSampleEvents = useCallback(async () => {
    const samples = [
      {
        title: 'Global AI & Robotics Summit 2026',
        category: 'Technology',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
        time: '10:00 AM',
        location: 'Silicon Valley Innovation Center',
        description: 'A gathering of the world\'s leading AI researchers, robotics engineers, and tech visionaries to discuss the future of autonomous systems.',
        capacity: 500,
        registrationFee: 299,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070',
        createdAt: new Date().toISOString()
      },
      {
        title: 'Neon Pulse: Cyberpunk Music Festival',
        category: 'Music',
        date: '2027-01-20',
        time: '08:00 PM',
        location: 'Metaverse Plaza, Neo-Tokyo',
        description: 'Experience the ultimate fusion of electronic beats and holographic visuals in this one-of-a-kind immersive music festival.',
        capacity: 2000,
        registrationFee: 50,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&q=80&w=1974',
        createdAt: new Date().toISOString()
      },
      {
        title: 'Future Designs: UI/UX Expo 2026',
        category: 'Arts',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
        time: '09:00 AM',
        location: 'Digital Arts Museum, London',
        description: 'Explore the next frontier of human-machine interaction. From AR interfaces to neural-design systems.',
        capacity: 300,
        registrationFee: 120,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070',
        createdAt: new Date().toISOString()
      },
      {
        title: 'Quantum Code Hackathon',
        category: 'Technology',
        date: '2026-10-05',
        time: '09:00 AM',
        location: 'CERN Innovation Hub, Switzerland',
        description: 'Build the algorithms of tomorrow using quantum computing principles. 48 hours of intense coding and innovation.',
        capacity: 150,
        registrationFee: 0,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2070',
        createdAt: new Date().toISOString()
      },
      {
        title: 'Celestial Gastronomy: Space Food Tour',
        category: 'Food',
        date: '2027-03-12',
        time: '07:00 PM',
        location: 'Orbit Lounge, New York',
        description: 'Taste the future of food with 3D-printed celestial cuisines and molecular gastronomy designed for zero-gravity environments.',
        capacity: 80,
        registrationFee: 450,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1974',
        createdAt: new Date().toISOString()
      },
      {
        title: 'Meta-Fashion Week 2026',
        category: 'Fashion',
        date: '2026-09-15',
        time: '06:00 PM',
        location: 'Virtual Runway, Paris V-Hub',
        description: 'The world\'s first fully holographic fashion show featuring digital-only couture from top global designers.',
        capacity: 5000,
        registrationFee: 25,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1974',
        createdAt: new Date().toISOString()
      },
      {
        title: 'Neuro-Link Workshop',
        category: 'Workshop',
        date: '2026-08-20',
        time: '11:00 AM',
        location: 'Mind-Tech Labs, San Francisco',
        description: 'Hands-on workshop exploring the latest in brain-computer interfaces and neural feedback loops.',
        capacity: 50,
        registrationFee: 599,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=2070',
        createdAt: new Date().toISOString()
      },
      {
        title: 'Aqua-Dome Architecture Summit',
        category: 'Architecture',
        date: '2027-05-10',
        time: '10:00 AM',
        location: 'Undersea Research Base, Dubai',
        description: 'Architects and engineers meet to discuss the challenges and future of permanent underwater human habitats.',
        capacity: 120,
        registrationFee: 850,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072',
        createdAt: new Date().toISOString()
      },
      {
        title: 'Pro-Gamer League: Grand Finals',
        category: 'Gaming',
        date: '2026-11-30',
        time: '04:00 PM',
        location: 'Nexa Arena, Seoul',
        description: 'The world\'s top esports athletes compete for a $5M prize pool in the most anticipated gaming event of the year.',
        capacity: 15000,
        registrationFee: 45,
        status: 'live',
        poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=2070',
        createdAt: new Date().toISOString()
      }
    ];

    const localSamples = samples.map((s, index) => ({ 
      id: `sample-${index}-${Date.now()}`, 
      qrCode: generateQRCode(s.title),
      ...s 
    }));
    setEvents(localSamples);
  }, [generateQRCode]);

  useEffect(() => {
    if (events.length === 0) {
      seedSampleEvents();
    }
  }, [seedSampleEvents, events.length]);

  useEffect(() => {
    if (isFirebaseConfigured()) {
      // 1. Real-time sync for Events
      const eventsQuery = query(collection(db, "events"), orderBy("createdAt", "desc"));
      const unsubEvents = onSnapshot(eventsQuery, (snapshot) => {
        const eventsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (eventsData.length === 0) {
          seedSampleEvents();
        } else {
          setEvents(eventsData);
        }
      }, (err) => console.error("Firestore Events Error:", err));

      // 2. Real-time sync for Registrations
      const unsubRegs = onSnapshot(collection(db, "registrations"), (snapshot) => {
        const regsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRegistrations(regsData);
      }, (err) => console.error("Firestore Regs Error:", err));

      // 3. Real-time sync for Notifications
      const unsubNotifs = onSnapshot(collection(db, "notifications"), (snapshot) => {
        const notifsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNotifications(notifsData);
      }, (err) => console.error("Firestore Notifs Error:", err));

      return () => {
        unsubEvents();
        unsubRegs();
        unsubNotifs();
      };
    }
  }, [seedSampleEvents]);

  // Save to localStorage (both for Auth and for Fallback)
  useEffect(() => {
    if (currentUser) localStorage.setItem('nexushub-user', JSON.stringify(currentUser));
    if (!isFirebaseConfigured()) {
      localStorage.setItem('nexushub-events', JSON.stringify(events));
      localStorage.setItem('nexushub-registrations', JSON.stringify(registrations));
      localStorage.setItem('nexushub-notifications', JSON.stringify(notifications));
    }
  }, [currentUser, events, registrations, notifications]);

  // Sync state across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'nexushub-events' && e.newValue) {
        setEvents(JSON.parse(e.newValue));
      }
      if (e.key === 'nexushub-registrations' && e.newValue) {
        setRegistrations(JSON.parse(e.newValue));
      }
      if (e.key === 'nexushub-notifications' && e.newValue) {
        setNotifications(JSON.parse(e.newValue));
      }
      if (e.key === 'nexushub-user' && e.newValue) {
        setCurrentUser(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (user) => {
    const newUser = {
      id: `user-${Date.now()}`,
      ...user,
      role: user.role || 'attendee',
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateEvent = async (eventId, updates) => {
    try {
      // Local only – update event in state
      setEvents(prev => prev.map(ev => ev.id === eventId ? { ...ev, ...updates } : ev));
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const deleteEvent = useCallback(async (eventId) => {
    try {
      // Local only – remove from state
      setEvents(prev => prev.filter(e => e.id !== eventId));
      addNotification("Event deleted", "info");
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  }, [addNotification]);

  const getEventById = useCallback((eventId) => events.find(e => e.id === eventId), [events]);

  const getUserEvents = useCallback((userId) => events.filter(e => e.organizerId === userId), [events]);

  const registerForEvent = async (eventId, registrationData) => {
    const event = getEventById(eventId);
    if (!event) return false;

    const existingReg = registrations.find(
      r => r.eventId === eventId && r.userId === currentUser?.id
    );
    if (existingReg) {
      addNotification('Already registered!', 'warning');
      return false;
    }

    const userName = registrationData.userName || currentUser?.name || 'Guest';
    const email = registrationData.email || currentUser?.email || 'guest@local';

    const newRegistration = {
      eventId,
      userId: currentUser?.id || `guest-${Date.now()}`,
      userName,
      email,
      college: registrationData.college || '',
      idea: registrationData.idea || '',
      registrationFee: registrationData.fee || 0,
      paymentStatus: 'paid',
      registeredAt: new Date().toISOString(),
      checkedIn: false,
      checkedInAt: null,
    };

    try {
      // Local only – add registration to state and link to event
      const newReg = { ...newRegistration, id: `reg-${Date.now()}` };
      setRegistrations(prev => [newReg, ...prev]);
      // Update event attendees locally
      setEvents(prev => prev.map(ev => ev.id === eventId ? { ...ev, registrations: [...(ev.registrations || []), newReg.id], attendees: [...(ev.attendees || []), newReg.userId] } : ev));
      if (newRegistration.registrationFee === 0) {
        addNotification('Registration successful! No fee required.', 'success');
      } else {
        addNotification('Registration successful!', 'info');
      }
      return { id: newReg.id, ...newRegistration };
    } catch (error) {
      console.error("Error registering: ", error);
      addNotification("Registration failed", "error");
      return false;
    }
  };

  const unregisterFromEvent = (eventId) => {
    const reg = registrations.find(
      r => r.eventId === eventId && r.userId === currentUser?.id
    );
    if (reg) {
      setRegistrations(registrations.filter(r => r.id !== reg.id));
      const event = getEventById(eventId);
      updateEvent(eventId, {
        registrations: event.registrations.filter(id => id !== reg.id),
        attendees: event.attendees.filter(id => id !== currentUser?.id),
      });
      addNotification('Unregistered from event', 'info');
    }
  };

  const isUserRegistered = (eventId) => {
    return registrations.some(
      r => r.eventId === eventId && r.userId === currentUser?.id
    );
  };

  const getEventRegistrations = (eventId) => {
    return registrations.filter(r => r.eventId === eventId);
  };

  const getUserRegistrations = (userId) => {
    return registrations.filter(r => r.userId === userId);
  };

  const checkInAttendee = (eventId, qrData) => {
    const registration = registrations.find(
      r => r.eventId === eventId && r.id === qrData
    );

    if (!registration) {
      addNotification('Invalid QR code!', 'error');
      return false;
    }

    const updatedRegs = registrations.map(r =>
      r.id === registration.id
        ? { ...r, checkedIn: true, checkedInAt: new Date().toISOString() }
        : r
    );
    setRegistrations(updatedRegs);

    const event = getEventById(eventId);
    updateEvent(eventId, {
      checkedIn: [...(event.checkedIn || []), registration.userId],
    });

    addNotification(`${registration.userName} checked in!`, 'success');
    return true;
  };

  const getUnreadNotifications = () => notifications.filter(n => !n.read);

  const addCategory = (categoryName) => {
    if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
    }
  };

  const getPublicEvents = () => events.filter(e => e.status === 'live');

  const publishEvent = (eventId) => {
    updateEvent(eventId, { status: 'live' });
    const event = getEventById(eventId);
    addNotification(`Event "${event?.title}" is now LIVE!`, 'success');
  };

  const updateEventPoster = (eventId, posterUrl) => {
    updateEvent(eventId, { poster: posterUrl });
    addNotification('Poster updated successfully!', 'success');
  };

  const getEventStats = (eventId) => {
    const event = getEventById(eventId);
    const regs = getEventRegistrations(eventId);
    const checkedIn = regs.filter(r => r.checkedIn).length;
    const totalRevenue = regs.reduce((sum, r) => sum + (r.registrationFee || 0), 0);

    return {
      totalRegistrations: regs.length,
      checkedIn,
      noShow: regs.length - checkedIn,
      totalRevenue,
      capacity: event?.capacity || 0,
      availableSeats: (event?.capacity || 0) - regs.length,
    };
  };

  const value = useMemo(() => ({
    currentUser, login, logout,
    events, createEvent, updateEvent, deleteEvent, getEventById, getUserEvents,
    getPublicEvents, publishEvent, updateEventPoster,
    categories, addCategory,
    registerForEvent, unregisterFromEvent, isUserRegistered, getEventRegistrations, getUserRegistrations,
    checkInAttendee, generateQRCode,
    notifications, addNotification, getUnreadNotifications,
    getEventStats,
  }), [
    currentUser, events, createEvent, deleteEvent, getEventById, getUserEvents,
    categories, notifications, registrations, generateQRCode, addNotification, updateEvent, registerForEvent, unregisterFromEvent, isUserRegistered, getEventRegistrations, getUserRegistrations, checkInAttendee, getPublicEvents, publishEvent, updateEventPoster, getEventStats
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppProvider;
