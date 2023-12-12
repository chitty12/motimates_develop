const express = require('express');
const router = express.Router();
const controller = require('./controller/Csocket');
const authUtil = require('./middlewares/auth').checkToken;
const IO = require('socket.io');

exports.setupSocket = (server, options) => {
  const io = IO(server, options);

  // 1. 유저 로그인 : 유저 토큰 - uSeq로 가입된 모임에 모두 입장!
  const connectedUser = {}; // 연결된 클라이언트를 저장할 객체

  // Set 객체생성 : 중복된 값을 허용하지 않는 데이터 구조.
  const connectedSockets = new Set();

  // 네임스페이스 생성(모임챗) - 룸: 각 모임별 챗
  // Express의 라우팅처럼 url에 지정된 위치에 따라 신호의 처리를 다르게 하는 기술(특정 페이지에서 소켓이 보내주는 모든 실시간 메세지를 받을 필요는 없다)
  // Room은 namespace의 하위개념에 해당.(카톡 단톡방 1, 단톡방 2...)
  const groupChat = io.of(`/api/socket/chat`);

  // 네임스페이스에 이벤트 리스너 등록
  groupChat.on('connection', (socket) => {
    // 클라이언트 소켓의 고유한 ID를 가져옴
    const socketId = socket.id;
    // console.log(socket);

    console.log(`/api/socket/chat 네임스페이스 연결 완료 ::: `, socketId);

    socket.emit('send', 'connect!!!!!!!!');

    socket.on('hi', (data) => console.log(data.message));

    // 이미 연결된 소켓인지 확인
    if (connectedSockets.has(socketId)) {
      // 중복 연결이면 처리하지 않고 종료
      console.log(`Socket ${socketId} is already connected.`);
      return;
    }

    // 새로운 소켓을 연결된 소켓 목록에 추가
    connectedSockets.add(socketId);

    //  connectedUser = {
    //   "someSocketId": {
    //     uSeq: 'someUserId',
    //     uName: 'someUserName',
    //   }
    // };

    // socket.on('setName', (uName) => {
    //   console.log(uName);

    //   const userInfo = {
    //     uSeq,
    //     uName,
    //   };
    //   connectedUser[socketId] = userInfo;

    //   groupChat.emit('notice', `${uName}님이 Motimates에 로그인했습니다.`);
    // });

    const rooms = ['room1', 'room2', 'room3']; // user가 참여하고 있는 모임의 gSeq
    // 1. 이미 방이 있는경우 => 참여
    // 2. 방이 없는 경우 => 생성

    rooms.forEach((room) => {
      socket.join(room);
    });

    socket.on('logout', () => {
      console.log('logout');
      socket.disconnect();
    });

    // 연결이 끊어질 때 연결된 소켓 목록에서 제거
    // 각 모임방에 notice
    socket.on('disconnect', () => {
      console.log(`Socket ${socketId} disconnected.`);
      groupChat.emit('notice', `${socketId}님이 로그아웃하셨습니다.`);
      connectedSockets.delete(socketId);
    });
  });
};

// router.get('/chat', authUtil, controller.getGroupChats); // 모임 채팅 참여

// router.get('/chat', controller.getGroupChats); // 모임 채팅 참여

// router.get('/chat/:gSeq', controller.postGroupChat); // 모임 채팅
