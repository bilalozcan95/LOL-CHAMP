import axios from 'axios';
import { API_KEY, BASE_URL } from '@env';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// İstek interceptor'u: Her istekte API anahtarını başlığa ekler
axiosInstance.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  request.headers['X-Riot-Token'] = API_KEY;
  return request;
});

// Yanıt interceptor'u: Yanıtı konsola loglar
axiosInstance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2));
  return response;
});

export default axiosInstance;
