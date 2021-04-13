import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../featrues/userSlice';

export default configureStore({
    reducer: {
        user: useReducer,
    }
})