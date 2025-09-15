import axios from 'axios';

// The API is now served from the same origin, so we can use a relative path.
const API_URL = '/api';

export const sort = async (algorithm, array) => {
  const response = await axios.post(`${API_URL}/sort`, {
    algorithm,
    array,
  });
  return response.data;
};
