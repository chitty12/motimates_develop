import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import '../../styles/scss/layout/sidebarGroup.scss';
import '../../styles/scss/pages/management/managementsidebar.scss';

export default function SidebarManagement() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-content">
                <ul className="menu align-center expanded text-center SMN_effect-42">
                    <Link to="/management/users">
                        <li className="">
                            <input type="radio" style={{ display: 'none' }} />
                            <span data-hover="회원 관리"> 회원 관리</span>
                        </li>
                    </Link>

                    <Link to="/management/groups">
                        <li className="">
                            <span data-hover="그룹 관리">그룹 관리</span>
                        </li>
                    </Link>

                    <Link to="/management/reports">
                        <li className="">
                            <span data-hover="신고 내역">신고 내역</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    );
}
