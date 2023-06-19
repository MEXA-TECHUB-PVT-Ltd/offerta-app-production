import React from 'react';
import {
  StyleSheet,
  Dimensions,

} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

  /////////////app colors/////////////
  import Colors from '../../../utills/Colors';

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    alignContent: 'center',
    backgroundColor:'white',
    paddingHorizontal:wp(0)
  },

postcard:
  {
    paddingVertical: 15,
    //marginVertical: 10,
     // alignSelf:"center",
  marginTop:wp('3%'),
  height:hp('78%')
},
messageContainer: {
  backgroundColor: 'rgba(228, 228, 228, 1)',
  maxWidth: "80%",
  alignSelf: "flex-end",
  flexDirection: "row",
  borderRadius: 15,
  paddingHorizontal: 10,
  marginHorizontal: 10,
  paddingTop: 10,
  paddingBottom: 12,
  margin:wp('1.5%'),
  borderTopRightRadius: 0,
},
messageContainerleft: {
	alignSelf: "flex-start",
	backgroundColor: "rgba(255, 151, 39, 0.23)",
  maxWidth: "80%",
  flexDirection: "row",
  borderRadius: 15,
  paddingHorizontal: 10,
  marginHorizontal: 0,
  padding: 10,
  paddingBottom: 12,
  margin:wp('1.5%'),
  borderTopLeftRadius: 0,
},
messageView: {
  backgroundColor: "transparent",
  maxWidth: "80%",
},
timeView: {
  backgroundColor: "transparent",
  justifyContent: "flex-end",
  paddingLeft: 10,
},
message: {
  color: "rgba(45, 62, 80, 1)",
  alignSelf: "flex-start",
  fontSize: 15,
},
time: {
  color: "rgba(45, 62, 80, 1)",
  alignSelf: "flex-end",
  fontSize: 10,
},

//////////////////Offers view////////////
//--------------->Price offer
p_mainview:{
  flexDirection:'row',
  alignItems:'center'
},
p_image:
{
  height: hp(15), 
  width: wp(30) ,
  borderRadius:wp(3),
  alignSelf:'center'
},
p_text:
{
  color: "white",
  paddingHorizontal: 10,
  paddingVertical: 3,
  fontWeight: "bold",
  
},

//---------------->Exchange Offer
e_mainview:
{
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},
e_itemview:
{
  width: wp(30),
  borderRadius: wp(3),
  borderColor:Colors.inactivetextinput,
  borderWidth: 0.5,
  paddingTop:hp(1),
  alignItems: "center",
  backgroundColor: Colors.border,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
},
e_image:
{ 
  height: hp(12), 
  width: wp(25), 
  borderRadius: wp(3) },
  e_text:
  {
    color: Colors.Appthemecolor,
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontWeight: "bold",
  }

});
export default styles;
