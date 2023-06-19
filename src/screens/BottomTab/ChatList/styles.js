import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: "white",
  },

  postcard: {
    alignSelf: "center",
    marginTop: hp(0),
    marginBottom: wp("5%"),
  },

  userimage: {
    width: wp("13%"),
    height: wp("13%"),
    borderRadius: wp(10),
    resizeMode: "contain",
  },
  likeimage: {
    width: wp("5%"),
    height: wp("12%"),
  },
  recomend: {
    fontSize: hp("1.3%"),
    fontWeight: "600",
    color: "#444D6E",
  },
  card: {
    borderColor: "#BDC4CC26",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: wp("2%"),
    marginHorizontal: wp(2),
    //marginBottom:wp('15%')
  },
});
export default styles;
