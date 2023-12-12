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
    // console.log('groupMissions', groupMissions.length);

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

    const handleSidebarView = () => {
        setIsShrinkView(!isShrinkView);
    };

    const handleThemeChange = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark');
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
                        <label
                            // labelFor="theme-toggle"
                            className={`sidebar-themeLabel${
                                isDarkMode ? ' switched' : ''
                            }`}
                        >
                            <input
                                className="sidebar-themeInput"
                                type="checkbox"
                                id="theme-toggle"
                                onChange={handleThemeChange}
                            />
                            <div className="sidebar-themeType light">
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
                        </label>
                    </div>
                    <ul className="sidebar-list">
                        <li className="sidebar-listItem active">
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
                                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                                </svg>
                                <span className="sidebar-listItemText">
                                    Inbox
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
                                    <rect
                                        x="3"
                                        y="4"
                                        width="18"
                                        height="18"
                                        rx="2"
                                        ry="2"
                                    />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span className="sidebar-listItemText">
                                    Calendar
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
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                                <span className="sidebar-listItemText">
                                    Activity
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
                                    Settings
                                </span>
                            </a>
                        </li>
                    </ul>
                    <div className="sidebar-profileSection">
                        <img
                            src="https://assets.codepen.io/3306515/i-know.jpg"
                            width="40"
                            height="40"
                            alt="Monica Geller"
                        />
                        <div>
                            <div>⭐️ 모임장 ⭐️</div>
                            <span>{leaderName}</span>
                        </div>
                    </div>
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
                                    <div className="theme-flex">
                                        <div
                                            className="theme-title"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            <Link to={`/group/home/${gSeq}`}>
                                                홈으로 가기
                                            </Link>
                                        </div>
                                    </div>

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
