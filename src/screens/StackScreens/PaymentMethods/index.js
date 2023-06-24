import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import {Checkbox} from 'react-native-paper';
//////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';

/////////////app styles////////////////
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {fontFamily} from '../../../constant/fonts';
import TranslationStrings from '../../../utills/TranslationStrings';
import {get_specific_user_detail} from '../../../api/GetApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/Loader/Loader';

const PaymentMethods = ({navigation, route}) => {
  const [selected_index, setSelected_index] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handlePress = async index => {
    //credit_card  : 0
    //paypal  : 1
    //crypto  : 2

    console.log('index : ', index);

    setSelected_index(index);

    if (index === 0) {
      if (route?.params?.type == 'account_verify') {
        navigation?.navigate('StripeMonthlySubscription', route?.params);
      } else {
        navigation.replace('StripePayment', route?.params);
      }
    }
    if (index == 1) {
      //paypal payment
      if (route?.params?.type == 'account_verify') {
        navigation?.replace('PaypalMonthlySubscription', route?.params);
      } else {
        navigation.navigate('PaypalPayment', route?.params);
      }
    }
    if (index === 2) {
      getDAta();
    }

    console.log('index ::: ', index);
  };
  const getDAta = async () => {
    setLoading(true);
    var user_id = await AsyncStorage.getItem('Userid');
    let user_detail = await get_specific_user_detail(user_id);
    console.log('user_detail  :  ', user_detail?.user_name);

    let url = `http://ofertasvapp.com/testing/offerta-sv/offerta-backend/v1/payment/cryptoInit.php?amount=1&customer_name=${user_detail?.user_name}`;
    console.log('url : ', url);
    fetch(url)
      .then(res => res.json())
      .then(response => {
        console.log('response : ', response);
        let payment_url = response[0]?.payment_url;
        console.log('payment_url  : ', payment_url);
        // navigation.navigate("Coinbase", route?.params);
        navigation.navigate('Coinbase', {
          payment_url: payment_url,
        });
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <CustomHeader
          //   headerlabel={TranslationStrings.BUY}
          // headerlabel={"Payment Method"}
          headerlabel={TranslationStrings.CHOOSE_PAYMENT_METHOD}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />
        <Loader isLoading={loading} />
        <View style={{flex: 1, alignItems: 'center'}}>
          {/* <Text
            style={{
              fontSize: 18,
              color: Colors.Appthemecolor,
              fontFamily: fontFamily.Poppins_Bold,
              marginBottom: 30,
            }}
          >
            {TranslationStrings.CHOOSE_PAYMENT_METHOD}
          </Text> */}
          <TouchableOpacity style={styles1.btn} onPress={() => handlePress(0)}>
            <Text style={styles1.btnText}>
              {TranslationStrings.CREDIT_CARD}
            </Text>
            {selected_index == 0 && (
              <View style={styles1.checkedView}>
                <Checkbox status={'checked'} />
              </View>
            )}

            {route?.params?.type == 'account_verify' && (
              <View style={styles.feeView}>
                <Text style={styles.feeText}>
                  {TranslationStrings.ACCOUNT_FEE} :{route?.params?.stripeFee}
                  {'$/Month'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles1.btn} onPress={() => handlePress(1)}>
            {/* <Text style={styles1.btnText}>{TranslationStrings.BIT_COIN}</Text> */}
            <Text style={styles1.btnText}>Paypal</Text>
            {selected_index == 1 && (
              <View style={styles1.checkedView}>
                <Checkbox status={'checked'} />
              </View>
            )}

            {route?.params?.type == 'account_verify' && (
              <View style={styles.feeView}>
                <Text style={styles.feeText}>
                  {TranslationStrings.ACCOUNT_FEE} :{route?.params?.paypalFee}
                  {'$/Month'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles1.btn} onPress={() => handlePress(2)}>
            <Text style={styles1.btnText}>
              {/* {TranslationStrings.PAY_ON_DELIVERY} */}
              Crypto
            </Text>
            {selected_index == 2 && (
              <View style={styles1.checkedView}>
                <Checkbox status={'checked'} />
              </View>
            )}

            {route?.params?.type == 'account_verify' && (
              <View style={styles.feeView}>
                <Text style={styles.feeText}>
                  {TranslationStrings.ACCOUNT_FEE} :{route?.params?.coinbaseFee}
                  {'$/Month'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethods;
const styles1 = StyleSheet.create({
  btn: {
    height: hp(15),
    width: wp(90),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: Colors.Appthemecolor,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  btnText: {
    color: '#000',
    fontSize: 18,
  },
  checkedView: {position: 'absolute', top: hp(15) / 3, left: 0},

  //
});
const styles = StyleSheet.create({
  ////////////////////////timeline////////////////
  timelineflex: {
    justifyContent: 'center',

    //backgroundColor:'green'
  },
  timelinemainview: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: 80,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineinnerview: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: 50,
    //borderColor: 'black',
    // borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: Colors.activetextinput,
  },
  timeline: {
    width: wp('31%'),
    borderColor: '#C7D8EB',
    borderTopWidth: 5,
  },
  filedtimeline: {
    width: wp('31%'),
    borderColor: Colors.activetextinput,
    borderTopWidth: 5,
  },
  timelinetext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
    marginTop: wp('2%'),
  },
  feeView: {},
  feeText: {
    color: Colors.Appthemecolor,
    // fontFamily: fontFamily.Poppins_SemiBold,
    // fontSize: hp(1.2),

    // color: "#000",
    fontSize: 12,
  },
});
