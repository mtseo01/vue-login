const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const cookieOptions = {
  path: '/',
  httpOnly: true,
  sameSite: 'none',
  secure: true
};

exports.singup = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          message: 'email exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: 'User created'
                });
              })
              .catch((err) => res.status(500).json({ error: err }));
          }
        });
      }
    });
};

exports.login = (req, res) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length < 1) {
      res.send({ success: false });
      return res.status(404).json({
        message: 'User not found'
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        res.send({ success: false });
        return res.status(401).json({ message: 'Auth failed' });
      } else if (result) {
        const userInfo = {
          userId: user[0]._id,
          name: user[0].name,
          email: user[0].email
        };
        const token = jwt.sign(userInfo, process.env.JWT_KEY, {
          expiresIn: '1h',
          issuer: 'server-admin'
        });
        res.cookie('token', token, cookieOptions);
        return res.send({ success: true, userInfo });
      } else {
        res.send({ success: false });
        return res.status(401).json({ message: 'Auth failed' });
      }
    });
  });
};

exports.auth = (req, res) => {
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
};
