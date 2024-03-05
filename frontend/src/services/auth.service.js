import { request, requestWithoutToken } from '../shared/axios.interceptor';
import { API_BASE_URL } from '../shared/config';

export function signUp(body) {
  return requestWithoutToken({
    url: `${API_BASE_URL}/signUp`,
    method: 'POST',
    body: body,
  });
}

export function login(body) {
  return requestWithoutToken({
    url: `${API_BASE_URL}/login`,
    method: 'POST',
    body: body,
  });
}
