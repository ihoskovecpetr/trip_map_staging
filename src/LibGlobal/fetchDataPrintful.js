const axios = require("axios");

const fetchDataPrintful = async (variantIdsArr) => {
  const response = await axios.post(`api/data-printful`, { variantIdsArr });
  return response;
};

module.exports = {
  fetchDataPrintful,
};
