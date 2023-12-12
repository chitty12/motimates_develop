const express = require('express');
const router = express.Router();
const controller = require('../controller/Csocket');
const authUtil = require('../middlewares/auth').checkToken;

router.get('/chat', authUtil, controller.getGroupChats); // 모임 채팅 참여


// router.get('/chat', controller.getGroupChats); // 모임 채팅 참여

// router.post('/chat/:gSeq', authUtil, controller.postGroupChat); // 모임 채팅

module.exports = router;
