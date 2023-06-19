import {
  ///////////////User//////////////
  SET_LOGIN_USER_ID,
  SET_USER_NAME,
  SET_USER_IMAGE,
  SET_USER_Email,

  /////////////////Set Item Images array/////////////
  SET_ITEM_IMAGES_ARRAY,

  ////////////signup role/////////////////
  SET_SIGNUP_ROLE,

  //////////DROPDOWNS///////////
  //----------->Category
  SET_CATEGORY_NAME,
  SET_CATEGORY_ID,
  //----------->Sub Category
  SET_SUB_CATEGORY_NAME,
  SET_SUB_CATEGORY_ID,
  //----------->Product Condition
  SET_PRODUCT_CONDITION,

  //////////LISTING ID/////////
  SET_LISTING_ID,

  ////////////////////Exchange OFFER ON LISTINGS///////////
  SET_EXCHANGE_MY_LISTING,
  SET_EXCHANGE_OTHER_LISTING,

  ////////////////////OFFER//////////
  //---------------> Price Offer
  SET_PRICE_OFFER,

  ////////////////Order Location detail//////////////
  SET_LOCATION_LAT,
  SET_LOCATION_LNG,
  SET_LOCATION_ADDRESS,

  ////////////LISTING FILTER DD////////////
  //------------->POST WITHING DD NAME
  SET_POST_WITHIN,
  //------------->POST WITHING DD VALUE
  SET_POST_WITHIN_VALUE,
  //------------->SORT BY DD NAME
  SET_SORT_BY,
  //------------->SORT BY DD VALUE
  SET_SORT_BY_VALUE,

  ////////SLIDER DISTANCE//////////
  SET_SLIDER_DISTANCE,

  ////////NAV PLACE//////////
  SET_NAV_PLACE,
  SET_CHAT_COUNT,
  SET_NOTIFICATION_COUNT,
  SET_NOTIFICATION_LIST,
  SET_CHAT_LIST,
} from "./actions";

const initialState = {
  ////////////////\USER////////////
  login_user_id: "",
  name: "",
  user_image: "",
  email: "",

  /////////////////Set Item Images array/////////////
  item_images_array: [],

  //////////////signup role/////////////
  signup_role: "",

  //////////DROPDOWNS///////////
  //-------->Category
  category_name: "",
  category_id: "",
  //-------->Sub Category
  sub_category_name: "",
  sub_category_id: "",
  //-------->Product Condition
  product_condition: "",

  ////////LISTING ID////////
  listing_id: "",

  ////////////////////Exchange OFFER ON LISTINGS///////////
  exchange_other_listing: "",
  exchange_my_listing: "",

  ////////////////Order Location detail//////////////
  location_lat: "",
  location_lng: "",
  location_address: "",

  ////////////LISTING FILTER DD////////////
  //------------->POST WITHING DD NAME
  post_within: "",
  //------------->POST WITHING DD VALUE
  post_within_value: "",
  //------------->SORT BY DD NAME
  sort_by: "",
  //------------->SORT BY DD VALUE
  sort_by_value: "",

  ////////SLIDER DISTANCE//////////
  slider_distance: "",

  ////////SLIDER DISTANCE//////////
  nav_place: "",

  chatCount: 0,
  notificationCount: 0,
  notificationList: [],
  chatList: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    ////////////////users/////////////
    case SET_LOGIN_USER_ID:
      return { ...state, login_user_id: action.payload };
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    case SET_USER_IMAGE:
      return { ...state, user_image: action.payload };
    case SET_USER_Email:
      return { ...state, user_email: action.payload };

    /////////////////Set Item Images array/////////////
    case SET_ITEM_IMAGES_ARRAY:
      return { ...state, item_images_array: action.payload };

    /////////////////Signup role/////////////
    case SET_SIGNUP_ROLE:
      return { ...state, signup_role: action.payload };

    //////////DROPDOWNS///////////
    //----------->Category
    case SET_CATEGORY_ID:
      return { ...state, category_id: action.payload };
    case SET_CATEGORY_NAME:
      return { ...state, category_name: action.payload };
    //----------->Sub Category
    case SET_SUB_CATEGORY_ID:
      return { ...state, sub_category_id: action.payload };
    case SET_SUB_CATEGORY_NAME:
      return { ...state, sub_category_name: action.payload };
    //-------->Product Condition
    case SET_PRODUCT_CONDITION:
      return { ...state, product_condition: action.payload };

    ///////////////////LISTING ID/////////
    case SET_LISTING_ID:
      return { ...state, listing_id: action.payload };

    ////////////////////Exchange OFFER ON LISTINGS///////////
    case SET_EXCHANGE_MY_LISTING:
      return { ...state, exchange_my_listing: action.payload };
    case SET_EXCHANGE_OTHER_LISTING:
      return { ...state, exchange_other_listing: action.payload };

    ////////////////Order Location Detail//////////////
    case SET_LOCATION_LAT:
      return { ...state, location_lat: action.payload };
    case SET_LOCATION_LNG:
      return { ...state, location_lng: action.payload };
    case SET_LOCATION_ADDRESS:
      return { ...state, location_address: action.payload };

    ////////////LISTING FILTER DD////////////
    //------------->POST WITHING DD NAME
    case SET_POST_WITHIN:
      return { ...state, post_within: action.payload };
    //------------->POST WITHING DD VALUE
    case SET_POST_WITHIN_VALUE:
      return { ...state, post_within_value: action.payload };
    //------------->SORT BY DD NAME
    case SET_SORT_BY:
      return { ...state, sort_by: action.payload };
    //------------->SORT BY DD VALUE
    case SET_SORT_BY_VALUE:
      return { ...state, sort_by_value: action.payload };

    ////////SLIDER DISTANCE//////////
    case SET_SLIDER_DISTANCE:
      return { ...state, slider_distance: action.payload };

    ////////NAV PLACE//////////
    case SET_NAV_PLACE:
      return { ...state, nav_place: action.payload };
    case SET_CHAT_COUNT:
      return { ...state, chatCount: action.payload };
    case SET_NOTIFICATION_COUNT:
      return { ...state, notificationCount: action.payload };
    case SET_NOTIFICATION_LIST:
      return { ...state, notificationList: action.payload };
    case SET_CHAT_LIST:
      return { ...state, chatList: action.payload };
    default:
      return state;
  }
}

export default userReducer;
