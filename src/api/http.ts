import axios, { AxiosInstance } from 'axios';

export type Api = {
  departments: AxiosInstance;
  employees: AxiosInstance;
};

const BASE_URL = 'http://localhost:8083';

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const Http: Api = {
  departments: axios.create({
    baseURL: BASE_URL,
    headers: HEADERS,
  }),
  employees: axios.create({
    baseURL: BASE_URL,
    headers: HEADERS,
  }),
};
