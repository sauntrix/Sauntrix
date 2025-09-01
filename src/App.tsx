import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Discography from './pages/Discography';
import LoreCodex from './pages/LoreCodex';
import Videos from './pages/Videos';
import FanCommunity from './pages/FanCommunity';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ContentProvider } from './contexts/ContentContext';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import DynamicAssetLoader from './components/DynamicAssetLoader';
import './styles/animations.css';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App bg-gray-900 min-h-screen overflow-x-hidden">
      <div className="animated-bg"></div>
      <DynamicAssetLoader />
      <Header />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/discography" element={<Discography />} />
          <Route path="/lore" element={<LoreCodex />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/community" element={<FanCommunity />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} 
          />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <ContentProvider>
            <AppContent />
          </ContentProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;