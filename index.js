const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const messageRoutes = require('./routes/messages');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/api/messages', messageRoutes);

app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function (_, res) {
  res.sendFile(
    path.join(__dirname, './client/build/index.html'),
    function (err) {
      res.status(500).send(err);
    }
  );
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(4000, () => {
      console.log('listening on port 4000...');
    });
  })
  .catch((err) => {
    console.log(err);
  });
