import axios from 'axios';

import { API_BASE_URL } from 'src/constants';
import { TweetsResponse } from 'src/types';

const api = axios.create({
  baseURL: `${API_BASE_URL}/realtime/api`,
});

export const fetchTweets = async (
  topic: string,
  params?: { bottomId?: string; counts?: number }
): Promise<[number, TweetsResponse]> => {
  try {
    const response = await api.get<TweetsResponse>(`/tweets/${topic}`, {
      params,
    });

    return [response.status, response.data];
  } catch (error) {
    const { response, request } = error;

    if (response) {
      return [response.status, response.data];
    }

    if (request) {
      return [
        request.status,
        { error: 'The request was made but no response was received' },
      ];
    }

    return [0, { error: error.message }];
  }
};

export default api;
