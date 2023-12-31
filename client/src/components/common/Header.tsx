import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
// import { io } from 'socket.io-client';
import { getSocket } from 'src/socket';

import { grey } from '@mui/material/colors';
import { Button, ButtonGroup, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../styles/scss/layout/header.scss';

export default function Header(props: any) {
    const [isCookie, setIsCookie] = useState(false); // 쿠키 유무

    const cookie = new Cookies();
    const uToken = cookie.get('isUser'); // 토큰 값

    //=== 채팅 ===
    // const socket = io(`${process.env.REACT_APP_DB_HOST}/socket/chat`);
    const socket = getSocket();

    //-- socket 연결
    // Login 여부 상관없이 연결 (토큰 인증 때문)
    // socket.on('connect', () => {
    //     console.log('클라이언트 연결 완료 ::', socket.id);
    // });

    socket.on('connect', (data: any) => {
        console.log('클라이언트 연결 완료 ::', data);
    });

    // [ TEST ]
    socket.on('send', (data: any) => {
        console.log('socket server connected.');
        console.log('socket server connected.', data);
    });

    const [loginData, setLoginData] = useState([]);

    //-- Login
    useEffect(() => {
        if (cookie.get('isUser')) {
            setIsCookie(true);

            //; 채팅 login

            // 1. 사용자 데이터 가져오기
            // const getUserData = async () => {
            //     await axios
            //         .get(`${process.env.REACT_APP_DB_HOST}/user/mypage`, {
            //             headers: {
            //                 Authorization: `Bearer ${uToken}`,
            //             },
            //         })
            //         .then((res) => {
            //             // console.log('user', res.data);
            //             const { nickname } = res.data;
            //             setUName(nickname);
            //         });
            // };

            // useEffect(() => {
            //     getUserData();
            // }, []);

            // socket.emit('login', () => {
            //     console.log('클라이언트 login ======= ', loginData);
            // });

            // data =[{gSeq: , uName:}]
        } else setIsCookie(false);
    }, [cookie]);

    // useEffect(() => {
    //     // const socket = io(`${process.env.REACT_APP_DB_HOST}/socket/chat`);

    //     socket.on('connect', () => {
    //         console.log('클라이언트 연결 완료 ::', socket.id);
    //     });

    //     socket.on('send', (data: any) => {
    //         console.log('socket server connected.');
    //         console.log('socket server connected.', data);
    //     });
    // }, []);

    const theme = createTheme({
        palette: {
            primary: {
                main: grey[200],
            },
            secondary: grey,
        },
    });

    // 리사이즈 이벤트에 따라 너비값 측정
    // const [myWidth, setMyWidth] = useState<number>(window.innerWidth);

    // // window.onresize = () => {
    // //     setMyWidth(window.innerWidth);
    // // };

    // // 헤더 메뉴 보여주기
    const [isVisibleMobile, setIsVisibleMobile] = useState<boolean>(true);
    const toggleVal = (): void => {
        // if (myWidth < 800) {
        setIsVisibleMobile((prev) => !prev);
        // }
    };

    // useEffect(() => {
    //     const handleResize = (): void => {
    //         setMyWidth(window.innerWidth);
    //     };

    //     // 컴포넌트가 마운트되었을 때 리사이즈 이벤트 리스너 추가
    //     window.addEventListener('resize', handleResize);

    //     // 컴포넌트가 언마운트되면 리사이즈 이벤트 리스너 제거
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []); // 빈 배열을 전달하여 마운트 및 언마운트 시에만 실행되도록 함

    // const getChat = async () => {
    //     const res = await axios
    //         .get(`${process.env.REACT_APP_DB_HOST}/socket/chat`, {
    //             headers: {
    //                 Authorization: `Bearer ${uToken}`,
    //             },
    //         })
    //         .then((res) => {
    //             console.log(res.data);

    //             socket.emit('logout', () => {
    //                 // socket.disconnect();

    //                 console.log('socket server disconnected.');
    //             });
    //         });
    // };

    // useEffect(() => {
    //     getChat();
    // }, []);

    const nvg = useNavigate();
    const logoutHandler = () => {
        // [추후] 로그아웃 모달창 처리
        if (window.confirm('로그아웃하시겠습니까 ?')) {
            //-- 채팅 종료
            socket.emit('logout', () => {
                // socket.disconnect();

                console.log('socket server disconnected.');
            });

            socket.emit('discoonect', () => {
                console.log('socket server disconnected.');
            });

            // getChat();

            cookie.remove('isUser', { path: '/' });

            nvg('/');
        } else {
            return;
        }
    };

    // 프로필 사진 가져오기
    const [userImgSrc, setUserImgSrc] = useState<any>('/asset/images/user.svg'); // 문자열 변수

    const getUserData = async () => {
        await axios
            .get(`${process.env.REACT_APP_DB_HOST}/user/mypage`, {
                headers: {
                    Authorization: `Bearer ${uToken}`,
                },
            })
            .then((res) => {
                const { userImg } = res.data; //null

                if (userImg !== null && userImg !== undefined) {
                    // user가 업로드한 값이 있을 때
                    setUserImgSrc(userImg);
                } else {
                    // user가 업로드한 값이 없거나 undefined일 때
                    setUserImgSrc('/asset/images/user.svg');
                }
            })
            .catch((err) => {
                console.log('error 발생: ', err);
            });
    };

    // 로그인 여부 구분 해 사진 넣기 => 동기화 처리
    const [isUser, setIsUser] = useState<boolean>(false); // 비로그인 상태

    useEffect(() => {
        const loginProfileLoad = async () => {
            if (cookie.get('isUser')) {
                setIsUser(true); //로그인 상태
                await getUserData();
            } else {
                return;
            }
        };
        loginProfileLoad();
    }, [isUser]);

    // 초대장 링크 입력 후 버튼 클릭 시 그 그룹으로 이동
    const [grpInput, setGrpInput] = useState<string>('');
    const grpInputObj = {
        gLink: grpInput,
    };
    const goInvited = (): void => {
        axios
            .post(
                `${process.env.REACT_APP_DB_HOST}/group/joinByLink`,
                grpInputObj,
                {
                    headers: {
                        Authorization: `Bearer ${uToken}`,
                    },
                }
            )
            .then((res) => {
                const { success, msg } = res.data;
                success
                    ? toast.success(msg, {
                          duration: 2000,
                      })
                    : toast.error(msg, {
                          duration: 2000,
                      });
                setGrpInput('');
            });
    };

    const [isActive, setIsActive] = useState('main');

    const mainActiveHandler = () => {
        setIsActive('main');
    };

    const groupActiveHandler = () => {
        setIsActive('group');
    };

    const [isAlarm, setIsAlarm] = useState<boolean>(false);
    const alarmHandler = () => {
        setIsAlarm(!isAlarm);
    };

    return (
        <>
            <div className="header-blur">
                <div className="header-container">
                    {/* 로고 */}
                    <div
                        className="header-divOne"
                        style={{ zIndex: '0', height: '120px' }}
                    >
                        <Link to="/">
                            <div className="title1 logo-text">MOTI</div>
                            {/* <div className="logo-container">
                            <img
                                src="/asset/logo.svg"
                                className="logo-img"
                                alt="logo"
                            />
                        </div> */}
                        </Link>
                    </div>

                    <div className="header-divTwo pcMode">
                        <nav className="header-nav ">
                            {/* <ThemeProvider theme={theme}> */}
                            <input
                                type="text"
                                id="grpSearch-input"
                                value={grpInput}
                                placeholder="초대 링크를 넣어보세요"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setGrpInput(e.target.value)}
                            />
                            <img
                                src="/asset/icons/search.svg"
                                id="grpSearch-btn"
                                onClick={(e: React.MouseEvent) => goInvited()}
                                alt="search"
                            ></img>

                            <div id="navbar-animmenu">
                                <ul className="show-dropdown main-navbar">
                                    <div className="hori-selector">
                                        <div className="left"></div>
                                        <div className="right"></div>
                                    </div>
                                    {props.isIntro || props.isLogin ? (
                                        <div className="menu-list-btn">
                                            <li onClick={mainActiveHandler}>
                                                <Link
                                                    to="/main"
                                                    style={{ color: 'black' }}
                                                >
                                                    Main
                                                </Link>
                                            </li>
                                            <li onClick={groupActiveHandler}>
                                                <Link
                                                    to="/group"
                                                    style={{ color: 'black' }}
                                                >
                                                    Group
                                                </Link>
                                            </li>
                                        </div>
                                    ) : (
                                        <div className="menu-list-btn">
                                            <li onClick={mainActiveHandler}>
                                                <Link
                                                    to="/main"
                                                    style={{
                                                        color:
                                                            isActive === 'main'
                                                                ? 'black'
                                                                : '',
                                                    }}
                                                >
                                                    Main
                                                </Link>
                                            </li>
                                            <li onClick={groupActiveHandler}>
                                                <Link
                                                    to="/group"
                                                    style={{
                                                        color:
                                                            isActive === 'group'
                                                                ? 'black'
                                                                : '',
                                                    }}
                                                >
                                                    Group
                                                </Link>
                                            </li>
                                        </div>
                                    )}
                                </ul>
                            </div>

                            {/* <ButtonGroup
                                    aria-label="outlined button group"
                                    variant="outlined"
                                    sx={{ p: 1 }}
                                >
                                    <Link to="/main">
                                        <Button className="menu-button">
                                            MAIN
                                        </Button>
                                    </Link>

                                    <Link to="/group">
                                        <Button className="menu-button">
                                            GROUP
                                        </Button>
                                    </Link> */}
                            {/* </li> */}
                            {/* 관리자만 보이는 버튼 */}
                            {/* <Link to="/management/users">
                                    <Button className="menu-button">
                                        Management
                                    </Button>
                                </Link> */}
                            {/* </ButtonGroup> */}
                            {/* </ThemeProvider> */}

                            <ul className="menu">
                                {!isCookie ? (
                                    <li>
                                        {/* 비로그인 시 */}
                                        <ThemeProvider theme={theme}>
                                            {/* <Link to="/login">Login</Link> */}

                                            <Link to="/login">
                                                <Button
                                                    aria-label="outlined button group"
                                                    variant="outlined"
                                                    className="menu-button"
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                        </ThemeProvider>
                                    </li>
                                ) : (
                                    <>
                                        {!props.isIntro && (
                                            <div className="chat-icon-container">
                                                <img
                                                    src="/asset/icons/chat.svg"
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                    }}
                                                    alt="chatImg"
                                                    onClick={() =>
                                                        props.showChatting()
                                                    }
                                                    id="chat-btn"
                                                />
                                                <span id="chat-text">Chat</span>
                                            </div>
                                        )}

                                        <div className="logout-icon-container">
                                            <img
                                                src="/asset/icons/Bell.svg"
                                                alt="alarm"
                                                onClick={alarmHandler}
                                                id="logout-btn"
                                            />
                                            {/* <span id="logout-text">Bell</span> */}
                                        </div>

                                        <div className="logout-icon-container">
                                            <img
                                                src="/asset/icons/logout.svg"
                                                alt="logout"
                                                onClick={logoutHandler}
                                                id="logout-btn"
                                            />
                                            <span id="logout-text">Logout</span>
                                        </div>

                                        <li>
                                            {/* <div className="mypage-icon-container"> */}
                                            <Link to="/mypage">
                                                <img
                                                    src={userImgSrc}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                    }}
                                                    alt="userImg"
                                                    className="myPage-btn"
                                                />
                                            </Link>

                                            {/* <span id="mypage-text">My</span>
                                            </div> */}
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>

                    {/* 메뉴 탭 버튼 */}
                    <div className="tab-menu-div">
                        <button id="tab-menu-btn" onClick={() => toggleVal()}>
                            <img src="/asset/icons/Menu.svg" alt="tabMenu" />
                        </button>
                    </div>
                </div>

                {/* 모바일일 때 메뉴 바*/}
                <div className="header-divTwo mobMode">
                    <nav className="header-nav ">
                        <ul
                            className="menu"
                            style={{
                                display: isVisibleMobile ? 'flex' : 'none',
                            }}
                        >
                            <li>
                                <Link to="/main">
                                    <button className="menu-button">
                                        MAIN
                                    </button>
                                </Link>
                            </li>
                            <li>
                                <Link to="/group">
                                    <button className="menu-button">
                                        GROUP
                                    </button>
                                </Link>
                            </li>

                            {/* 관리자만 보이는 버튼 */}
                            {/* <li>
                            <Link to="/management/users">
                                <button className="menu-button">
                                    Management
                                </button>
                            </Link>
                        </li> */}

                            {/* 로그인/비로그인 구분 */}
                            {!isCookie ? (
                                <li>
                                    {/* 비로그인 시 */}
                                    <Link to="/login">
                                        <button className="menu-button">
                                            Login
                                        </button>
                                    </Link>
                                </li>
                            ) : (
                                <>
                                    <li
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* 로그인 시 */}
                                        {/* 모바일에서 - 채팅 컴포넌트 */}
                                        {/* <li id="chat-li"> */}
                                        {/* <img
                                            src="/asset/icons/chat.svg"
                                            alt="chatImg"
                                            onClick={() => props.showChatting()}
                                            id="chat-btn"
                                        /> */}
                                        {/* </li> */}
                                        <img
                                            src="/asset/icons/logout.svg"
                                            alt="logout"
                                            onClick={logoutHandler}
                                            id="logout-btn"
                                        />
                                        <Link to="/mypage">
                                            <img
                                                src={userImgSrc}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                }}
                                                className="myPage-btn"
                                                alt="userImg"
                                            ></img>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
