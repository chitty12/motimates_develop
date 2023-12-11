import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
    gSeq: 0,
    gName: '모던 자바스크립트 딥다이브 책 스터디',
    gDesc: ' 모던 자바스크립트 딥다이브책에 대해 서로 발표하고 시험을 치는 스터디입니다! 6주 동안 화이팅 있게 자바스크립트를 훑으면서 프론트엔드 면접을 대비하고 싶습니다..! 1주일에 2번 정도 오프라인으로 할 생각입니다.',
    gDday: '2023-11-31',
    gMaxMem: 5,
    gCategory: 'st',
    gCoverImg:
        'https://velog.velcdn.com/images/tamagoyakii/post/978c4103-71ea-4c0a-91c9-e2c4a34914b0/image.png',
    missionArray: [
        {
            mTitle: '1주차',
            mContent: '1~5장, 6~9장',
            mLevel: 1,
        },
        {
            mTitle: '2주차',
            mContent: '10~13장, 14~17장',
            mLevel: 3,
        },
        {
            mTitle: '3주차',
            mContent: '17장~20장, 21장~24장',
            mLevel: 5,
        },
    ],
};

const dummyGroupSlice = createSlice({
    name: 'dummyGroup',
    initialState,
    reducers: {
        changeGroup(state, action) {
            state.gSeq = action.payload.gSeq;
            state.gName = action.payload.gName;
            state.gDesc = action.payload.gDesc;
            state.gDday = action.payload.gDday;
            state.gMaxMem = action.payload.gMaxMem;
            state.gCategory = action.payload.gCategory;
            state.gCoverImg = action.payload.gCoverImg;
            state.missionArray = action.payload.missionArray;
            // state.mTitle = action.payload.mTitle;
            // state.mContent = action.payload.mContent;
            // state.mLevel = action.payload.mLevel;
        },

        // changeLike(state, action) {
        //   let 번호 = state.findIndex((item) => item.id === action.payload);
        //   console.log(state[번호 + 1].like);
        //   // state[번호 + 1].like = false;
        //   state[번호 + 1].like = !state[번호 + 1].like;
        //   // state[번호 + 1].like ? false : true;
        // },
    },
});

export default dummyGroupSlice.reducer;
export const { changeGroup } = dummyGroupSlice.actions;
