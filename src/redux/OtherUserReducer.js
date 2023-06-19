import {
    SET_OTHER_USER_Followers_Count_INC,
    SET_OTHER_USER_Followers_Count_DEC,
    SET_OTHER_USER_Followings_Count_INC,
    SET_OTHER_USER_Followings_Count_DEC,
    SET_OTHER_USER_Followings_Status,
    SET_OTHER_USER_Followers_Status,
  } from "./OtherUserActions";
  const initialState = {
    other_user_followers_count:0,
    other_user_followers_status:"",
    other_user_followings_count:0,
    other_user_followings_status:""
  
  };
  
  function otheruserReducer(state = initialState, action) {
    switch (action.type) {
      ////////////////users/////////////
      case SET_OTHER_USER_Followers_Count_INC:
        return { ...state, other_user_followers_count: state.other_user_followers_count + 1};
        case SET_OTHER_USER_Followers_Count_DEC:
            return { ...state, other_user_followers_count: state.other_user_followers_count-1 };
      case SET_OTHER_USER_Followers_Status:
        return { ...state, other_user_followers_status: action.payload };
      case SET_OTHER_USER_Followings_Count_INC:
        return { ...state, other_user_followings_count: state.other_user_followings_count+1 };
        case SET_OTHER_USER_Followings_Count_DEC:
            return { ...state, other_user_followings_count: state.other_user_followings_count-1 };
      case SET_OTHER_USER_Followings_Status:
        return { ...state, other_user_followings_status: action.payload };
  
      default:
        return state;
    }
  }
  
  export default otheruserReducer;
  