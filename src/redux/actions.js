//////////////User Info/////////////////
export const SET_LOGIN_USER_ID = "SET_LOGIN_USER_ID";

export const setLoginUserId = (login_user_id) => (dispatch) => {
  dispatch({
    type: SET_LOGIN_USER_ID,
    payload: login_user_id,
  });
};
export const SET_USER_NAME = "SET_USER_NAME";

export const setName = (name) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};
//////////////User Email/////////////////
export const SET_USER_Email = "SET_USER_Email";

export const setEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_Email,
    payload: email,
  });
};
//////////////////////images Info//////////////////
export const SET_USER_IMAGE = "SET_USER_IMAGE";

export const setUserImage = (user_image) => (dispatch) => {
  dispatch({
    type: SET_USER_IMAGE,
    payload: user_image,
  });
};
export const SET_SIGNUP_ROLE = "SET_SIGNUP_ROLE";

export const setsignupRole = (signup_role) => (dispatch) => {
  dispatch({
    type: SET_SIGNUP_ROLE,
    payload: signup_role,
  });
};

/////////////////Set Item Images array/////////////
export const SET_ITEM_IMAGES_ARRAY = "SET_ITEM_IMAGES_ARRAY";
export const setItemImagesArray = (item_images_array) => ({
  type: "SET_ITEM_IMAGES_ARRAY",
  payload: item_images_array,
});

//////////////////DROPDOWNS//////////////////
//-------------->/Categories
export const SET_CATEGORY_NAME = "SET_CATEGORY_NAME";
export const SET_CATEGORY_ID = "SET_CATEGORY_ID";

export const setCategoryName = (category_name) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_NAME,
    payload: category_name,
  });
};
export const setCategoryId = (category_id) => (dispatch) => {
  dispatch({
    type: SET_CATEGORY_ID,
    payload: category_id,
  });
};
//-------------->/Categories
export const SET_SUB_CATEGORY_NAME = "SET_SUB_CATEGORY_NAME";
export const SET_SUB_CATEGORY_ID = "SET_SUB_CATEGORY_ID";

export const setSubCategoryName = (sub_category_name) => (dispatch) => {
  dispatch({
    type: SET_SUB_CATEGORY_NAME,
    payload: sub_category_name,
  });
};
export const setSubCategoryId = (sub_category_id) => (dispatch) => {
  dispatch({
    type: SET_SUB_CATEGORY_ID,
    payload: sub_category_id,
  });
};

//-------------->/Product Condition
export const SET_PRODUCT_CONDITION = "SET_PRODUCT_CONDITION";

export const setProductCondition = (product_condition) => (dispatch) => {
  dispatch({
    type: SET_PRODUCT_CONDITION,
    payload: product_condition,
  });
};

//////LISTING FILTER DROPDOWNS///////////
//------------->POST WITHING DD NAME
export const SET_POST_WITHIN = "SET_POST_WITHIN";

export const setPostWithinDD = (post_within) => (dispatch) => {
  dispatch({
    type: SET_POST_WITHIN,
    payload: post_within,
  });
};
//------------->POST WITHING DD VALUE
export const SET_POST_WITHIN_VALUE = "SET_POST_WITHIN_VALUE";

export const setPostWithinDDValue = (post_within_value) => (dispatch) => {
  dispatch({
    type: SET_POST_WITHIN_VALUE,
    payload: post_within_value,
  });
};
//------------->SORT BY DD NAME
export const SET_SORT_BY = "SET_SORT_BY";
export const setSortByDD = (sort_by) => (dispatch) => {
  dispatch({
    type: SET_SORT_BY,
    payload: sort_by,
  });
};
//------------->SORT BY DD NAME
export const SET_SORT_BY_VALUE = "SET_SORT_BY_VALUE";
export const setSortByDDValue = (sort_by_value) => (dispatch) => {
  dispatch({
    type: SET_SORT_BY_VALUE,
    payload: sort_by_value,
  });
};

////////////////////LISTINGS ID///////////
export const SET_LISTING_ID = "SET_LISTING_ID";

export const setListingId = (listing_id) => (dispatch) => {
  dispatch({
    type: SET_LISTING_ID,
    payload: listing_id,
  });
};

////////////////////Exchange OFFER ON LISTINGS///////////
export const SET_EXCHANGE_OTHER_LISTING = "SET_EXCHANGE_OTHER_LISTING";

export const setExchangeOffer_OtherListing =
  (exchange_other_listing) => (dispatch) => {
    dispatch({
      type: SET_EXCHANGE_OTHER_LISTING,
      payload: exchange_other_listing,
    });
  };

export const SET_EXCHANGE_MY_LISTING = "SET_EXCHANGE_MY_LISTING";

export const setExchangeOffer_MyListing =
  (exchange_my_listing) => (dispatch) => {
    dispatch({
      type: SET_EXCHANGE_MY_LISTING,
      payload: exchange_my_listing,
    });
  };

//////////////////////////Offers data//////////////
//---------------->Exchange Offer
export const SET_Exchange_OFFER = "SET_Exchange_OFFER";

export const setExchangeOffer = (price_offer) => (dispatch) => {
  dispatch({
    type: SET_PRICE_OFFER,
    payload: price_offer,
  });
};

//---------------->Price Offer
export const SET_PRICE_OFFER = "SET_PRICE_OFFER";

export const setPriceOffer = (price_offer) => (dispatch) => {
  dispatch({
    type: SET_PRICE_OFFER,
    payload: price_offer,
  });
};

////////////////APP LOGIN STATES/////////////////////
export const SET_LOCATION_LAT = "SET_LOCATION_LAT";
export const SET_LOCATION_LNG = "SET_LOCATION_LNG";
export const SET_LOCATION_ADDRESS = "SET_LOCATION_ADDRESS";

///////////////User Login Info///////////////
export const setLocationLat = (location_lat) => (dispatch) => {
  dispatch({
    type: SET_LOCATION_LAT,
    payload: location_lat,
  });
};
export const setLocationLng = (location_lng) => (dispatch) => {
  dispatch({
    type: SET_LOCATION_LNG,
    payload: location_lng,
  });
};
export const setLocationAddress = (location_address) => (dispatch) => {
  dispatch({
    type: SET_LOCATION_ADDRESS,
    payload: location_address,
  });
};

////////////////Listing slider distance///////////
export const SET_SLIDER_DISTANCE = "SET_SLIDER_DISTANCE";

export const setSliderDistance = (slider_distance) => (dispatch) => {
  dispatch({
    type: SET_SLIDER_DISTANCE,
    payload: slider_distance,
  });
};

////////////////Listing slider distance///////////
export const SET_NAV_PLACE = "SET_NAV_PLACE";

export const setNavPlace = (nav_plcae) => (dispatch) => {
  dispatch({
    type: SET_NAV_PLACE,
    payload: nav_plcae,
  });
};

export const SET_CHAT_COUNT = "SET_CHAT_COUNT";
export const setChatCount = (nav_plcae) => (dispatch) => {
  dispatch({
    type: SET_CHAT_COUNT,
    payload: nav_plcae,
  });
};
export const SET_NOTIFICATION_COUNT = "SET_NOTIFICATION_COUNT";
export const setNotificationCount = (nav_plcae) => (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION_COUNT,
    payload: nav_plcae,
  });
};

export const SET_NOTIFICATION_LIST = "SET_NOTIFICATION_LIST";
export const setNotificationList = (nav_plcae) => (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION_LIST,
    payload: nav_plcae,
  });
};

export const SET_CHAT_LIST = "SET_CHAT_LIST";
export const setChatList = (nav_plcae) => (dispatch) => {
  dispatch({
    type: SET_CHAT_LIST,
    payload: nav_plcae,
  });
};
