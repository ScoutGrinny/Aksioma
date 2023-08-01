import * as type from '../actions/userAction';

export const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case type.USER_REG:
      return { ...state, user: action.payload };

    case type.USER_AUTH:
      return { ...state, user: action.payload };

    case type.USER_LOGOUT:
      return { ...state, user: action.payload };

    case type.USER_AVATAR:
      return { ...state, user: { ...state.user, image: action.payload } };
    default:
      return state;
  }
};
