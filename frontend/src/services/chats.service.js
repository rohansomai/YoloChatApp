import { request } from '../shared/axios.interceptor';
import { CHAT_API_BASE_URL, MESSAGE_API_BASE_URL } from '../shared/config';

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

export function renameGroupName(body) {
  return request({
    url: `${CHAT_API_BASE_URL}/group/rename`,
    method: 'PUT',
    body: body,
  });
}

export function addUserToGroup(body) {
  return request({
    url: `${CHAT_API_BASE_URL}/group/add-user`,
    method: 'PUT',
    body: body,
  });
}

export function removeUserFromGroup(body) {
  return request({
    url: `${CHAT_API_BASE_URL}/group/remove-user`,
    method: 'PUT',
    body: body,
  });
}

export function fetchMessages(chatId) {
  return request({
    url: `${MESSAGE_API_BASE_URL}/${chatId}`,
    method: 'GET',
  });
}

export function sendMessage(body) {
  return request({
    url: `${MESSAGE_API_BASE_URL}`,
    method: 'POST',
    body: body,
  });
}
