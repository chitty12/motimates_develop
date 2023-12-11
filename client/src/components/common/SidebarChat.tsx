import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import io from 'socket.io-client';
// import { createContext } from 'react';

// import { useDispatch } from 'react-redux';
// import { socketStorage } from '../redux/action';

import '../../styles/scss/layout/sidebarChat.scss';

// export const socket = socketIo(String(process.env.REACT_APP_BACK_URL), {
//     withCredentials: true,
// });
// export const SocketContext = createContext(socket);

let interval = 3000;

export default function SidebarChat() {
    const [chat, setChat] = useState<any>([]); // 받아올 채팅 1️⃣
    const [sendMsg, setSendMsg] = useState(''); // 입력한 채팅 2️⃣

    const cookie = new Cookies();
    const uToken = cookie.get('isUser');

    // useEffect(() => {
    //     const socket = new WebSocket('http://localhost:8888/api/socket/chat');

    //     return () => {
    //         if (socket.readyState === 1) {
    //             // <-- This is important
    //             socket.close();
    //         }
    //     };
    // }, []);

    const socket = io('http://localhost:8888/api/socket/chat');
    // `${process.env.REACT_APP_DB_HOST}/socket/chat`,

    // useEffect(() => {
    const onSocket = () => {
        // setInterval(() => {
        // socket.emit('good', '클라이언트 -> 서버');
        // }, interval);

        socket.emit('send_message', { message: 'Hello' });

        console.log('###########', (data: any) => console.log(data));

        // socket.on('hi', (data) => console.log(data)); // 서버 -> 클라이언트
    };
    // }, []);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setChat(data.message);
        });
    }, [socket]);

    //-- 토큰 인증하여 서버 연결
    // API 뒤에 오는 Id 값으로 namespace 구분이 된다. ▶️ io('API주소/Id값')
    // io(`${process.env.REACT_APP_DB_HOST}/socket/chat`, {
    //     headers: {
    //         Authorization: `Bearer ${uToken}`,
    //     },
    // });

    // socket.on('connect', () => {
    //     console.log('socket server connected.');
    // });

    // socket.on('disconnect', () => {
    //     console.log('socket server disconnected.');
    // });

    const send = () => {
        console.log('전송');
    };

    //-- 입장 알림
    useEffect(() => {
        // 이때 id는 각 경매방이 가진 고유 Id
        // socket 연결
        // if (!socketInstances[id]) {
        //   socketInstances[id] = socket(`${id}`)
        //   // 서버에서 넘어오는 alert 응답 받아오기
        //   socketInstances[id].on('alert', (message: string) => {
        //     const welcomeChat: ChatMsg = {
        //       username: '알림',
        //       message: message,
        //     };
        //     setChat((prevChat) => [...prevChat, welcomeChat]);
        //  }
    }, []);

    const handleChangeMsg = (message: string) => {
        setSendMsg(message);
    };

    //-- 입력한 채팅을 서버 측으로 보내는 소켓 이벤트 함수
    // const handleSendMsg = () => {
    //     socketInstances[id].emit('chat', {
    //         message: sendMsg,
    //     });
    //     setSendMsg('');
    // };

    //-- 채팅 받아오기
    useEffect(() => {
        // 방 고유 Id
        // socket 연결
        // if (!socketInstances[id]) {
        //   socketInstances[id] = socket(`${id}`)
        // 서버에서 넘어오는 chat 응답 받아오기
        //   socketInstances[id].on('chat', (data: socketChatMsg) => {
        //     const newChat: ChatMsg = {
        //       username: data.userInfo.userId,
        //       message: data.message.message,
        //       admin: data.userInfo.isAdmin,
        //     };
        //     setChat((prevChat) => [...prevChat, newChat]);
        //   });
    }, []);

    return (
        <div className="chat-container">
            {/* <div className="title3 title-wrapper">채팅</div> */}
            {/* 가입한 모임의 그룹 채팅방 리스트 */}
            <div>
                <button onClick={onSocket}>socket 통신 시작</button>
                <ul>
                    <li className="group-list">
                        <div>1 모임</div>
                        <div>메세지 4개 도착</div>
                    </li>
                    <li className="group-list">
                        <div>2 모임</div>
                        <div>메세지 4개 도착</div>
                    </li>
                    <li className="group-list">
                        <div>3 모임</div>
                        <div>메세지 4개 도착</div>
                    </li>
                    <li className="group-list">
                        <div>4 모임</div>
                        <div>메세지 4개 도착</div>
                    </li>
                </ul>
            </div>
            <div>===============</div>
            <div>아래는 그룹 채팅방 클릭 시, 보이는 화면입니다.</div>
            <div>현재 컬러는 구분을 위해 임의 지정</div>
            <main className="chat-box">
                <div className="chat-list"></div>
                <select id="group-list"></select> 모임
                {/* 메세지 전송 영역*/}
                <div className="input-container">
                    <input
                        type="text"
                        id="message"
                        // onKeyPress="if(window.event.keyCode==13){send()}"
                        onChange={(e) => handleChangeMsg(e.target.value)}
                    />
                    <button id="send-btn" type="button" onClick={send}>
                        전송
                    </button>
                </div>
            </main>
        </div>
    );
}
