import { request } from '../shared/axios.interceptor';
import { USER_API_BASE_URL } from '../shared/config';

export function searchUsers(keyword) {
  return request({
    url: `${USER_API_BASE_URL}/search`,
    params: { keyword },
    method: 'GET',
  });
}
