// src/actions/characterDetailsActions.ts

import axios from 'axios';
import { Dispatch } from 'redux';
import { CharacterDetails } from '../interfaces/iCharacterDetails';

// Action Types
export const FETCH_CHARACTER_DETAILS_REQUEST = 'FETCH_CHARACTER_DETAILS_REQUEST';
export const FETCH_CHARACTER_DETAILS_SUCCESS = 'FETCH_CHARACTER_DETAILS_SUCCESS';
export const FETCH_CHARACTER_DETAILS_FAILURE = 'FETCH_CHARACTER_DETAILS_FAILURE';

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
  } catch (error) {
    dispatch(fetchCharacterDetailsFailure(error));
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
  };
};