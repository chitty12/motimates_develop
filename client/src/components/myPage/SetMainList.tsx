import React, { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import axios from 'axios';

import SetMainItem from './SetMainItem';

export default function SetMainList(props: any) {
    const cookie = new Cookies();
    const uToken = cookie.get('isUser'); // 토큰 값
    // interface Group {
    //     groupId: number;
    //     groupName: string | number;
    //     dDay: string | number;
    // }

    // 그룹 정보 받아오기
    // const [groupArr, setGroupArr] = useState([]);

    // const getGroupList = async () => {
    //     const res = await axios
    //         .get(
    //             // 임시로 전체 검색
    //             `${process.env.REACT_APP_DB_HOST}/group?search=%&category=%`,
    //             // `${process.env.REACT_APP_DB_HOST}api/group?search=${searchInput}&category=${}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${uToken}`,
    //                 },
    //             }
    //         )
    //         .then((res) => {
    //             // console.log(res.data.groupArray);
    //             setGroupArr(res.data.groupArray);
    //         });
    // };
    // useEffect(() => {
    //     getGroupList();
    // }, []);

    // 임시 그룹
    // const groupArr: Group[] = [
    //     // {
    //     //     groupId: 1,
    //     //     groupName: '코딩학당',
    //     //     dDay: 'D-3',
    //     // },
    //     // {
    //     //     groupId: 2,
    //     //     groupName: '근손실방지',
    //     //     dDay: 'D-7',
    //     // },
    // ];

    return (
        <div>
            <table className="setMain-table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>D-Day</th>
                        <th>달성률</th>
                    </tr>
                </thead>
                <tbody>
                    <SetMainItem
                        // groupArr={groupArr}
                        setDdayPin={props.setDdayPin}
                        dDayPin={props.dDayPin}
                        handleCheckDday={props.handleCheckDday}
                        setDonePin={props.setDonePin}
                        donePin={props.donePin}
                        handleCheckDone={props.handleCheckDone}
                    />
                </tbody>
            </table>
        </div>
    );
}
