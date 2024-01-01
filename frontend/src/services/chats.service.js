import { request } from '../shared/axios.interceptor';

const CHAT_ENDPOINT = '/api/chat';
export function fetchAllChats() {
  return request({
    url: CHAT_ENDPOINT,
    method: 'GET',
  });
}
