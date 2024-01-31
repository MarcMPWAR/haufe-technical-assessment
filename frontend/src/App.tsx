import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Characters from './components/Characters';
import CharacterDetails from './components/CharacterDetails';
import useCharacters from './hooks/useCharacters';

const App: React.FC = () => {
  const { characters, loading, error } = useCharacters();

  return (
    <Router>
      <div className="App">
        <h1>Rick & Morty App</h1>
        <Routes>
          <Route path="/" element={<Characters characters={characters} loading={loading} error={error} />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
