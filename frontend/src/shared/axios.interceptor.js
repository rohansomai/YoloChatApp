import axios from 'axios';

const publicApi = axios.create();
publicApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.message && error.message !== 'canceled') {
      console.error(error);
    }
    return Promise.reject(error);
  }
);

export const request = (options) => {
  const config = {
    ...options,
    headers: { 'Content-Type': 'application/json' },
    url: options.url,
    method: options.method,
  };

  if (options.body) {
    config.data = options.body;
  }
  if (options.params) {
    config.params = options.params;
  }
  if (options.cancelToken) {
    config.cancelToken = options.cancelToken;
  }

  if (navigator.onLine) {
    return publicApi.request(config);
  }
  let response;
  response = {
    status: false,
    message: 'Internet Disconnected',
  };
  return response;
};
