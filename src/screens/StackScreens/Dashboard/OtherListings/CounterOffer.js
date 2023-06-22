import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

/////////////app icons/////////////////////
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

//////////////////app components///////////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import DashboardCard from '../../../../components/CustomCards/DashboardCard';
import CustomTextInput from '../../../../components/TextInput/CustomTextInput';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setExchangeOffer_OtherListing} from '../../../../redux/actions';

////////////////app Colors/////////////
import Colors from '../../../../utills/Colors';

/////////////app styles////////////////
import styles from './styles';

//////////////app functions///////////////
import {
  post_Listings_Conter_Offer,
  post_Listings_Price_Offer,
} from '../../../../api/PostApis';

/////////////image url/////////////
import {IMAGE_URL} from '../../../../utills/ApiRootUrl';

///////////////////App Heigth and width///////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/////////////////app images//////////
import {appImages} from '../../../../constant/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Snackbar} from 'react-native-paper';
import CustomModal from '../../../../components/Modal/CustomModal';
import {
  counter_offer_Accept_OR_Reject,
  create_order_Listings,
  create_order_Listings_new,
  create_order_Transcation_Listings,
} from '../../../../api/Offer';

import {
  GetListingsDetails,
  GetListingsDetails_New,
  get_specific_user_detail,
} from '../../../../api/GetApis';
import TranslationStrings from '../../../../utills/TranslationStrings';
import {get_Shipping_Address} from '../../../../api/ShippingAddress';
import Loader from '../../../../components/Loader/Loader';

//////////////////appImages.//////////////////

const CounterOffer = ({navigation, route}) => {
  ////////////////redux/////////////
  const {exchange_other_listing, exchange_my_listing} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  //////////////////Textinput state////////////
  const [offerprice, setOfferPrice] = React.useState(0);

  const [snackbarMessage, setsnackbarMessage] = useState('');

  const [currentUser, setCurrentUser] = useState('');

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkData();
  }, [route?.params]);

  const checkData = async () => {
    let user_id = await AsyncStorage.getItem('Userid');
    setCurrentUser(user_id);
  };

  ////////////LISTING LIKES//////////
  const Listings_Exchange_Offer = async props => {
    // console.log("props   :  ", props);
    // console.log("exchange_other_listing  :   ", exchange_other_listing.user_id);
    // console.log("exchange_other_listing  :   ", exchange_other_listing.id);
    // return;

    if (offerprice == '' || offerprice == 0) {
      setsnackbarMessage('Please Enter Offer Price');
      onToggleSnackBar();
      return;
    }

    var user_id = await AsyncStorage.getItem('Userid');
    console.log('logged in user id  :  ', user_id);
    console.log('sale_by  :   ', route?.params?.sale_by);
    console.log('listing_id  :   ', route?.params?.listing_id);
    console.log('offer price  :   ', offerprice);

    console.log('buyer_id  :  ', route?.params?.buyer_id);
    route.params.navtype = 'counter_offer';
    // console.log("route?.params?.navtype", route?.params?.navtype);
    // navigation.replace("ChatScreen", {
    //   buyer_id: route?.params?.buyer_id,
    //   sale_by: route?.params?.sale_by,
    //   userid: route?.params?.buyer_id,
    //   offerprice: offerprice,
    //   // offerid: response.data.data.id,
    //   offerid: "-1",
    //   item_price: route?.params.itemprice,
    //   navtype: "counter_offer",
    //   listing_id: route?.params?.listing_id,
    //   listing_image: route?.params?.item_img,
    // });

    // return;

    setList_Date({
      otheruser_id: exchange_other_listing.user_id,
      other_item_id: exchange_other_listing.id,
      item_offerprice: props,
    });

    console.log('user_id :  ', user_id);
    console.log('list_Date :  ', list_data);

    // navigation.replace("ChatScreen", {
    //   buyer_id: route?.params?.buyer_id,
    //   sale_by: route?.params?.sale_by,
    //   userid: route?.params?.buyer_id,
    //   offerprice: offerprice,
    //   // offerid: response.data.data.id,
    //   offerid: -23,
    //   item_price: route?.params.itemprice,
    //   navtype: "counter_offer",
    //   listing_id: route?.params?.listing_id,
    //   listing_image: route?.params?.item_img,
    // });
    // return;

    post_Listings_Conter_Offer(
      route?.params?.buyer_id,
      route?.params?.sale_by,
      route?.params?.listing_id,
      offerprice,
    ).then(response => {
      //dispatch(setExchangeOffer_OtherListing(list_data))
      console.log(
        'counter offfer response   : :   :: ::  :   :  :: :  ::::: : : ::',
        response?.data,
      );

      if (response?.data?.status == true) {
        navigation.replace('ChatScreen', {
          buyer_id: route?.params?.buyer_id,
          sale_by: route?.params?.sale_by,
          userid: route?.params?.buyer_id,
          offerprice: offerprice,
          offerid: response.data.data.id,
          item_price: route?.params.itemprice,
          navtype: 'counter_offer',
          listing_id: route?.params?.listing_id,
          listing_image: route?.params?.item_img,
        });
      } else {
        setsnackbarMessage(response?.data?.message);
        onToggleSnackBar();
      }
      // setListing_Like_User_id(response.data.data.user_id);
    });
  };
  const [list_data, setList_Date] = useState({
    otheruser_id: exchange_other_listing.user_id,
    other_item_id: exchange_other_listing.id,
    item_offerprice: offerprice,
  });

  // useEffect(() => {
  //   console.log("image here:", exchange_other_listing);
  // }, []);

  const [shipping_id, setShipping_id] = useState('');

  useEffect(() => {
    GETAddress();
  }, [shipping_id]);

  const GETAddress = () => {
    get_Shipping_Address()
      .then(response => {
        console.log('get shipping adress repnse  :  ', response?.data);
        if (response.data.msg === 'No Result') {
          setShipping_id(0);
        } else {
          let list = response?.data ? response?.data : [];
          if (list?.length > 0) {
            setShipping_id(list[0]?.id);
          } else {
            setShipping_id(0);
          }
        }
      })
      .catch(err =>
        console.log('errr raised while getting shipping address : ', err),
      );
  };

  const handleCountOfferAccept_Reject = status => {
    setLoading(true);
    console.log('offer id  :::   ', route?.params?.offerid);
    console.log('status ::   ', status);
    let obj = {
      sale_by: route?.params?.sale_by,
      order_by: route?.params?.buyer_id,
      listing_id: route?.params?.listing_id,
      shipping_id: shipping_id,
    };

    counter_offer_Accept_OR_Reject(route?.params?.offerid, status)
      .then(response => {
        console.log(
          'counter offer accepting/rejecting response  :    ',
          response?.data,
        );

        if (response?.data?.status == true) {
          if (status == 'accept') {
            setModalVisible(true);
            // CreteOrder();
          } else {
            setModalVisible1(true);
          }
        } else {
          setsnackbarMessage(response?.data?.message);
          onToggleSnackBar();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const CreteOrder = async () => {
    // create_order_Listings(
    //   route?.params?.sale_by,
    //   route?.params?.listing_id,
    //   shipping_id
    // )
    //   .then((response) => {
    //     console.log("response ::::::", response?.data);
    //   })
    //   .catch((err) => {
    //     console.log("err : ", err);
    //   });

    createListingOrder('fixed_price');
  };

  // Order__________________________________________________________

  const createListingOrder = async type => {
    try {
      console.log('createListingOrder  _________________________called...');

      setLoading(true);

      // route?.params?.sale_by,
      // route?.params?.listing_id,
      // shipping_id

      create_order_Listings_new(
        exchange_other_listing.user_id,
        exchange_other_listing.id,
        shipping_id,
        type,
        'no_payment_mode',
      )
        .then(response => {
          console.log('create order response :  ', response?.data);
          if (response?.data?.success == true) {
            //order created successfully
            let order_id = response?.data?.order_id;
            createListingTranscation(order_id, type);
          } else {
            //  alert("Something went wrong");
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
    } else {
      let shipping_cost = exchange_other_listing?.shipping_cost
        ? parseInt(exchange_other_listing?.shipping_cost)
        : 0;
      amount =
        parseInt(exchange_other_listing?.price) + parseInt(shipping_cost);
    }
    console.log('amount  : ', amount);

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
          // setsnackbarValue({
          //   value: "Order submitted successfully",
          //   color: "green",
          // });
          // setVisible(true);
          // navigation.replace("SalesOrders");
        } else {
          console.log('create order response :  ', res?.data);
          // setsnackbarValue({
          //   value: "Something went wrong",
          //   color: "red",
          // });
          // setVisible(true);
        }
      })
      .catch(err => {
        console.log('error : ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Order__________________________________________________________

  const getListingDetail = async () => {
    setLoading(true);
    // GetListingsDetails(route?.params?.listing_id)
    GetListingsDetails_New(route?.params?.listing_id)
      .then(async response => {
        console.log('listing response  :  ', response?.data);
        dispatch(setExchangeOffer_OtherListing(response?.data[0]));
        let userDetails = await get_specific_user_detail(
          response?.data[0]?.user_id,
        );
        console.log(
          'response?.data[0]?.user_id ::::::  ',
          response?.data[0]?.user_id,
        );
        console.log('userDetails  :  ', userDetails);

        // route?.params?.offer_price fee
        navigation.replace('PaymentOptions', {
          user_id: response?.data[0]?.user_id,
          listing_user_detail: userDetails,
          buy_type: 'counter_offer',
          counter_fee: route?.params?.offer_price,
        });

        // get_Shipping_Address()
        //   .then(response => {
        //     console.log('get shipping adress repnse  :  ', response?.data);

        //     if (response.data.msg === 'No Result') {
        //       //    //add shipping address
        //       navigation.navigate('ShippingAddress', {
        //         navtype: 'CounterOffer',
        //         user_id: response?.data[0]?.user_id,
        //         listing_user_detail: userDetails,
        //         buy_type: 'counter_offer',
        //       });
        //     } else {
        //       if (response?.data?.length < 0) {
        //         //add shipping address
        //         navigation.navigate('ShippingAddress', {
        //           navtype: 'CounterOffer',
        //           user_id: response?.data[0]?.user_id,
        //           listing_user_detail: userDetails,
        //           buy_type: 'counter_offer',
        //         });
        //       } else {
        //         navigation.replace('PaymentOptions', {
        //           user_id: response?.data[0]?.user_id,
        //           listing_user_detail: userDetails,
        //           buy_type: 'counter_offer',
        //         });
        //       }
        //     }
        //   })
        //   .catch(err =>
        //     console.log('errr raised while getting shipping address : ', err),
        //   );
      })
      .catch(() => {
        navigation?.goBack();
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
          headerlabel={TranslationStrings.COUNTER_OFFER}
          iconPress={() => {
            navigation.goBack();
          }}
          type={'no_icon'}
          icon={'arrow-back'}
        />
        <Loader isLoading={loading} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {route?.params?.item_img && (
            <Image
              source={{uri: IMAGE_URL + route?.params?.item_img}}
              style={{width: wp(90), height: hp(30), borderRadius: wp(4)}}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={{paddingHorizontal: wp(3), marginTop: hp(3)}}>
          <Text style={{color: 'black'}}>{TranslationStrings.ITEM_PRICE}</Text>
          <CustomTextInput
            type={'withouticoninput'}
            texterror={'invalid'}
            term={route?.params.itemprice + '$'}
            placeholder={TranslationStrings.SHIPPING_PRICE}
            editable={false}
            //onTermChange={(my_price) => setMyPrice(my_price)}
            keyboard_type={'numeric'}
          />

          <Text style={{color: 'black'}}>{TranslationStrings.OFFER_PRICE}</Text>
          {route?.params?.senderId == currentUser ||
          route?.params?.type == 'view' ? (
            <CustomTextInput
              type={'withouticoninput'}
              texterror={'invalid'}
              term={route?.params?.offer_price + '$'}
              editable={false}
              placeholder={TranslationStrings.ENTER_PRICE}
              onTermChange={offer_price => setOfferPrice(offer_price)}
              keyboard_type={'numeric'}
            />
          ) : (
            <CustomTextInput
              type={'withouticoninput'}
              texterror={'invalid'}
              term={offerprice}
              placeholder={TranslationStrings.ENTER_PRICE}
              onTermChange={offer_price => setOfferPrice(offer_price)}
              keyboard_type={'numeric'}
            />
          )}

          {/* <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={route?.params?.offer_price + "$"}
            placeholder="Enter Price"
            onTermChange={(offer_price) => setOfferPrice(offer_price)}
            keyboard_type={"numeric"}
            editable={false}
          /> */}
        </View>

        {route?.params?.offer_status == 'accept' ||
        route?.params?.offer_status == 'reject' ? null : route?.params
            ?.senderId == currentUser ? null : route?.params?.sale_by ==
          currentUser ? (
          <View style={styles.btnView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => Listings_Exchange_Offer(offerprice)}>
              <Text style={styles.btnText}>{TranslationStrings.SUBMIT}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{...styles.smallbtnView, marginTop: 35}}>
            <TouchableOpacity
              style={styles.smallbtn}
              onPress={() => handleCountOfferAccept_Reject('accept')}>
              <Text style={styles.smallbtnText}>
                {TranslationStrings.ACCEPT}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallbtn}
              onPress={() => handleCountOfferAccept_Reject('reject')}>
              <Text style={styles.smallbtnText}>
                {TranslationStrings.REJECT}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={400}
          style={{
            backgroundColor: 'red',
            marginBottom: hp(9),
            zIndex: 999,
          }}>
          {snackbarMessage}
        </Snackbar>

        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={TranslationStrings.SUCCESS}
          subtext={TranslationStrings.OFFER_ACCEPTED_SUCCESSFULLY}
          buttontext={TranslationStrings.OK}
          onPress={() => {
            setModalVisible(false);
            // navigation.navigate("BottomTab");
            // navigation?.goBack();
            getListingDetail();
          }}
        />
        <CustomModal
          modalVisible={modalVisible1}
          CloseModal={() => setModalVisible1(false)}
          Icon={appImages.sucess}
          text={TranslationStrings.SUCCESS}
          subtext={TranslationStrings.OFFER_REJECTED_SUCCESSFULLY}
          buttontext={TranslationStrings.OK}
          onPress={() => {
            setModalVisible1(false);
            // navigation.navigate("BottomTab");
            navigation?.goBack();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CounterOffer;
