import { configureStore } from '@reduxjs/toolkit';
import rankReducer from '../features/rank/store/Rank.slice';
import optionReducer from '../features/option/store/Option.slice';
import tierReducer from '../features/tier/store/Tier.slice';
import voteReducer from '../features/vote/store/Vote.slice';
import assignmentReducer from '../features/assignment/store/Assignment.slice';
import userReducer from '../features/user/store/User.slice';
import authReducer from '../features/auth/store/Auth.slice';

export const store = configureStore({
  reducer: {
    rank: rankReducer,
    option: optionReducer,
    tier: tierReducer,
    vote: voteReducer,
    assignment: assignmentReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
