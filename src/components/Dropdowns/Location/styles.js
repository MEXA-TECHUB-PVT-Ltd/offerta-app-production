import React from 'react';
import {StyleSheet,
} from 'react-native';

import Colors from '../../../utills/Colors';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';
const styles = StyleSheet.create({

card:
{
  borderColor:'rgba(0, 0, 0, 0.2)',
  borderBottomWidth: 1,
 width: wp(82),
 marginHorizontal:wp(8)
  
},
cardtext:
{
  color:'black', 
  marginBottom:hp(2),
  marginTop:hp(2),
   fontFamily:'Poppins',
   fontSize:hp(2),
   marginLeft:wp(5),
    color:"grey",
},
bottomsheettext:
{
paddingHorizontal:wp(8),
fontWeight:'600',
fontSize:hp(2.5),
color:'black'
},
iconstyle:
{
    height:hp(12),
    width:wp(15)
  },

  //////////////////////search textinput////////////
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    height:hp(6.5),
    borderRadius:wp(3),
    paddingHorizontal:wp(4),
    marginHorizontal: wp(6),
    marginVertical:hp(2),
  },
  textInput: {
    flex: 1,
    marginLeft:wp(3),
    color:"black"
  },
  });
  export default styles;
  