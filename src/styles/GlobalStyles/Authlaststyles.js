import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';
  import { fontFamily } from '../../constant/fonts';

const Authlaststyles = StyleSheet.create({
 
    lasttextview:
    { 
      flexDirection: 'row',
       alignContent:'center',
      justifyContent:'center',
     //alignItems:'flex-end',
     marginTop:hp(12),
     marginBottom:wp('10%'),
    },
    lasttextgrey:
    {
      color: '#6B6B6B',
      //fontWeight: '300',
      fontSize: hp(1.8),
      fontFamily:fontFamily.Poppins_Regular
    },
    lasttextblue:
    {
      color: Colors.Appthemecolor,
      //fontWeight: '300',
      fontSize: hp(1.8),
      fontFamily:fontFamily.Poppins_Bold
    },
});
export default Authlaststyles;
