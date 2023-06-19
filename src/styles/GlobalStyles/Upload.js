import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  ///////////////fonts///////////
  import { fontFamily } from '../../constant/fonts';

const Uploadstyles = StyleSheet.create({

 mainview:
 {
     width:wp(85),
     height:wp(42),
     borderWidth:1.5,
     alignSelf:"center",
     borderColor:Colors.appgreycolor,
marginTop:wp('5%'),
borderStyle:'dashed',
borderRadius:20,
alignItems:'center',
justifyContent:'center',
marginBottom:wp('5%')
},
uploadicon:
{
    width:wp('10%'),
    height:wp('10%'),
},
uploadtext:
{
  color:Colors.appgreycolor,
  fontSize: hp(1.8),
marginTop:hp(3),
fontFamily:fontFamily.Poppins_Regular
},
setimages:
{height:hp(20),width:wp(75),borderRadius:wp(5)}

});
export default Uploadstyles;
