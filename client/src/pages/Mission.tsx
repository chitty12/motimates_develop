import React, { useState, useEffect } from 'react';
import MissionList from '../components/mission/MissionList';
import Face from '../components/mission/Face';

import axios from 'axios';
import { Cookies } from 'react-cookie';

import '../styles/scss/components/titles.scss';
import '../styles/scss/components/buttons.scss';

export default function Mission() {
    // console.log(process.env.REACT_APP_DB_HOST);

    const [userName, setUserName] = useState<string>();

    const cookie = new Cookies();
    const uToken = cookie.get('isUser');

    useEffect(() => {
        // console.log('mission.tsx use effect')
        const getUserName = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/api/mission/user`,
                {
                    headers: {
                        Authorization: `Bearer ${uToken}`,
                    },
                }
            );
            // console.log(res.data.uName);
            setUserName(res.data.uName);
        };
        getUserName();
    });

    return (
        <div>
            <div className="section">
                <h1>{userName}님, 반가워요👋🏻</h1>
                <div className="list-face">
                    <MissionList />
                    <Face />
                </div>
            </div>
        </div>
    );
}
