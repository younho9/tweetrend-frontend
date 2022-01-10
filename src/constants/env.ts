export const NODE_ENV = process.env.NODE_ENV || 'development';

export const BASE_URL = process.env.REACT_APP_GATEWAY_BASE_URL as string;

export const API_BASE_URL = `http://${BASE_URL}`;

export const WS_BASE_URL = `ws://${BASE_URL}`;

export const REAL_TIME_SERVER_BASE_URL = process.env
  .REACT_APP_REAL_TIME_SERVER_BASE_URL as string;

export const REACT_APP_REAL_TIME_SERVER_BASE_URL_DEV = 'http://localhost:3001';

export const AUTH_SERVER_BASE_URL = process.env
  .REACT_APP_AUTH_SERVER_BASE_URL as string;
