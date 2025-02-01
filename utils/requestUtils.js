const axios = require("axios");

const doGet = async (url, params = {}) => {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  doGet,
};
