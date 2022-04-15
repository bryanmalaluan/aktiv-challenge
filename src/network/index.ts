import axios from 'axios';

export const get = async (endpoint: string) => {
  return axios.get(endpoint);
};
