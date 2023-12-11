//=== 모임장 그룹 사이드바 ===

import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie';

import { CopyToClipboard } from 'react-copy-to-clipboard';
// import toast from 'react-hot-toast';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

import '../../styles/scss/layout/sidebarGroup.scss';

import MissionCancelModal from './modal/MissionCancelModal';
import ChoiceModal from './modal/ChoiceModal';
import WarningModal from './modal/WarningModal';

export default function SideBarGroupLeader({
    warningModalSwitch,
    setWarningModalSwitch,
    warningModalSwitchHandler,
    menu,
    setMenu,
}: any) {
    const cookie = new Cookies();
    const uToken = cookie.get('isUser');

    const { gSeq } = useParams();

    const [missionCancelModalSwitch, setMissionCancelModalSwitch] =
        useState(false);

    // const [isInvited, setIsInvited] = useState(false);
    const [inviteCode, setInviteCode] = useState('');

    // 멤버 선택하는 공통 모달
    const [choiceModalSwitch, setChoiceModalSwitch] = useState(false);

    const choiceModalSwitchHandler = (menu: string) => {
        setMenu(menu);
        setChoiceModalSwitch(!choiceModalSwitch);
    };

    const missionCancelModalHandler = () => {
        setMissionCancelModalSwitch(true);
    };

    // 초대하기 링크
    const onClickInviteButton = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/group/getJoinLink/${gSeq}`
            );

            if (response.data.success) {
                // API로부터 gLink를 받아서 inviteCode에 설정
                setInviteCode(response.data.gLink);
                console.log('inviteCode:', inviteCode); // 이 줄을 추가
            } else {
                // 에러 메시지 처리
                toast.error('초대코드를 가져오는 데 실패했습니다.', {
                    duration: 2000,
                });
            }
        } catch (error) {
            // API 호출 중 오류 처리
            console.error('Error while fetching invite link:', error);
        }
    };

    //; 모임 삭제 (DELETE)

    const tryDeleteGroupHandler = (gSeq: number) => {
        warningModalSwitchHandler('모임 삭제');
    };

    return (
        <div className="leader-content">
            <ul className="leader-menu">
                <CopyToClipboard
                    text={inviteCode}
                    onCopy={() =>
                        toast.success(' 초대코드가 복사되었습니다 !', {
                            duration: 2000,
                        })
                    }
                >
                    <li
                        className="leader-edit"
                        onClick={onClickInviteButton}
                        style={{
                            cursor: 'pointer',
                            paddingTop: '1rem',
                        }}
                    >
                        초대하기
                    </li>
                </CopyToClipboard>
                <Toaster />

                <Link to={`/group/edit/${gSeq}`}>
                    <li className="leader-edit leader-title">모임 수정</li>
                </Link>

                {/* <li
                    onClick={missionCancelModalHandler}
                    className="title5 leader-warning"
                >
                    미션완료 취소
                </li> */}

                <li
                    onClick={() =>
                        choiceModalSwitchHandler('모임장 권한 넘기기')
                    }
                    className="title5 leader-warning"
                    style={{ cursor: 'pointer' }}
                >
                    모임장 권한 넘기기
                </li>

                {/* <li
                    onClick={() => choiceModalSwitchHandler('강제 퇴장')}
                    className="title5 leader-warning"
                    style={{ cursor: 'pointer' }}
                >
                    강제 퇴장시키기
                </li> */}

                <li
                    onClick={() => tryDeleteGroupHandler(Number(gSeq))}
                    className="title5 leader-warning"
                    style={{ cursor: 'pointer' }}
                >
                    모임 삭제
                </li>
            </ul>

            {missionCancelModalSwitch ? (
                <MissionCancelModal
                    missionCancelModalSwitch={missionCancelModalSwitch}
                    setMissionCancelModalSwitch={setMissionCancelModalSwitch}
                />
            ) : null}

            {/* 멤버 선택하는 공통 모달 */}
            <ChoiceModal
                choiceModalSwitch={choiceModalSwitch}
                setChoiceModalSwitch={setChoiceModalSwitch}
                choiceModalSwitchHandler={choiceModalSwitchHandler}
                action={menu}
            />

            {/* 경고 공통 모달 */}
            <WarningModal
                warningModalSwitch={warningModalSwitch}
                setWarningModalSwitch={setWarningModalSwitch}
                warningModalSwitchHandler={warningModalSwitchHandler}
                action={menu}
            />
        </div>
    );
}
