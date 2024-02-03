import { useReducer, useEffect, useState, useCallback } from 'react';
import { fetchEpisodeDetails, fetchEpisodeDetailsFailure, fetchEpisodeDetailsRequest } from '../actions/episodeActions';

interface CharacterEpisodesState {
  episodeDetails: any[]; // Update with the actual type of episode details
  loading: boolean;
  error: string | null;
}

const initialState: CharacterEpisodesState = {
  episodeDetails: [],
  loading: false,
  error: null,
};

const episodeReducer = (state: CharacterEpisodesState, action: any) => {
  switch (action.type) {
    case 'FETCH_EPISODE_DETAILS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_EPISODE_DETAILS_SUCCESS':
      return { ...state, episodeDetails: action.payload, loading: false };
    case 'FETCH_EPISODE_DETAILS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const useCharacterEpisodes = (episodeIds: string[]) => {
  const [state, dispatch] = useReducer(episodeReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchEpisodeDetailsRequest());
        await (fetchEpisodeDetails as any)(dispatch, episodeIds);
      } catch (error) {
        dispatch(fetchEpisodeDetailsFailure(error));
      }
    };

    fetchData();
  }, [dispatch, episodeIds]);

  return { episodeDetails: state.episodeDetails, loading: state.loading, error: state.error };
};

export default useCharacterEpisodes;
