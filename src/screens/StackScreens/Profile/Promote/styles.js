import React from "react";
import { StyleSheet } from "react-native";

///////////////app colors///////////
import Colors from "../../../../utills/Colors";

////////////height/ width//////////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { fontFamily } from "../../../../constant/fonts";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  //////////////////Promote////////////////

  mainView: {
    alignItems: "center",
    paddingHorizontal: wp(5),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  promotetoptext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    textAlign: "center",
    color: "black",
    width: wp(88),
  },
  promotepricetext: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(2),
    color: Colors.Appthemecolor,
  },

  //////////////////payment/////////////////
  timelinetext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
    marginTop: wp("2%"),
  },
});

export default styles;
