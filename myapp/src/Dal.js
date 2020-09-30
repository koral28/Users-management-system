import axios from "axios";

const getAll = (url) => {
  return axios.get(url);
};

export default { getAll };
