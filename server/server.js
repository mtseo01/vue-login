const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// app.get('/api/users', (req, res) => {
//   res.send({
//     name: 'kim',
//     age: 29
//   });
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
