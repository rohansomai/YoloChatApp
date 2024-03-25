import { request } from '../shared/axios.interceptor';
import { CHAT_API_BASE_URL } from '../shared/config';

export function fetchAllChats() {
  return request({
    url: `${CHAT_API_BASE_URL}`,
    method: 'GET',
  });
}

export function accessChat(body) {
  return request({
    url: `${CHAT_API_BASE_URL}`,
    method: 'POST',
    body: body,
  });
}

export function createGroupChat(body) {
  return request({
    url: `${CHAT_API_BASE_URL}/group`,
    method: 'POST',
    body: body,
  });
}
