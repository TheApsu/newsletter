import axios from 'axios';

const getAuthTokens = () => {
  return {
    'access-token': localStorage.getItem('access-token'),
    client: localStorage.getItem('client'),
    uid: localStorage.getItem('uid'),
  };
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const tokens = getAuthTokens();
    if (
      tokens['access-token'] !== 'undefined' &&
      tokens['access-token'] &&
      tokens.client &&
      tokens.uid
    ) {
      config.headers['Authorization'] = `bearer ${tokens['access-token']}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
