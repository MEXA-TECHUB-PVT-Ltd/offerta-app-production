//////////////Login User Info/////////////////
//------------->Followers
export const SET_LOGIN_USER_Followers_Count = "SET_LOGIN_USER_Followers_Count";
export const setLoginUserFollowersCount =
  (login_user_followers_count) => (dispatch) => {
    dispatch({
      type: SET_LOGIN_USER_Followers_Count,
      payload: login_user_followers_count,
    });
  };
export const SET_LOGIN_USER_Followers_Status =
  "SET_LOGIN_USER_Followers_Status";
export const setLoginUserFollowersStatus =
  (login_user_followers_status) => (dispatch) => {
    dispatch({
      type: SET_LOGIN_USER_Followers_Status,
      payload: login_user_followers_status,
    });
  };
//------------->Followings
export const SET_LOGIN_USER_Followings_Count =
  "SET_LOGIN_USER_Followings_Count";
export const setLoginUserFollowingsCount =
  (login_user_followings_count) => (dispatch) => {
    dispatch({
      type: SET_LOGIN_USER_Followings_Count,
      payload: login_user_followings_count,
    });
  };
export const SET_LOGIN_USER_Followings_Status =
  "SET_LOGIN_USER_Followings_Status";
export const setLoginUserFollowingsStatus =
  (login_user_followings_status) => (dispatch) => {
    dispatch({
      type: SET_LOGIN_USER_Followings_Status,
      payload: login_user_followings_status,
    });
  };

////////////////////user shipping address/////////////
export const SET_LOGIN_USER_Shipping_Address =
  "SET_LOGIN_USER_Shipping_Address";
export const setLoginUserShippingAddress =
  (login_user_shipping_address) => (dispatch) => {
    dispatch({
      type: SET_LOGIN_USER_Shipping_Address,
      payload: login_user_shipping_address,
    });
  };

////////////////////user shipping address/////////////
export const SET_ORDER_Shipping_Address = "SET_ORDER_Shipping_Address";
export const setOrderShippingAddress =
  (order_shipping_address) => (dispatch) => {
    dispatch({
      type: SET_ORDER_Shipping_Address,
      payload: order_shipping_address,
    });
  };
