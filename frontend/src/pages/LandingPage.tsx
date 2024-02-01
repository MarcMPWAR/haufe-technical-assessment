// LandingPage.tsx
import React from 'react';
import AuthForm from '../components/AuthForm'; // Import your AuthForm component
import RickAndMortyBanner from '../components/RickAndMortyBanner'; // You'll need to create this component

const LandingPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log("email: ", email)
  };

  return (
    <div>
      <RickAndMortyBanner />
      <AuthForm onLogin={handleLogin} />
      {/* Other content */}
    </div>
  );
};

export default LandingPage;
