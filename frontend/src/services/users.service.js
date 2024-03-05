import { request } from '../shared/axios.interceptor';
import { API_BASE_URL } from '../shared/config';

export function searchUsers(keyword) {
  return request({
    url: `${API_BASE_URL}/search`,
    params: { keyword },
    method: 'GET',
  });
}
