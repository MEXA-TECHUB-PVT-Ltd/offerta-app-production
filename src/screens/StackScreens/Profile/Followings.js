import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import ListCard from "../../../components/CustomCards/ListCard";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

/////////////app api functions//////////
import { get_Login_User_Followings_List } from "../../../api/GetApis";
import TranslationStrings from "../../../utills/TranslationStrings";

const Followings = ({ navigation, route }) => {
  /////////////main menu status states/////////////
  const [followings_list, setFollowings_List] = useState("");
  const GetFollowings = async () => {
    get_Login_User_Followings_List().then((response) => {
      if (response.data.msg === "No follower yet") {
        setFollowings_List("");
      } else {
        setFollowings_List(response.data);
      }
    });
  };
  useEffect(() => {
    GetFollowings();
  }, []);
  const renderItem = ({ item }) => (
    <ListCard
      image={{ uri: IMAGE_URL + item.user.image }}
      usename={item.user.user_name}
      fullname={item.user.full_name}
      type={item.status}
      btnstatus={true}
      onpress={() => navigation.navigate("ListingsDetails")}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      > */}
      <CustomHeader
        headerlabel={TranslationStrings.FOLLOWINGS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />
      <FlatList
        data={followings_list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Followings;
