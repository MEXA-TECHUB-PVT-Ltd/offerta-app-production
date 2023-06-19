

//////////////Other User Info/////////////////

//------------->Followers
export const SET_OTHER_USER_Followers_Count_INC = "SET_OTHER_USER_Followers_Count_INC";
export const setOtherUserFollowersCountINC = (other_user_followers_count) => (dispatch) => {
  dispatch({
    type: SET_OTHER_USER_Followers_Count_INC,
    payload: other_user_followers_count,
  });
};
export const SET_OTHER_USER_Followers_Count_DEC = "SET_OTHER_USER_Followers_Count_DEC";
export const setOtherUserFollowersCountDEC = (other_user_followers_count) => (dispatch) => {
  dispatch({
    type: SET_OTHER_USER_Followers_Count_DEC,
    payload: other_user_followers_count,
  });
};
export const SET_OTHER_USER_Followers_Status = "SET_OTHER_USER_Followers_Status";
export const setOtherUserFollowersStatus = (other_user_followers_status) => (dispatch) => {
  dispatch({
    type: SET_OTHER_USER_Followers_Status,
    payload: other_user_followers_status,
  });
};
//------------->Followings
export const SET_OTHER_USER_Followings_Count_INC= "SET_OTHER_USER_Followings_Count_INC";
export const setOtherUserFollowingsCountINC = (other_user_followings_count_inc) => (dispatch) => {
  dispatch({
    type: SET_OTHER_USER_Followings_Count_INC,
    payload: other_user_followings_count_inc,
  });
};
export const SET_OTHER_USER_Followings_Count_DEC= "SET_OTHER_USER_Followings_Count_DEC";
export const setOtherUserFollowingsCountDEC = (other_user_followings_count_dec) => (dispatch) => {
  dispatch({
    type: SET_OTHER_USER_Followings_Count_DEC,
    payload: other_user_followings_count_dec,
  });
};
export const SET_OTHER_USER_Followings_Status= "SET_OTHER_USER_Followings_Status";
export const setOtherUserFollowingsStatus = (other_user_followings_status) => (dispatch) => {
  dispatch({
    type: SET_OTHER_USER_Followings_Status,
    payload: other_user_followings_status,
  });
};
