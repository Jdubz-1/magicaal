import axios from 'axios';
import { config } from '../config';

export function createApiClient(accessToken?: string) {
  return axios.create({
    baseURL: config.apiBaseUrl,
    timeout: 15000,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
}
