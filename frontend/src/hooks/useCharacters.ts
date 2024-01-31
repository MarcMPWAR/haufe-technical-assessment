// src/hooks/useCharacters.ts

import { useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, fetchCharactersRequest, fetchCharactersSuccess, fetchCharactersFailure } from '../actions/characterActions';
import { RootState } from '../store/store';
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
  const characters = useSelector((state: RootState) => state.characters.characters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchCharactersRequest());
        await (fetchCharacters as any)(dispatch);
      } catch (error) {
        dispatch(fetchCharactersFailure(error));
      }
    };

    fetchData();
  }, []);

  return { characters: state.characters, loading: state.loading, error: state.error };
};

export default useCharacters;
