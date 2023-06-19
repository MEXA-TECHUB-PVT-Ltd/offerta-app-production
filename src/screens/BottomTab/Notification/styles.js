import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////app fonts///////////
import { fontFamily } from "../../../constant/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
  },

  postcard: {
    alignSelf: "center",
    marginTop: wp("10%"),
    paddingHorizontal: wp(5),
  },

  userimage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(10),
    marginRight: wp(2),
  },
  username: {
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
    color: "#262626",
  },
  likeimage: {
    width: wp("5%"),
    height: wp("12%"),
  },

  recomend: {
    fontSize: hp(1.3),
    fontFamily: fontFamily.Poppins_Regular,
    color: "#444D6E",
    width: wp(62),
  },
  card: {
    borderColor: "#BDC4CC26",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: wp("5%"),
    width: wp("95%"),
  },
});
export default styles;
