import axios from "axios";

const BASE_URL =
  "https://crudcrud.com/api/1e30c677c4464d0abfee4fb1fbdb6916/ilogs";

const getIssuess = async () => {
  const response = await axios.get(BASE_URL, {
    headers: {
      Accept: "application/json",
    },
  });

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return response;
};

const getIssues = async () => {
  const response = await axios.get(BASE_URL);

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return response.data;
};

const issuesService = {
  getIssues,
};

export default issuesService;
