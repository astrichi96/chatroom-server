const request = require('supertest');
const app = require('../../../index');
const { expect } = require('chai');
const { stub, assert } = require('sinon');
const db = require('../../db/config');
const { users: repository } = require('../../db/repository');

describe('User controller', () => {
  const baseUrl = '/users',
    username = 'avanegas',
    userSaved = {
      _id: '5fb6c7944e231d49c04689ab',
      username: '5',
      createdAt: '2020-11-19'
    };

  describe(`POST ${baseUrl} `, () => {
    let saveUserStub;

    afterAll(async () => {
      await db.connection.close();
      await app.close();
    });

    beforeEach(() => {
      saveUserStub = stub(repository, 'save');
    });
    afterEach(() => {
      saveUserStub.restore();
    });

    describe('When something went wrong', () => {
      it('Should return a status 500 when the database fail', async () => {
        saveUserStub.rejects(Error('Connection with the database failed'));
        const res = await request(app).post(baseUrl).send({ username });
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.eql({
          error: {
            status: 500,
            message: 'Connection with the database failed'
          }
        });
      });

      it('Should return a status 500 when the username property is empty', async () => {
        const res = await request(app).post(baseUrl).send({});
        assert.notCalled(saveUserStub);
        expect(res.status).to.be.equal(500);
        expect(res.body).to.be.eql({
          error: {
            status: 500,
            message: 'username property is required'
          }
        });
      });
    });

    describe('When everything went smooth', () => {
      it('Should return a status 200 when the user was created successfully', async () => {
        saveUserStub.returns(userSaved);
        const res = await request(app).post(baseUrl).send({ username });

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.eql(userSaved);
      });
    });
  });
});
