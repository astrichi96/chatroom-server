const { QUOTE_URL, SALT_ROUNDS, JWT_SECRET, MONGO_URI } = process.env;

module.exports = {
  quoteUrl: QUOTE_URL || 'https://stooq.com/q/l?f=sd2t2ohlcv&h',
  saltRounds: SALT_ROUNDS || 10,
  jwtSecret: JWT_SECRET || 'secret',
  mongoURI: MONGO_URI || 'mongodb://localhost:27017/messages'
};
