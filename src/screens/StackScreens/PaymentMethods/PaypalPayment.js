import {StyleSheet, Text, View, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
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
  create_order_Transcation_Listings,
} from '../../../api/Offer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateListingDetails} from '../../../api/PostApis';
import firestore from '@react-native-firebase/firestore';

const PaypalPayment = ({navigation, route}) => {
  const {exchange_other_listing} = useSelector(state => state.userReducer);
  const {login_user_shipping_address} = useSelector(
    state => state.loginuserReducer,
  );
  // paypal
  const [loading, setLoading] = useState(false);
  const [isWebViewopen, setIsWebViewopen] = useState(false);
  const [payPalUrl, setPayPalUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [paypalOrderDetail, setPaypalOrderDetail] = useState({});
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    testPayPalPayment();
  }, []);

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

  const testPayPalPayment = async () => {
    try {
      setLoading(true);
      const token = await paypalApi.generateToken();
      console.log('Access Token :  ', token);
      setAccessToken(token);
      //pass type i.e hospital or doctor
      // const rate = await getSubscriptionRate("doctor");
      const rate = true;
      // console.log("rate_________________________________", rate);
      if (rate == false) {
        // alert('Rate not found ');
        setLoading(false);
      } else {
        // setSubscriptionRateID(rate?._id ? rate?._id : "");
        // value: rate?.rate,
        console.log('route?.params?.fee  : ', route?.params?.fee);
        let fees = route?.params?.fee ? route?.params?.fee : '1.00';
        // let fees = "1.00";
        let shipping_cost = exchange_other_listing?.shipping_cost
          ? exchange_other_listing?.shipping_cost
          : 0;
        fees = parseInt(fees) + parseInt(shipping_cost);
        // let fees = "1.00";
        fees = parseFloat(fees).toFixed(2).toString();
        console.log('fees  ____________________', fees);
        let orderDetail = {
          intent: 'CAPTURE',
          purchase_units: [
            {
              items: [
                {
                  name: 'testet name',
                  description: 'test description',
                  quantity: '1',
                  unit_amount: {
                    currency_code: 'USD',
                    // value: "1.00",
                    value: fees,
                  },
                },
              ],
              amount: {
                currency_code: 'USD',
                // value: "1.00",
                value: fees,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    // value: "1.00",
                    value: fees,
                  },
                },
              },
            },
          ],
          application_context: {
            return_url: 'https://example.com/return',
            cancel_url: 'https://example.com/cancel',
          },
        };
        setPaypalOrderDetail(orderDetail);
        const res = await paypalApi
          .createOrder(token, orderDetail)
          .then(res => {
            console.log('create order response::::', res);
            //order id  =  res.id
            if (res?.links) {
              const link = res?.links?.find(data => data?.rel == 'approve');
              console.log('link  : ', link);
              setPayPalUrl(link?.href ? link?.href : '');
              setIsWebViewopen(true);
            }
          })
          .catch(err => {
            console.log('error in create order...', err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (error) {
      console.log('error ', error);
      setLoading(false);
    }
  };

  const onUrlChange = webviewState => {
    try {
      console.log(':::::::::::::::::::::::::::');
      console.log('webviewstate', webviewState);
      if (webviewState?.url?.includes('https://example.com/cancel')) {
        console.log('here....');
        clearPaypalState();
        return;
      }

      if (webviewState?.url?.includes('https://example.com/return')) {
        console.log('sfjksdfksdjf__________________', webviewState?.url);
        const urlValues = queryString.parseUrl(webviewState?.url);
        console.log('urlValues', urlValues);
        const {PayerID, token} = urlValues.query;
        if (token) {
          paymentSuccess(token, PayerID);
          clearPaypalState();
          return;
        }
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

  const paymentSuccess = async (id, PayerID) => {
    try {
      setLoading(true);
      const res = await paypalApi
        .capturePayment(id, accessToken, paypalOrderDetail)
        .then(res => {
          console.log('resopnse...', res);
          console.log('res?.status...', res?.status);
          console.log('Payment Done');
          console.log(
            'route?.params?.type  ______________________ : ',
            route?.params?.type,
          );
          //   alert("Payment Done");
          if (route?.params?.type == 'promote') {
            CreatePromotion();
          } else if (route?.params?.type == 'addbanner') {
            CreateBanner();
          } else if (route?.params?.type == 'account_verify') {
            SubmitVerificationDocument();
          } else if (route?.params?.type == 'listing_paypal') {
            //handle listing payment
            createListingOrder(PayerID);
          } else {
            console.log('route?.params?.type  not found', route?.params?.type);
          }
          setLoading(false);
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log('error ', error);
    }
  };

  //   ________________________________________________

  const CreatePromotion = async () => {
    let listingID = route?.params?.listingID;
    let feature_id = route?.params?.feature_id;
    let promotionID = route?.params?.promotionID;
    let promotionType = route?.params?.promotionType;
    let start_date = route?.params?.start_date;
    let expiry_date = route?.params?.expiry_date;

    post_Promotions_new(
      listingID,
      feature_id,
      promotionID,
      promotionType,
      start_date,
      expiry_date,
    ).then(response => {
      console.log('hessdsre we go in:', response.data);
      //setModalVisible(true)
      setModalVisible(true);
    });
  };

  //banner ads
  const CreateBanner = async () => {
    console.log('CreateBanner function called...');
    var formdata = new FormData();
    formdata.append('user_id', route?.params?.user_id);
    formdata.append('start_date', route?.params?.start_date);
    formdata.append('end_date', route?.params?.end_date);
    formdata.append('app_img', route?.params?.app_img);
    formdata.append('app_img_link', route?.params?.app_img_link);
    formdata.append('cast', route?.params?.cast);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(BASE_URL + 'bannerAdApi.php', requestOptions)
      .then(response => response.json())
      .then(response => {
        if (response?.status == true) {
          //   setsnackbarValue({
          //     value: "Banner Ad created successfully!",
          //     color: "green",
          //   });
          //   setVisible(true);
          //   setTimeout(() => {
          //     navigation.navigate("Drawerroute");
          //   }, 1000);

          setModalVisible(true);
          //sending notification to admin to noti new banner is created
          send_new_banner_req_to_admin()
            .then(res => {
              console.log('banner notification response : ', res?.data);
            })
            .catch(err => {
              console.log('error raised while sending banner notification');
            });
        } else {
          setsnackbarValue({value: response?.message, color: 'red'});
          setVisible(true);
        }
      })
      .catch(error => console.log('error in create banner api', error));
  };

  //verify_account
  const SubmitVerificationDocument = async () => {
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

          setTimeout(() => {
            navigation?.goBack();
          }, 1000);
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

  //listing order
  const createListingOrder = async PayerID => {
    console.log('createListingOrder  _________________________called...');
    createListingTranscation(PayerID);
    updateListing();
    // create_order_Listings(
    //   exchange_other_listing.user_id,
    //   exchange_other_listing.id,
    //   login_user_shipping_address.id
    // ).then((response) => {
    //   if (response?.data?.status == true) {
    //     setModalVisible(true);
    //   } else {
    //     console.log("create order response :  ", response?.data);
    //     setsnackbarValue({
    //       value: "Something went wrong",
    //       color: "red",
    //     });
    //     setVisible(true);
    //   }
    // });
  };

  const createListingTranscation = async PayerID => {
    //   order_id,
    // mode,
    // transaction_id,
    // seller_id,
    // amount
    let fees = route?.params?.fee ? route?.params?.fee : '1.00';
    let shipping_cost = exchange_other_listing?.shipping_cost
      ? exchange_other_listing?.shipping_cost
      : 0;

    fees = parseInt(fees) + parseInt(shipping_cost);

    // let fees = "1.00";
    fees = parseFloat(fees).toFixed(2).toString();

    let order_id = route?.params?.order_details?.order_id;
    let transaction_id = PayerID;
    let mode = 'stripe';
    let seller_id = exchange_other_listing.user_id;
    create_order_Transcation_Listings(
      order_id,
      mode,
      transaction_id,
      seller_id,
      fees,
    )
      .then(res => {
        console.log('res : ', res?.data);
        if (res?.data?.status == true) {
          setModalVisible(true);
        } else {
          console.log('create order response :  ', res?.data);
          setsnackbarValue({
            value: 'Something went wrong',
            color: 'red',
          });
          setVisible(true);
        }
      })
      .catch(err => {
        console.log('error : ', err);
      });
  };

  const updateListing = async () => {
    // console.log("exchange_other_listing?.category  : ", exchange_other_listing);
    // return;
    if (route?.params?.buy_type == 'live_stream') {
      let listing_quantity = exchange_other_listing?.quantity
        ? exchange_other_listing?.quantity
        : 0;
      let buy_quantity = route?.params?.quantity;
      let remaining_quantity =
        parseInt(listing_quantity) - parseInt(buy_quantity);
      console.log(
        'remaining_quantity  _______________________ : ',
        remaining_quantity,
      );
      var data1 = {
        id: exchange_other_listing?.id,
        user_id: exchange_other_listing?.user_id,
        title: exchange_other_listing?.title,
        description: exchange_other_listing?.description,
        price: exchange_other_listing?.price,
        category_id: exchange_other_listing?.category?.category_id,
        // quantity: selectedItem?.quantity,
        subcategory_id: exchange_other_listing?.subcategory?.sub_category_id,
        product_condition: exchange_other_listing?.product_condition,
        // fixed_price: selectedItem?.fixed_price,
        location: exchange_other_listing?.location,
        exchange: exchange_other_listing?.exchange,
        // giveaway: selectedItem?.giveaway,
        shipping_cost: exchange_other_listing?.shipping_cost,
        youtube_link: exchange_other_listing?.youtube_link,
        //
        // quantity: exchange_other_listing?.quantity,
        quantity: remaining_quantity,
        fixed_price: exchange_other_listing?.fixed_price,
        giveaway: exchange_other_listing?.giveaway,
      };

      updateListingDetails(data1)
        .then(response => {
          console.log('update listing response : ', response?.data);
          firestore()
            .collection('live_stream')
            .doc(route?.params?.streamId)
            .collection('last_purchase')
            .doc(route?.params?.streamId)
            .set(
              {
                updatedDate: new Date(),
              },
              {merge: true},
            );
        })
        .catch(err => {
          console.log('error in updating listing quantity : ', err);
        });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <GoogleButton
        title="pay with paypal"
        onPress={() => testPayPalPayment()}
      /> */}
      <Loader isLoading={loading} />
      {isWebViewopen && (
        <WebView
          source={{uri: payPalUrl}}
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

      <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        Icon={appImages.sucess}
        text={TranslationStrings.SUCCESS}
        subtext={TranslationStrings.PAYED_SUCCESSFULLY}
        buttontext={TranslationStrings.OK}
        onPress={() => {
          if (route?.params?.type == 'promote') {
            navigation.replace('Promotions');
          } else if (route?.params?.type == 'addbanner') {
            navigation?.goBack();
            setModalVisible(false);
          } else if (route?.params?.buy_type == 'live_stream') {
            navigation.navigate('WatchLiveStream', {
              response: route?.params?.response,
              host: route?.params?.host,
              nav_type: 'after_payment',
            });
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

export default PaypalPayment;

const styles = StyleSheet.create({});
