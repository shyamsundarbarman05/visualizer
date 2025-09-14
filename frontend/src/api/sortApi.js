import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const sort = async (algorithm, array) => {
  const response = await axios.post(`${API_URL}/sort`, {
    algorithm,
    array,
  });
  return response.data;
};
