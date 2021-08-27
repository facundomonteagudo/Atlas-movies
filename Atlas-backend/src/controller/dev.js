const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../db/connect');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?);',
      [name, email, password]
    );

    res.status(200).json('User created successfully');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(500).json('This email address is already registered');
    } else {
      res.status(500).json('An unexpected error occurred in the database :(');
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [row] = await pool.query(
      'SELECT password FROM users WHERE users.email = ?;',
      [email]
    );

    const hashPassword = row[0].password;

    if (bcrypt.compare(password, hashPassword)) {
      const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN);
      res
        .status(200)
        .json({ message: 'Login successful!', token: accessToken });
    } else {
      res.status(400).json({ message: 'Wrong credentials' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createUser, loginUser };
