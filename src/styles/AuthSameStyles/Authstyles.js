import React from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import Colors from '../../utills/Colors';
const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Authstyles = StyleSheet.create({
  container:
  {
    flex: 1,
    justifyContent: "center",
    alignContent: 'center'
  },
  imageview:
  { 
    flex: 0.2,
       justifyContent: 'flex-end',
       alignItems:'center'
//backgroundColor:"red"
},
image: {
  height:60,
  width:110,
},
imagetext:
{
  color: 'black',
  fontWeight: 'bold',
  fontSize: hp('2%'),
  textAlign:'center'
},
  inputview:
  {
    flex: 0.5,
    width: wp('90%'),
    height:wp('100%'),
    alignSelf: 'center',
    //backgroundColor: "white",
    alignContent:"center",
    //backgroundColor: "red",
  },
  inputeditable:{
    //marginTop:13,
    backgroundColor:'white',
    width: wp('84%'),
    marginLeft:'3%',
    fontSize:hp('1.5%'),
    fontWeight:'bold',
    color:'black',
},
  maintextview:
  {
    flex:0.2,
    //justifyContent:'flex-start',
    alignSelf: 'center',
    //backgroundColor:'yellow'
  },
  maintext:
  {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp('3.2%'),
    fontFamily: 'Raleway',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  subtext:
  {
    color: 'grey',
    fontWeight: '400',
    fontSize: hp('2%'),
    textAlign: 'center',
    width:wp('65%')
  },
  toptext:
  {
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp('3%'),
    marginTop: wp('5%'),
    textAlign:'center'
  },
  lasttextview:
  { 
    flexDirection: 'row',
     flex: 0.04,alignContent:'center',
    justifyContent:'center',
   // backgroundColor:'red' 
  },
  lasttext:
  {
    color: 'black',
    fontWeight: '600',
    fontSize: hp('2%'),
  },
  lasttext1:
  {
    color: Colors.Appthemecolor,
    fontWeight: '600',
    fontSize: hp('2%'),
  },

});
export default Authstyles;
