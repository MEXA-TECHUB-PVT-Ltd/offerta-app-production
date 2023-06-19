import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity } from "react-native";

/////////////app icons///////////////
import Icon from "react-native-vector-icons/Ionicons";

///////////////////Responsivess height width///////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SocialIcons = ({ navigation, headerlabel, iconPress, icon,bgcolor,onpress }) => {
  return (
    <TouchableOpacity onPress={onpress}>
    <View style={[styles.headerView, {backgroundColor:bgcolor}]}>
      <View style={styles.iconview}>
      <Image
                  source={icon}
                  style={styles.icon}
                  resizeMode='contain'
                />
      </View>
    </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  //Header
  headerView: {
    backgroundColor: "black",
    height: hp(5.5),
    width: wp(27),
    borderRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
  },
  iconview:
  { 
      //justifyContent: 'center', 
   },
  icon: {
height:hp(4.5),
width:wp(6.3)
  },
});

export default SocialIcons;
