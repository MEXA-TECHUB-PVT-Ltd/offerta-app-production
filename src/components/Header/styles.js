import React from 'react';
import {StyleSheet,
Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({
    //Header
    headerView: {
      flexDirection: 'row',
      alignItems:'center',
      backgroundColor: Colors.Appthemecolor,
      height: Height * 0.10,
      width: wp(100) ,
      paddingHorizontal:wp(3),
      marginBottom:hp(2),
      borderBottomRightRadius:wp(3),
      borderBottomLeftRadius:wp(3),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,
      
      elevation: 15,
      
          },
    iconview:
    { 
        justifyContent: 'center', 
        marginRight: wp(0)
     },
  
label:
{ 
    color: 'white',
     fontSize: hp(2.5), 
     marginLeft:wp(8),
     fontFamily:fontFamily.Poppins_Regular,
    // marginTop:hp(4.5) ,
     textAlign:"center"
    }

  });
  
  
  export default styles;
  