import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';

////////navigation////////////////
import {useIsFocused} from '@react-navigation/native';

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

import {Snackbar} from 'react-native-paper';
import TranslationStrings from '../../../../../utills/TranslationStrings';
import {
  checkout,
  create_order_Listings,
  create_order_Listings_new,
  create_order_Transcation_Listings,
} from '../../../../../api/Offer';
import Loader from '../../../../../components/Loader/Loader';
import {updateListingDetails} from '../../../../../api/PostApis';
import firestore from '@react-native-firebase/firestore';

const ConfirmAddress = ({navigation, route}) => {
  ///////////////data states////////////////////
  const [cardno, setCardNo] = React.useState();
  const [expirydate, setExpiryDate] = React.useState();
  const [cvv, setCvv] = React.useState();
  const [country, setCountry] = React.useState();

  ////////////country picker states/////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState('92');
  const [countryname, setCountryName] = useState('Pak');

  ////////////////navigation/////////////////
  const isFocused = useIsFocused();

  ////////////////redux/////////////
  // const { exchange_other_listing } = useSelector(
  //   (state) => state.loginuserReducer
  // );
  const {exchange_other_listing} = useSelector(state => state.userReducer);

  const dispatch = useDispatch();
  const {login_user_shipping_address} = useSelector(
    state => state.loginuserReducer,
  );

  ////////////list state////////////
  const [shippinglist, setshippinglist] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState('');

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    console.log('useEffect  : ', isFocused);
    if (isFocused) {
      get_Shipping_Address()
        .then(response => {
          console.log('get shipping adress repnse  :  ', response?.data);
          if (response.data.msg === 'No Result') {
            setshippinglist([]);
          } else {
            setshippinglist(response.data);
            if (response?.data?.length > 0) {
              dispatch(setLoginUserShippingAddress(response?.data[0]));
            }
          }
        })
        .catch(err =>
          console.log('errr raised while getting shipping address : ', err),
        );
    }
  }, [isFocused]);

  const handleNext = async () => {
    // navigation.navigate("Checkout", {
    //   payment_type: route?.params?.payment_type,
    // });
    // return;
    if (shippinglist?.length == 0) {
      setsnackbarValue({
        value: 'Please Add Shipping Address to continue',
        color: 'red',
      });
      setVisible(true);
    } else {
      // console.log("shipping list :  ", shippinglist[0]);
      if (!login_user_shipping_address) {
        dispatch(setLoginUserShippingAddress(shippinglist[0]));
      } else {
        console.log('address mil gya..');
      }

      navigation.replace('Checkout', {
        payment_type: route?.params?.payment_type,
        type: route?.params?.type,
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

  const handleSubmit = async () => {
    // navigation?.popToTop();
    // navigation.navigate('WatchLiveStream', {
    //   response: route?.params?.response,
    //   host: false,
    //   nav_type: 'after_payment',
    // });
    // console.log('here..............................................:::::::');
    // return;

    console.log('route?.params?.streamId :  ', route?.params?.streamId);
    //test
    // updateListingQuantity();

    if (route?.params?.type == 'giveaway') {
      //handle give away scenario
      createListingOrder('giveaway');
      return;
    } else if (
      route?.params?.type == 'pay_on_delivery' ||
      route?.params?.type == 'pay_on_pickup'
    ) {
      createListingOrder(route?.params?.type);
      return;
    }
    let type = '';
    if (route?.params?.index == 2) {
      type = 'pay_on_delivery';
    } else if (route?.params?.index == 3) {
      type = 'pay_on_pickup';
    }
    if (shippinglist?.length == 0) {
      setsnackbarValue({
        value: 'Please Add Shipping Address to continue',
        color: 'red',
      });
      setVisible(true);
    } else if (type) {
      let user_id = await AsyncStorage.getItem('Userid');
      let obj = {
        user_id: user_id,
        listing_id: exchange_other_listing?.id,
        currency: 'inr',
        type: type,
      };

      create_order_Listings(
        exchange_other_listing.user_id,
        exchange_other_listing.id,
        login_user_shipping_address.id,
      )
        .then(res => {
          console.log('create order response : ', res?.data);
          checkout(obj).then(response => {
            console.log('checkout response :  ', response?.data);
            if (response?.data?.status == true) {
              setsnackbarValue({
                value: 'Order Confirmed',
                color: 'green',
              });
              setVisible(true);
              console.log('route .....', route?.params?.buy_type);
              if (route?.params?.buy_type == 'live_stream') {
                navigation.replace('WatchLiveStream');
              } else {
                console.log('else executed.......');
                setTimeout(() => {
                  // navigation.navigate("BottomTab");
                  navigation.replace('SalesOrders');
                }, 500);
              }
            } else {
              setsnackbarValue({
                value: 'Something went wrong',
                color: 'red',
              });
              setVisible(true);
            }
          });
        })
        .catch(err => {
          console.log('err ', err);
        });
    } else {
      //do nothing type is not valid
      console.log('do nothing type is not valid');
    }

    // checkout(obj)
    // .then((res) => {
    //   console.log("checkout api response", res?.data);
    //   if (res?.data?.status == false) {
    //     setsnackbarValue({ value: res?.data?.message, color: "red" });
    //     setVisible(true);
    //   } else {
    //     setModalVisible(true);
    //   }
    // })
    // .catch((err) => {
    //   console.log("error raised : ", err);
    //   setsnackbarValue({
    //     value: "Something went wrong",
    //     color: "red",
    //   });
    //   setVisible(true);
    // });
  };

  const createListingOrder = async type => {
    try {
      console.log('createListingOrder  _________________________called...');

      setLoading(true);

      create_order_Listings_new(
        exchange_other_listing.user_id,
        exchange_other_listing.id,
        login_user_shipping_address.id,
        type,
        'no_payment_mode',
      )
        .then(response => {
          console.log('create order response :  ', response?.data);
          if (response?.data?.success == true) {
            //order created successfully
            let order_id = response?.data?.order_id;
            createListingTranscation(order_id, type);
            updateListing();
          } else {
            alert('Something went wrong');
          }
        })
        .catch(err => {
          console.log('err : ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const createListingTranscation = async (order_id1, type) => {
    console.log('order_id1_____________________________', order_id1);
    setLoading(true);
    let amount = 0;

    if (type == 'giveaway') {
      amount = 0;
    } else if (route?.params?.buy_type == 'counter_offer') {
      let shipping_cost = exchange_other_listing?.shipping_cost
        ? parseInt(exchange_other_listing?.shipping_cost)
        : 0;
      amount = parseInt(route?.params?.counter_fee) + parseInt(shipping_cost);
    } else {
      let shipping_cost = exchange_other_listing?.shipping_cost
        ? parseInt(exchange_other_listing?.shipping_cost)
        : 0;
      amount =
        parseInt(exchange_other_listing?.price) + parseInt(shipping_cost);
    }
    console.log('amount_______________________________________  : ', amount);

    let order_id = order_id1;
    let transaction_id = null;
    let mode = 'no_payment_mode';
    let seller_id = exchange_other_listing.user_id;
    create_order_Transcation_Listings(
      order_id,
      mode,
      transaction_id,
      seller_id,
      amount,
    )
      .then(res => {
        console.log('res : ', res?.data);
        if (res?.data?.status == true) {
          setsnackbarValue({
            value: 'Order submitted successfully',
            color: 'green',
          });
          setVisible(true);
          if (route?.params?.buy_type == 'live_stream') {
            // navigation.replace('WatchLiveStream');
            // navigation?.popToTop();
            // navigation?.goBack();
            navigation.navigate('WatchLiveStream', route?.params);
          } else {
            navigation.replace('SalesOrders');
          }
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
      })
      .finally(() => {
        setLoading(false);
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
        quantity: remaining_quantity ? remaining_quantity : 0,
        fixed_price: exchange_other_listing?.fixed_price,
        giveaway: exchange_other_listing?.giveaway,
      };

      updateListingDetails(data1)
        .then(response => {
          console.log('update listing response : ', response?.data);
          console.log(
            'route?.params?.streamId  ______________________________ : ',
            route?.params?.streamId,
          );
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {CountryPickerView == true ? (
          <CountryPicker
            withFilter={true}
            withCallingCode={true}
            withModal={true}
            withFlag={true}
            withFlagButton={true}
            withCountryNameButton={true}
            onSelect={e => {
              console.log('country here', e);
              var name = e.name.substring('4');
              setCountryPickerView(false);
              if (e.name === 'Antarctica') {
                setCountryCode('672');
              }
              if (e.name === 'Bouvet Island') {
                setCountryCode('55');
              } else {
                setCountryCode(JSON.parse(e.callingCode));
              }
              //setCountryFlag(JSON.parse(e.flag))
              //setCountryCode(JSON.parse(e.callingCode))
              setCountryName(e.name);
            }}
            onClose={e => {
              setCountryPickerView(false);
            }}
            visible={CountryPickerView}
          />
        ) : (
          <View></View>
        )}
        <CustomHeader
          headerlabel={TranslationStrings.BUY}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />
        <Loader isLoading={loading} />

        <View
          style={[
            styles.timelineflex,
            {
              marginLeft: wp(0),
            },
          ]}>
          {route?.params?.index == 0 ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(8),
              }}>
              <View style={styles.timelineinnerview}></View>
              <View style={[styles.timeline, {width: wp(79)}]}></View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: wp(8),
              }}>
              <View style={styles.timelineinnerview}></View>
              <View style={[styles.filedtimeline, {width: wp(34.5)}]}></View>
              <View style={styles.timelineinnerview}></View>
              <View style={[styles.filedtimeline, {width: wp(34.5)}]}></View>
              <View style={styles.timelineinnerview}></View>
            </View>
          )}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: wp('2%'),
              //backgroundColor: 'red'
            }}></View>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp(0),
          }}>
          <Text style={styles.timelinetext}>
            {TranslationStrings.CONFIRM_ADDRESS}
          </Text>
        </View>
        {shippinglist?.length == 0 ? (
          <View style={{marginBottom: hp(14)}}>
            <NoDataFound
              icon={'exclamation-thick'}
              text={
                TranslationStrings.NO_ADDRESS_ADDED_FIRST_ADD_SHIPPING_ADDRESS
              }
            />
            <TouchableOpacity
              style={{
                backgroundColor: Colors.Appthemecolor,
                width: wp(50),
                height: hp(6),
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: wp(3),
              }}
              onPress={() =>
                navigation.navigate('ShippingAddress', {
                  navtype: 'Buy',
                  index: route?.params?.index,
                })
              }>
              <Text style={[styles.timelinetext, {color: 'white'}]}>
                {TranslationStrings.ADD_ADDRESS}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={shippinglist}
              renderItem={({item}) => (
                <ShippingAddressCard
                  style={{
                    elevation: item?.id == selectedAddress ? 10 : 1,
                    borderWidth:
                      item?.id == login_user_shipping_address?.id ? 1 : 0,
                    borderColor: Colors.Appthemecolor,
                  }}
                  username={item.country}
                  address_1={item.address_1}
                  address_2={item.address_2}
                  city={item.city}
                  state={item.state}
                  country={item.country}
                  type={'Buy'}
                  cardonpress={() => {
                    dispatch(setLoginUserShippingAddress(item));
                  }}
                  onpress={() => {
                    dispatch(setLoginUserShippingAddress(item));
                    navigation.navigate('UpdateShippingAddress', {
                      index: route?.params?.index,
                    });
                  }}
                  // onLongPress={() => {
                  //   setSelectedAddress(item?.id);
                  // }}
                />
              )}
              keyExtractor={(item, index) => index}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
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

        {/* <View>
            <CustomTextInput
              type={"withouticoninput"}
              texterror={"invalid"}
              term={cardno}
              placeholder="Enter your nick name"
              onTermChange={(newUsername) => setCardNo(newUsername)}
            />
            <CustomTextInput
              type={"withouticoninput"}
              term={expirydate}
              placeholder="Enter your name"
              onTermChange={(newFname) => setExpiryDate(newFname)}
            />
        
                      <TouchableOpacity
            onPress={() => {
              setCountryPickerView(true)
            }}>
                         <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={countryname}
              editable={false}
              disable={false}
              placeholder="Select Country"
              onTermChange={(newcountry) => setCountryName(newcountry)}
            />
            </TouchableOpacity>
            <CustomTextInput
              type={"withouticoninput"}
              term={cvv}
              placeholder="Enter address 1"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
                  <CustomTextInput
              type={"withouticoninput"}
              term={cvv}
              placeholder="Enter address 2"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
            <View style={{flexDirection:'row',marginHorizontal:wp(10),justifyContent:'space-between'}}>
            <CustomTextInput
              type={"iconinput"}
              term={cvv}
              length={'small'}
              placeholder="City"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
           <CustomTextInput
              type={"iconinput"}
              term={cvv}
              length={'small'}
              width={20}
              placeholder="State"
              onTermChange={(newCvv) => setCvv(newCvv)}
            /> 
            </View>
                         <CustomTextInput
              type={"iconinput"}
              term={cvv}
              placeholder="Enter ZIP code"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
                         <CustomTextInput
              type={"withouticoninput"}
              term={cvv}
              placeholder="Enter Phone Number"
              onTermChange={(newCvv) => setCvv(newCvv)}
            />
          </View> */}
        <View style={{marginBottom: hp(15)}}>
          {route?.params?.index == 0 ? (
            <CustomButtonhere
              title={TranslationStrings.NEXT}
              // title={
              //   TranslationStrings.getLanguage() == "en"
              //     ? TranslationStrings.NEXT
              //     : TranslationStrings.SUBMIT
              // }
              widthset={80}
              topDistance={10}
              onPress={() => {
                handleNext();
              }}
            />
          ) : (route?.params?.type == 'pay_on_delivery' ||
              route?.params?.type == 'pay_on_pickup') &&
            exchange_other_listing?.shipping_cost != '0.0' ? (
            // <CustomButtonhere
            //   title={TranslationStrings.NEXT}
            //   widthset={80}
            //   topDistance={10}
            //   onPress={() => {
            //     handleNext();
            //   }}
            // />
            <>
              {shippinglist?.length == 0 ? null : (
                <CustomButtonhere
                  title={TranslationStrings.SUBMIT}
                  widthset={80}
                  topDistance={10}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              )}
            </>
          ) : (
            <>
              {shippinglist?.length == 0 ? null : (
                <CustomButtonhere
                  title={TranslationStrings.SUBMIT}
                  widthset={80}
                  topDistance={10}
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmAddress;
