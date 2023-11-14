const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res.status(404).send('No user found');
    } else {
      return res.status(200).send(users);
    }
  } catch (error) {
    console.log(error);
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
  router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .send({ error: 'You must provide a username and password' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const usernameExist = await User.findOne({ username });
      if (usernameExist)
        return res.status(400).send({ error: 'Username already exists' });
      const user = new User({
        username: username,
        password: hashedPassword,
      });
      await user.save();
      if (user) {
        jwt.sign(
          { userId: user._id, username },
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
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .send({ error: 'You must provide a username and password' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send({ error: 'User not found' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ error: 'Invalid password' });
    } else {
      jwt.sign(
        { userId: user._id, username, userProfile: user.profilePicture },
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
router.post('/logout', async (req, res) => {
  res.clearCookie('token').status(200).json({ message: 'Logged out' });
});

module.exports = router;
