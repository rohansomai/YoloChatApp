import axios from 'axios';

const publicApi = axios.create();
const authorizedApi = axios.create();

publicApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    console.error(error);
    return Promise.reject(error.response.data);
  }
);

authorizedApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    console.error(error);
    if (error.response.status === 401) {
      window.location.href = '/session-expired';
      localStorage.clear();
    }
    return Promise.reject(error.response.data);
  }
);

authorizedApi.interceptors.request.use(
  (config) => {
    const authUser = localStorage.getItem('authUser') ? JSON.parse(localStorage.getItem('authUser')) : undefined;
    if (authUser) {
      const { token } = authUser;
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
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
    return authorizedApi.request(config);
  }
  let response;
  response = {
    status: false,
    message: 'Internet Disconnected',
  };
  return response;
};

export const requestWithoutToken = (options) => {
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
