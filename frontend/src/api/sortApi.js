import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000';

export const sort = async (algorithm, array) => {
  const response = await axios.post(`${API_URL}/sort`, {
    algorithm,
    array,
  });
  return response.data;
};
