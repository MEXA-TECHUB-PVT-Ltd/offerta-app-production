import React from 'react';
import {
  StyleSheet,

} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  import { fontFamily } from '../../constant/fonts';

const Inputstyles = StyleSheet.create({

  inputview:
  {
    width: wp(100),
    alignSelf: 'center',
    borderRadius: 20,
    alignContent:"center",
    justifyContent:'center',

  },
  input:
  {
    //backgroundColor: 'rgba(52, 52, 52, 0.5)',
     width: '88%', 
     alignSelf: 'center', 
     color: 'white' ,
    borderRadius: 40,
    //fontWeight:'400',
    paddingLeft:wp(4),
    fontFamily:fontFamily.Lato_Regular
  },
  action: {
    flexDirection: 'row',
    marginTop:wp('2%'),
    marginBottom: wp('2%'),
    borderWidth:1,
    borderColor: '#D6D6D6',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    width: wp('80%'),
    height: wp('17%'),
    alignSelf: 'center',
    borderRadius: 20,
    paddingLeft: wp('2%'),
    alignItems: 'center'
  },




});
export default Inputstyles;
