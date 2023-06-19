import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utills/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { fontFamily } from "../../constant/fonts";

const Onboardingstyles = StyleSheet.create({
  textview: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: wp(0),
    marginBottom: wp(0),
    position: "absolute",
    bottom: hp(23),
    marginHorizontal: wp(3),
  },
  text: {
    color: "white",
    fontSize: hp(3),
    fontFamily: fontFamily.Rockwell,
    width: wp(60),
    marginBottom: hp(3),
  },
  subtext: {
    color: "white",
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Regular,
    width: wp(80),
  },
  btnview: {
    backgroundColor: "white",
    flexDirection: "row",
    position: "absolute",
    bottom: hp(5),
    width: wp(70),
    height: hp(6.5),
    borderRadius: wp(8),
    alignItems: "center",
  },
  btnarrowview: {
    backgroundColor: "#FE0000",
    borderRadius: wp(8),
    width: wp(11),
    height: hp(5.5),
    marginLeft: wp(2.6),
    alignItems: "center",
    justifyContent: "center",
  },
  btntext: {
    color: "#26295E",
    fontSize: hp(2.3),
    fontFamily: fontFamily.Poppins_Regular,
    marginLeft: wp(12),
  },
});
export default Onboardingstyles;
