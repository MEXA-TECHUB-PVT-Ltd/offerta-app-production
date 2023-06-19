import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

///////////////////app fonts//////////////////
import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({
    bottomtext:
    {
        color:'black',
        textAlign:'center',
         fontFamily:"Poppins",
         fontSize:hp(3),
      },
      optiontext:
      {
          fontSize:hp(1.7),
          color:'#303030',
          fontFamily: fontFamily.Poppins_Regular,
          marginLeft:wp(4)
      },
      maintext:{
        fontSize:hp(2),
        color:'#303030',
        fontFamily: fontFamily.Poppins_Medium,
      },
        modaltextview:
  {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:"center",
        width:wp(90),
        borderRadius:25,
        backgroundColor:'white',
        paddingHorizontal:wp(15)
  },
  });
  export default styles;
  