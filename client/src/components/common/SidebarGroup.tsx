import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import '../../styles/scss/layout/sidebarGroup.scss';
import { GroupMissionsType } from 'src/types/types';
import SideBarGroupLeader from './SidebarGroupLeader';
import SideBarGroupMember from './SidebarGroupMember';

export default function SideBarGroup() {
    const cookie = new Cookies();
    const uToken = cookie.get('isUser');

    const { gSeq, mSeq } = useParams();

    const [groupMissions, setGroupMissions] = useState<GroupMissionsType[]>([]);
    const [groupName, setGroupName] = useState<GroupMissionsType[]>([]);

    useEffect(() => {
        const getGroup = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/group/detail/${gSeq}`,
                {
                    headers: {
                        Authorization: `Bearer ${uToken}`,
                    },
                }
            );

            setGroupMissions(res.data.groupMission);
            setGroupName(res.data.groupName);

            setIsLeader(res.data.isLeader);
            setIsJoin(res.data.isJoin);

            setLeaderName(res.data.leaderInfo.uName);
        };

        getGroup();
    }, []);

    //-- 모임장 / 멤버
    const [isLeader, setIsLeader] = useState(false);
    const [isJoin, setIsJoin] = useState(false);
    const [leaderName, setLeaderName] = useState('');

    console.log('leaderName', leaderName);
    console.log('groupMissions', groupMissions);

    let mSeqList = [];

    for (let i = 1; i <= groupMissions.length; i++) {
        mSeqList.push(i);
    }

    // 메뉴 선택
    const [menu, setMenu] = useState('');

    // 경고 공통 모달
    const [warningModalSwitch, setWarningModalSwitch] = useState(false);

    const warningModalSwitchHandler = (menu: string) => {
        setMenu(menu);
        setWarningModalSwitch(!warningModalSwitch);
    };

    const [isShrinkView, setIsShrinkView] = React.useState(false);
    const [isDarkMode, setIsDarkMode] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const handleSidebarView = () => {
        setIsShrinkView(!isShrinkView);
    };

    const handleThemeChange = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
    };

    const openToggleHandler = () => {
        setIsOpen(!setIsOpen);
    };

    return (
        <div className="sidebar-all">
            <div
                className={`sidebar-container${isShrinkView ? ' shrink' : ''}`}
            >
                <button
                    className="sidebar-viewButton"
                    type="button"
                    aria-label={
                        isShrinkView ? 'Expand Sidebar' : 'Shrink Sidebar'
                    }
                    title={isShrinkView ? 'Expand' : 'Shrink'}
                    onClick={handleSidebarView}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-chevron-left"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <div className="sidebar-wrapper">
                    <div className="sidebar-themeContainer">
                        {/* <label
                            // labelFor="theme-toggle"
                            className={`sidebar-themeLabel${
                                isDarkMode ? ' switched' : ''
                            }`}
                        > */}
                        {/* <input
                                className="sidebar-themeInput"
                                type="checkbox"
                                id="theme-toggle"
                                onChange={handleThemeChange}
                            /> */}
                        {/* <div className="sidebar-themeType light">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="sidebar-listIcon"
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                                <span className="sidebar-themeInputText">
                                    Light
                                </span>
                            </div> */}
                        <div className="sidebar-profileSection">
                            <img
                                src="/asset/images/leader.gif"
                                // src="/asset/images/kirby.gif"
                                // src="/asset/images/member.gif"
                                width="40"
                                height="40"
                                alt="Monica Geller"
                            />
                            <div>
                                {/* <div>⭐️</div> */}
                                {/* <div>👤</div> */}
                                {/* <div>👑</div> */}
                                <span style={{ fontWeight: 'bold' }}>
                                    LEADER
                                </span>
                                <br />
                                <span>{leaderName}</span>
                            </div>
                        </div>
                        {/* <div className="sidebar-themeType dark">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="sidebar-listIcon"
                                >
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                                <span className="sidebar-themeInputText">
                                    Dark
                                </span>
                            </div> */}
                        {/* </label> */}
                    </div>
                    <ul className="sidebar-list">
                        <li className="sidebar-listItem">
                            <a>
                                <svg
                                    viewBox="0 0 512 512"
                                    fill="currentColor"
                                    height="1.5em"
                                    width="1.5em"
                                >
                                    <path d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z" />
                                    <path d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z" />
                                </svg>
                                <span className="sidebar-listItemText">
                                    <Link to={`/group/home/${gSeq}`}>Home</Link>
                                </span>
                            </a>
                        </li>

                        <li className="sidebar-listItem secondary-menu">
                            <span className="sidebar-listItemText sub-menu-title">
                                Board
                            </span>
                            <div className="sidebar-list-menu-wrapper">
                                <a>
                                    <Link to={`/board/${gSeq}/notice`}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="sidebar-listIcon"
                                        >
                                            <rect
                                                x="3"
                                                y="4"
                                                width="18"
                                                height="18"
                                                rx="2"
                                                ry="2"
                                            />
                                            <line
                                                x1="16"
                                                y1="2"
                                                x2="16"
                                                y2="6"
                                            />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line
                                                x1="3"
                                                y1="10"
                                                x2="21"
                                                y2="10"
                                            />
                                        </svg>

                                        <span className="sidebar-listItemText">
                                            공지사항
                                        </span>
                                    </Link>
                                </a>
                            </div>
                        </li>

                        <li className="sidebar-listItem">
                            <a>
                                <Link to={`/board/${gSeq}/free`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="sidebar-listIcon"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            rx="2"
                                            ry="2"
                                            className="sidebar-listIcon"
                                        />
                                        <path d="M3 9h18M9 21V9" />
                                    </svg>
                                    <span className="sidebar-listItemText">
                                        자유 / 질문
                                    </span>
                                </Link>
                            </a>
                        </li>
                        <div className="empty-li"></div>

                        <li className="sidebar-listItem secondary-menu">
                            <span className="sidebar-listItemText sub-menu-title">
                                Mission
                            </span>
                            <div className="drop-down-menu-box">
                                <a
                                    className="drop-down-menu-container"
                                    onClick={openToggleHandler}
                                >
                                    <div className="drop-down-menu-title">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="sidebar-listIcon"
                                        >
                                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                        </svg>
                                        <span className="sidebar-listItemText">
                                            진행
                                        </span>
                                    </div>
                                    <svg
                                        viewBox="0 0 866 1000"
                                        fill="currentColor"
                                        height="1em"
                                        width="1em"
                                        className="open-icon"
                                    >
                                        <path d="M63 280l370 356 372-356c14.667-17.333 30.667-17.333 48 0 17.333 14.667 17.333 30.667 0 48L457 720c-14.667 14.667-30.667 14.667-48 0L13 328c-17.333-17.333-17.333-33.333 0-48 16-16 32.667-16 50 0" />
                                    </svg>
                                </a>

                                <ul className="progress-mission">
                                    {groupMissions.map(
                                        (mission: any, idx: number) => {
                                            return (
                                                <li
                                                    key={idx}
                                                    className="mission-active-list"
                                                    // style={{
                                                    //     fontWeight: 'bold',
                                                    // }}
                                                >
                                                    <Link
                                                        to={`/board/${gSeq}/mission/${mission.mSeq}`}
                                                    >
                                                        <div
                                                            key={idx}
                                                            className=""
                                                        >
                                                            {mission.mTitle}
                                                        </div>
                                                    </Link>
                                                </li>
                                            );
                                        }
                                    )}
                                </ul>
                            </div>
                        </li>

                        <li className="sidebar-listItem">
                            <a>
                                <Link to={`/board/${gSeq}/mission/done`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="sidebar-listIcon"
                                    >
                                        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                                        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                                    </svg>
                                    <span className="sidebar-listItemText">
                                        완료
                                    </span>
                                </Link>
                            </a>
                        </li>

                        {/* <li className="sidebar-listItem active">
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="sidebar-listIcon"
                                >
                                    <rect
                                        x="3"
                                        y="3"
                                        rx="2"
                                        ry="2"
                                        className="sidebar-listIcon"
                                    />
                                    <path d="M3 9h18M9 21V9" />
                                </svg>
                                <span className="sidebar-listItemText">
                                    Dashboard
                                </span>
                            </a>
                        </li> */}

                        <li className="sidebar-listItem secondary-menu">
                            <span className="sidebar-listItemText sub-menu-title">
                                Menu
                            </span>

                            {/* 모임장 메뉴 */}

                            <div className="drop-down-menu-box">
                                <a className="drop-down-menu-container">
                                    <div className="drop-down-menu-title">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            height="1.5em"
                                            width="1.5em"
                                            className="party-icon"
                                        >
                                            <path
                                                fill="none"
                                                d="M0 0h24v24H0z"
                                            />
                                            <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10H2l2.929-2.929A9.969 9.969 0 012 12zm4.828 8H12a8 8 0 10-8-8c0 2.152.851 4.165 2.343 5.657l1.414 1.414-.929.929zM8 13h8a4 4 0 11-8 0z" />
                                        </svg>

                                        {/* 파티 아이콘 */}
                                        {/* 
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            height="1.4em"
                                            width="1.4em"
                                            className="party-icon"
                                        >
                                            <path d="M18 8.31c-.36-.41-.73-.82-1.12-1.21l-.29-.27.14-.12a3.15 3.15 0 00.9-3.49A3.91 3.91 0 0014 1v2a2 2 0 011.76 1c.17.4 0 .84-.47 1.31-.07.08-.15.13-.22.2-3-2.41-6.29-3.77-7.9-2.16a2.16 2.16 0 00-.41.59v.1l-.18.53-4.41 13.1A3.28 3.28 0 005.28 22a3.21 3.21 0 001-.17L20 17.28a1 1 0 00.43-.31l.21-.18c1.43-1.44.51-4.21-1.41-6.9A6.63 6.63 0 0123 9V7a8.44 8.44 0 00-5 1.31zM5.7 19.93a1.29 1.29 0 01-1.63-1.63l1.36-4.1a10.7 10.7 0 004.29 4.39zm7-2.33a8.87 8.87 0 01-6.3-6.29l1-3 .06.09c.11.22.25.45.39.68s.16.29.26.44.33.48.51.73.19.28.3.42.43.55.66.82l.29.35c.34.39.7.77 1.08 1.16s.68.64 1 1l.33.28.78.63.37.28c.28.2.55.4.83.58l.31.2c.36.22.72.43 1.07.61h.05zm6.51-2.23h-.06c-.69.38-3.56-.57-6.79-3.81-.34-.34-.66-.67-.95-1l-.29-.35-.53-.64-.29-.4c-.13-.19-.27-.37-.39-.55l-.26-.42-.29-.47c-.08-.14-.14-.27-.21-.4s-.15-.26-.21-.4a3.31 3.31 0 01-.14-.36c-.05-.13-.11-.26-.15-.38S8.6 6 8.57 5.88s-.05-.22-.07-.32a2.26 2.26 0 010-.26 1 1 0 010-.24l.11-.31c.36-.36 2.23 0 4.73 1.9A4.13 4.13 0 0112 7v2a6.45 6.45 0 003-.94l.48.46c.42.42.81.85 1.18 1.28a5.32 5.32 0 00-.6 3.4l2-.39a3.57 3.57 0 010-1.12 11.3 11.3 0 01.81 1.45c.56 1.32.52 2.06.34 2.23z" />
                                        </svg> */}

                                        <span className="sidebar-listItemText">
                                            초대
                                        </span>
                                    </div>
                                    {/* <svg
                                        viewBox="0 0 866 1000"
                                        fill="currentColor"
                                        height="1em"
                                        width="1em"
                                        className="open-icon"
                                    >
                                        <path d="M63 280l370 356 372-356c14.667-17.333 30.667-17.333 48 0 17.333 14.667 17.333 30.667 0 48L457 720c-14.667 14.667-30.667 14.667-48 0L13 328c-17.333-17.333-17.333-33.333 0-48 16-16 32.667-16 50 0" />
                                    </svg> */}
                                </a>
                            </div>
                        </li>

                        <li className="sidebar-listItem">
                            <a>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    height="1.5em"
                                    width="1.5em"
                                    className="change-icon"
                                >
                                    <path d="M21.71 9.29l-4-4a1 1 0 00-1.42 1.42L18.59 9H7a1 1 0 000 2h14a1 1 0 00.92-.62 1 1 0 00-.21-1.09zM17 13H3a1 1 0 00-.92.62 1 1 0 00.21 1.09l4 4a1 1 0 001.42 0 1 1 0 000-1.42L5.41 15H17a1 1 0 000-2z" />
                                </svg>
                                <span className="sidebar-listItemText">
                                    권한 위임
                                </span>
                            </a>
                        </li>

                        <li className="sidebar-listItem">
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="sidebar-listIcon"
                                >
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                                </svg>
                                <span className="sidebar-listItemText">
                                    설정
                                </span>
                            </a>
                        </li>

                        <li className="sidebar-listItem">
                            <a>
                                <svg
                                    viewBox="0 0 1024 1024"
                                    fill="currentColor"
                                    height="1.5em"
                                    width="1.5em"
                                    className="party-icon"
                                >
                                    <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" />
                                </svg>
                                <span className="sidebar-listItemText a">
                                    삭제
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {isJoin ? (
                <div className="sidebar-container">
                    <div className="dropdown">
                        <button
                            style={{ borderRadius: '0', fontWeight: 'bold' }}
                            className="dropbtn"
                        >
                            그룹 메뉴 보기
                        </button>
                        <div className="sidebar-content dropdown dropdown-content">
                            <div className="sidebar-list">
                                <div className="sidebar-theme-list">
                                    {/* <div className="theme-flex">
                                        <div
                                            className="theme-title"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            <Link to={`/group/home/${gSeq}`}>
                                                홈으로 가기
                                            </Link>
                                        </div>
                                    </div> */}

                                    <div className="theme-flex">
                                        <div className="theme-title">
                                            게시판
                                        </div>
                                        <div className="board-content">
                                            <Link to={`/board/${gSeq}/notice`}>
                                                <div
                                                    className="sidebar-theme"
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    공지사항
                                                </div>
                                            </Link>
                                            <Link to={`/board/${gSeq}/free`}>
                                                <div
                                                    className="sidebar-theme"
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    자유
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="theme-flex">
                                        <div className="theme-title">미션</div>
                                        <div className="mission-res">
                                            <div className="mission-flex">
                                                <div className="mission-title">
                                                    진행 중
                                                </div>
                                                <div>
                                                    <ul className="progress-mission">
                                                        {groupMissions.map(
                                                            (
                                                                mission: any,
                                                                idx: number
                                                            ) => {
                                                                return (
                                                                    <li
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="sidebar-theme"
                                                                        style={{
                                                                            fontWeight:
                                                                                'bold',
                                                                        }}
                                                                    >
                                                                        <Link
                                                                            to={`/board/${gSeq}/mission/${mission.mSeq}`}
                                                                        >
                                                                            <div
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                className=""
                                                                            >
                                                                                {
                                                                                    mission.mTitle
                                                                                }
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                            <Link
                                                to={`/board/${gSeq}/mission/done`}
                                            >
                                                <div className="mission-title">
                                                    완료
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="empty-side-bar"></div>

                                    {isLeader ? (
                                        <div className="theme-flex">
                                            {/* 모임장 */}
                                            <div
                                                className="theme-title side-bar-leader-member"
                                                style={{
                                                    color: 'black',
                                                    backgroundColor: '#e9e9e9',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontWeight: 'bold',
                                                        paddingBottom: '0.5rem',
                                                        color: 'black',
                                                    }}
                                                >
                                                    ⭐️ 모임장 ⭐️
                                                </div>
                                                <div>{leaderName}</div>
                                            </div>
                                            <SideBarGroupLeader
                                                warningModalSwitch={
                                                    warningModalSwitch
                                                }
                                                setWarningModalSwitch={
                                                    setWarningModalSwitch
                                                }
                                                warningModalSwitchHandler={
                                                    warningModalSwitchHandler
                                                }
                                                menu={menu}
                                                setMenu={setMenu}
                                            />
                                        </div>
                                    ) : (
                                        <div className="theme-flex">
                                            {/* 멤버 */}
                                            <div
                                                className="theme-title side-bar-leader-member"
                                                style={{
                                                    color: 'black',
                                                    backgroundColor: '#e9e9e9',
                                                }}
                                            >
                                                🌱 모임원
                                            </div>

                                            <SideBarGroupMember
                                                warningModalSwitch={
                                                    warningModalSwitch
                                                }
                                                setWarningModalSwitch={
                                                    setWarningModalSwitch
                                                }
                                                warningModalSwitchHandler={
                                                    warningModalSwitchHandler
                                                }
                                                menu={menu}
                                                setMenu={setMenu}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
