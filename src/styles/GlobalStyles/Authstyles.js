import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utills/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { fontFamily } from "../../constant/fonts";

const Authstyles = StyleSheet.create({
  textview: {
    justifyContent: "center",
    marginTop: hp(2),
    marginBottom: hp(2),
    //marginLeft:wp(8)
    marginHorizontal: wp(8),
  },
  subtext: {
    color: Colors.appgreycolor,
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.8),
    width: wp(100),
    marginBottom: hp(2),
  },
  maintext: {
    color: Colors.Appthemecolor,
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: hp(2.8),
    width: wp(100),
    marginBottom: wp(1),
  },
  subundertext: {
    color: "#D8D8D8",
    fontFamily: fontFamily.Lato_Light,
    //fontWeight: '400',
    fontSize: hp(1.8),
    width: wp(76),
    marginBottom: wp(5),
  },
  toptext: {
    color: "white",
    //fontWeight: '400',
    fontFamily: fontFamily.Lato_Regular,
    fontSize: hp(2.5),
    marginTop: hp(2),
  },
});
export default Authstyles;
