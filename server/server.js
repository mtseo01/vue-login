const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
  res.send({
    allUsers: [
      { id: 1, name: 'kim', email: 'kim@gmail.com', password: '123456' },
      { id: 2, name: 'choi', email: 'choi@gmail.com', password: '123456' }
    ]
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
