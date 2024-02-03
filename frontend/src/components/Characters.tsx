import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../interfaces/iCharacter';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Characters.css'
import Header from './Header';
import { fetchCharacters } from '../actions/characterActions';
import useCharacters from '../hooks/useCharacters';

interface CharactersProps {
  loading: boolean;
  error: string | null;
}

const Characters: React.FC<CharactersProps> = ({ loading, error }) => {
  const { characters } = useCharacters();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Ensure characters is an array before mapping over it
  if (!Array.isArray(characters)) {
    return <div>Characters data is not in the expected format.</div>;
  }

  return (
    <div className="characters-container">
      <Header title="Characters" showBackButton={false} />
      <div className="characters-grid">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <div className="character-image-container">
              <img src={character.image} alt={character.name} className="character-image" />
            </div>
            <div className="character-details">
              <div className="character-info">
                <h3 className="character-name">{character.name}</h3>
                <i className={`favorite-icon ${character.isFavorite ? 'fas fa-heart' : 'far fa-heart'}`}></i>
             </div>
              {character.status === 'Alive' && (
                <div className="status alive">
                  <span className="dot"></span> Alive - {character.species}
                </div>
              )}
              {character.status === 'Dead' && (
                <div className="status dead">
                  <span className="dot red"></span> Dead - {character.species}
                </div>
              )}
              {character.status === 'unknown' && (
                <div className="status unknown">
                  <span className="dot gray"></span> Unknown - {character.species}
                </div>
              )}
              <div className="location-label">Last known location</div>
              <div className="location">{character.location?.name}</div>
              <div className="location-label">Last seen in</div>
              <div className="location">{character.origin?.name}</div>
              <button className="details-button">
                <Link to={`/character/${character.id}`} className="details-link">
                  Details
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
