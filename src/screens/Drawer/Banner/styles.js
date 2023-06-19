import React from "react";
import { StyleSheet } from "react-native";

///////////////app colors///////////
import Colors from "../../../utills/Colors";

////////////height/ width//////////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { fontFamily } from "../../../constant/fonts";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  /////////////////privacy policy///////////////////
  textview: {
    justifyContent: "center",
    paddigHorizontal: wp(2),
    marginTop: hp(0),
    alignItems:'center'
  },
  text: {
    color: "#000000",
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.7),
  },

//////////////////////Add Banner/////////////////
toptext: {
  color: Colors.Appthemecolor,
  fontFamily: fontFamily.Poppins_SemiBold,
  fontSize: hp(2),
},
subtext: {
  color: "#000000",
  fontFamily: fontFamily.Poppins_Regular,
  fontSize: hp(1.5),
  width:wp(88),
  textAlign:'center'
},


});
export default styles;
