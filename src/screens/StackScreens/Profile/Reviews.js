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
import ReviewCards from "../../../components/CustomCards/ReviewCards";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";
import TranslationStrings from "../../../utills/TranslationStrings";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    subtext: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed",
    price: "20$",
  },
];

const Reviews = ({ navigation, route }) => {
  useEffect(() => {}, []);

  const renderItem = ({ item }) => (
    <ReviewCards
      image={"image"}
      maintext={item.title}
      subtext={item.subtext}
      price={item.price}
      onpress={() => navigation.navigate("ListingsDetails")}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.REVIEWS}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reviews;
