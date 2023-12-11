import React from 'react';
// import { createContext } from 'react';
// import socketIo from 'socket.io-client';

import '../../styles/scss/layout/sidebarChat.scss';

// export const socket = socketIo(String(process.env.REACT_APP_BACK_URL), {
//     withCredentials: true,
// });
// export const SocketContext = createContext(socket);

export default function SidebarChat() {
    // socket.on('connect', () => {
    //     console.log('socket server connected.');
    // });

    // socket.on('disconnect', () => {
    //     console.log('socket server disconnected.');
    // });

    const send = () => {
        console.log('전송');
    };

    return (
        <div className="chat-container">
            {/* <div className="title3 title-wrapper">채팅</div> */}
            {/* 가입한 모임의 그룹 채팅방 리스트 */}
            <div>
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
                    />
                    <button id="send-btn" type="button" onClick={send}>
                        전송
                    </button>
                </div>
            </main>
        </div>
    );
}
