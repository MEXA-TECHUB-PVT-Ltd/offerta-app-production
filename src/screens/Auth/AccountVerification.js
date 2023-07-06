import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

///////////////app code fields/////////////
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

//////////////////app icons/////////////
import Ionicons from 'react-native-vector-icons/Ionicons';

///////////////timer/////////////////////
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

///////////////app images//////////////
import {appImages} from '../../constant/images';

/////////////////app components/////////////////
import CustomButtonhere from '../../components/Button/CustomButton';
import CustomModal from '../../components/Modal/CustomModal';

/////////////////////app styles/////////////////////
import Authstyles from '../../styles/GlobalStyles/Authstyles';
import Authtextstyles from '../../styles/GlobalStyles/Authtextstyles';
import Logostyles from '../../styles/GlobalStyles/Logostyles';
import styles from './styles';
import Colors from '../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setPhoneNumber, setLoginUser, setEmail} from '../../redux/actions';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL, IMAGE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fontFamily} from '../../constant/fonts';
import CamerBottomSheet from '../../components/CameraBottomSheet/CameraBottomSheet';
import {
  Checkbox,
  Modal,
  Snackbar,
  TextInput as TextInputPaper,
} from 'react-native-paper';
import PendingAccountApproval from '../../components/Modal/PendingAccountApproval';
import {
  Get_Account_Fees,
  Get_Stripe_Plans,
  get_Login_UserData,
  get_specific_user_detail,
  get_user_status,
} from '../../api/GetApis';
import {Block_user_message} from '../../utills/AppStrings';
import BlockUserView from '../../components/BlockUserView';
import TranslationStrings from '../../utills/TranslationStrings';

import CustomTextInput from '../../components/TextInput/CustomTextInput';

import Loader from '../../components/Loader/Loader';
import {useFocusEffect} from '@react-navigation/native';
import {cancel_user_verification} from '../../api/Sales&Promotions';
import CPaperInput from '../../components/TextInput/CPaperInput';
import paypalApi from '../../api/paypalApi';
import {async} from 'regenerator-runtime';
import {
  check_subscription_status,
  store_subscription_history,
} from '../../api/PostApis';
import {cancel_stripe_subscription} from '../../api/StripeApis';

const AccountVerification = ({navigation, route}) => {
  const refRBSheet = useRef();

  const [bitcoin, setBitcoin] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [bankAccount, setBankAccount] = useState(false);

  const [bitcoinWally, setBitcoinWally] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  //account details
  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [modalVisible2, setModalVisible2] = useState(false);
  const [cnicImage, setCnicImage] = useState({
    uri: '',
    type: '',
    name: '',
  });
  const [userImage, setUserImage] = useState({
    uri: '',
    type: '',
    name: '',
  });
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState('');

  const [accountFee, setAccountFee] = useState(0);
  const [loading1, setLoading1] = useState(false);

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  const [showBlockModal, setShowBlockModal] = useState(false);

  const [subscription, setSubscription] = useState(false);

  const [currentPlan, setCurrentPlan] = useState('');

  const [paypalFee, setPaypalFee] = useState('0');
  const [stripeFee, setStripeFee] = useState('0');
  const [stripePlanDetails, setStripePlanDetails] = useState('');
  const [coinbaseFee, setCoinbaseFee] = useState('0');

  const [subscription_id, setSubscription_id] = useState('');
  const [subscription_mode, setSubscription_mode] = useState('');

  useEffect(() => {
    if (route?.params?.type == 'login') {
      setsnackbarValue({
        value: 'Please Verify your account',
        color: 'red',
      });
      setVisible(true);
    }
  }, [route?.params]);

  const handleVerifyAccount = async () => {
    // console.log("varification called.....");
    // setsnackbarValue({
    //   value: "Please Verify your account",
    //   color: "red",
    // });
    // setVisible(true);
    // return;
    let user_status = await AsyncStorage.getItem('account_status');

    if (user_status == 'block') {
      setShowBlockModal(true);
      return;
    }
    let user_id = await AsyncStorage.getItem('Userid');

    setLoading(true);

    console.log('user_id  :   ', user_id);
    if (!user_id) {
      setsnackbarValue({
        value: 'User not found',
        color: 'red',
      });
      setVisible(true);
      setLoading(false);
    } else if (userImage?.uri == '') {
      setsnackbarValue({
        value: 'Please upload your picture',
        color: 'red',
      });
      setVisible(true);
      setLoading(false);
    } else if (cnicImage?.uri == '') {
      setsnackbarValue({
        value: 'Please upload your  CNIC Image',
        color: 'red',
      });
      setVisible(true);
      setLoading(false);
    } else if (bitcoin == true && bitcoinWally?.length == 0) {
      setsnackbarValue({
        value: `Please ${TranslationStrings.ENTER_BITCOIN_WALLY}`,
        color: 'red',
      });
      setVisible(true);
      setLoading(false);
    } else if (paypal == true && paypalEmail?.length == 0) {
      setsnackbarValue({
        value: `Please ${TranslationStrings.ENTER_PAYPAL_EMAIL}`,
        color: 'red',
      });
      setVisible(true);
      setLoading(false);
    } else if (bankAccount == true && bankAccountNumber?.length == 0) {
      setsnackbarValue({
        value: `Please ${TranslationStrings.ENTER_BANK_ACCOUNT_NUMBER}`,
        color: 'red',
      });
      setVisible(true);
      setLoading(false);
    } else {
      getAccountFees();
      setLoading(false);
      return;

      const formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('cnic', cnicImage);
      formData.append('live_image', userImage);
      let url = BASE_URL + 'accountVerify.php';
      fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData,
      })
        .then(response => response.json())
        .then(response => {
          console.log('rsponse :  ', response);
          if (response?.status == true) {
            // navigation?.popToTop();
            // navigation?.navigate("Login");
            navigation?.goBack();
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

      console.log('formData', formData);
    }
  };

  const getUserDetail = async () => {
    setLoading1(true);
    let user_id = await AsyncStorage.getItem('Userid');
    get_specific_user_detail(user_id)
      .then(async response => {
        let verify_status = response?.verify_status;
        console.log('verify_status  : ', verify_status);
        if (verify_status == null) {
          return false; // user details not found or error occured dugin get
        }
        if (verify_status == 'unverified' || verify_status == 'verified') {
          let subscription_status = await getSubscriptionStatus();
          console.log('subscription_status : ', subscription_status);

          setSubscription_id(response?.subscription?.transaction_id);
          setSubscription_mode(response?.subscription?.mode);
          //check expiration of subscription.......
          console.log('subscription_status  : ', subscription_status);
          console.log(
            ' typeof response?.subscription?.transaction_id  : ',
            typeof response?.subscription?.transaction_id,
          );
          if (
            subscription_status == false &&
            typeof response?.subscription?.transaction_id != 'undefined'
          ) {
            console.log(
              'check expiration of subscription.........................................',
            );
            //subscription is expired .now we store subscription history of next month again
            if (response?.subscription?.mode == 'paypal') {
              console.log(
                'paypal saveSubscriptionDetails  ________________________________________________________',
              );
              // create new subscription history
              saveSubscriptionDetails(response?.subscription?.transaction_id);
            } else {
              //repeat subscription process in coinbase and stripe scenarios
              console.log('else________________________________________');
              return;
            }
          } else {
            console.log('subscription is active.');
          }

          setBitcoin(response?.bitcoin == 'true' ? true : false);
          setPaypal(response?.paypal == 'true' ? true : false);
          setBankAccount(response?.bank == 'true' ? true : false);

          if (response?.bitcoin == 'true') {
            setBitcoinWally(response?.payment?.bitcoin);
          }

          if (response?.paypal == 'true') {
            setPaypalEmail(response?.payment?.paypal_email);
          }

          if (response?.bank == 'true') {
            setBankName(response?.payment?.BankName);
            setAccountHolderName(response?.payment?.AccountHolder);
            setBankAccountNumber(response?.payment?.account_number);
            setZipCode(response?.payment?.ZipCode);
          }

          setSubscription(true);
          let live_image = response?.live_image;
          let cnic = response?.cnic;
          let obj_liveImage = {
            uri: IMAGE_URL + live_image,
            type: 'image/jpeg',
            name: IMAGE_URL + live_image?.split('/').pop(),
          };
          setUserImage(obj_liveImage);
          let obj_cnic = {
            uri: IMAGE_URL + cnic,
            type: 'image/jpeg',
            name: IMAGE_URL + cnic?.split('/').pop(),
          };
          setCnicImage(obj_cnic);
        }
      })
      .catch(err => {
        console.log('Error : ', err);
      })
      .finally(() => setLoading1(false));
  };

  const getUserAccountFee = async () => {
    return new Promise((resolve, reject) => {
      get_Login_UserData()
        .then(user_response => {
          Get_Account_Fees()
            .then(async response => {
              let fee = 0;
              if (user_response?.data?.role == 'user') {
                fee = response?.data?.user_fee;
              } else {
                fee = response?.data?.company_fee;
              }
              resolve(fee);
            })
            .catch(err => {
              console.log('Error  : ', err);
              resolve(0);
            });
        })
        .catch(err => {
          resolve(0);
        });
    });
  };

  //store subscription data .............
  const saveSubscriptionDetails = async subscription_id => {
    console.log(
      'saveSubscriptionDetails__________________________________ called',
    );
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

  //get user subscription status

  const getSubscriptionStatus = async () => {
    return new Promise((resolve, reject) => {
      check_subscription_status()
        .then(user_response => {
          console.log('user_response     :', user_response?.data);
          let status = user_response?.data?.subscription_status;
          resolve(status);
        })
        .catch(err => {
          resolve(0);
        });
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserFee();
      getUserDetail();
      getPaypalPlans();
      // getSubscriptionStatus();
      getStripePlans();
    }, []),
  );

  const getPaypalPlans = async () => {
    // setLoading1(true);
    let token = await paypalApi.generateToken();
    await paypalApi
      .getSubscriptionPlans(token)
      .then(response => {
        // console.log("plans list  :   ", response);
        let plansList = response?.plans ? response?.plans : [];

        get_Login_UserData()
          .then(async user_response => {
            let plan = '';
            if (user_response?.data?.role == 'user') {
              plan = plansList?.filter(item => item?.name == 'user');
            } else {
              fee = response?.data?.company_fee;
              plan = plansList?.filter(item => item?.name != 'user');
            }
            await paypalApi.getPlanDetail(token, plan[0]?.id).then(res => {
              setAccountFee(
                res?.billing_cycles[0]?.pricing_scheme?.fixed_price?.value,
              );
              setPaypalFee(
                res?.billing_cycles[0]?.pricing_scheme?.fixed_price?.value,
              );
              setCurrentPlan(res);
            });
          })
          .catch(err => {
            console.log('erro: ', err);
          });
      })
      .catch(err => {
        console.log('error  :  ', err);
      })
      .finally(() => {
        // setLoading1(false);
      });
  };
  const getStripePlans = async () => {
    // setLoading1(true);
    Get_Stripe_Plans()
      .then(response => {
        console.log('stripe plans : ', response?.data);
        let plansList = response?.data;
        get_Login_UserData()
          .then(async user_response => {
            let plan = '';
            if (user_response?.data?.role == 'user') {
              plan = plansList?.filter(item => item?.product == 'user');
            } else {
              plan = plansList?.filter(item => item?.product != 'user');
            }
            setStripeFee(plan[0]?.price);
            setStripePlanDetails(plan[0]);
          })
          .catch(err => {
            console.log('erro: ', err);
          });
      })
      .catch(err => {
        console.log('error while getting stripe plans : ', err);
      })
      .finally(() => {
        // setLoading1(false);
      });
  };

  const getUserFee = async () => {
    let fee = await getUserAccountFee();
    setAccountFee(fee);
    setCoinbaseFee(fee);
  };

  const getAccountFees = async () => {
    try {
      setLoading1(true);
      get_Login_UserData()
        .then(user_response => {
          //getting user account fees
          Get_Account_Fees()
            .then(async response => {
              let fee = 0;
              if (user_response?.data?.role == 'user') {
                fee = response?.data?.user_fee;
              } else {
                fee = response?.data?.company_fee;
              }
              setAccountFee(fee);
              let user_id = await AsyncStorage.getItem('Userid');
              // navigation?.replace("CardDetails", {
              //   user_id: user_id,
              //   cnic: cnicImage,
              //   live_image: userImage,
              //   fee: fee,
              //   type: "account_verify",
              // });

              navigation.replace('PaymentMethods', {
                user_id: user_id,
                cnic: cnicImage,
                live_image: userImage,
                fee: fee,
                type: 'account_verify',
                bitcoin: bitcoin,
                paypal: paypal,
                bankAccount: bankAccount,
                bitcoinWally: bitcoinWally,
                paypalEmail: paypalEmail,
                //account
                bankAccountNumber: bankAccountNumber,
                bankName: bankName,
                accountHolderName: accountHolderName,
                zipCode: zipCode,
                selectedPlan: currentPlan,

                //fee
                paypalFee: paypalFee,
                stripeFee: stripeFee,
                stripePlanDetails: stripePlanDetails,
                coinbaseFee: coinbaseFee,
              });
            })
            .catch(err => {
              console.log('Error  : ', err);
            })
            .finally(() => {
              setLoading(false);
              setLoading1(false);
            });
        })
        .catch(err => {
          console.log('err : ', err);
        })
        .finally(() => {
          setLoading(false);
          setLoading1(false);
        });
    } catch (error) {
      console.log('Error raised in getAccountFee : ', error);
      setLoading(false);
      setLoading1(false);
    }
  };

  const handleCancelUserSubscription = async () => {
    console.log('subscription_mode  : ', subscription_mode, subscription_id);

    setLoading1(true);
    let subscription_id = await AsyncStorage.getItem('subscription_id');
    console.log('subscription_id  : ', subscription_id);

    cancel_user_verification()
      .then(async response => {
        console.log('response : ', response?.data);

        //______________unsubscribe from paypal
        if (subscription_mode == 'paypal') {
          const token = await paypalApi.generateToken();
          await paypalApi.cancelSubscription(subscription_id, token);
          //______________unsubscribe from paypal
        } else if (subscription_mode == 'stripe') {
          // cancel stripe subscription
          console.log(
            'cancel stripe subscription__________________________',
            subscription_id,
          );
          cancel_stripe_subscription(subscription_id).then(response => {
            console.log(
              'cancel subscription stripe response : ',
              response?.data,
            );
          });
        } else {
          console.log('else________________');
        }
        console.log('__________________________________  ');

        setsnackbarValue({
          value: 'Subscription cancelled successfully',
          color: 'green',
        });
        setVisible(true);
        setTimeout(() => {
          navigation?.goBack();
        }, 500);
      })
      .catch(err => {
        console.log('Error raised in handleCancelUserSubscription : ', err);
      })
      .finally(() => {
        setLoading1(false);
      });
  };
  const onDismissSnackBar = () => setVisible(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Loader isLoading={loading1} />
        <View
          style={{
            flexDirection: 'row',
            // marginTop: hp(3),
            alignItems: 'center',
          }}>
          <Ionicons
            name={'arrow-back'}
            size={25}
            color={Colors.Appthemecolor}
            style={{marginLeft: wp(5)}}
            onPress={() => navigation.goBack()}
          />
          {/* <View
            style={[Logostyles.Logoview, { marginTop: hp(2), marginBottom: 2 }]}
          > */}
          <View style={{flex: 1, alignItems: 'center'}}>
            <Image
              source={appImages.logo}
              style={Logostyles.logo}
              resizeMode="contain"
            />
          </View>
          {/* </View> */}
        </View>

        <Text
          style={{
            color: '#000',
            fontSize: hp(1.6),
            marginHorizontal: wp(2),
            fontFamily: fontFamily.Poppins_Regular,
            flex: 1,
            paddingHorizontal: 20,
            marginVertical: 5,
          }}>
          {TranslationStrings.VERIFICATION_TOP_MESSAGE}
        </Text>

        <Text
          style={{
            ...Authstyles.maintext,
            textAlign: 'center',
          }}>
          {TranslationStrings.VERIFY_ACCOUNT}
        </Text>

        <View>
          <Text
            style={{
              marginLeft: 30,
              color: '#000',
              fontSize: hp(2),
              marginTop: 25,
              fontFamily: fontFamily.Poppins_Regular,
            }}>
            {TranslationStrings.PROFILE_PICTURE} :
          </Text>

          <TouchableOpacity
            onPress={() => {
              setSelected(0);
              refRBSheet?.current?.open();
            }}
            disabled={subscription == true ? true : false}>
            <View style={style.card}>
              <View style={{alignItems: 'center'}}>
                {userImage?.uri == '' ? (
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setSelected(0);
                    }}
                    disabled={subscription == true ? true : false}
                    // onPress={() => navigation.navigate("CameraViewScreen")}
                  >
                    <Image
                      source={appImages.UploadIcpn}
                      style={{
                        width: wp('10%'),
                        height: wp('10%'),
                      }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: Colors.appgreycolor,
                        fontSize: hp(1.8),
                        marginTop: hp(3),
                        fontFamily: fontFamily.Poppins_Regular,
                      }}>
                      {TranslationStrings.UPLOAD_YOUR_PICTURE}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setSelected(0);
                    }}
                    disabled={subscription == true ? true : false}
                    style={style.imageView}>
                    {/* <ImageBackground
                      blurRadius={4}
                      resizeMode="cover"
                      source={{uri: userImage.uri}}
                      style={{flex: 1, justifyContent: 'center'}}> */}
                    <Image
                      source={{uri: userImage.uri}}
                      // style={style.imageView}
                      style={{width: '100%', height: '100%'}}
                      resizeMode={'cover'}
                    />
                    {/* </ImageBackground> */}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              marginLeft: 30,
              color: '#000',
              fontSize: hp(2),
              marginTop: 25,
              fontFamily: fontFamily.Poppins_Regular,
            }}>
            {TranslationStrings.UPLOAD_DOCUMENTS} :
          </Text>

          <TouchableOpacity
            onPress={() => {
              setSelected(1);
              refRBSheet?.current?.open();
            }}
            disabled={subscription == true ? true : false}>
            <View style={style.card}>
              <View style={{alignItems: 'center'}}>
                {cnicImage?.uri == '' ? (
                  <TouchableOpacity
                    style={{alignItems: 'center'}}
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setSelected(1);
                    }}
                    disabled={subscription == true ? true : false}
                    // onPress={() => navigation.navigate("CameraViewScreen")}
                  >
                    <Image
                      source={appImages.UploadIcpn}
                      style={{
                        width: wp('10%'),
                        height: wp('10%'),
                      }}
                      resizeMode="contain"
                    />

                    <Text
                      style={{
                        color: Colors.appgreycolor,
                        fontSize: hp(1.8),
                        marginTop: hp(3),
                        fontFamily: fontFamily.Poppins_Regular,
                      }}>
                      {TranslationStrings.UPLOAD_DOCUMENTS}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      refRBSheet?.current?.open();
                      setSelected(1);
                    }}
                    disabled={subscription == true ? true : false}
                    style={style.imageView}>
                    {/* <ImageBackground
                      blurRadius={4}
                      resizeMode="cover"
                      source={{uri: cnicImage.uri}}
                      style={{flex: 1, justifyContent: 'center'}}> */}
                    <Image
                      source={{uri: cnicImage.uri}}
                      // style={style.imageView}
                      // resizeMode={"stretch"}

                      style={{width: '100%', height: '100%'}}
                      resizeMode={'cover'}
                    />
                    {/* </ImageBackground> */}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            ...Authstyles.maintext,
            textAlign: 'center',
            color: '#000',
            fontSize: hp(2.2),
            width: wp(100),
            marginBottom: 0,
          }}>
          {TranslationStrings.SELECT_PAYOUT_METHODS}
        </Text>
        <View
          style={{
            flex: 1,
            marginHorizontal: 25,
          }}>
          <View style={style.checkboxContainer}>
            <TouchableOpacity
              onPress={() => {
                setBitcoin(!bitcoin);
              }}
              style={style.rowViewCheckbox}>
              <Checkbox status={bitcoin ? 'checked' : 'unchecked'} />
              <Text style={style.txtCheckbox}>
                {TranslationStrings.BITCOIN_WALLET}
              </Text>
            </TouchableOpacity>
            {bitcoin && (
              <CPaperInput
                placeholder={TranslationStrings.ENTER_BITCOIN_WALLY}
                value={bitcoinWally}
                onChangeText={text => setBitcoinWally(text)}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                setPaypal(!paypal);
              }}
              style={style.rowViewCheckbox}>
              <Checkbox status={paypal ? 'checked' : 'unchecked'} />
              <Text style={style.txtCheckbox}>
                {TranslationStrings.PAYPAL_EMAIL}
              </Text>
            </TouchableOpacity>

            {paypal && (
              <CPaperInput
                placeholder={TranslationStrings.ENTER_PAYPAL_EMAIL}
                value={paypalEmail}
                onChangeText={text => setPaypalEmail(text)}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                setBankAccount(!bankAccount);
              }}
              style={style.rowViewCheckbox}>
              <Checkbox status={bankAccount ? 'checked' : 'unchecked'} />
              <Text style={style.txtCheckbox}>
                {TranslationStrings.BANK_Account}
              </Text>
            </TouchableOpacity>
            {bankAccount && (
              <>
                <CPaperInput
                  placeholder={'Enter Bank Name'}
                  value={bankName}
                  onChangeText={text => setBankName(text)}
                />
                <CPaperInput
                  placeholder={'Enter Account Holder Name'}
                  value={accountHolderName}
                  onChangeText={text => setAccountHolderName(text)}
                />
                <CPaperInput
                  placeholder={TranslationStrings.ENTER_BANK_ACCOUNT_NUMBER}
                  value={bankAccountNumber}
                  onChangeText={text => setBankAccountNumber(text)}
                />
                <CPaperInput
                  placeholder={'Enter Zip Code'}
                  value={zipCode}
                  onChangeText={text => setZipCode(text)}
                />
              </>
            )}
          </View>
        </View>

        {/* <View
          style={{
            paddingHorizontal: 30,
            // padding: 20,
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: Colors.Appthemecolor,
              fontFamily: fontFamily.Poppins_SemiBold,
              fontSize: hp(2),
            }}
          >
            {TranslationStrings.ACCOUNT_FEE} :{accountFee}
            {"$"}
          </Text>
        </View> */}

        <View style={{height: 120}}>
          {subscription == true ? (
            <CustomButtonhere
              title={TranslationStrings.CANCEL_SUBSCRIPTION}
              widthset={80}
              labelWidth={250}
              topDistance={5}
              loading={loading}
              disabled={disable}
              onPress={() => handleCancelUserSubscription()}
            />
          ) : (
            <CustomButtonhere
              title={TranslationStrings.VERIFY}
              widthset={80}
              topDistance={5}
              loading={loading}
              disabled={disable}
              onPress={() => handleVerifyAccount()}
              // onPress={() => {
              //   navigation?.navigate("PaypalMonthlySubscription");
              // }}
            />
          )}
        </View>

        <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(20),
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>

        <BlockUserView
          visible={showBlockModal}
          setVisible={setShowBlockModal}
        />

        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={'From Gallery'}
          type={'verify'}
          onCameraImageSelect={file => {
            if (file) {
              let obj = {
                uri: file.path,
                type: file.mime,
                name: file.path.split('/').pop(),
              };
              console.log('selected :    ', selected);
              if (selected == 0) {
                setUserImage(obj);
              } else {
                setCnicImage(obj);
              }
            }
          }}
          onGalleryImageSelect={file => {
            if (file) {
              let obj = {
                uri: file.path,
                type: file.mime,
                name: file.path.split('/').pop(),
              };
              console.log('selected :    ', selected);
              if (selected == 0) {
                setUserImage(obj);
              } else {
                setCnicImage(obj);
              }
            }
            console.log('image selected from gallery :   ', file);
          }}
        />
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.failed}
          text={'Error'}
          subtext={'OTP Not Matched Confirm it or Resend it'}
          buttontext={'GO BACK'}
          onPress={() => {
            setModalVisible(false);
          }}
        />

        <PendingAccountApproval
          modalVisible={modalVisible2}
          CloseModal={() => setModalVisible2(false)}
          Icon={appImages.pending_account}
          text={'Pending Account Approval'}
          onPress={() => {
            setModalVisible2(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountVerification;

const style = StyleSheet.create({
  card: {
    width: wp(85),
    height: wp(45),
    borderRadius: 20,
    borderWidth: 1.5,
    alignSelf: 'center',
    borderColor: Colors.appgreycolor,
    marginTop: wp('5%'),
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: wp('5%'),
    overflow: 'hidden',
  },
  imageView: {
    width: wp(85),
    height: wp(45),

    borderRadius: 20,
  },
  checkboxContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  rowViewCheckbox: {flexDirection: 'row', alignItems: 'center'},
  txtCheckbox: {color: '#000', fontSize: 14},
});
