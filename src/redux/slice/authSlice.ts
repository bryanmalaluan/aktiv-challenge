import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from 'types/authType';
import logger from 'utils/logger';

const loggerName = 'AuthSlice';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: { username: '', password: '' },
  },
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      logger.debug(loggerName, action);
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
