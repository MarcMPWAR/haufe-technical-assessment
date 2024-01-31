import { combineReducers } from 'redux';
import characterReducer from './characterReducer';
import characterDetailsReducer from './characterDetailsReducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  characters: characterReducer,
  characterDetails: characterDetailsReducer,
  // Add other reducers here if needed
});

export default rootReducer;