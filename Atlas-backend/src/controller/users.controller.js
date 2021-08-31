const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const pool = require('../db/connect');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);',
      [name, email, hashPassword, 'user']
    );

    res.status(200).json('User created successfully');
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(500).json('This email address is already registered');
    }
    res.status(500).json('An unexpected error occurred in the database :(');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [row] = await pool.query(
      'SELECT id, name, email, password, role FROM users WHERE users.email = ?;',
      [email]
    );

    if (!row.length) {
      return res.status(200).json('This email is not registered');
    }

    const hashPassword = row[0].password;
    delete row[0].password;

    const user = { ...row[0] };

    if (await bcrypt.compare(password, hashPassword)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN);
      res
        .status(200)
        .json({
          message: 'Login successful!',
          token: accessToken,
          role: user.role
        });
    } else {
      res.status(400).json({ message: 'Wrong credentials' });
    }
  } catch {
    res.status(500).json('An unexpected error occurred in the database :(');
  }
};

module.exports = {
  createUser,
  loginUser
};
