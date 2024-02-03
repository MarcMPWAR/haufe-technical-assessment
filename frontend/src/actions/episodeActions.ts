import axios from 'axios';
import { Dispatch } from 'redux';

export const FETCH_EPISODE_DETAILS_REQUEST = 'FETCH_EPISODE_DETAILS_REQUEST';
export const FETCH_EPISODE_DETAILS_SUCCESS = 'FETCH_EPISODE_DETAILS_SUCCESS';
export const FETCH_EPISODE_DETAILS_FAILURE = 'FETCH_EPISODE_DETAILS_FAILURE';

export const fetchEpisodeDetailsRequest = () => ({
  type: FETCH_EPISODE_DETAILS_REQUEST,
});

export const fetchEpisodeDetailsSuccess = (episodeDetails: any[]) => ({
  type: FETCH_EPISODE_DETAILS_SUCCESS,
  payload: episodeDetails,
});

export const fetchEpisodeDetailsFailure = (error: unknown) => ({
  type: FETCH_EPISODE_DETAILS_FAILURE,
  payload: error instanceof Error ? error.message : 'An unknown error occurred',
});

export const fetchEpisodeDetails = async (dispatch: Dispatch, episodeIds: string[]) => {
  dispatch(fetchEpisodeDetailsRequest());

  try {
    const episodeIdsString = episodeIds.join(',');
    const response = await axios.get(`http://localhost:3001/api/episode/${episodeIdsString}`);
    const episodeDetails = response.data;

    dispatch(fetchEpisodeDetailsSuccess(episodeDetails));
    return episodeDetails;
  } catch (error) {
    dispatch(fetchEpisodeDetailsFailure(error));
    return undefined;
  }
};
