import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  //////////////////app fonts////////////////////
import { fontFamily } from '../../constant/fonts';

const styles = StyleSheet.create({

  mainview: {
    marginTop:wp(0),
    marginBottom: wp(3),
    //justifyContent:'center',
    backgroundColor: 'white',
    width: wp(95),
    height: wp(15),
    alignSelf: 'center',
    //paddingLeft: wp(2),
    alignItems: 'center'
  },

  labeltext:
  {
    color: '#303030',
fontFamily:fontFamily.Poppins_Regular,
    fontSize: hp(1.7),
  },


});
export default styles;
