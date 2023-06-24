import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  initStripe,
  StripeProvider,
  usePaymentSheet,
} from '@stripe/stripe-react-native';
import {CardField, createToken, useStripe} from '@stripe/stripe-react-native';
import {
  get_stripe_payment_detail,
  get_stripe_recurring_payment_detail,
} from '../../../api/StripeApis';
import Loader from '../../../components/Loader/Loader';
import {useSelector} from 'react-redux';
import {Snackbar} from 'react-native-paper';
import {appImages} from '../../../constant/images';
import TranslationStrings from '../../../utills/TranslationStrings';
import CustomHeader from '../../../components/Header/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomModal from '../../../components/Modal/CustomModal';
import {
  create_order_Listings,
  create_order_Listings_new,
  create_order_Transcation_Listings,
} from '../../../api/Offer';
import {
  post_Promotions_new,
  post_verification_detail,
  send_new_banner_req_to_admin,
  send_new_verification_req_to_admin,
} from '../../../api/Sales&Promotions';
import {get_specific_user_detail} from '../../../api/GetApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import Colors from '../../../utills/Colors';

import {Publishable_key} from '../../../utills/paymentKeys';
import {async} from 'regenerator-runtime';
import {
  store_subscription_history,
  updateListingDetails,
} from '../../../api/PostApis';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

const StripeMonthlySubscription = ({navigation, route}) => {
  const [loading1, setLoading1] = useState(false);
  const {exchange_other_listing} = useSelector(state => state.userReducer);
  const {login_user_shipping_address} = useSelector(
    state => state.loginuserReducer,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  const [currentPaymentIntent, setCurrentPaymentIntent] = useState('');

  console.log('Publishable_key  : ', Publishable_key);
  useFocusEffect(
    React.useCallback(() => {
      initializePaymentSheet();
    }, []),
  );

  //__________________________Strip Payment______________________________________________
  const {confirmPayment} = useStripe();
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();
  const initializePaymentSheet = async item => {
    try {
      setLoading1(true);
      // publishableKey:
      //   "pk_test_51NDQiwGaIs51jJaWUMftnPOteL1EZZollLRlDFWc6ui0DiO5sUbIb2yu5YIDWjzyn3hi1kgopLXb7sFhRnXKwOP200Bx5PabHJ",
      initStripe({
        publishableKey: Publishable_key,
      });
      const {paymentIntent, ephemeralKey, customer, subscription_id} =
        await fetchPaymentSheetParams(item);
      console.log('subscription_id  ___________________ : ', subscription_id);

      if (paymentIntent) {
        await AsyncStorage.setItem('paymentIntent', paymentIntent);
      }
      if (subscription_id) {
        await AsyncStorage.setItem('subscription_id', subscription_id);
      }

      setCurrentPaymentIntent(paymentIntent);

      const {error} = await initPaymentSheet({
        appearance: {
          shapes: {
            borderRadius: 12,
            borderWidth: 0.5,
          },
          primaryButton: {
            shapes: {
              borderRadius: 20,
            },
          },
          colors: {
            primary: Colors.Appthemecolor,
            background: '#FFFFFF',
            componentBackground: '#FFFFFF',
            componentBorder: '#000000',
            componentDivider: '#000000',
            primaryText: Colors.Appthemecolor,
            secondaryText: Colors.Appthemecolor,
            componentText: Colors.Appthemecolor,
            placeholderText: '#000000',
          },
        },
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: 'OfertaSV',
      }).catch(err => {
        console.log('err : ', err);
      });

      if (error) {
        console.log('Error Code : ', error.code, error.message);
      } else {
        console.log('ready');
        openPaymentSheet();
      }
      setLoading1(false);
    } catch (error) {
      console.log('Error catch : ', error);
    }
  };

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

  //createPaymentIntent
  const fetchPaymentSheetParams = async item => {
    try {
      let amount = route?.params?.stripeFee ? route?.params?.stripeFee : '1.00';
      amount = parseInt(amount);
      console.log('amount  ___________________ :  ', amount);

      var user_id = await AsyncStorage.getItem('Userid');
      let user_detail = await get_specific_user_detail(user_id);
      let obj = {
        mode: 'stripe',
        email: user_detail ? user_detail?.email : '',
        name: user_detail?.full_name,
        price_id: route?.params?.stripePlanDetails?.price_id,
        user_id: user_detail?.id,
        amount: amount * 100, //covert cents to dollars
        currency: 'usd',
      };

      console.log('obj____________________________________________ : ', obj);

      let response = await get_stripe_recurring_payment_detail(obj);
      console.log('response____________________________ : ', response?.data);
      let response1 = response?.data?.data;
      let paymentIntent = response1?.paymentIntent?.client_secret;
      let ephemeralKey = response1?.ephemeralKey;
      let customer = response1?.customerId;
      let subscription_id = response1?.subscriptionId;

      return {
        paymentIntent,
        ephemeralKey,
        customer,
        subscription_id,
      };
    } catch (error) {
      console.log('error :::::::::::::::::::::: :: ', error);
      setLoading1(false);
      setsnackbarValue({
        value: 'Something went wrong',
        color: 'red',
      });
      setVisible(true);
    }
  };

  const openPaymentSheet = async item => {
    const res = await presentPaymentSheet();
    setLoading1(false);
    const {error} = res;
    console.log('res  :  ', res);
    if (error?.code == 'Canceled') {
      console.log('user cancel .......');
      navigation?.goBack();
    } else if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      //   Alert.alert('Success', 'Your order is confirmed!');

      let subscription_id = await AsyncStorage.getItem('subscription_id');
      saveSubscriptionDetails(subscription_id);
      SubmitVerificationDocument();
    }
  };

  //__________________________Strip Payment______________________________________________

  //verify_account
  const SubmitVerificationDocument = async () => {
    setLoading1(true);
    console.log('SubmitVerificationDocument  :___________________________');
    const formData = new FormData();
    formData.append('user_id', route?.params?.user_id);
    formData.append('cnic', route?.params?.cnic);
    formData.append('live_image', route?.params?.live_image);

    formData.append('bitcoin', route?.params?.bitcoin);
    formData.append('paypal', route?.params?.paypal);
    formData.append('bank', route?.params?.bankAccount);

    let url = BASE_URL + 'accountVerify.php';
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: formData,
    })
      .then(response => response.json())
      .then(response => {
        console.log('response of SubmitVerificationDocument :  ', response);
        if (response?.status == true) {
          submit_varification_details();
          setsnackbarValue({
            value: 'Verification document submitted successfully!',
            color: 'green',
          });
          setVisible(true);

          //sending notification to admin to notify new verification is created
          send_new_verification_req_to_admin()
            .then(res => {
              console.log('verification notification response : ', res?.data);
            })
            .catch(err => {
              console.log(
                'error raised while sending verification notification',
              );
            });

          navigation?.goBack();
          // setTimeout(() => {
          // }, 1000);
        } else {
          setsnackbarValue({
            value: response?.message,
            color: 'red',
          });
          setVisible(true);
        }
      })
      .catch(err => {
        console.log('error : ', err);
        setsnackbarValue({
          value: 'Something went wrong',
          color: 'red',
        });
        setVisible(true);
      })
      .finally(() => {
        setLoading1(false);
      });
  };

  const submit_varification_details = async () => {
    console.log('submit_varification_details______________________________');
    if (
      route?.params?.paypal != true &&
      route?.params?.bitcoin != true &&
      route?.params?.bankAccount != true
    ) {
      return false;
    }
    let paymentList = [];
    if (route?.params?.paypal == true) paymentList.push('paypal');
    if (route?.params?.bitcoin == true) paymentList.push('bitcoin');
    if (route?.params?.bankAccount == true) paymentList.push('bank_account');
    var user_id = await AsyncStorage.getItem('Userid');
    let obj = {
      payment_types: paymentList,
      user_id: user_id,
      paypal: {
        paypal_email:
          route?.params?.paypal == true ? route?.params?.paypalEmail : '',
      },
      bitcoin:
        route?.params?.bitcoin == true ? route?.params?.bitcoinWally : '',
      bank_account: {
        account_number:
          route?.params?.bankAccount == true
            ? route?.params?.bankAccountNumber
            : '',
        ZipCode:
          route?.params?.bankAccount == true ? route?.params?.zipCode : '',
        AccountHolder:
          route?.params?.bankAccount == true
            ? route?.params?.accountHolderName
            : '',
        BankName:
          route?.params?.bankAccount == true ? route?.params?.bankName : '',
      },
    };

    console.log('obj  ::::::::::::::::::::::::::::', obj);

    post_verification_detail(obj)
      .then(response => {
        console.log('response_________: ' + response);
      })
      .catch(err => {
        console.log('Errr : ', err);
      });
  };

  //store subscription data .............
  const saveSubscriptionDetails = async subscription_id => {
    var user_id = await AsyncStorage.getItem('Userid');
    let obj = {
      user_id: user_id,
      transaction_id: subscription_id,
      mode: 'stripe',
    };
    store_subscription_history(obj)
      .then(response => {
        console.log('response____________________', response?.data);
      })
      .catch(err => {
        console.log('err in  store_subscription_history_________', err);
      });
  };

  return (
    <View style={{flex: 1}}>
      <Loader isLoading={loading1} />
      <CustomHeader
        headerlabel={TranslationStrings.BUY}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={'arrow-back'}
      />

      {/* <TouchableOpacity
          onPress={() => initializePaymentSheet()}
          style={{
            width: 300,
            height: 50,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: "red",
          }}
        >
          <Text style={{ color: "#fff" }}>Open payment sheet</Text>
        </TouchableOpacity> */}

      <Snackbar
        duration={2000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: snackbarValue.color,
          marginBottom: hp(20),
          zIndex: 999,
        }}>
        {snackbarValue.value}
      </Snackbar>

      <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        Icon={appImages.sucess}
        text={TranslationStrings.SUCCESS}
        subtext={TranslationStrings.PAYED_SUCCESSFULLY}
        buttontext={TranslationStrings.OK}
        onPress={() => {
          if (route?.params?.type == 'promote') {
            // navigation?.goBack();
            navigation.replace('Promotions');
          } else if (route?.params?.type == 'addbanner') {
            navigation?.goBack();
            setModalVisible(false);
          } else {
            // navigation.navigate("BottomTab")
            navigation.replace('SalesOrders');
            setModalVisible(false);
          }
        }}
      />
    </View>
  );
};

export default StripeMonthlySubscription;
