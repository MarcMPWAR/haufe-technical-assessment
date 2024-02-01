import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCharacterDetails from '../hooks/useCharacterDetails';
import { useAuth } from '../contexts/AuthContext';

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { characterDetails, loading, error } = useCharacterDetails(Number(id));
  const { logout } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!characterDetails) {
    return <p>Character not found</p>;
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h2>{characterDetails?.name}</h2>
      <p>Status: {characterDetails?.status}</p>
      <p>Species: {characterDetails?.species}</p>
      <p>Type: {characterDetails?.type}</p>
      <p>Gender: {characterDetails?.gender}</p>
      <p>Location: {characterDetails?.location?.name}</p>
      <p>Origin: {characterDetails?.origin?.name}</p>
      <p>Created: {characterDetails?.created}</p>
      <img src={characterDetails?.image} alt={characterDetails?.name} />
      <h3>Episodes:</h3>
      <ul>
        {Array.isArray(characterDetails?.episode) &&
          characterDetails.episode.map((episode: string, index: number) => (
            <li key={index}>
              <a href={episode} target="_blank" rel="noopener noreferrer">
                Episode {index + 1}
              </a>
            </li>
          ))}
      </ul>
    </div>
  ); 
  
};

export default CharacterDetails;
