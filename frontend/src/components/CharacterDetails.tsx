import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCharacterDetails from '../hooks/useCharacterDetails';
import { useAuth } from '../contexts/AuthContext';
import '../styles/CharacterDetails.css';
import Header from './Header';
import CharacterEpisodes from './CharacterEpisodes';

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { characterDetails, loading, error, toggleFavoriteChar } = useCharacterDetails(Number(id));

  const [episodeIds, setEpisodeIds] = useState<string[]>([]);

  useEffect(() => {
    console.log("characterDetails: ", characterDetails);
  if (characterDetails && characterDetails.episode) {
    const extractedIds = characterDetails.episode.map((url: string) => url.substring(url.lastIndexOf('/') + 1));
    setEpisodeIds(extractedIds || []);
  }
}, [characterDetails]);


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
      <Header title="Character Details" showBackButton={true} />
      <div className="characterDetails-card">
        <div className="characterDetails-content">
          <div className="characterDetails-image-container">
            <img src={characterDetails?.image} alt={characterDetails?.name} className="characterDetails-image" />
          </div>
          <div className="characterDetails-info">
            <h2>{characterDetails?.name}</h2>
            {characterDetails?.status === 'Alive' && (
                <div className="status alive" style={{display: 'inline-block'}}>
                  <span className="dot"></span> Alive - {characterDetails?.species}
                </div>
              )}
              {characterDetails?.status === 'Dead' && (
                <div className="status dead" style={{display: 'inline-block'}}>
                  <span className="dot red"></span> Dead - {characterDetails?.species}
                </div>
              )}
              {characterDetails?.status === 'unknown' && (
                <div className="status unknown" style={{display: 'inline-block'}}>
                  <span className="dot gray"></span> Unknown - {characterDetails?.species}
                </div>
              )}
            {characterDetails?.type && (
              <p><b>Type:</b> {characterDetails?.type}</p>
            )}
            <p><b>Gender:</b> {characterDetails?.gender}</p>
            <p><b>Location:</b> {characterDetails?.location?.name}</p>
            <p><b>Origin:</b> {characterDetails?.origin?.name}</p>
            <p><b>Created:</b> {characterDetails?.created}</p>
            <button onClick={toggleFavoriteChar} className="characterDetails-action-button">
              {characterDetails?.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
        {!characterDetails ? (
            <p>Loading episodes...</p>
          ) : (
            episodeIds.length > 0 && <CharacterEpisodes episodes={episodeIds} />
          )}
      </div>
    </div>


  ); 
  
};

export default CharacterDetails;
