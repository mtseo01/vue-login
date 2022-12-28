const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const allUsers = [
  { id: 1, name: 'kim', email: 'kim@gmail.com', password: '123456' },
  { id: 2, name: 'choi', email: 'choi@gmail.com', password: '123456' }
];

const cookieOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'none',
  secure: true
};

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/auth', (req, res) => {
  console.log(req.cookies);
  if (req.cookies && req.cookies.token) {
    jwt.verify(req.cookies.token, 'abc1234', (err, decoded) => {
      if (err) {
        console.log('만료된 토큰입니다.');
        return res.sendStatus(401);
      } else {
        console.log(decoded);
        res.send(decoded);
      }
    });
  } else {
    console.log('토큰이 없습니다.');
    return res.sendStatus(401);
  }
});

app.post('/api/login', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  let selectedUser = null;

  allUsers.forEach((user) => {
    if (user.email === userEmail) selectedUser = user;
  });

  const token = jwt.sign(
    {
      email: selectedUser.email,
      name: selectedUser.name
    },
    'abc1234',
    {
      expiresIn: '15m',
      issuer: 'server-admin'
    }
  );

  if (selectedUser === null || selectedUser.password !== userPassword) {
    res.send({ success: false });
  } else {
    res.cookie('token', token, cookieOptions);
    res.send({ success: true, selectedUser });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
