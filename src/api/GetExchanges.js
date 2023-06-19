
////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////Get ALL Users //////////
export const get_Incoming_Exchnages = async () => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.get(BASE_URL + "incomingExchanges.php?user_id="+user_id);
};

//////////////Get Specific User //////////
export const get_outgoing_Exchnages = async () => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.get(BASE_URL + "outgoingExchanges.php?user_id=" + user_id);
};
//////////////Get Specific User //////////
export const get_failed_Exchnages = async () => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.get(BASE_URL + "failedExchanges.php?user_id=" + user_id);
};
//////////////Get Specific User //////////
export const get_sucess_Exchnages = async () => {
  var user_id=await AsyncStorage.getItem("Userid")
  return axios.get(BASE_URL + "successExchange.php?user_id=" + user_id);
};





