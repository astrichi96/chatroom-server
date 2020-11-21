const { expect } = require('chai');
const { stub, assert } = require('sinon');
const roomsModel = require('../models/rooms');
const roomsRepository = require('./rooms');
const db = require('../config');

describe('Room Repository tests', () => {
  let createStub, findStub;
  const name = 'GARDEN',
    description = 'All about flowers',
    q = 'GA';

  afterAll(async () => {
    await db.connection.close();
  });

  beforeEach(() => {
    createStub = stub(roomsModel, 'create');
    findStub = stub(roomsModel, 'find');
  });

  afterEach(() => {
    findStub.restore();
    createStub.restore();
  });

  describe('Should call Save Function', () => {
    const roomSaved = {
      _id: '5fb5721bda45b583e4e09097',
      name: 'GARDEN',
      description: 'All about flowers'
    };

    it('When the new room is created successfully', async () => {
      createStub.returns(roomSaved);
      const response = await roomsRepository.save({
        name,
        description
      });

      assert.calledWithExactly(createStub, { name, description });
      expect(response).to.be.eql(roomSaved);
    });
  });

  describe('Should call FindAll Function', () => {
    const rooms = [
      {
        _id: '5fb5721bda45b583e4e09097',
        name: 'GARDEN',
        description: 'All about flowers'
      },
      {
        _id: '5fb5721bda45b583e4e09098',
        name: 'IT',
        description: 'All about technologies'
      }
    ];

    it('When the all rooms are listed successfully', async () => {
      findStub.returns({
        sort: stub().callsFake(function fakeFn() {
          return rooms;
        })
      });

      const response = await roomsRepository.findAll({});
      assert.calledWithExactly(findStub, {});

      expect(response).to.be.eql(rooms);
    });

    it('When the query filters are not empty', async () => {
      findStub.returns({
        sort: stub().callsFake(function fakeFn() {
          return rooms;
        })
      });

      const response = await roomsRepository.findAll({ q });
      assert.calledWithExactly(findStub, { name: { $regex: /GA/i } });
      expect(response).to.be.eql(rooms);
    });
  });
});
