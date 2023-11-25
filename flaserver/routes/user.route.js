const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.post('/register', async (req, res) => {
  const { username, password, phone } = req.body;

  if (!username || !password || !phone)
    return res.status(400).send({ error: 'You must provide all the fields' });
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const usernameExist = await User.findOne({
      username,
    });
    if (usernameExist)
      return res.status(400).send({ error: 'Username already exists' });
    const user = new User({
      username: username,
      password: hashedPassword,
      phone: phone,
    });
    await user.save();
    if (user) {
      jwt.sign(
        { userId: user._id, username, avatar: user.avatar, phoneNumber: phone },
        process.env.TOKEN_SECRET,
        (err, token) => {
          if (err) return res.status(400).json(err);
          res
            .cookie('token', token, {
              sameSite: 'none',
              secure: true,
            })
            .status(201)
            .json({
              user: user,
            });
        }
      );
    }
    res.status(201).json({ user: user });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    return res
      .status(400)
      .send({ error: 'You must provide a phone and password' });
  try {
    const user = await User.findOne({ phone });
    if (!user) return res.status(400).send({ error: 'User not found' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ error: 'Invalid password' });
    } else {
      jwt.sign(
        {
          userId: user._id,
          username: user.username,
          avatar: user.avatar,
          phoneNumber: phone,
        },
        process.env.TOKEN_SECRET,
        (err, token) => {
          if (err) return res.status(400).json(err);
          res
            .cookie('token', token, {
              sameSite: 'none',
              secure: true,
            })
            .status(201)
            .json({
              user: user,
            });
        }
      );
    }
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get('/profile', async (req, res) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, userData) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
}),
  router.post('/logout', async (req, res) => {
    res.clearCookie('token').status(200).json({ message: 'Logged out' });
  });
module.exports = router;
