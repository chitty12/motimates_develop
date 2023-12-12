import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { io } from 'socket.io-client';

// import { socket } from '../SidebarChat';

export default function ChatRoom({
    isEnter,
    setIsEnter,
    setSendMsg,
    sendMsg,
    nowGSeq,
    nowGName,
}: any) {
    const cookie = new Cookies();
    const uToken = cookie.get('isUser');

    const socket = io(`${process.env.REACT_APP_DB_HOST}/socket/chat`);

    // useEffect(() => {
    //     // 컴포넌트가 마운트되었을 때 실행되는 코드
    //     socket.on('message', (data: string) => {
    //         setSendMsg(data);
    //     });
    // }, []);

    const leaveHandler = () => {
        setIsEnter(false);
    };

    const handleChangeMsg = (message: string) => {
        setSendMsg(message);
    };

    const sendMessage = () => {
        socket.emit('sendMessage', 'Hello, Server!');
    };

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

    // useEffect(() => {
    //     socket.on('receive_message', (data) => {
    //         setChat(data.message);
    //     });
    // }, [socket]);

    return (
        <main className="chat-box">
            <button id="send-btn" type="button" onClick={leaveHandler}>
                나가기
            </button>
            <p>Message from server: {sendMsg}</p>
            <button onClick={sendMessage}>Send Message to Server</button>
            <div className="title4">{nowGSeq}번</div>
            <div className="title4">{nowGName} 모임</div>
            <div className="chat-list"></div>
            <select id="group-list"></select> 모임
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
    );
}
