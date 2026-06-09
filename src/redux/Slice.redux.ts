import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../services';

interface UsersState {
  seachQuery: string;
  selectedUser: User | null;
}

const initialState: UsersState = {
  seachQuery: '',
  selectedUser: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSeachQuery: (state, action: PayloadAction<string>) => {
      state.seachQuery = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    resetUserState: state => {
      state.seachQuery = '';
      state.selectedUser = null;
    },
  },
});

export const {setSeachQuery, setSelectedUser, resetUserState} =
  usersSlice.actions;
