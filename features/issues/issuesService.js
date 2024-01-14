import axios from "axios";

const BASE_URL =
  "https://crudcrud.com/api/51c561e877324bce82d5d6085f6e31a2/ilogs";

const getIssues = async () => {
  const response = await axios.get(BASE_URL);

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return response.data;
};

const logIssue = async (data) => {
  const response = await axios.post(BASE_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status != 201) {
    return Promise.reject(response);
  }

  return response.data;
};

const getIisssue = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return response.data;
};

const updateIssue = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return { ...data, _id: id };
};

const deleteIssue = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return id;
};

const issuesService = {
  getIssues,
  logIssue,
  getIisssue,
  updateIssue,
  deleteIssue,
};

export default issuesService;
