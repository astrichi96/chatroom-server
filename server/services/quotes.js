const axios = require('axios');
const { createJson } = require('../../utils');
const { quoteUrl } = require('../../config');

const getQuote = async (stockCode) => {
  const { data: stream } = await axios.get(quoteUrl, {
    params: { s: stockCode, e: 'csv' }
  });

  return createJson(stream);
};

module.exports = { getQuote };
