// src/hooks/useCharacters.ts

import { useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCharacterDetails, fetchCharacterDetailsRequest, fetchCharacterDetailsFailure } from '../actions/characterDetailsActions';
import { RootState } from '../store/store';
import { Character } from '../interfaces/iCharacter';

interface CharacterDetailState {
    characters: Character[];
    loading: boolean;
    error: string | null;
}

const initialState: CharacterDetailState = {
    characters: [],
    loading: false,
    error: null,
};

const reducer = (state: CharacterDetailState, action: any) => {
  switch (action.type) {
    case 'FETCH_CHARACTER_DETAILS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_CHARACTER_DETAILS_SUCCESS':
      return { ...state, characters: action.payload, loading: false };
    case 'FETCH_CHARACTER_DETAILS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const useCharacterDetails = (characterId: number) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    const fetchData = async () => {
      try {
        dispatch(fetchCharacterDetailsRequest());
        await (fetchCharacterDetails as any)(dispatch, characterId);
      } catch (error) {
        dispatch(fetchCharacterDetailsFailure(error));
      }
    };

    fetchData();
  }, [dispatch, characterId]);


  return { characterDetails: state.characters, loading: state.loading, error: state.error };
};

export default useCharacterDetails;
