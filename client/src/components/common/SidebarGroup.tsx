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

    return (
        <div className="sidebar-all">
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
