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

  ///////////////Main Listings Details/////////
  iconview: {
    flexDirection: "row",
    paddingHorizontal: wp(7),
    marginVertical: hp(0.7),
  },
  icontext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.8),
    color: Colors.activetextinput,
    width: wp(25),
  },
  rowtextview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp(0.8),
  },
  rowlefttext: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(1.8),
    color: Colors.Appthemecolor,
    width: wp(35),
    //backgroundColor:'red'
  },
  rowrighttext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: Colors.appgreycolor,
    textAlign: "right",
    width: wp(50),
    //backgroundColor:'yellow'
  },
  mapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  /////////////////Comments Details////////////
  pricetext: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(1.6),
    color: Colors.Appthemecolor,
    textAlign: "right",
  },
  maintext: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(2),
    color: Colors.Appthemecolor,
  },
  usertext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: Colors.Appthemecolor,
  },
  subtext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: Colors.appgreycolor,
  },
  locationview: {
    height: hp(5),
    width: wp(100),
    marginTop: hp(3),
    paddingHorizontal: wp(3),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 0.3,
    borderTopColor: Colors.appgreycolor,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationtext: {
    fontFamily: fontFamily.Poppins_Regular,
    color: Colors.appgreycolor,
    fontSize: hp(1.6),
    width: wp(85),
  },
  btnView: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(8),
    marginTop: hp(10),
    marginBottom: hp(5),
  },
  btnView1: {
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: wp(2),
    marginTop: 8,
    marginBottom: 6,
    flex: 1,
    // width: wp(100),
    marginHorizontal: wp(2),
  },
  btn1: {
    height: hp(5.5),
    // width: wp(70),
    flex: 1,
    borderRadius: wp(8),
    backgroundColor: Colors.Appthemecolor,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    height: hp(5.5),
    width: wp(70),
    borderRadius: wp(8),
    backgroundColor: Colors.Appthemecolor,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Regular,
    color: "white",
  },
  smallbtnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(7),
    marginTop: hp(10),
  },
  smallbtn: {
    width: wp(38),
    height: hp(6),
    backgroundColor: Colors.Appthemecolor,
    borderRadius: wp(8),
    alignItems: "center",
    justifyContent: "center",
  },
  smallbtnText: {
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Regular,
    color: "white",
  },

  //////////////last text/////////////////
  LastText: {
    fontSize: hp(1.8),
    width: wp(23),
    textAlign: "center",
    fontFamily: fontFamily.Poppins_Medium,
    color: Colors.activetextinput,
    borderBottomWidth: 1,
    borderBottomColor: Colors.activetextinput,
    marginBottom: hp(5),
  },

  /////////////////////Other Profile/////////////////
  header: {
    flex: 0.7,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    backgroundColor: Colors.Appthemecolor,
  },
  footer: {
    flex: 2,
    backgroundColor: "white",
    // borderTopLeftRadius:wp(8),
    // borderTopRightRadius: wp(8),
    alignItems: "center",
    //paddingHorizontal: wp(3),
    // /paddingVertical: hp(1)
  },
  text_footer: {
    color: "#303030",
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
    marginLeft: wp(3),
  },
});
export default styles;
