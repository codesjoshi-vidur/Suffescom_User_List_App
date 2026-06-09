import {configureStore} from '@reduxjs/toolkit';
import {usersSlice} from './Slice.redux';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
