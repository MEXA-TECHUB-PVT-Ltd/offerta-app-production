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
import {setExchangeOffer_MyListing} from '../../../../redux/actions';

////////////////app Colors/////////////
import Colors from '../../../../utills/Colors';

/////////////app styles////////////////
import styles from './styles';

//////////////app functions///////////////
import {post_Listings_Exchange_Offer} from '../../../../api/PostApis';

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
import TranslationStrings from '../../../../utills/TranslationStrings';

//////////////////appImages.//////////////////

const ExchangeOffer = ({navigation, route}) => {
  ////////////////redux/////////////
  const {exchange_other_listing, exchange_my_listing} = useSelector(
    state => state.userReducer,
  );
  const dispatch = useDispatch();

  //////////////////Textinput state////////////
  const [myprice, setMyPrice] = React.useState('');
  const [offerprice, setOfferPrice] = React.useState('');

  /////////////////Price formatter/////////////
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  ////////////LISTING LIKES//////////
  const Listings_Exchange_Offer = props => {
    post_Listings_Exchange_Offer(props).then(response => {
      console.log(
        'exchnage response hereL::::::::::::::::::::::::::::::',
        response.data,
      );
      console.log('response :  ', response?.data);
      navigation.replace('ChatScreen', {
        navtype: 'exchange_offer',
        userid: exchange_other_listing.user_id,
        item1: exchange_my_listing.title,
        item2: exchange_other_listing.title,
        itemprice1: exchange_my_listing.price,
        itemprice2: exchange_other_listing.price,
        offerId: response?.data?.data?.id,
        offer_detail: response?.data?.data,
      });
      //   setListing_Like_User_id(response.data.data.user_id);
    });
  };
  const [list_data, setList_Data] = useState({
    myuser_id: exchange_my_listing.user_id,
    otheruser_id: exchange_other_listing.user_id,
    my_item_id: exchange_my_listing.id,
    other_item_id: exchange_other_listing.id,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <CustomHeader
          headerlabel={TranslationStrings.EXCHANGE_OFFER}
          iconPress={() => {
            navigation.goBack();
          }}
          type={'no_icon'}
          icon={'arrow-back'}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <DashboardCard
            image={IMAGE_URL + exchange_my_listing.images[0]} //IMAGE_URL + item.images[0]
            video={item?.video}
            maintext={exchange_my_listing.title}
            subtext={exchange_my_listing.location}
            type={'Exchange_Request'}
            price={exchange_my_listing.price}
          />
          {/* <MaterialCommunityIcons
                        name={"swap-vertical-bold"}
                        color={Colors.activetextinput}
                        size={30}
                      /> */}
          <Image
            source={appImages.exchangeicon}
            style={{width: wp(5.5), height: hp(6)}}
            resizeMode="contain"
          />
          <DashboardCard
            image={IMAGE_URL + exchange_other_listing.images[0]} //IMAGE_URL + item.images[0]
            video={item?.video}
            maintext={exchange_other_listing.title}
            subtext={exchange_other_listing.location}
            type={'Exchange_Request'}
            price={exchange_other_listing.price}
            //onpress={() => onselect(item)}
          />
        </View>

        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => Listings_Exchange_Offer(list_data)}>
            <Text style={styles.btnText}>{TranslationStrings.SUBMIT}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExchangeOffer;
