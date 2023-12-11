import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { GroupStateType } from 'src/types/types';
import { Link } from 'react-router-dom';

export default function GroupSearch({
    searchInput,
    selectedArr,
    categoryQuery,
}: any) {
    const cookie = new Cookies();
    const uToken = cookie.get('isUser');

    const [searchGroupList, setSearchGroupList] = useState([]);

    console.log(selectedArr);

    useEffect(() => {
        const getSearchGroupList = async () => {
            const res = await axios.get(
                // 임시로 전체 검색
                `${process.env.REACT_APP_DB_HOST}/group?search=${searchInput}&category=${selectedArr}`
            );

            console.log('검색결과', res.data.groupArray);
            setSearchGroupList(res.data.groupArray);
        };

        getSearchGroupList();
    }, [searchInput, selectedArr]);

    console.log('searchGroupList', searchGroupList);

    return (
        <div>
            <div className="title3" style={{ marginBottom: '2rem' }}>
                검색 결과
            </div>

            <div className="search-group-grid">
                {searchGroupList?.length === 0 || searchGroupList == undefined
                    ? '검색 결과가 없습니다.'
                    : searchGroupList?.map((searchGroup: GroupStateType) => (
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
