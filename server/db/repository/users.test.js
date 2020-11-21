const { expect } = require('chai');
const { stub, assert } = require('sinon');
const usersModel = require('../models/users');
const usersRepository = require('./users');
const db = require('../config');

describe('User Repository tests', () => {
  let createStub;
  const username = 'avanegas';

  afterAll(async () => {
    await db.connection.close();
  });

  beforeEach(() => {
    createStub = stub(usersModel, 'create');
  });

  afterEach(() => {
    createStub.restore();
  });

  describe('Should call Save Function', () => {
    const userSaved = {
      _id: '5fb5721bda45b583e4e09097',
      username: 'avanegas'
    };

    it('When the new room is created successfully', async () => {
      createStub.returns(userSaved);
      const response = await usersRepository.save({
        username
      });

      assert.calledWithExactly(createStub, { username });
      expect(response).to.be.eql(userSaved);
    });
  });
});
