const request = require('supertest');
const app = require('../../../index');
const { expect } = require('chai');
const { stub, assert } = require('sinon');
const db = require('../../db/config');
const { messages: repository } = require('../../db/repository');

describe('Message controller', () => {
  const headers = {
    Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImF2YW5lZ2FzIiwianRpIjoiZGIyYmUzNWYtYmQxNi00NmI3LWJkYzItNGM5MTIwOWMxNTVjIiwiaWF0IjoxNjA2MDE3NjkzLCJleHAiOjE2MDYwMjEyOTN9.Dp9yMLx-uP2k93GYPQhh2xPrZjhP0vHy2deq1OuMJ3A`
  };

  const baseUrl = '/messages',
    room = '5fb594ac3b58cba87bbec72c';
  messages = [
    {
      _id: '5fb5721bda45b583e4e09097',
      text: 'Hi! Welcome',
      user: {
        _id: '5fb57214da45b583e4e09096',
        username: 'avanegas',
        createdAt: '2020-11-19'
      },
      createdAt: '2020-11-18'
    },
    {
      _id: '5fb5d095af9d40ebcf021b9b',
      text: 'Thank you!',
      user: {
        _id: '5fb5d08eaf9d40ebcf021b9a',
        username: 'avanegasch',
        createdAt: '2020-11-19'
      },
      createdAt: '2020-11-19'
    }
  ];

  describe(`GET ${baseUrl} `, () => {
    let findAllStub;

    afterAll(async () => {
      await db.connection.close();
      await app.close();
    });

    beforeEach(() => {
      findAllStub = stub(repository, 'findAll');
    });
    afterEach(() => {
      findAllStub.restore();
    });

    describe('When something went wrong', () => {
      it('Should return a status 500 when the database fail', async () => {
        findAllStub.rejects(Error('Connection with the database failed'));
        const res = await request(app).get(baseUrl).send({ room }).set(headers);
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.eql({
          error: {
            status: 500,
            message: 'Connection with the database failed'
          }
        });
      });

      it('Should return a status 401 when the auth fail', async () => {
        const res = await request(app).get(baseUrl).send({ room });
        assert.notCalled(findAllStub);
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.eql({
          statusCode: 401,
          error: 'Missing authentication'
        });
      });
    });

    describe('When everything went smooth', () => {
      it('Should return a status 200 when the user was created successfully', async () => {
        findAllStub.returns(messages);
        const res = await request(app).get(baseUrl).send({ room }).set(headers);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.eql(messages);
      });
    });
  });
});
