import axios from 'axios';
import { Dispatch } from 'redux';
import { CharacterDetails } from '../interfaces/iCharacterDetails';

// Action Types
export const FETCH_CHARACTER_DETAILS_REQUEST = 'FETCH_CHARACTER_DETAILS_REQUEST';
export const FETCH_CHARACTER_DETAILS_SUCCESS = 'FETCH_CHARACTER_DETAILS_SUCCESS';
export const FETCH_CHARACTER_DETAILS_FAILURE = 'FETCH_CHARACTER_DETAILS_FAILURE';

export const TOGGLE_FAVORITE_REQUEST = 'TOGGLE_FAVORITE_REQUEST';
export const TOGGLE_FAVORITE_SUCCESS = 'TOGGLE_FAVORITE_SUCCESS';
export const TOGGLE_FAVORITE_FAILURE = 'TOGGLE_FAVORITE_FAILURE';

// Action Creators
export const fetchCharacterDetailsRequest = () => ({
  type: FETCH_CHARACTER_DETAILS_REQUEST,
});

export const fetchCharacterDetailsSuccess = (characterDetails: CharacterDetails) => ({
  type: FETCH_CHARACTER_DETAILS_SUCCESS,
  payload: characterDetails,
});

export const fetchCharacterDetailsFailure = (error: unknown) => ({
  type: FETCH_CHARACTER_DETAILS_FAILURE,
  payload: error instanceof Error ? error.message : 'An unknown error occurred',
});

export const fetchCharacterDetails = async (dispatch: Dispatch, id: number) => {
  dispatch(fetchCharacterDetailsRequest());

  try {
    const response = await axios.get(`http://localhost:3001/api/character/${id}`);
    const transformedData: CharacterDetails = transformCharacterDetails(response.data[0]);
    dispatch(fetchCharacterDetailsSuccess(transformedData));

    return transformedData;
  } catch (error) {
    dispatch(fetchCharacterDetailsFailure(error));
    return undefined;
  }
};


// Toggle favorite status Actions

export const toggleFavoriteRequest = () => ({
  type: TOGGLE_FAVORITE_REQUEST,
});

export const toggleFavoriteSuccess = (characterId: number, isFavorite: boolean, characterDetails: CharacterDetails) => ({
  type: TOGGLE_FAVORITE_SUCCESS,
  payload: { characterId, isFavorite, characterDetails },
});

export const toggleFavoriteFailure = (error: unknown) => ({
  type: TOGGLE_FAVORITE_FAILURE,
  payload: error,
});

export const toggleFavorite = async (dispatch: Dispatch, id: number) => {
  dispatch(toggleFavoriteRequest());
  try {
    const response = await axios.post(`http://localhost:3001/api/character/${id}/favorite`);
    const { isFavorite } = response.data;
    
    const transformedData: CharacterDetails = transformCharacterDetails(response.data.character);
    dispatch(toggleFavoriteSuccess(id, isFavorite, transformedData));
  } catch (error) {    
    console.error('[toggleFavorite action] Error toggling favorite:', error);
    dispatch(toggleFavoriteFailure(error));
  }
};

const transformCharacterDetails = (data: any): CharacterDetails => {
  return {
    id: data.id,
    name: data.name,
    status: data.status,
    species: data.species,
    type: data.type,
    gender: data.gender,
    origin: data.origin,
    location: data.location,
    image: data.image,
    episode: data.episode,
    url: data.url,
    created: data.created,
    isFavorite: data.isFavorite,
  };
};