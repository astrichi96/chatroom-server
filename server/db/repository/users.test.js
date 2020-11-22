const { expect } = require('chai');
const { stub, assert } = require('sinon');
const usersModel = require('../models/users');
const usersRepository = require('./users');
const db = require('../config');

describe('User Repository tests', () => {
  let createStub, findOneStub;
  const username = 'avanegas',
    password = '$2b$10$IW/P/PZV32fsq.B9UaeWW.MZTsg2c4DQTWxfgNtpdkXc.aA5iqkfO';

  afterAll(async () => {
    await db.connection.close();
  });

  beforeEach(() => {
    createStub = stub(usersModel, 'create');
    findOneStub = stub(usersModel, 'findOne');
  });

  afterEach(() => {
    createStub.restore();
    findOneStub.restore();
  });

  describe('Should call Save Function', () => {
    const userSaved = {
      _id: '5fb5721bda45b583e4e09097',
      username: 'avanegas',
      password: '$2b$10$IW/P/PZV32fsq.B9UaeWW.MZTsg2c4DQTWxfgNtpdkXc.aA5iqkfO'
    };

    it('When the new room is created successfully', async () => {
      createStub.returns(userSaved);
      const response = await usersRepository.save({
        username,
        password
      });

      assert.calledWithExactly(createStub, { username, password });
      expect(response).to.be.eql(userSaved);
    });
  });

  describe('Should call FindOne Function', () => {
    const user = {
      _id: '5fb5721bda45b583e4e09097',
      username: 'avanegas',
      password: '$2b$10$IW/P/PZV32fsq.B9UaeWW.MZTsg2c4DQTWxfgNtpdkXc.aA5iqkfO'
    };

    it('When the user is returned', async () => {
      findOneStub.returns(user);
      const response = await usersRepository.findOne({
        username
      });

      assert.calledWithExactly(findOneStub, { username });
      expect(response).to.be.eql(user);
    });
  });
});
