import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

///////////////app icons///////////////
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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

const NoDataFound = (props) => {
  ////////////////////redux/////////////////////
  const { theme } = useSelector((state) => state.userReducer);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp(20),
      }}
    >
      <MaterialCommunityIcons
        name={props.icon}
        size={hp(5)}
        color={"grey"}
        onPress={props.iconPress}
        //style={{ marginLeft: wp(3) }}
      />
      <Text style={style.labeltext}>{props.text}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  labeltext: {
    color: "grey",
    fontSize: hp(2.3),
    fontFamily: fontFamily.Poppins_Medium,
    marginTop: hp(2),
    textAlign: "center",
  },
});
export default NoDataFound;
