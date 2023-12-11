//=== 멤버 그룹 사이드바 ===

import '../../styles/scss/layout/sidebarGroup.scss';
import '../../styles/scss/components/modal.scss';
import WarningModal from './modal/WarningModal';

export default function SideBarGroupMember({
    warningModalSwitch,
    setWarningModalSwitch,
    warningModalSwitchHandler,
    menu,
    setMenu,
}: any) {
    return (
        <div>
            <ul className="title5 member-menu">
                <li
                    className="member-leave"
                    onClick={() => warningModalSwitchHandler('모임 탈퇴')}

                >
                    모임 탈퇴
                </li>
                <WarningModal
                    warningModalSwitch={warningModalSwitch}
                    setWarningModalSwitch={setWarningModalSwitch}
                    action={menu}
                />
            </ul>
        </div>
    );
}
