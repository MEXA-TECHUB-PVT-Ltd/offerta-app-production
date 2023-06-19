import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../../../utills/Colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

////////////////app fonts///////////
import { fontFamily } from '../../../../constant/fonts';

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    alignContent: 'center',
    backgroundColor:'white',
  //backgroundColor:'green'
  },

  //////////////////signin//////////////////
  forgettextview:
  {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginTop:hp(1)

  },
  forgettext:
  {
    color: Colors.Appthemecolor,
    fontSize: hp(1.6),
    marginBottom: wp('8%'),
    marginRight:wp(8),
    fontFamily:fontFamily.Poppins_Regular
  },

  /////////////////create profile//////////////
  userimage: {
    borderColor: Colors.appgreycolor,
    borderWidth: 0.5,
    width: wp(30),
    height: hp(14),
    borderRadius: wp(25),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: hp(12),
    marginTop: hp(0),
  },
  image: {
    height: hp(15),
    width: wp(29),
    borderRadius:wp(50),
  },

  ////////////////////Verification///////////////////
  Cellview:{
    marginBottom:10,
    marginTop:hp(0),
    paddingHorizontal:wp(10)
  },
  root: {
    //flex: 1, 
    padding: 0
  },
  title: {
    textAlign: 'center', 
  fontSize:hp(3),
  justifyContent:'center',
  alignItems:'center',
  color:Colors.Appthemecolor
  },
  codeFieldRoot: 
  {
  marginTop: 10,
  
  },
  cell: {
  //paddingVertical:0,
  //paddingBottom:2,
  marginTop:10,
  width: wp(16.5),
  height: hp(6),
  lineHeight: hp(6),
  fontSize:hp(2.5),
  color:'gray',
  textAlign: 'center',
  alignItems:'center',
  backgroundColor: 'white',
  justifyContent:'center',  
  borderRadius:wp(6),
  borderWidth:0.5,
  borderColor: Colors.inactivetextinput,
  },
  focusCell: {
  borderColor: Colors.activetextinput,
  borderWidth:0.5,
  alignItems:'center',
  textAlign: 'center',
  //margin:10,
  justifyContent:'center',
  backgroundColor:Colors.authinputs,
  color:Colors.Appthemecolor,
  },
  Cellmaintext:
  {
    color:Colors.Appthemecolor,
  textAlign:'center',
fontFamily:fontFamily.Poppins_Medium,
fontSize:hp(1.8)
  },


  ///////////////////send email////////////
  toptext:{
    color:"#404040",
    fontFamily:fontFamily.Poppins_Regular,
    fontSize:hp(1.6),
    width:wp(68)
  },
  bellowtext:{
    color:Colors.Appthemecolor,
    fontFamily:fontFamily.Poppins_SemiBold,
    fontSize:hp(1.8),

  }
});                     
export default styles;
