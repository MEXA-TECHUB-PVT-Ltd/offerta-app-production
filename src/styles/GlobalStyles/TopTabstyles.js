import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const TopTabstyles = StyleSheet.create({
TopTabView:
    {
        flexDirection:'row',
    justifyContent:'space-between',
   //marginHorizontal:wp(3),
   paddingHorizontal:wp(3),
   borderRadius:wp(4),
   width:wp(95),
   height:hp(7),
   backgroundColor:'#C7D8EB',
   alignItems:"center",
   alignSelf:'center',
   marginBottom:hp(1.5)
   },

});
export default TopTabstyles;
