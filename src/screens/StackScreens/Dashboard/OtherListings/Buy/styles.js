import React from "react";
import { StyleSheet } from "react-native";

///////////////app colors///////////
import Colors from "../../../../../utills/Colors";

////////////height/ width//////////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { fontFamily } from "../../../../../constant/fonts";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

////////////////////////timeline////////////////
timelineflex:
{
 justifyContent: 'center',

  //backgroundColor:'green'
},
timelinemainview:
{
  width: wp('9%'), 
  height: wp('9%'), 
  borderRadius: 80,
  borderColor: '#DDDDDD',
  borderWidth: 1,
  alignItems: 'center',
  justifyContent: 'center'
},
timelineinnerview:
{
  width: wp('5%'),
   height: wp('5%'),
   borderRadius: 50, 
   //borderColor: 'black',
   // borderWidth: 1,
  alignSelf: 'center',
  backgroundColor:Colors.activetextinput
},
timeline:
{ 
  width: wp('31%'), 
  borderColor: '#C7D8EB', 
borderTopWidth: 5 },
filedtimeline:
{ 
  width: wp('31%'), 
  borderColor:Colors.activetextinput, 
borderTopWidth: 5 },
timelinetext:
{
  color: Colors.Appthemecolor,
  fontSize: hp(1.8),
  fontFamily:fontFamily.Poppins_Medium,
  marginTop:wp('2%')
}, 
});
export default styles;
