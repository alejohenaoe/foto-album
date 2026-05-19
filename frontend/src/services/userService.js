import { apiRequest } from './apiClient';

export async function getUsers(page = 1, search = '') {
  const params = new URLSearchParams();
  params.set('page', page);
  if (search) params.set('search', search);
  return apiRequest(`/users/app-users/?${params.toString()}`);
}

export async function createUser(data) {
  return apiRequest('/users/app-users/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deactivateUser(id) {
  return apiRequest(`/users/app-users/${id}/deactivate/`, {
    method: 'POST',
  });
}

export async function regenerateCode(id) {
  return apiRequest(`/users/app-users/${id}/regenerate/`, {
    method: 'POST',
  });
}
