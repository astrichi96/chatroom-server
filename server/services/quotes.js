const axios = require('axios');
const { createJson } = require('../../utils');
const { QUOTE_URL = 'https://stooq.com/q/l?f=sd2t2ohlcv&h' } = process.env;

const getQuote = async (stockCode) => {
  const { data: stream } = await axios.get(QUOTE_URL, {
    params: { s: stockCode, e: 'csv' }
  });

  return createJson(stream);
};

module.exports = { getQuote };
