import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import DashboardCard from '../../../../components/CustomCards/DashboardCard';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setExchangeOffer_MyListing,
  setNavPlace,
} from '../../../../redux/actions';

/////////////app styles////////////////
import styles from './styles';

//////////////app functions///////////////
import {get_User_Listings} from '../../../../api/GetApis';

/////////////image url/////////////
import {IMAGE_URL} from '../../../../utills/ApiRootUrl';

////////////////////app height and width//////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import TranslationStrings from '../../../../utills/TranslationStrings';

const ExchangeOfferList = ({navigation, route}) => {
  ////////////////redux/////////////
  const {exchange_other_listing} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  /////////////////Price formatter/////////////
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  });

  ////////////////LIST DATA/////////
  const [data, setdata] = useState();

  ////////////select state////////////
  const [selectedId, setSelectedId] = useState(null);
  ///////////////select function/////////////
  const onselect = item => {
    setSelectedId(item.id);
    dispatch(setExchangeOffer_MyListing(item));
  };
  useEffect(() => {
    get_User_Listings().then(response => {
      setdata(response.data);
    });
  }, []);

  const renderItem = ({item, index}) => (
    <DashboardCard
      image={item.images === [] ? null : IMAGE_URL + item.images[0]} //IMAGE_URL + item.images[0]
      video={item?.video}
      maintext={item.title}
      subtext={item.location}
      price={item.price}
      selected={selectedId}
      id={item.id}
      type={'Exchange_Offer'}
      onpress={() => onselect(item)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      > */}
      <CustomHeader
        headerlabel={TranslationStrings.EXCHANGE_OFFER}
        iconPress={() => {
          navigation.goBack();
        }}
        type={'left_icon'}
        icon={'arrow-back'}
        searchicon={'plus-box'}
        onpresseacrh={() =>
          navigation.navigate('UploadItem', dispatch(setNavPlace('exchange')))
        }
      />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      {/* </ScrollView> */}
      <View style={{position: 'absolute', bottom: hp(2), left: wp(15)}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.replace('ExchangeOffer')}>
          <Text style={styles.btnText}>{TranslationStrings.NEXT}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ExchangeOfferList;
