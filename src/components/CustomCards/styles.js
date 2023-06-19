import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////app fonts///////////////
import { fontFamily } from "../../constant/fonts";

const styles = StyleSheet.create({
  card: {
    margin: wp("2%"),
    borderRadius: wp(4),
    width: wp(92),
    alignSelf: "center",
    backgroundColor: "white",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  balancetext: {
    color: Colors.appgreycolor,
    fontSize: hp(1.7),
    fontFamily: fontFamily.Poppins_Regular,
  },
  btnview: {
    backgroundColor: Colors.Appthemecolor,
    width: wp(25),
    height: hp(4.5),
    borderRadius: wp(5),
    alignItems: "center",
    justifyContent: "center",
  },
  btntext: {
    color: "white",
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
  },

  /////////////////////Blog Card/////////
  blogcard: {
    marginVertical: hp(2),
    margin: wp(0),
    alignItems: "center",
    marginHorizontal: wp(5),
    backgroundColor: "white",
    width: wp(41),
    height: hp(22),
    borderRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  blogimage: {
    height: hp(14),
    width: wp(41),
    borderTopRightRadius: wp(3),
    borderTopLeftRadius: wp(3),
  },
  blogmaintext: {
    color: Colors.Appthemecolor,
    width: wp(30),
    marginTop: hp(1),
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Medium,
  },
  blogsubtext: {
    color: "black",
    width: wp(35),
    marginTop: hp(0),
    fontSize: hp(1),
    fontFamily: fontFamily.Poppins_Regular,
    marginLeft: wp(1.5),
  },

  ////////////////////Dashboard///////////
  dashboardcard: {
    marginVertical: hp(2),
    margin: wp(0),
    alignItems: "center",
    marginHorizontal: wp(2.3),
    backgroundColor: "white",
    width: wp(45),
    height: hp(23),
    borderRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  dasboardimage: {
    height: hp(15),
    width: wp(15),
    borderTopRightRadius: wp(3),
    borderTopLeftRadius: wp(3),
  },
  dashboardmaintext: {
    color: Colors.Appthemecolor,
    width: wp(30),
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Medium,
  },
  pricetext: {
    color: "black",
    width: wp(9),
    fontSize: hp(1),
    textAlign: "right",
    fontFamily: fontFamily.Poppins_Regular,
  },

  //////////////////////////Categories/////////////////
  Categoriescard: {
    marginVertical: hp(2),
    margin: wp(0),
    alignItems: "center",
    marginHorizontal: wp(4.2),
    backgroundColor: "white",
    width: wp(41),
    height: hp(22),
    borderRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  Categoriesimage: {
    height: hp(5),
    width: wp(20),
    resizeMode: "contain",
  },
  Categoriestext: {
    color: Colors.activetextinput,
    marginTop: hp(5),
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
  },

  ////////////////profile card///////////////
  profilecard: {
    margin: wp(0),
    borderRadius: wp(4),
    width: wp(80),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: wp(5),
    paddingVertical: hp(3.5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  itemmaintext: {
    color: Colors.Appthemecolor,
    fontSize: hp(2),
    fontFamily: fontFamily.Poppins_Medium,
    //width: wp(0),
    textAlign: "center",
    // marginTop:hp(2)
  },
  itemsubtext: {
    color: "#303030",
    fontSize: hp(1.7),
    fontFamily: fontFamily.Poppins_Regular,
    marginBottom: hp(0.8),
    textAlign: "center",
  },

  verticleLine: {
    height: hp(4),
    width: 1,
    backgroundColor: Colors.activetextinput,
    marginHorizontal: wp(4),
  },
  verticletext: {
    color: Colors.activetextinput,
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Medium,
  },

  ////////////////////////Exchange/////////////////
  Exchangecard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
    //alignItems: "center",
    alignSelf: "center",
    //paddingLeft:wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    backgroundColor: "white",
    width: wp(90),
    height: hp(12),
    borderRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Exchangeimage: {
    height: hp(8),
    width: wp(18),
    resizeMode: "contain",
    borderRadius: wp(3),
  },
  Exchangetext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.7),
    fontFamily: fontFamily.Poppins_Medium,
  },
  Exchangesubtext: {
    color: "#404040",
    fontSize: hp(1.3),
    fontFamily: fontFamily.Poppins_Medium,
    width: wp(55),
    marginTop: hp(1),
  },
  Exchangepricetext: {
    color: "#363636",
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
    width: wp(10),
    textAlign: "left",
  },

  ////////////////////////Exchange/////////////////
  Promotionscard: {
    alignSelf: "center",
    backgroundColor: "white",
    marginBottom: hp(1),
    marginTop: hp(2),
    width: wp(90),
    height: hp(15),
    borderRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Promotionsimage: {
    height: hp(15),
    width: wp(20),
  },
  Promotionstext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Medium,
  },
  Promotionssubtext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
    width: wp(55),
  },
  Promotionspricetext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Medium,
    width: wp(7),
    textAlign: "left",
  },
  Promotionstagtext: {
    color: "white",
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
  },

  /////////////////////////Reviews////////////////////
  usertext: {
    fontFamily: fontFamily.Poppins_Medium,
    fontSize: hp(1.6),
    color: Colors.Appthemecolor,
  },
  userfullnametext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: "#404040",
  },
  subtext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: Colors.appgreycolor,
  },

  ////////////////////shipping address//////////////
  shippingview: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(0.5),
  },
  shippinglefttext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_SemiBold,
  },

  ////////////////////////Exchange Offers/////////////////
  Exchangeofferscard: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
    //alignItems: "center",
    alignSelf: "center",
    //paddingLeft:wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    backgroundColor: "white",
    width: wp(90),
    height: hp(20),
    borderRadius: wp(3),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Exchangeoffericon: {
    height: hp(8),
    width: wp(8),
    resizeMode: "contain",
    borderRadius: wp(3),
  },
  Exchangeofferimage: {
    height: hp(12),
    width: wp(32),
    resizeMode: "contain",
    borderRadius: wp(3),
  },
  Exchangetext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.7),
    fontFamily: fontFamily.Poppins_Medium,
  },
  Exchangesubtext: {
    color: "#404040",
    fontSize: hp(1.3),
    fontFamily: fontFamily.Poppins_Medium,
    width: wp(55),
    marginTop: hp(1),
  },
  Exchangepricetext: {
    color: "#363636",
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
    width: wp(10),
    textAlign: "left",
  },
});

export default styles;
