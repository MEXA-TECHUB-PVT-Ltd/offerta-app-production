import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
import { fontFamily } from '../../../constant/fonts';
  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor:Colors.Appthemecolor,
    },
    header: {
        flex: 0.7,
        paddingHorizontal: wp(3),
        paddingBottom:  hp(3),
        backgroundColor:Colors.Appthemecolor,
    },
    footer: {
        flex: 2,
        backgroundColor: 'white',
        // borderTopLeftRadius:wp(8),
        // borderTopRightRadius: wp(8),
      alignItems:'center'
       //paddingHorizontal: wp(3),
        // /paddingVertical: hp(1)
    },
    text_footer: {
        color: '#303030',
        fontSize: hp(1.8),
        fontFamily:fontFamily.Poppins_Medium,
        marginLeft:wp(3)
    },
 
  });

export default styles;
