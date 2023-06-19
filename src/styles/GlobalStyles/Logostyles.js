import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Logostyles = StyleSheet.create({

  Logoview:
  {
      alignItems:"center",
      marginTop:hp(10),
      marginBottom:hp(8)
},
  logo:
  {
      height:wp(20),
      width:wp(50)
    },

});
export default Logostyles;
