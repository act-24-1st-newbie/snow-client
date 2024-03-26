import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export async function getTasks() {
  return axios.get('/api/v1/task');
}
