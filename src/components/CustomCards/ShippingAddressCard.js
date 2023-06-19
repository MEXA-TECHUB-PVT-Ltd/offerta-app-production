import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

////////app styles////////////
import styles from "./styles";

/////////////app height and width/////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////colors/////////////
import Colors from "../../utills/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get_Login_UserData } from "../../api/GetApis";
import TranslationStrings from "../../utills/TranslationStrings";

const ShippingAddressCard = (props) => {
  const [current_username, setCurrent_username] = useState("");
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    get_Login_UserData().then((response) => {
      if (response?.data?.full_name) {
        setCurrent_username(response.data.full_name);
      }
    });
  };
  return props.type === "Buy" ? (
    <TouchableOpacity
      onPress={props.cardonpress}
      style={{ ...styles.card, ...props.style }}
      onLongPress={props?.onLongPress}
      activeOpacity={0.8}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: Colors.Appthemecolor,
          borderBottomWidth: 2,
          alignSelf: "flex-end",
          // width: wp(10),
          marginBottom: hp(1),
        }}
        onPress={props.onpress}
      >
        <Text style={styles.shippinglefttext}>{TranslationStrings.EDIT}</Text>
      </TouchableOpacity>

      {/* <View style={styles.shippingview}>
                <Text style={styles.shippinglefttext}>User Name</Text>
                <Text style={styles.balancetext}>{props.username}</Text>
          </View> */}
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>
          {TranslationStrings.ADDRESS1}
        </Text>
        <Text style={styles.balancetext}>{props.address_1}</Text>
      </View>
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>
          {TranslationStrings.ADDRESS2}
        </Text>
        <Text style={styles.balancetext}>{props.address_2}</Text>
      </View>
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>
          {TranslationStrings.COUNTRY}
        </Text>
        <Text style={styles.balancetext}>{props.country}</Text>
      </View>
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>{TranslationStrings.CITY}</Text>
        <Text style={styles.balancetext}>{props.city}</Text>
      </View>
      {/* <View style={styles.shippingview}>
                <Text style={styles.shippinglefttext}>State</Text>
                <Text style={styles.balancetext}>{props.state}</Text>
          </View> */}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onLongPress={props?.onLongPress}
      activeOpacity={0.8}
      style={styles.card}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderBottomColor: Colors.Appthemecolor,
          borderBottomWidth: 2,
          alignSelf: "flex-end",
          // width: wp(10),
          marginBottom: hp(1),
          // backgroundColor: "red",
        }}
        onPress={props.onpress}
      >
        <Text style={styles.shippinglefttext}>{TranslationStrings.EDIT}</Text>
      </TouchableOpacity>
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>
          {TranslationStrings.USER_NAME}
        </Text>
        {/* <Text style={styles.balancetext}>{props.username}</Text> */}
        <Text style={styles.balancetext}>{current_username}</Text>
      </View>
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>
          {TranslationStrings.ADDRESS1}
        </Text>
        <Text style={styles.balancetext}>{props.address_1}</Text>
      </View>
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>
          {TranslationStrings?.ADDRESS2}
        </Text>
        <Text style={styles.balancetext}>{props.address_2}</Text>
      </View>
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>
          {TranslationStrings.COUNTRY}
        </Text>
        <Text style={styles.balancetext}>{props.country}</Text>
      </View>
      <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>{TranslationStrings.CITY}</Text>
        <Text style={styles.balancetext}>{props.city}</Text>
      </View>
      {/* <View style={styles.shippingview}>
        <Text style={styles.shippinglefttext}>State</Text>
        <Text style={styles.balancetext}>{props.state}</Text>
      </View> */}
    </TouchableOpacity>
  );
};

export default ShippingAddressCard;
