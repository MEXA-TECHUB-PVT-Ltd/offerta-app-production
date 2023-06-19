
 ////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
//////////////add chat users/////////////
export const post_User_Chat_Room = async (props) => {
    var user_id=await AsyncStorage.getItem("Userid")
    return axios.post(BASE_URL+'createChatCommunity.php', {
        user_id: user_id,
        chat_with: props,
    })
}

//////////////Get Chat Users //////////
export const get_Chat_Users = async () => {
    var user_id=await AsyncStorage.getItem("Userid")
    return axios.get(BASE_URL + "getUserCommunities.php?user_id="+user_id);
  };