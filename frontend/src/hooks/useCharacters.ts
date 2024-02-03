// src/hooks/useCharacters.ts

import { useReducer, useEffect } from 'react';
import { fetchCharacters, fetchCharactersRequest, fetchCharactersSuccess, fetchCharactersFailure } from '../actions/characterActions';
import { Character } from '../interfaces/iCharacter';

interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  loading: true,
  error: null,
};

const reducer = (state: CharactersState, action: any) => {
  switch (action.type) {
    case 'FETCH_CHARACTERS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_CHARACTERS_SUCCESS':
      return { ...state, characters: action.payload, loading: false };
    case 'FETCH_CHARACTERS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const useCharacters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCharactersData = async () => {
    try {
      dispatch(fetchCharactersRequest());
      await (fetchCharacters as any)(dispatch);
    } catch (error) {
      dispatch(fetchCharactersFailure(error));
    }
  };

  useEffect(() => {
    fetchCharactersData();
  }, []);

  return { characters: state.characters, loading: state.loading, error: state.error, refetch: fetchCharactersData };
};


export default useCharacters;
