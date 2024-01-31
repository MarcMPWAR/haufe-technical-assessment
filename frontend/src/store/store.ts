// store.ts

import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../reducers/characterReducer';
import characterDetailsReducer from '../reducers/characterDetailsReducer';

const rootReducer = {
  characters: charactersReducer,
  characterDetails: characterDetailsReducer,
};

const store = configureStore({
  reducer: rootReducer,
  
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
