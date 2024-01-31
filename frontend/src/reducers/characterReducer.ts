
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../interfaces/iCharacter';

interface CharactersState {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  loading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    fetchCharactersRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCharactersSuccess(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload;
      state.loading = false;
    },
    fetchCharactersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCharactersRequest, fetchCharactersSuccess, fetchCharactersFailure } = charactersSlice.actions;

export default charactersSlice.reducer;
