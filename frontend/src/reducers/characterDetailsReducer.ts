// src/reducers/characterDetailsReducer.ts

import {
  FETCH_CHARACTER_DETAILS_REQUEST,
  FETCH_CHARACTER_DETAILS_SUCCESS,
  FETCH_CHARACTER_DETAILS_FAILURE,
} from '../actions/characterDetailsActions';
import { CharacterDetails } from '../interfaces/iCharacterDetails';

interface CharacterDetailsState {
  characterDetails: CharacterDetails | null;
  loading: boolean;
  error: string;
}

const initialState: CharacterDetailsState = {
  characterDetails: null,
  loading: false,
  error: '',
};

const characterDetailsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CHARACTER_DETAILS_REQUEST:
      return { ...state, loading: true, error: '' };
    case FETCH_CHARACTER_DETAILS_SUCCESS:
      return { ...state, loading: false, characterDetails: action.payload, error: '' };
    case FETCH_CHARACTER_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default characterDetailsReducer;
