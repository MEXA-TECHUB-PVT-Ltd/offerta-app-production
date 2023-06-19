////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////Get ALL Users //////////
export const get_Sales = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "mySale.php?user_id=" + user_id);
};
export const get_Sales_new = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getSellerOrders.php?seller_id=" + user_id);
};

//////////////Get Specific User //////////
export const get_Orders = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "myOrder.php?user_id=" + user_id);
};

export const get_Orders_new = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "getBuyerOrders.php?buyer_id=" + user_id);
};

//////////////Get ALL Users //////////
export const get_Urgent_Promotions = async () => {
  return axios.get(BASE_URL + "getUrgentConfiguration.php");
};

//////////////Get Specific User //////////
export const get_Advertisement_Promotions = async () => {
  return axios.get(BASE_URL + "getAllAdDetail.php");
};

////////////LISTING Promotion Creation//////////
export const post_Promotions = async (
  list_id,
  promotion_type,
  promotion_id
) => {
  var user_id = await AsyncStorage.getItem("Userid");
  let data = {
    user_id: user_id,
    listing_id: list_id,
    type: promotion_id,
    promotion_type_id: promotion_type,
  };
  console.log("data passed to create promotion", data);
  return axios.post(BASE_URL + "createPromotion.php", data);
};
export const post_Promotions_new = async (
  list_id,
  feature_id,
  promotion_id,
  promotionType,
  start_date,
  expiry_date
) => {
  var user_id = await AsyncStorage.getItem("Userid");
  let data = {
    user_id: user_id,
    listing_id: list_id,
    feature_id: feature_id,
    promotion_id: promotion_id,
    createddate: start_date,
    Expirydate: expiry_date,
  };
  console.log("data passed to create promotion", data);
  return axios.post(BASE_URL + "promotelisting.php", data);
};

export const post_verification_detail = async (obj) => {
  return axios.post(BASE_URL + "payment.php", obj);
};

export const send_new_banner_req_to_admin = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  let data = {
    id: user_id,
  };
  return axios.post(BASE_URL + "requestsendbanner.php", data);
};

export const send_new_verification_req_to_admin = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  let data = {
    id: user_id,
  };
  return axios.post(BASE_URL + "requestsenduserverify.php", data);
};

export const cancel_user_verification = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  let data = {
    id: user_id,
  };
  return axios.post(BASE_URL + "unsubscribe.php", data);
};

//////////////Get Listings Insights//////////
export const get_Listings_Insights = async (props) => {
  return axios.get(BASE_URL + "insightOnList.php?listing_id=" + props);
};
