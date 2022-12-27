const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const allUsers = [
  { id: 1, name: 'kim', email: 'kim@gmail.com', password: '123456' },
  { id: 2, name: 'choi', email: 'choi@gmail.com', password: '123456' }
];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/api/users', (req, res) => {
//   res.send('allUsers');
// });

app.post('/api/users', (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  let selectedUser = null;

  allUsers.forEach((user) => {
    if (user.email === userEmail) selectedUser = user;
  });

  if (selectedUser === null || selectedUser.password !== userPassword) {
    res.send({ success: false });
  } else res.send({ success: true, selectedUser });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
