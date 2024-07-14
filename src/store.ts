import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/taskSlice';

export const store: any = configureStore({
  reducer: {
    tasks: taskReducer
  },
});

