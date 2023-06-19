import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

///////////////////app fonts///////////
import { fontFamily } from "../../../constant/fonts";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  welcometext:{
fontSize:hp(3),
fontFamily:fontFamily.Poppins_Bold,
color:Colors.Appthemecolor
  },
  usertext:{
    fontSize:hp(1.8),
    fontFamily:fontFamily.Poppins_Regular,
    color:Colors.Appthemecolor
      },
  headericonsview: {
    backgroundColor: "white",
    width: wp(12),
    height: hp(6),
    borderRadius: wp(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },

  //////////////slider/////////////////
  sliderView: {
    marginTop: hp(2),
    alignSelf: "center",
    //borderWidth: 2,
    borderRadius: 30,
    height: wp(57),
    width: wp(88),
    marginBottom: hp(1),
    //borderColor:'gray',
    //backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  itemimageView1: {
    height: wp(55),
    width: wp("88%"),
    borderRadius: 20,
    //marginVertical:wp('2%'),
    // /marginHorizontal:wp('2%'),
    alignItems: "center",
    borderColor: "orange",
    borderWidth: 6,

    //position:'absolute'
  },
  slidercontainer: {
    flex: 1,
    backgroundColor: "white",
    height: hp(25),
    width: wp(85),
    alignSelf: "center",
    borderRadius: wp(15),
  },
  child: { width: wp(100), justifyContent: "center" },
  text: { fontSize: wp(3), textAlign: "center" },
});
export default styles;
