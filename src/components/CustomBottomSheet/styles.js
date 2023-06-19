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
      maintext:{
        fontSize:hp(2),
        color:Colors.Appthemecolor,
        fontFamily: fontFamily.Poppins_Medium,
      },
      subtext:
      {
          fontSize:hp(1.6),
          color:'#404040',
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
  btnView: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(8),
    marginTop: hp(5),
    marginBottom:hp(5)
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

  });
  export default styles;
  