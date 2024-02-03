import React, { useEffect, useState } from 'react';
import useCharacterEpisodes from '../hooks/useCharacterEpisodes';
import { EpisodeDetails } from '../interfaces/iEpisodeDetails';
import '../styles/CharacterEpisodes.css';

interface CharacterEpisodesProps {
  episodes: string[];
}

const CharacterEpisodes: React.FC<CharacterEpisodesProps> = ({ episodes }) => {
  const { episodeDetails: detailedEpisodes, loading, error } = useCharacterEpisodes(episodes);

  if (loading) {
    return <p>Loading episodes...</p>;
  }

  if (error) {
    return <p>Error fetching episodes: {error}</p>;
  }

  return (
    // Assuming detailedEpisodes is an array of EpisodeDetails objects

<div className="characterDetails-episodes-container">
  <h3>Episodes:</h3>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Episode</th>
        <th>Air Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {detailedEpisodes.map((episode: EpisodeDetails, index: number) => (
        <tr key={index}>
          <td>{episode.name}</td>
          <td>{episode.episode}</td>
          <td>{episode.air_date}</td>
          <td>
            <div className="center-horizontal">
              <button className="play-button" onClick={() => window.open(episode.url, "_blank", "noopener noreferrer")}>
                <i className="fas fa-play"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default CharacterEpisodes;
