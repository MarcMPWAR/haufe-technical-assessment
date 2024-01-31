import axios from 'axios';
import { Dispatch } from 'redux';
import { Character } from '../interfaces/iCharacter';

// Action Types
export const FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST';
export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';

// Action Creators
export const fetchCharactersRequest = () => ({
  type: FETCH_CHARACTERS_REQUEST,
});

export const fetchCharactersSuccess = (characters: Character[]) => ({
  type: FETCH_CHARACTERS_SUCCESS,
  payload: characters,
});

export const fetchCharactersFailure = (error: unknown) => ({
  type: FETCH_CHARACTERS_FAILURE,
  payload: error instanceof Error ? error.message : 'An unknown error occurred',
});

export const fetchCharacters = async (dispatch: Dispatch) => {
  dispatch(fetchCharactersRequest());

  try {
    const response = await axios.get('http://localhost:3001/api/characters');
    dispatch(fetchCharactersSuccess(response.data.characters));
  } catch (error) {
    dispatch(fetchCharactersFailure(error));
  }
};
