const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const cookieOptions = {
	path: '/',
	httpOnly: true,
	sameSite: 'none',
	secure: true,
};

exports.singup = (req, res) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'email exists',
					success: false,
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						res.status(500).json({ error: err, success: false });
					} else {
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash,
							name: req.body.name,
						});
						user
							.save()
							.then(result => {
								console.log(result);
								return res.status(201).json({
									message: 'User created',
									success: true,
								});
							})
							.catch(err => {
								return res.status(500).json({ error: err });
							});
					}
				});
			}
		});
};

exports.login = (req, res) => {
	User.find({ email: req.body.email }).then(user => {
		if (user.length < 1) {
			return res.status(404).json({
				message: 'User not found',
				success: false,
			});
		}
		bcrypt.compare(req.body.password, user[0].password, (err, result) => {
			if (err) {
				return res.status(401).json({ message: 'Auth failed', success: false });
			} else if (result) {
				const userInfo = {
					userId: user[0]._id,
					name: user[0].name,
					email: user[0].email,
				};
				const token = jwt.sign(userInfo, process.env.JWT_KEY, {
					expiresIn: '1h',
					issuer: 'server-admin',
				});
				// res.setHeader('token', token, cookieOptions);
				return res.status(200).json({
					message: 'login successful',
					success: true,
					token,
					userInfo,
				});
			} else {
				return res.status(401).json({ message: 'Auth failed', success: false });
			}
		});
	});
};

exports.auth = (req, res) => {
	console.log(req.cookies);
	if (req.cookies && req.cookies.token) {
		jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, decoded) => {
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
		return res.send({ success: false });
	}
};
