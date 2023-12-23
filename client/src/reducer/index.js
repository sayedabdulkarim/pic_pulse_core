export const initialState = {
  user: localStorage.user ? JSON.parse(localStorage.user) : null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE":
      return {
        ...state,
        user: {
          ...state.user,
          followers: action.payload.followers,
          following: action.payload.following,
        },
        // user: { ...state.user, followers: [...state.user.followers, ...action.payload.followers], following: [state.user.following, ...action.payload.following] }
      };
    case "UPDATE_PIC":
      return {
        ...state,
        user: { ...state.user, pic: action.payload },
        // user: { ...state.user, followers: [...state.user.followers, ...action.payload.followers], following: [state.user.following, ...action.payload.following] }
      };
    case "CLEAR_ALL":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
