const { BOT_CODE, BOT_USER, BOT_MESSAGES } = require('../../utils');
const { getQuote } = require('./quotes');

const handler = (model) => async ({ text, room, user }) => {
  const initialCharacter = text.charAt(0);
  const botIdentifier = initialCharacter === '/';

  // When is a normal message
  if (!botIdentifier) {
    await model.save({ text, room, user });
    const messages = await model.findAll({ room });
    return messages.reverse();
  }

  // When is a message bot
  const messages = await model.findAll({ room });
  const [botCode, stockCode] = text.substring(1).split('=');
  const textBot = await botValidator(botCode, stockCode);
  return buildMessageBot(textBot, messages);
};

const botValidator = async (botCode, stockCode) => {
  if (botCode.toLowerCase() !== BOT_CODE) return BOT_MESSAGES.CODE_INVALID;

  try {
    const [quote] = await getQuote(stockCode);
    if (!isValid(quote.Close)) return BOT_MESSAGES.VALUE_INVALID;

    return `${stockCode} quote is $${quote.Close} per share`;
  } catch (error) {
    return BOT_MESSAGES.SERVICE_FAILED;
  }
};

const buildMessageBot = (text, messages) => {
  const oldMessages = messages.reverse();
  const messageQuote = { user: BOT_USER, text };
  return [...oldMessages, messageQuote];
};

const isValid = (value) => parseFloat(value) == value;

module.exports = { handler };
