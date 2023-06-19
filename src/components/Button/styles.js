import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

import { fontFamily } from '../../constant/fonts';
const styles = StyleSheet.create({
    container:
    {
alignSelf:'center',
//position:'absolute',
//bottom:hp(6)
//top:hp(15)
    },
buttoncontent:
{
    height: hp(6.5),
    backgroundColor:Colors.Appthemecolor,
    padding:0,
    color:Colors.Appthemecolor
},
button:
{
    borderRadius:wp(8),
    height: hp(6.5),
    alignItems:'center',
    backgroundColor:Colors.Appthemecolor,
},
header__icon: {
    alignSelf:'flex-end',
    color:'black',
},
label:
{
    color:'white',
    fontSize: hp(2.2) ,
    backgroundColor:Colors.Appthemecolor,
    fontFamily:fontFamily.Poppins_Regular,
    alignSelf:'center'
},

  });
  export default styles;
  