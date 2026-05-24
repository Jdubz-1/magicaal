import axios from 'axios';
import { config } from '../config';

export const engineClient = axios.create({
  baseURL: config.engineBaseUrl,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});
