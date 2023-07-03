import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import CustomButtonhere from '../../../components/Button/CustomButton';
import CustomTextInput from '../../../components/TextInput/CustomTextInput';
import CustomModal from '../../../components/Modal/CustomModal';

/////////////////dropdowns/////////////
import CountryDropDown from '../../../components/Dropdowns/Location/Country';
import CityDropDown from '../../../components/Dropdowns/Location/City';

////////////////country picker package/////////////
import CountryPicker from 'react-native-country-picker-modal';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/////////////////////app images/////////////////////
import {appImages} from '../../../constant/images';

////////////////api functions///////////
import {post_shipping_Address} from '../../../api/ShippingAddress';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setCountryName,
  setStateName,
  setCityName,
} from '../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Snackbar} from 'react-native-paper';
import TranslationStrings from '../../../utills/TranslationStrings';

const ShippingAddresss = ({navigation, route}) => {
  /////////////////////////redux///////////////////
  const {country_name, state_name, city_name} = useSelector(
    state => state.locationReducer,
  );

  const dispatch = useDispatch();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  //////////////link dropdown////////////////
  const refCountryddRBSheet = useRef();
  const refCityddRBSheet = useRef();

  ////////////country picker states/////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState('92');

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  //const [countryname, setCountryName] = useState("Pak");

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  const [shipping_state, setShipping_State] = useState({
    nick_name: '',
    user_name: '',
    country: country_name,
    city: city_name,
    state: state_name,
    address_1: '',
    address_2: '',
    zip_code: '',
    phone_number: '',
  });

  ////////////LISTING LIKES//////////
  const create_shippingAddress = async props => {
    let user_id = await AsyncStorage.getItem('Userid');
    let data = {
      user_id: user_id,
      country: country_name,
      address_1: shipping_state?.address_1,
      address_2: shipping_state?.address_2,
      city: city_name,
      state: 'nill',
      zip_code: shipping_state?.zip_code,
      phone_number: shipping_state?.phone_number,
    };
    // console.log("data  :   ", data);
    // return;

    setloading(1);
    setdisable(1);
    post_shipping_Address(data)
      .then(response => {
        console.log('exchnage response hereL:', response.data);
        // dispatch(setCityName())
        // dispatch(setCountryName())
        setloading(0);
        setdisable(0);
        if (response?.data?.status == false) {
          setsnackbarValue({
            value: response?.data?.message,
            color: 'red',
          });
          setVisible('true');
        } else {
          setModalVisible(true);
        }
      })
      .catch(err => {
        console.log('err 127 : ', err);
      });
  };
  const handleChange = (value, key) => {
    setShipping_State({...shipping_state, [key]: value});
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <CustomHeader
          headerlabel={TranslationStrings.ADD_SHIPPING_ADDRESS}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />
        <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(9),
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>

        <View>
          {/* <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={shipping_state.nick_name}
            placeholder="Enter your nick name"
            onTermChange={(value) => handleChange(value, "nick_name")}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={shipping_state.user_name}
            placeholder="Enter your name"
            onTermChange={(value) => handleChange(value, "user_name")}
          /> */}
          <CustomTextInput
            type={'withouticoninput'}
            term={shipping_state.address_1}
            placeholder={TranslationStrings.ENTER_ADDRESS_1}
            onTermChange={value => handleChange(value, 'address_1')}
          />
          <CustomTextInput
            type={'withouticoninput'}
            term={shipping_state.address_2}
            placeholder={TranslationStrings.ENTER_ADDRESS_2}
            onTermChange={value => handleChange(value, 'address_2')}
          />
          <TouchableOpacity onPress={() => refCountryddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={'iconinput'}
              term={country_name}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.SELECT_COUNTRY}
              onTermChange={value => handleChange(value, 'country')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refCityddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={'iconinput'}
              term={city_name}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.SELECT_CITY}
              onTermChange={value => handleChange(value, 'city')}
            />
          </TouchableOpacity>
          {/* <View
            style={{
              flexDirection: "row",
              marginHorizontal: wp(8),
              justifyContent: "space-between",
            }}
          >
            <CustomTextInput
              type={"iconinput_short"}
              icon={appImages.downarrow}
              term={shipping_state.city}
              length={"small"}
              placeholder="City"
              onTermChange={(value) => handleChange(value, "city")}
              // length={"small"}
            />
            <CustomTextInput
              type={"iconinput"}
              icon={appImages.downarrow}
              term={shipping_state.state}
              length={"small"}
              width={20}
              placeholder="State"
              onTermChange={(value) => handleChange(value, "state")}
            />
          </View> */}
          <CustomTextInput
            type={'iconinput'}
            term={shipping_state.zip_code}
            placeholder={TranslationStrings.ENTER_ZIP_CODE}
            keyboard_type={'numeric'}
            onTermChange={value => handleChange(value, 'zip_code')}
          />
          <CustomTextInput
            type={'withouticoninput'}
            term={shipping_state.phone_number}
            placeholder={TranslationStrings.ENTER_PHONE_NUMBER}
            keyboard_type={'numeric'}
            onTermChange={value => handleChange(value, 'phone_number')}
          />
        </View>

        <View style={{marginBottom: hp(12)}}>
          <CustomButtonhere
            title={TranslationStrings.SAVE}
            widthset={80}
            topDistance={10}
            loading={loading}
            disabled={disable}
            onPress={() => {
              create_shippingAddress(shipping_state);
              //navigation.navigate("Drawerroute");
            }}
          />
        </View>
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={TranslationStrings.SUCCESS}
          subtext={TranslationStrings.SHIPPING_ADDRESS_CREATED_SUCCESSFULLY}
          buttontext={TranslationStrings.OK}
          onPress={() => {
            setModalVisible(false),
              route.params.navtype === 'Buy'
                ? navigation.navigate('ConfirmAddress', {
                    index: route?.params?.index,
                  })
                : route.params.navtype === 'no_shipping_address'
                ? navigation?.replace('ConfirmAddress', {
                    index: route?.params?.index,
                    listing_user_detail: route?.params?.listing_user_detail,
                    payment_type: route?.params?.payment_type,
                    type: route?.params?.type,
                    // ...route?.params,
                    //live streaming params
                    user_id: route?.params?.user_id,
                    listing_user_detail: route?.params?.listing_user_detail,
                    buy_type: route?.params?.buy_type,
                    quantity: route?.params?.quantity,
                    streamId: route?.params?.streamId,
                    navtype: 'no_shipping_address',

                    //live stream
                    response: route?.params?.response,
                    host: route?.params?.host,
                  })
                : navigation.navigate('ShippingAddressList');
          }}
        />
        <CountryDropDown
          refRBSheet={refCountryddRBSheet}
          onClose={() => refCountryddRBSheet.current.close()}
        />
        <CityDropDown
          refRBSheet={refCityddRBSheet}
          onClose={() => refCityddRBSheet.current.close()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShippingAddresss;
