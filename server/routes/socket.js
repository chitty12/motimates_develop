const express = require('express');
const router = express.Router();
const controller = require('../controller/Csocket');

const authUtil = require('../middlewares/auth').checkToken;

router.get('/', controller.setupSocket);
