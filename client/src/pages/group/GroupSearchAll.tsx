import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { GroupStateType } from 'src/types/types';
import { Link } from 'react-router-dom';

import { Paper } from '@mui/material';

export default function GroupSearchAll({
    searchInput,
    selectedArr,
    categoryQuery,
}: any) {
    const cookie = new Cookies();
    const uToken = cookie.get('isUser');

    const [allGroupList, setAllGroupList] = useState<any>([]);

    console.log(selectedArr);

    useEffect(() => {
        const getSearchGroupList = async () => {
            const res = await axios.get(
                // 전체 검색
                `${process.env.REACT_APP_DB_HOST}/group?search=%`
            );

            console.log('검색결과', res.data.groupArray);
            console.log(res);
            setAllGroupList(res.data.groupArray);
        };

        getSearchGroupList();
    }, [searchInput, selectedArr]);

    return (
        <div>
            <div className="title3" style={{ marginBottom: '2rem' }}>
                전체 모임
            </div>

            <div className="search-group-grid">
                {!allGroupList || allGroupList?.length === 0
                    ? '생성된 모임이 없습니다.'
                    : allGroupList?.map((searchGroup: GroupStateType) => (
                          <div
                              key={searchGroup.gSeq}
                              className="search-group-container"
                          >
                              <Link to={`/group/home/${searchGroup.gSeq}`}>
                                  <div className="title-card">
                                      {searchGroup.gName}
                                  </div>
                                  <br />
                                  <span
                                      style={{
                                          // margin: '0px 15px',
                                          color: '#8D6262',
                                          //   fontWeight: 'bold',
                                          //   fontSize: '1.2rem',
                                      }}
                                  >
                                      <span className="title5">D-day</span>
                                  </span>
                                  <div className="title6">
                                      {searchGroup.gDday}
                                  </div>
                              </Link>
                          </div>
                      ))}
            </div>
        </div>
    );
}
