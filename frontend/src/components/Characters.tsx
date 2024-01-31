// Assuming your Characters component looks like this
import React from 'react';
import { Link } from 'react-router-dom';
import { Character } from '../interfaces/iCharacter';

interface CharactersProps {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const Characters: React.FC<CharactersProps> = ({ characters, loading, error }) => {
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
    <div>
      <h2>Characters</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Characters;
