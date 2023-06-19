////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////Get Shipping Address//////////
export const get_Shipping_Address = async () => {
  var user_id = await AsyncStorage.getItem("Userid");
  return axios.get(BASE_URL + "userShippings.php?user_id=" + user_id);
};

/////////////////////Create Shipping Address////////////
export const post_shipping_Address = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");
  // console.log("props  ::::::::::::::::::::::::::::::::::  ", props);
  let data = {
    user_id: user_id,
    country: props.country,
    address_1: props.address_1,
    address_2: props.address_2,
    city: props.city,
    state: "here",
    zipcode: props.zip_code,
    phone_no: props.phone_number,
  };
  console.log("data   :::  ", data);
  return axios.post(BASE_URL + "createShipping.php", data);
};
/////////////////////Create Shipping Address////////////
export const update_shipping_Address = async (props) => {
  var user_id = await AsyncStorage.getItem("Userid");

  return axios.put(BASE_URL + "updateShipping.php", {
    id: props.shipping_id,
    user_id: user_id,
    country: props.country,
    address_1: props.address_1,
    address_2: props.address_2,
    city: props.city,
    state: props.state,
    zipcode: props.zip_code,
    phone_no: props.phone_number,
  });
};
