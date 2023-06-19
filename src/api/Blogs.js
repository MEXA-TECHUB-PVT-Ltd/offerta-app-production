////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

//////////////Get ALL Users //////////
export const get_All_Blogs = async () => {
  return axios.get(BASE_URL + "getAllBlogs.php");
};

//////////////Get Specific User //////////
export const get_Blogs_By_id = async (props) => {
  return axios.get(BASE_URL + "getBlogById.php?id=" + props);
};

//////////////Get ALL Users //////////
export const get_Privacy_Policy = async () => {
  return axios.get(BASE_URL + "getPrivacyPolicy.php");
};

//////////////Get Specific User //////////
export const get_Terms_Condition = async () => {
  return axios.get(BASE_URL + "getTermsAndCondition.php");
};
