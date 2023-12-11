import { combineReducers } from '@reduxjs/toolkit';

import dummyGroup from './slices/groupSlice';
import user from './slices/userSlice';
import mission from './slices/missionSlice';
import page from './slices/pageSlice';

// combineReducers : 여러 개의 reducer을 하나로 합침
const rootReducer = combineReducers({
    dummyGroup,
    user,
    mission,
    page,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;

//=== 필요한 데이터 ===
//-- 1. 미션
// 미션 제목
// 미션 인증방법
// 미션 난이도

//-- 2. 멤버
// 멤버 닉네임
// 멤버 자기소개

//-- 3. 모임
// 모임명
// 모임장
// 모임 멤버
// 미션 디데이
