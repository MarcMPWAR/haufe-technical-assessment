import { useReducer, useEffect, useState, useCallback } from 'react';
import { Character } from '../interfaces/iCharacter';
import { fetchCharacterDetails, fetchCharacterDetailsFailure, fetchCharacterDetailsRequest, toggleFavorite } from '../actions/characterDetailsActions';

interface CharacterDetailState {
    character: Character | null;
    loading: boolean;
    error: string | null;
    isFavorite: boolean;
}

const initialState: CharacterDetailState = {
    character: null,
    loading: false,
    error: null,
    isFavorite: false,
};

const characterDetailsReducer = (state: CharacterDetailState, action: any) => {
  switch (action.type) {
    case 'FETCH_CHARACTER_DETAILS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_CHARACTER_DETAILS_SUCCESS':
      return { ...state, character: action.payload, loading: false };
    case 'FETCH_CHARACTER_DETAILS_FAILURE':
      return { ...state, loading: false, error: action.payload };
      case 'TOGGLE_FAVORITE_SUCCESS':
        return {
          ...state,
          character: {
            ...state.character,
            isFavorite: action.payload.isFavorite,
            ...action.payload.characterDetails, // Preserve other details
          },
        };
    case 'TOGGLE_FAVORITE_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const useCharacterDetails = (characterId: number) => {
  const [state, dispatch] = useReducer(characterDetailsReducer, initialState);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchCharacterDetailsRequest());
        const responseData = await (fetchCharacterDetails as any)(dispatch, characterId);

    if (responseData !== undefined) {
      // Log the response data
      setIsFavorite(responseData.isFavorite || false);
    }
      } catch (error) {
        dispatch(fetchCharacterDetailsFailure(error));
      }
    };

    fetchData();
  }, [dispatch, characterId]);

  const toggleFavoriteChar = useCallback(async () => {
    try {
      await (toggleFavorite as any)(dispatch, characterId);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }, [dispatch, characterId]);
  

  useEffect(() => {
    setIsFavorite(state.character?.isFavorite || false);
  }, [state.character?.isFavorite]);
  

  return { characterDetails: state.character, loading: state.loading, error: state.error, toggleFavoriteChar };
};

export default useCharacterDetails;
