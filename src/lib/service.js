import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export async function getTasks() {
  return axios.get('/api/v1/task');
}

export async function postTask(todo) {
  return axios.post('/api/v1/task', todo);
}

export async function patchTask(id, todo) {
  return axios.patch(`/api/v1/task/${id}`, todo);
}

export async function deleteTask(id) {
  return axios.delete(`/api/v1/task/${id}`);
}

export async function deleteTasks() {
  return axios.delete('/api/v1/task');
}

export async function postMemberCheck(email) {
  return axios.post('/api/v1/member/check', { email });
}

export async function postMember(user) {
  return axios.post('/api/v1/member', user);
}
