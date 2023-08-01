import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { basketReducer } from './reducers/basketReducer';

const reducer = combineReducers({
  userStore: userReducer,
  basketStore: basketReducer,

});

export const store = configureStore({ reducer });
