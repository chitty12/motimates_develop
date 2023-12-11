import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';

import '../../styles/scss/pages/mission.scss';

export default function Face() {
    const [uCharImg, setuCharImg] = useState<string>('');
    const cookie = new Cookies();
    const uToken = cookie.get('isUser');

    useEffect(() => {
        const getUCharImg = async () => {
            // console.log('face.tsx use effect')

            const res = await axios.get(
                // 유저 미션 조회

                `${process.env.REACT_APP_DB_HOST}/mission/user`,
                {
                    headers: {
                        Authorization: `Bearer ${uToken}`,
                    },
                }
            );

            // console.log('유저 이미지', res.data.uCharImg);
            setuCharImg(res.data.uCharImg);
            // setMissions(res.data);
        };

        getUCharImg();
    }, []); // 빈 의존성 배열 : 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <div className="face-div">
            <div className="face-background">
                <img src={uCharImg} className="face" alt="유저 캐릭터 이미지" />
            </div>
            <div className="progress-div">
                <div className="my-progress">
                    <div className="my-bar"></div>
                </div>
            </div>
        </div>
    );
}
