const IO = require('socket.io');
const redisCli = require('../models/redis');

const redisAdapter = require('socket.io-redis');

exports.setupSocket = async (server, options) => {
  const io = IO(server, options);

  const connectedUser = {}; // 연결된 클라이언트를 저장할 객체

  // Set 객체생성 : 중복된 값을 허용하지 않는 데이터 구조.
  const connectedSockets = new Set();

  // 네임스페이스 생성(모임챗) - 룸: 각 모임별 챗
  // Express의 라우팅처럼 url에 지정된 위치에 따라 신호의 처리를 다르게 하는 기술(특정 페이지에서 소켓이 보내주는 모든 실시간 메세지를 받을 필요는 없다)
  // Room은 namespace의 하위개념에 해당.(카톡 단톡방 1, 단톡방 2...)
  const groupChat = io.of(`/api/socket/chat`);
  await redisCli.set('test1', '11111111111111111111111');
  const test1 = await redisCli.get('test1');

  console.log(test1);
  // 네임스페이스에 이벤트 리스너 등록
  groupChat.on('connection', (socket) => {
    // 클라이언트 소켓의 고유한 ID를 가져옴
    const socketId = socket.id;
    // console.log(socket);

    console.log(`/api/socket/chat 네임스페이스 연결 완료 ::: `, socketId);

    // 이미 연결된 소켓인지 확인
    if (connectedSockets.has(socketId)) {
      // 중복 연결이면 처리하지 않고 종료
      console.log(`Socket ${socketId} is already connected.`);
      return;
    }

    socket.emit('success', { msg: '모임채팅 연결 success' });

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

// exports.postGroupChat = async (req, res) => {
//   try {
//     const gSeq = req.params.gSeq;
//     const io = req.io;

//     const roomChat = io.of('/api/socket/chat').in(`room${gSeq}`);

//     roomChat.on('connection', () => {
//       console.log(`room${gSeq} is connected!`);

//       // toNick : 귓속말 상대 (모임원 중 현재 접속되어 있는 유저)
//       socket.on('sendMsg', (msg) => {
//         if (!toNick) {
//           roomChat.emit('newMessage', { nick: data.nick, msg: data.msg });
//         } else {
//           roomChat.to(toNick).emit('newMessage', {
//             nick: data.myNick,
//             msg: data.msg,
//             dm: '(귓속말)',
//           });
//           roomChat.emit('newMessage', {
//             nick: data.myNick,
//             msg: data.msg,
//             dm: '(귓속말)',
//           });
//         }
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     res.send({
//       isSuccess: false,
//       msg: 'err',
//     });
//   }
// };

// //   // 클라이언트에서 로그인 이벤트를 보내면, 연결을 저장하고 해당 연결을 사용
// //   if (!connectedUser[uSeq]) {
// //     connectedUser[uSeq] = socket.id;
// //     socket.name = uName;
// //     socket.roomName = gName;
// //     socket.roomNumber = gSeq;
// //     // 소켓에 들어오게 되면 자동으로 모임 채팅에 참여함
// //     socket.join(socket.roomNumber);
// //     console.log(socket.roomName, ' -- ', socket.roomNumber);
// //     console.log('연결된 유저 목록 ::::::', connectedUser);
// //   } else {
// //     // 이미 연결이 있는 경우, 기존 연결을 사용하고 새 연결을 닫음
// //     socket.disconnect();
// //   }
// // });
// // socket.on('chatMessage', (message) => {
// //   console.log(message);
// //   req.io
// //     .to(socket.roomNumber)
// //     .emit('message', `${socket.name} : ` + message); // 모든 클라이언트에 메시지를 전송
// // });
// // });
