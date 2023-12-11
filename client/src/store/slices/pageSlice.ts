import { createSlice } from '@reduxjs/toolkit';

// 초기 상태
const initialState = {
    page: '공지사항',
};

const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        changePage(state, action) {
            state.page = action.payload.type;
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

export default pageSlice.reducer;
export const { changePage } = pageSlice.actions;
