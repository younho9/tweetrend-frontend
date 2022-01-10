import axios from 'axios';

import { API_BASE_URL, THISWEEK } from 'src/constants';
import {
  TrendAnalysisResponse,
  TrendAnalysisType,
  TrendCountResponse,
  TrendCountType,
  TrendParamType,
} from 'src/types';
import { dateToUTC, getLocalStorage } from 'src/utils';

const api = axios.create({
  baseURL: `${API_BASE_URL}/trend/api`,
});

export const fetchTrendCount = async (
  trend: TrendCountType,
  topic: string,
  params?: TrendParamType
): Promise<[number, TrendCountResponse]> => {
  try {
    const { from = THISWEEK, to, interval = 'daily' } = params || {};
    const token = getLocalStorage('token') || '';
    const headers = { Authorization: `Bearer ${token}` };

    const response = await api.get<TrendCountResponse>(`/${trend}/${topic}`, {
      params: {
        from: dateToUTC(from),
        to: to && dateToUTC(to),
        interval,
      },
      headers,
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

export const fetchTrendAnalysis = async (
  trend: TrendAnalysisType,
  topic: string,
  params?: TrendParamType
): Promise<[number, TrendAnalysisResponse]> => {
  try {
    const { from = THISWEEK, to, interval = 'daily' } = params || {};
    const token = getLocalStorage('token') || '';
    const headers = { Authorization: `Bearer ${token}` };

    const response = await api.get<TrendAnalysisResponse>(
      `/${trend}/${topic}`,
      {
        params: {
          from: dateToUTC(from),
          to: to && dateToUTC(to),
          interval,
        },
        headers,
      }
    );

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
