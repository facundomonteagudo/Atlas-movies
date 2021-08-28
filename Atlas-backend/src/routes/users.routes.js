const express = require('express');

const { createUser, loginUser } = require('../controller/users.controller');

const validateDto = require('../middleware/validate-dto');
const { createSchema, loginSchema } = require('../dto/user-dto');

const router = express.Router();

router.post('/signup', validateDto(createSchema), createUser);
router.post('/auth', validateDto(loginSchema), loginUser);

module.exports = router;
