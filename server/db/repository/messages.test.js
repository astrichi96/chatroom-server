const { expect } = require('chai');
const { stub, assert } = require('sinon');
const messageModel = require('../models/messages');
const messageRepository = require('./messages');
const db = require('../config');

describe('Message Repository tests', () => {
  let createStub, findStub;
  const text = 'Hi! New message in chatroom',
    user = '5fb594ac3b58caa87bbec72c',
    room = '5fb594ac3b58cba87bbec72c';

  afterAll(async () => {
    await db.connection.close();
  });

  beforeEach(() => {
    createStub = stub(messageModel, 'create');
    findStub = stub(messageModel, 'find');
  });

  afterEach(() => {
    findStub.restore();
    createStub.restore();
  });

  describe('Should call Save Function', () => {
    const messageSaved = {
      _id: '5fb5721bda45b583e4e09097',
      text: 'Hi! New message in chatroom',
      user: '5fb594ac3b58caa87bbec72c',
      room: '5fb594ac3b58cba87bbec72c',
      createdAt: '2020-11-18'
    };

    it('When the new message is created successfully', async () => {
      createStub.returns(messageSaved);
      const response = await messageRepository.save({
        text,
        user,
        room
      });

      assert.calledWithExactly(createStub, { text, user, room });
      expect(response).to.be.eql(messageSaved);
    });
  });

  describe('Should call FindAll Function', () => {
    const messages = [
      {
        _id: '5fb5721bda45b583e4e09097',
        text: 'Hi! New message in chatroom',
        user: '5fb594ac3b58caa87bbec72c',
        room: '5fb594ac3b58cba87bbec72c',
        createdAt: '2020-11-18'
      },
      {
        _id: '5fb5721bda45b583e4e09098',
        text: 'Hey! Welcome',
        user: '5fb594ac3b58caa87bbec72d',
        room: '5fb594ac3b58cbb87bbec72c',
        createdAt: '2020-11-18'
      }
    ];

    it('When the all message are listed successfully', async () => {
      findStub.returns({
        populate: stub().callsFake(function fakeFn() {
          return {
            sort: stub().callsFake(function fakeFn() {
              return {
                limit: stub().callsFake(function fakeFn() {
                  return messages;
                })
              };
            })
          };
        })
      });

      const response = await messageRepository.findAll({ room });

      expect(response).to.be.eql(messages);
    });
  });
});
