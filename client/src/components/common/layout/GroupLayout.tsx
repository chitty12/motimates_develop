import React from 'react';
import SidebarChat from '../SidebarChat';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Item from '@mui/material/ListItem';

import SideBarGroup from '../SidebarGroup';
import Footer from '../Footer';

// groupbar section chat
export default function GroupLayout({ children, showChat }: any) {
    return (
        <>
            {/* 전체 레이아웃 컨테이너 */}
            <div className="layout-container">
                <Grid container>
                    <>
                        {/* 그룹 메뉴 바 컴포넌트 들어갈 곳 */}
                        <Grid md={2} sm={12} xs={12} className="groupMenu-div">
                            <Item
                                style={{
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: '5rem',
                                }}
                            >
                                <SideBarGroup />
                            </Item>
                        </Grid>

                        <Grid
                            md={8}
                            sm={12}
                            xs={12}
                            className="section-wrapper"
                        >
                            {' '}
                            <Item
                                style={{
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: '5rem',
                                }}
                            >
                                {children}
                            </Item>
                        </Grid>

                        {/* 채팅 컴포넌트 들어갈 곳 */}
                        <Grid md={2} sm={0} xs={0} className="chatting-div">
                            <Item
                                style={{
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                    paddingTop: 0,
                                }}
                            >
                                {showChat ? <SidebarChat /> : null}
                            </Item>
                        </Grid>
                        <Footer />
                    </>
                </Grid>
            </div>
        </>
    );
}
