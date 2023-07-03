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
  BackHandler,
} from 'react-native';

////////navigation////////////////
import {useIsFocused} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
//////////////////app components///////////////
import CustomHeader from '../../../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../../../components/Button/CustomButton';
import CustomTextInput from '../../../../../components/TextInput/CustomTextInput';
import ShippingAddressCard from '../../../../../components/CustomCards/ShippingAddressCard';
import NoDataFound from '../../../../../components/NoDataFound/NoDataFound';

////////////////country picker package/////////////
import CountryPicker from 'react-native-country-picker-modal';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL} from '../../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

//////////////api function//////////
import {get_Shipping_Address} from '../../../../../api/ShippingAddress';

////////////////redux//////////////
import {
  setOrderShippingAddress,
  setLoginUserShippingAddress,
} from '../../../../../redux/LoginUserActions';
import {useDispatch, useSelector} from 'react-redux';
import {fontFamily} from '../../../../../constant/fonts';
import TranslationStrings from '../../../../../utills/TranslationStrings';
import Loader from '../../../../../components/Loader/Loader';
import {get_specific_user_detail} from '../../../../../api/GetApis';

const PaymentOptions = ({navigation, route}) => {
  const {exchange_other_listing} = useSelector(state => state.userReducer);

  const [selected_index, setSelected_index] = useState(-1);
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState('');

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const checkShippingAddress = async () => {
    return new Promise((resolve, reject) => {
      console.log('checkShippingAddress  : ');
      get_Shipping_Address()
        .then(response => {
          console.log('get shipping adress repnse  :  ', response?.data);

          if (response.data.msg === 'No Result') {
            //    //add shipping address
            resolve(false);
          } else {
            if (response?.data?.length < 0) {
              //add shipping address
              resolve(false);
            } else {
              resolve(true);
            }
          }
        })
        .catch(err => {
          console.log('errr raised while getting shipping address : ', err);
          resolve(false);
        });
    });
  };

  const handlePress = async (index, type) => {
    setSelected_index(index);
    console.log('index  : ', index);

    if (index == 1) {
      //coinbase
      getDAta();
    }

    let shippingAddress = await checkShippingAddress();
    if (shippingAddress == false) {
      navigation.navigate('ShippingAddress', {
        index: index == 'stripe' || index == 'paypal' ? 0 : index,
        listing_user_detail: route?.params?.listing_user_detail,
        payment_type:
          index == 'stripe'
            ? 'Credit_card'
              ? index == 'paypal'
              : 'Paypal'
            : type,
        type: type ? type : '',
        // ...route?.params,
        //live streaming params
        user_id: route?.params?.user_id,
        listing_user_detail: route?.params?.listing_user_detail,
        buy_type: route?.params?.buy_type,
        quantity: route?.params?.quantity,
        streamId: route?.params?.streamId,
        navtype: 'no_shipping_address',

        //counter offer
        buy_type: route?.params?.buy_type,
        counter_fee: route?.params?.counter_fee,

        //live stream
        response: route?.params?.response,
        host: route?.params?.host,
      });
      return;
    }
    // if (index == 0) {
    //   navigation.replace("PaymentMethods1", {
    //     index: index,
    //     listing_user_detail: route?.params?.listing_user_detail,
    //   });
    // } else
    if (index == 'stripe' || index == 'paypal') {
      navigation.replace('ConfirmAddress', {
        index: 0,
        listing_user_detail: route?.params?.listing_user_detail,
        payment_type: index == 'stripe' ? 'Credit_card' : 'Paypal',
        type: type ? type : '',
        // ...route?.params,
        //live streaming params
        user_id: route?.params?.user_id,
        listing_user_detail: route?.params?.listing_user_detail,
        buy_type: route?.params?.buy_type,
        quantity: route?.params?.quantity,
        streamId: route?.params?.streamId,
        //counter offer
        buy_type: route?.params?.buy_type,
        counter_fee: route?.params?.counter_fee,

        //live stream
        response: route?.params?.response,
        host: route?.params?.host,
      });
    } else if (
      index !== 1 ||
      exchange_other_listing?.giveaway == 'true' ||
      exchange_other_listing?.giveaway == true
    ) {
      navigation.replace('ConfirmAddress', {
        index: index,
        listing_user_detail: route?.params?.listing_user_detail,
        type: type ? type : '',
        // ...route?.params,
        //live streaming params
        user_id: route?.params?.user_id,
        listing_user_detail: route?.params?.listing_user_detail,
        buy_type: route?.params?.buy_type,
        quantity: route?.params?.quantity,
        streamId: route?.params?.streamId,
        //counter offer
        buy_type: route?.params?.buy_type,
        counter_fee: route?.params?.counter_fee,
        //live stream
        response: route?.params?.response,
        host: route?.params?.host,
      });
    }
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
          //live stream
          response: route?.params?.response,
          host: route?.params?.host,
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
        <Loader isLoading={loading} />
        <CustomHeader
          headerlabel={TranslationStrings.CHOOSE_PAYMENT_METHOD}
          // headerlabel={"Buy"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />
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
          {route?.params?.listing_user_detail?.verify_status == 'verified' && (
            <>
              {/* {(route?.params?.listing_user_detail?.paypal == "true" ||
                route?.params?.listing_user_detail?.bank == "true") && (
                <TouchableOpacity
                  style={styles1.btn}
                  onPress={() => handlePress(0)}
                >
                  <Text style={styles1.btnText}>
                    {TranslationStrings.CREDIT_CARD}
                  </Text>
                  {selected_index == 0 && (
                    <View style={styles1.checkedView}>
                      <Checkbox status={"checked"} />
                    </View>
                  )}
                </TouchableOpacity>
              )} */}

              {route?.params?.listing_user_detail?.bank == 'true' && (
                <TouchableOpacity
                  style={styles1.btn}
                  onPress={() => handlePress('stripe')}>
                  <Text style={styles1.btnText}>Stripe</Text>
                  {selected_index == 0 && (
                    <View style={styles1.checkedView}>
                      <Checkbox status={'checked'} />
                    </View>
                  )}
                </TouchableOpacity>
              )}

              {route?.params?.listing_user_detail?.paypal == 'true' && (
                <TouchableOpacity
                  style={styles1.btn}
                  onPress={() => handlePress('paypal')}>
                  <Text style={styles1.btnText}>Paypal</Text>
                  {selected_index == 0 && (
                    <View style={styles1.checkedView}>
                      <Checkbox status={'checked'} />
                    </View>
                  )}
                </TouchableOpacity>
              )}

              {route?.params?.listing_user_detail?.bitcoin == 'true' && (
                <TouchableOpacity
                  style={styles1.btn}
                  onPress={() => handlePress(1)}>
                  <Text style={styles1.btnText}>
                    {TranslationStrings.BIT_COIN}
                  </Text>
                  {selected_index == 1 && (
                    <View style={styles1.checkedView}>
                      <Checkbox status={'checked'} />
                    </View>
                  )}
                </TouchableOpacity>
              )}
            </>
          )}

          <TouchableOpacity
            style={styles1.btn}
            onPress={() => {
              handlePress(2, 'pay_on_delivery');
              setType('pay_on_delivery');
            }}>
            <Text style={styles1.btnText}>
              {TranslationStrings.PAY_ON_DELIVERY}
            </Text>
            {selected_index == 2 && (
              <View style={styles1.checkedView}>
                <Checkbox status={'checked'} />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles1.btn}
            onPress={() => {
              handlePress(3, 'pay_on_pickup');
              setType('pay_on_pickup');
            }}>
            <Text style={styles1.btnText}>
              {TranslationStrings.PAY_ON_PICKUP}
            </Text>
            {selected_index == 3 && (
              <View style={styles1.checkedView}>
                <Checkbox status={'checked'} />
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentOptions;
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
});
