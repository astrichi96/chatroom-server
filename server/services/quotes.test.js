const axios = require('axios');
const { stub } = require('sinon');
const { getQuote } = require('./quotes');
const { expect } = require('chai');
const { QUOTE_URL = 'https://stooq.com/q/l?f=sd2t2ohlcv&h' } = process.env;

describe('Quotes Service', () => {
  let getStub,
    stockCode = 'AAPL.US';
  beforeEach(() => {
    getStub = stub(axios, 'get');
  });

  afterEach(() => {
    getStub.restore();
  });

  describe('Get File by token', () => {
    it('should send a request with the params', async () => {
      getStub.returns({
        data: 'AAPL.US,123.54,54,126.45,250,255.2,154.5,192'
      });
      await getQuote(stockCode);
      expect(getStub.getCall(0).args).to.be.eql([
        QUOTE_URL,
        { params: { s: stockCode, e: 'csv' } }
      ]);
    });
  });
});
