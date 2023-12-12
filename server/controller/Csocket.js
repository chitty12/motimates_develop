const {
  User,
  Group,
  GroupUser,
  GroupBoard,
  GroupBoardComment,
  GroupBoardIcon,
  Mission,
} = require('../models');
const Op = require('sequelize').Op;
const sequelize = require('sequelize');
const jwt = require('../modules/jwt');

// GET '/api/socket/chat
// 모임 채팅 목록
exports.getGroupChats = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = await jwt.verify(token);
    const uSeq = user.uSeq;
    
    if (!token) {
      res.send({
        success: false,
        msg: '토큰 X',
      });
    }
    if (!uSeq) {
      res.send({
        success: false,
        msg: '로그인X or 비정상적인 접근',
      });
      return;
    }

    // 1. 유저 로그인 : 유저 토큰 - uSeq로 가입된 모임에 모두 입장!
    // req.data = gSeq, uName

    const connectedUser = {}; // 연결된 클라이언트를 저장할 객체
    const io = req.io;

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
      console.log(socket);
      console.log(`/api/socket/chat 네임스페이스 연결 완료 ::: `, socketId);

      // 이미 연결된 소켓인지 확인
      if (connectedSockets.has(socketId)) {
        // 중복 연결이면 처리하지 않고 종료
        console.log(`Socket ${socketId} is already connected.`);
        return;
      }

      // 새로운 소켓을 연결된 소켓 목록에 추가
      connectedSockets.add(socketId);
      const userInfo = {
        uSeq,
        uName,
      };

      connectedUser[socketId] = userInfo;
      //  connectedUser = {
      //   "someSocketId": {
      //     uSeq: 'someUserId',
      //     uName: 'someUserName',
      //   }
      // };

      // 연결 이벤트 핸들러
      console.log(`Socket ${socketId} connected.`);

      socket.on('setName', (uName) => {
        console.log(uName);
        groupChat.emit('notice', `${uName}님이 Motimates에 로그인했습니다.`);
      });

      const rooms = ['room1', 'room2', 'room3']; // user가 참여하고 있는 모임의 gSeq

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

    res.send({ isSuccess: true, msg: 'socket start' });
  } catch (err) {
    console.error(err);
    res.send({ isSuccess: false, msg: 'error' });
  }
};

// exports.postGroupChat = async (req, res) => {
//   try {
//     const gSeq = req.params.gSeq;
//     const io = req.io;

//     const roomChat = io.of('/api/socket/chat').in(gSeq);

//     roomChat.on('connection', () => {
//       socket.on('sendMsg', ()=> {

//       });
//     });
//   } catch (err) {
//     console.error(err);
//     res.send({
//       isSuccess: false,
//       msg: 'err',
//     });
//   }

//   //   // 클라이언트에서 로그인 이벤트를 보내면, 연결을 저장하고 해당 연결을 사용
//   //   if (!connectedUser[uSeq]) {
//   //     connectedUser[uSeq] = socket.id;
//   //     socket.name = uName;
//   //     socket.roomName = gName;
//   //     socket.roomNumber = gSeq;
//   //     // 소켓에 들어오게 되면 자동으로 모임 채팅에 참여함
//   //     socket.join(socket.roomNumber);
//   //     console.log(socket.roomName, ' -- ', socket.roomNumber);
//   //     console.log('연결된 유저 목록 ::::::', connectedUser);
//   //   } else {
//   //     // 이미 연결이 있는 경우, 기존 연결을 사용하고 새 연결을 닫음
//   //     socket.disconnect();
//   //   }
//   // });
//   // socket.on('chatMessage', (message) => {
//   //   console.log(message);
//   //   req.io
//   //     .to(socket.roomNumber)
//   //     .emit('message', `${socket.name} : ` + message); // 모든 클라이언트에 메시지를 전송
//   // });
// });
// const { join } = require('node:path');
// };
