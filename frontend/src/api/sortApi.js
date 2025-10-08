import axios from "axios";

const apiBase = (process.env.REACT_APP_API_BASE_URL || "/api").replace(
  /\/$/,
  ""
);

const client = axios.create({
  baseURL: apiBase,
  timeout: 10000,
});

export const sort = async (algorithm, array) => {
  const response = await client.post("/sort", {
    algorithm,
    array,
  });
  return response.data;
};

export const checkHealth = async () => {
  const response = await client.get("/health");
  return response.data;
};
