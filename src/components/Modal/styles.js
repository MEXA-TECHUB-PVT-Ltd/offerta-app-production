import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utills/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////app fonts/////////////
import { fontFamily } from "../../constant/fonts";

const styles = StyleSheet.create({
  centeredView: {
    zIndex: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    width: wp(85),
    paddingTop: wp(5),
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modaltext: {
    fontSize: hp(2.3),
    fontFamily: fontFamily.Poppins_Medium,
    color: Colors.Appthemecolor,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  modalsubtext: {
    fontSize: hp(1.6),
    color: "#535353",
    fontFamily: fontFamily.Poppins_Regular,
    textAlign: "center",
    width: wp(60),
  },
  ApprovedView: {
    height: hp(6),
    width: wp(45),
    borderRadius: wp(3),
    backgroundColor: Colors.Appthemecolor,
    //  /marginRight:10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(4),
  },
  Pendingtext: {
    textAlign: "center",
    margin: 10,
    color: "white",
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 35,
    textAlign: "center",
  },
  buttonview: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 30,
    marginTop: "40%",
  },
  maintext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Montserrat Bold",
  },

  logoutbtnView: {
    width: wp(65),
    borderRadius: wp(3),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
    //backgroundColor:'red',
  },
  cancelbtn: {
    height: hp(5.5),
    width: wp(28),
    borderRadius: wp(10),
    borderColor: Colors.Appthemecolor,
    borderWidth: 0.5,
    backgroundColor: "white",
    alignItems: "center",
    marginBottom: hp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  donebtn: {
    height: hp(5.5),
    width: wp(28),
    borderRadius: wp(10),
    backgroundColor: Colors.Appthemecolor,
    alignItems: "center",
    marginBottom: hp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },

  //////////////////Ratting////////////////
  textview: {
    marginHorizontal: wp(6),
    marginTop: hp(0),
    marginBottom: hp(2),
    alignItems: "center",
  },
  toptext: {
    color: Colors.Appthemecolor,
    fontSize: hp(2.5),
    fontFamily: fontFamily.Poppins_SemiBold,
  },
});
export default styles;
