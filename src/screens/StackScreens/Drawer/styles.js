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

  
  /////////////////Comments Details////////////

  maintext: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(2.2),
    color: Colors.Appthemecolor,
  },
 lefttext: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(1.8),
    color: Colors.Appthemecolor,
  },
  righttext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.5),
    color: Colors.appgreycolor,
    textAlign:'right'
  },
  subtext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color:'black',

  },
});
export default styles;
