import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../utills/Colors";

//////////////app images/////////
import { appImages } from "../../constant/images";

////////////////app fonts////////
import { fontFamily } from "../../constant/fonts";

////////////////app redux///////////
import { useSelector } from "react-redux";
import TranslationStrings from "../../utills/TranslationStrings";

const ViewAll = ({ navigation, headerlabel, onpress }) => {
  ////////////////////redux/////////////////////
  const { theme } = useSelector((state) => state.userReducer);

  return (
    <View style={[style.headerView]} onPress={onpress}>
      <Text style={style.leftlabeltext}>{headerlabel}</Text>
      <TouchableOpacity onPress={onpress}>
        <Text style={style.rightlabeltext}>{TranslationStrings.VIEW_ALL}</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  headerView: {
    width: wp(100),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: wp(5),
    marginTop: hp(3),
  },

  leftlabeltext: {
    color: "#303030",
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
    marginBottom: wp(1),
  },
  rightlabeltext: {
    color: "red",
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
  },
});
export default ViewAll;
