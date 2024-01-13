import axios from "axios";

const BASE_URL = `https://crudcrud.com/api/3975f65f4632420ba55a619da4a20864/ilogs`;

const getIssues = async () => {
  const response = await axios.get(BASE_URL);

  if (response.status != 200) {
    return Promise.reject(response);
  }

  return response;
};

const issuesService = {
  getIssues,
};

export default issuesService;
