import React, { useEffect, useState } from 'react';
import {
    Image, View, Text, SafeAreaView,ScrollView,TouchableOpacity,
} from 'react-native';

///////////////app code fields/////////////
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

///////////////timer/////////////////////
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

///////////////app images//////////////
import { appImages } from '../../../../constant/images';

/////////////////app components/////////////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../../components/Button/CustomButton';
import CustomModal from '../../../../components/Modal/CustomModal';

/////////////////////app styles/////////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

////////////////////redux////////////
import { useSelector, useDispatch } from 'react-redux';
import { setPhoneNumber,setLoginUser } from '../../../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import { BASE_URL } from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VerifyCode = ({ navigation,route }) => {

    /////////////previous data state///////////////
    const [predata] = useState(route.params);

       /////////////redux states///////
       const { phone_no} = useSelector(state => state.userReducer);
       const dispatch = useDispatch();  

        ///////////////Modal States///////////////
        const [modalVisible, setModalVisible] = useState(false);

  /////////////timer state///////////////
  const [disabletimer, setdisableTimer] = useState(false);
  
  //////////time function//////////
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60)
    const seconds = remainingTime % 60
  
    return `${minutes}:${seconds}`
  }
   //code Confirmation states
 const [value, setValue] = useState();
//cell number
  const CELL_COUNT = 4;

    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

  //button states
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  //check OTP Code
  const verifyno = () => {
    setloading(1);
    console.log('obj:', predata.code, value);
    if (predata.code == value) {
      setloading(0);
      VerificationAccount()
    } else {
      setModalVisible(true)
      setloading(0);
    }
  };
//Api Calling
const VerificationAccount=async() => {
    console.log('email here:', predata.email)
   axios({
     method: 'post',
     url: BASE_URL+'emailVerifyApi.php',
     data:{  
         email : predata.email.toLowerCase(),    
         code:predata.code
     },
   })
   .then(function (response) {
     console.log("response", JSON.stringify(response.data))
     setModalVisible(true)

   })
   .catch(function (error) {
     console.log("error", error)
   })
  }
  return (

    <SafeAreaView style={styles.container}>
                             <CustomHeader
          headerlabel={'Verify Code'}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />
        <View style={{alignItems:"center",justifyContent:'center'}}>
        <Image
            source={appImages.verify_email}
            style={{height:hp(20),width:wp(50)}}
            resizeMode="contain"
          />
        </View>
        <View style={{alignItems:'center',justifyContent:'center',marginBottom:hp(4),marginTop:hp(3)}}>
        <Text style={styles.toptext}>Enter verification code that you received 
on your phone number</Text>
        </View>
        <View style={styles.Cellview}>
        <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        //style={styles.input}
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : '0')}
          </Text>
        )}
      />
      </View>
      <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:"center",
      //backgroundColor:'red',
      width:wp(90),alignSelf:'center',marginTop:hp(2),
   // paddingHorizontal:wp(6)
    }}>
  <View style={{justifyContent:'flex-start',alignSelf:'flex-start'}}>
  {
  disabletimer==true?
<CountdownCircleTimer
size={50}
strokeWidth={0}
children ={children}
    isPlaying
    duration={7}
    initialRemainingTime={15}
    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    colorsTime={[7, 5, 2, 0]}
    onComplete={() => {
      setdisableTimer(false)
      // do your stuff here
      //return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
    }}
  >

    {({ remainingTime }) =>
    
    <Text style={{color:'black',fontSize:hp(2)}}>{remainingTime}(s)</Text>}
  </CountdownCircleTimer>
  :
  null
 } 
  </View>
<TouchableOpacity 
disabled={disabletimer}
      onPress={()=> setdisableTimer(true)}    
      style={{marginLeft:wp(8)}}                       
       >
<Text style={styles.Cellmaintext}>Resend Code</Text>
</TouchableOpacity>
      </View>

<View style={styles.buttonview}>
<View style={{alignItems:'center',justifyContent:'center',marginBottom:hp(1),marginTop:hp(23)}}>
        <Text style={styles.bellowtext}>Update profile verification status</Text>
        </View>
          <CustomButtonhere
            title={'VERIFY'}
            widthset={80}
            topDistance={0}
            loading={loading}
            disabled={disable}
            onPress={()=>verifyno()}
          /></View>
   <CustomModal 
                modalVisible={modalVisible}
                CloseModal={() => setModalVisible(false)}
                Icon={appImages.sucess}
              text={'Sucess'}
              subtext={'Account verified successfully'}
          buttontext={'GO BACK'}
 onPress={()=> {setModalVisible(false),navigation.navigate("Settings")}}
                /> 

</SafeAreaView>

  )
};

export default VerifyCode;