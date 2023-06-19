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

  /////////////////Listing Details////////////
  iconview: {
    flexDirection: "row",
    paddingHorizontal: wp(7),
    marginVertical: hp(0.7),
  },
  icontext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.8),
    color: Colors.activetextinput,
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
    width:wp(35),
  },
  rowrighttext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: Colors.appgreycolor,
    textAlign: "right",
    width:wp(50),
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
    height:hp(5),
    width:wp(100),
    marginTop:hp(3),
    paddingHorizontal:wp(3),
    alignSelf:'center',
flexDirection:'row',
    alignItems:'center',
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
locationtext:{
fontFamily:fontFamily.Poppins_Regular,
color:Colors.appgreycolor,
fontSize:hp(1.6),
width:wp(85)
},
mapStyle: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},

  btnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(8),
    marginVertical:hp(5),
  },
  btn: {
    height: hp(5.5),
    width: wp(35),
    borderRadius: wp(8),
    backgroundColor: Colors.Appthemecolor,
    alignItems:'center',
    justifyContent:'center'
  },
  btnText:{
    fontSize:hp(1.8),
    fontFamily:fontFamily.Poppins_Regular,
    color:'white'
  },

  /////////////insight///////////////
  rowview: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    marginVertical: hp(0.8),
    marginHorizontal:wp(8),
    marginBottom: hp(2),    
  },
 lefttext: {
    fontFamily: fontFamily.Poppins_SemiBold,
    fontSize: hp(1.8),
    color: Colors.Appthemecolor,
  },
  righttext: {
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.6),
    color: Colors.Appthemecolor,
    textAlign: "right",
  },
  borderview:
  {
    width: wp(90),
    borderWidth: 0.3,
    borderColor: Colors.inactivetextinput,
    alignSelf: "center",
    marginBottom: hp(2),
  },

  ////////////edit ;istings//////////////////
  text: {
    color: "#000000",
    fontFamily: fontFamily.Poppins_Regular,
    fontSize: hp(1.7),
  },
});
export default styles;
