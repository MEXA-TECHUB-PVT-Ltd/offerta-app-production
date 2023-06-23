import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import paypalApi from '../../../api/paypalApi';
import WebView from 'react-native-webview';
import GoogleButton from '../../../components/Button/GoogleButton';
const queryString = require('query-string');
import Loader from '../../../components/Loader/Loader';
import {
  post_Promotions,
  post_Promotions_new,
  post_verification_detail,
  send_new_banner_req_to_admin,
  send_new_verification_req_to_admin,
} from '../../../api/Sales&Promotions';
import TranslationStrings from '../../../utills/TranslationStrings';
import {appImages} from '../../../constant/images';
import CustomModal from '../../../components/Modal/CustomModal';
import {BASE_URL} from '../../../utills/ApiRootUrl';

import {Snackbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {
  add_User_Stripe_Credentials,
  create_order_Listings,
} from '../../../api/Offer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appbar} from 'react-native-paper';
import Colors from '../../../utills/Colors';
import {store_subscription_history} from '../../../api/PostApis';

const PaypalMonthlySubscription = ({navigation, route}) => {
  const webViewRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isWebViewopen, setIsWebViewopen] = useState(false);
  const [payPalUrl, setPayPalUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [paypalOrderDetail, setPaypalOrderDetail] = useState({});

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  const [subscriptionId, setSubscriptionId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    subscribeMonthlyPlan();
  }, []);

  // __________________________________________________PAYPAL___________________________________________________________
  const subscribeMonthlyPlan = async () => {
    try {
      setIsWebViewopen(false);
      setLoading(true);
      const token = await paypalApi.generateToken();
      let plan_id = route?.params?.selectedPlan?.id;
      console.log('plan_id __________________________', plan_id);
      await paypalApi
        .subscribePlan(token, plan_id)
        .then(res => {
          console.log('response ::::::', res);
          const link = res?.links?.find(data => data?.rel == 'approve');
          console.log('link  : ', link);
          setSubscriptionId(res?.id);
          if (link) {
            setPayPalUrl(link?.href ? link?.href : '');
            setIsWebViewopen(true);
          }
        })
        .catch(err => {
          console.log('error ::::::', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      console.log('Errr : ', err);
    }
  };

  const onUrlChange = async webviewState => {
    try {
      console.log(':::::::::::::::::::::::::::');
      console.log('webviewstate', webviewState);
      if (webviewState?.url?.includes('https://example.com/cancel')) {
        console.log('here  clearPaypalState ....');
        clearPaypalState();
        return;
      }

      if (webviewState?.url?.includes('https://example.com/return')) {
        console.log('sfjksdfksdjf__________________', webviewState?.url);
        const urlValues = queryString.parseUrl(webviewState?.url);
        console.log('urlValues', urlValues);

        let subscription_id = urlValues?.query?.subscription_id
          ? urlValues?.query?.subscription_id?.toString()
          : '';
        await AsyncStorage.setItem('subscription_id', subscription_id);
        clearPaypalState();
        saveSubscriptionDetails(subscription_id);
        SubmitVerificationDocument();
        // const { PayerID, token } = urlValues.query;
        // if (token) {
        //   paymentSuccess(token);
        //   clearPaypalState();
        //   return;
        // }
        return;
      }
    } catch (error) {
      console.log('Error Raised : ', error);
    }
  };

  const clearPaypalState = () => {
    setPayPalUrl('');
    setIsWebViewopen(false);
  };

  // __________________________________________________PAYPAL___________________________________________________________

  //verify_account
  const SubmitVerificationDocument = async () => {
    setLoading(true);
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
        setLoading(false);
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
      mode: 'paypal',
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
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <GoogleButton
      title="pay with paypal"
      onPress={() => testPayPalPayment()}
    /> */}

      <Appbar.Header style={{backgroundColor: Colors.Appthemecolor}}>
        <Appbar.Content title="Make Payment" color="#FFFF" />
        {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
        <Appbar.Action
          color="#FFFFFF"
          icon="close"
          onPress={() => {
            navigation?.goBack();
          }}
        />
      </Appbar.Header>

      <Loader isLoading={loading} />
      {isWebViewopen && (
        <WebView
          ref={webViewRef}
          source={{
            uri: payPalUrl,
          }}
          onNavigationStateChange={onUrlChange}
          style={{
            height: hp(100),
            width: wp(100),
          }}
          onError={() => clearPaypalState()}
        />
      )}

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
    </View>
  );
};

export default PaypalMonthlySubscription;

const styles = StyleSheet.create({});

//final url returned when payment is done

// {"canGoBack": true, "canGoForward": false, "loading": false, "target": 10137, "title": "PayPal", "url": "https://www.sandbox.paypal.com/webapps/billing/subscriptions?ba_token=BA-0MJ39952HE5120043&country.x=US&locale.x=en_US&mode=member&token=7BV486779G7129014"}
