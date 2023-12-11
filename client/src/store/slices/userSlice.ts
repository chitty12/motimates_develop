import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
    uSeq: 0,
    uEmail: 'user@motimates.com',
    uName: '김테스트',
    uImg: '/asset/images/sqr1.svg',
    uCharImg: '/asset/images/sqr1.svg',
    uDesc: '안녕하세요 이번에 취업 전선에 뛰어 들어가고 있는 경영학과를 졸업한 취준생입니다!! 막상 취업은 해야겠지만 어디로 갈지 못 정하고 있는데 기초가 부족한 만큼 노력하겠습니다. ',
    uCategory1: 'it',
    uCategory2: 'ex',
    uCategory3: 're',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // changeLike(state, action) {
        //   let 번호 = state.findIndex((item) => item.id === action.payload);
        //   console.log(state[번호 + 1].like);
        //   // state[번호 + 1].like = false;
        //   state[번호 + 1].like = !state[번호 + 1].like;
        //   // state[번호 + 1].like ? false : true;
        // },
    },
});

export default userSlice.reducer;
// export const {} = dummyGroupSlice.actions;
