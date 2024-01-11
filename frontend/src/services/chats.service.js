import { request } from '../shared/axios.interceptor';
import { API_BASE_URL } from '../shared/config';

export function fetchAllChats() {
  return request({
    url: `${API_BASE_URL}/chat`,
    method: 'GET',
  });
}
