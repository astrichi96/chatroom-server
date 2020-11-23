const request = require('supertest');
const app = require('../../../index');
const { expect } = require('chai');
const { stub, assert } = require('sinon');
const db = require('../../db/config');
const { rooms: repository } = require('../../db/repository');
const { generateToken } = require('../../../utils');

describe('Room controller', () => {
  const baseUrl = '/rooms',
    username = 'avanegas',
    name = 'GARDEN',
    q = 'GA',
    roomSaved = {
      _id: '5fb5721bda45b583e4e09097',
      name: 'GARDEN'
    };

  const headers = {
    Authorization: `bearer ${generateToken({ username })}`
  };

  afterAll(async () => {
    await db.connection.close();
    await app.close();
  });

  describe(`POST ${baseUrl} `, () => {
    let saveRoomStub;

    beforeEach(() => {
      saveRoomStub = stub(repository, 'save');
    });
    afterEach(() => {
      saveRoomStub.restore();
    });

    describe('When something went wrong', () => {
      it('Should return a status 500 when the database fail', async () => {
        saveRoomStub.rejects(Error('Connection with the database failed'));
        const res = await request(app)
          .post(baseUrl)
          .send({ name })
          .set(headers);
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.eql({
          error: {
            status: 500,
            message: 'Connection with the database failed'
          }
        });
      });

      it('Should return a status 500 when the name property is empty', async () => {
        const res = await request(app)
          .post(baseUrl)
          .send({ description: 'Flowers' })
          .set(headers);
        assert.notCalled(saveRoomStub);
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.eql({
          error: {
            status: 500,
            message: 'Name property is required'
          }
        });
      });

      it('Should return a status 401 when the auth fail', async () => {
        const res = await request(app).get(baseUrl).send({ name });
        assert.notCalled(saveRoomStub);
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.eql({
          statusCode: 401,
          error: 'Missing authentication'
        });
      });
    });

    describe('When everything went smooth', () => {
      it('Should return a status 200 when the user was created successfully', async () => {
        saveRoomStub.returns(roomSaved);
        const res = await request(app)
          .post(baseUrl)
          .send({ name })
          .set(headers);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.eql(roomSaved);
      });
    });
  });

  describe(`GET ${baseUrl} `, () => {
    let findAllStub;

    beforeEach(() => {
      findAllStub = stub(repository, 'findAll');
    });
    afterEach(() => {
      findAllStub.restore();
    });

    const rooms = [
      {
        _id: '5fb5721bda45b583e4e09097',
        name: 'GARDEN'
      },
      {
        _id: '5fb5721bda45b583e4e09098',
        name: 'IT'
      }
    ];

    describe('When something went wrong', () => {
      it('Should return a status 500 when the database fail', async () => {
        findAllStub.rejects(Error('Connection with the database failed'));
        const res = await request(app).get(baseUrl).query({ q }).set(headers);
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.eql({
          error: {
            status: 500,
            message: 'Connection with the database failed'
          }
        });
      });

      it('Should return a status 401 when the auth fail', async () => {
        const res = await request(app).get(baseUrl).send({ q });
        assert.notCalled(findAllStub);
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.eql({
          statusCode: 401,
          error: 'Missing authentication'
        });
      });
    });

    describe('When everything went smooth', () => {
      it('Should return a status 200', async () => {
        findAllStub.returns(rooms);
        const res = await request(app).get(baseUrl).send({ q }).set(headers);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.eql(rooms);
      });
    });
  });
});
