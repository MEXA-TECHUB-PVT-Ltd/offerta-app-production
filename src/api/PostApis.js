////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

////////////LISTING LIKES//////////
export const post_Like_Listings = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "like.php", {
    user_id: user_id,
    listing_id: props,
  });
};
export const post_Like_Listings_NEW = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "likelist.php", {
    user_id: user_id,
    listing_id: props,
  });
};
export const check_subscription_status = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "stripefinal/checkstatus.php", {
    user_id: user_id,
  });
};
export const store_subscription_history = async (props) => {
  return axios.post(BASE_URL + "stripefinal/paymentsubscription.php", props);
};

export const GET_LIKE_STATUS_NEW = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "islike.php", {
    user_id: user_id,
    listing_id: props,
  });
};

////////////LISTING UNLIKES//////////
export const post_UnLike_Listings = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "disLike.php", {
    user_id: user_id,
    listing_id: props,
  });
};
export const post_UnLike_Listings_NEW = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "dislikelist.php", {
    user_id: user_id,
    listing_id: props,
  });
};
////////////LISTING VIEWS//////////
export const post_Views_Listings = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.post(BASE_URL + "ViewList.php", {
    user_id: user_id,
    listing_id: props,
  });
};

////////////LISTING Comments//////////
export const post_Comments_Listings = async (listing_id, description) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.post(BASE_URL + "commentOnList.php", {
    user_id: user_id,
    listing_id: listing_id,
    comment: description,
  });
};

/////////////////////Exchange Offer////////////
export const post_Listings_Exchange_Offer = async (props) => {
  return axios.post(BASE_URL + "createExchange.php", {
    user_id: props.myuser_id,
    second_user: props.otheruser_id,
    item: props.my_item_id,
    item2: props.other_item_id,
  });
};

/////////////////////Price Offer////////////
export const post_Listings_Price_Offer = async (
  other_user,
  other_listings,
  offer_price
) => {
  var user_id = await AsyncStorage.getItem("Userid");
  let data = {
    user_id: user_id,
    sale_by: other_user,
    listing_id: other_listings,
    price: offer_price,
  };
  console.log("data : ", data);
  return axios.post(BASE_URL + "createOffer.php", data);
};

/////////////////////Counter Offer////////////
export const post_Listings_Conter_Offer = async (
  user_id,
  sale_by,
  listing_id,
  price
) => {
  // var user_id = await AsyncStorage.getItem("Userid");

  console.log("data passed to create counter offer  :   ", {
    user_id,
    sale_by,
    listing_id,
    price,
  });

  return axios.post(BASE_URL + "counterOffert.php", {
    user_id: user_id,
    sale_by: sale_by,
    listing_id: listing_id,
    price: price,
  });
};

///////////////////User Functions////////////
//-------------->Follow Users
export const post_Follow_Users = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.post(BASE_URL + "follow.php", {
    user_id: user_id,
    following_id: props,
  });
};
//-------------->UnFollow Users
export const post_UnFollow_Users = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.post(BASE_URL + "unfollow.php", {
    user_id: user_id,
    following_id: props,
  });
};

export const update_notification = async (id, status) => {
  return axios.put(BASE_URL + "UpdateNotificationStatus.php", {
    id: id,
    status: status,
  });
};

// update like notification
export const update_like_notification = async (id, status) => {
  return axios.put(BASE_URL + "updatelikestatus.php", {
    id: id,
    // status: status,
  });
};

// update comment notification
export const update_comment_notification = async (id, status) => {
  return axios.put(BASE_URL + "updatecommentstatus.php", {
    id: id,
    // status: status,
  });
};

// update listing details
export const updateListingDetails = async (data) => {
  console.log("data  : ", data);
  return axios.put(BASE_URL + "updateList.php", data);
};
