const Message = require('../models/messageModel');
require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const getMessages = async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.status(200).json(messages);
};

const createMessage = (req, res) => {
  res.header('Content-Type', 'application/json');
  const { name, phoneNumber, msg } = req.body;

  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.phoneNumber,
      body: req.body.msg,
    })
    .then(() => {
      const message = Message.create({ name, phoneNumber, msg });
      res.status(200).json(message);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getMessages, createMessage };
