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

////////////app api function///////////
import { get_Login_User_Followers_List } from "../../../api/GetApis";
import TranslationStrings from "../../../utills/TranslationStrings";

const Followers = ({ navigation, route }) => {
  ////////////Folllowr list data///////////
  const [follwer_list, setFollower_List] = React.useState();
  const GetFollowers_List = async () => {
    get_Login_User_Followers_List().then((response) => {
      if (response.data.msg === "No follower yet") {
        setFollower_List("");
      } else {
        setFollower_List(response.data);
      }
    });
  };

  useEffect(() => {
    GetFollowers_List();
  }, []);

  const renderItem = ({ item }) => (
    <ListCard
      image={{ uri: IMAGE_URL + item.user.image }}
      usename={item.user.user_name}
      fullname={item.user.full_name}
      type={item.status}
      btnstatus={item.status === true ? true : false}
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
        headerlabel={TranslationStrings.FOLLOWERS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />
      <FlatList
        data={follwer_list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Followers;
