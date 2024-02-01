import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Characters from './components/Characters';
import CharacterDetails from './components/CharacterDetails';
import useCharacters from './hooks/useCharacters';
import { useAuth } from './contexts/AuthContext';


import LandingPage from './pages/LandingPage';
import AuthService from './services/AuthService';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  const { characters, loading, error } = useCharacters();
  const { isAuthenticated } = useAuth();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Check if a token is present (user is authenticated)
      const token = AuthService.getToken();
      if (token) {
        // If a token is present, try to fetch user data
        await AuthService.getUserData();
      }

      // Set initial loading to false after authentication check
      setInitialLoading(false);
    };

    initializeAuth();
  }, [isAuthenticated]);

  if (initialLoading) {
    // Show a loading indicator or placeholder during initial authentication check
    return <p>Loading...</p>;
  }
  

  return (
    <Router>
    <div className="App">
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/characters" /> : <LandingPage />} />
      <Route
        path="/characters"
        element={<ProtectedRoute element={<Characters characters={characters} loading={loading} error={error} />} />}
      />
      <Route
        path="/character/:id"
        element={<ProtectedRoute element={<CharacterDetails />} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  </Router>
  );
};

export default App;
