import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Colors from '../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  import { fontFamily } from '../../../constant/fonts';

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: 'white'
  },
  toptext:
  {
    color: '#313131',
fontFamily:fontFamily.Poppins_Medium,
    fontSize: hp(3),
  },
  lasttext:
  {
    color: '#707070',
fontFamily:fontFamily.Poppins_SemiBold,
    fontSize: hp(1.6),
  },

  usertext:
  {
    color: '#707070',
fontFamily:fontFamily.Poppins_Medium,
    fontSize: hp(2),
  },

  underuserviewtext:
  {
    color:Colors.Appthemecolor,
fontFamily:fontFamily.Poppins_Medium,
    fontSize: hp(1.7),
    marginTop:hp(2)
  },
  optiontext:
  {
    color: '#707070',
fontFamily:fontFamily.Poppins_Medium,
    fontSize: hp(1.7),
  },
  borderview:
  {
      borderBottomColor:'#707070',
      borderBottomWidth:0.5,
      width:wp(75),
      marginTop:hp(1),
      marginBottom:hp(3)
    },
  inputview:
  {
 height:hp(40),
    width: wp('90%'),
    alignSelf: 'center',
    alignItems:'center',
    shadowColor: '#000',
    borderRadius:wp(5),
    backgroundColor:'white',
    paddingBottom:hp(5),
    padding:wp(5),
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    elevation: 5,
marginTop:hp(5)
    //backgroundColor: "red",
  },

    /////////////////edit profile//////////////
    userimage: {
      borderColor: Colors.appgreycolor,
      borderWidth: 0.5,
      width: wp(30),
      height: hp(14),
      borderRadius: wp(25),
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: hp(12),
      marginTop: hp(0),
    },
    image: {
      height: hp(15),
      width: wp(29),
      borderRadius:wp(50),
    },

});
export default styles;
