import axios from "axios";

const BASE_URL =
  "https://crudcrud.com/api/8a55153d83004f318232f33791b019f5/ilogs";

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

const updateIssue = async (data) => {
  const response = await axios.put(BASE_URL, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return response;
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
