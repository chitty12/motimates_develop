import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

//] store 정의 : 전역 상태를 관리하는 공간
const store = configureStore({
    reducer: rootReducer,
    devTools: true,
});

export default store;
