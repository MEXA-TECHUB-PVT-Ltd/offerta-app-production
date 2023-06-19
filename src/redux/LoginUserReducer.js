import {
  SET_LOGIN_USER_Followers_Count,
  SET_LOGIN_USER_Followings_Count,
  SET_LOGIN_USER_Followings_Status,
  SET_LOGIN_USER_Followers_Status,
  SET_LOGIN_USER_Shipping_Address,
  SET_ORDER_Shipping_Address,
} from "./LoginUserActions";
const initialState = {
  login_user_followers_count:0,
  login_user_followers_status:"",
  login_user_followings_count:0,
  login_user_followings_status:"",
  login_user_shipping_address:"",
  order_shipping_address:""
};

function loginuserReducer(state = initialState, action) {
  switch (action.type) {
    ////////////////users/////////////
    case SET_LOGIN_USER_Followers_Count:
      return { ...state, login_user_followers_count: action.payload };
    case SET_LOGIN_USER_Followers_Status:
      return { ...state, login_user_followers_status: action.payload };
    case SET_LOGIN_USER_Followings_Count:
      return { ...state, login_user_followings_count: action.payload };
    case SET_LOGIN_USER_Followings_Status:
      return { ...state, login_user_followings_status: action.payload };
      case SET_LOGIN_USER_Shipping_Address:
        return { ...state, login_user_shipping_address: action.payload };
        case SET_ORDER_Shipping_Address:
          return { ...state, order_shipping_address: action.payload };
    default:
      return state;
  }
}

export default loginuserReducer;
