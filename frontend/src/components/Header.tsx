// Header.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Header.css'
import useCharacters from '../hooks/useCharacters';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { refetch } = useCharacters();


  const handleRefetch = async () => {
    try {
      await refetch(); // Make sure to define refetch in your component
    } catch (error) {
      console.error('Error while refetching data:', error);
    }
  };

  const handleBack = () => {
    handleRefetch();
    navigate(-1);
  };

  return (
    <div className="header">
      <div className="header-content">
        <h2 className="header-title">{title}</h2>
        <div className="header-buttons">
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
          {showBackButton && (
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
