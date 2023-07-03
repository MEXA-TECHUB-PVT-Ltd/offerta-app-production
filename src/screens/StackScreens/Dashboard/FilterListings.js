import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, FlatList, Linking} from 'react-native';

/////////////navigation////////////
import {useIsFocused} from '@react-navigation/native';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setCategoryName,
  setLocationAddress,
  setSortByDD,
  setLocationLat,
  setLocationLng,
  setSliderDistance,
  setCategoryId,
} from '../../../redux/actions';

//////////////////app components///////////////
import CustomHeader from '../../../components/Header/CustomHeader';
import DashboardCard from '../../../components/CustomCards/DashboardCard';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import Loader from '../../../components/Loader/Loader';

/////////////app styles////////////////
import styles from './styles';

//////////////api function////////////
import {get_Categories_Listings} from '../../../api/GetApis';

////////////image url////////////
import {IMAGE_URL} from '../../../utills/ApiRootUrl';

////////////////app Images///////////////
import {appImages} from '../../../constant/images';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslationStrings from '../../../utills/TranslationStrings';

const FilterListings = ({navigation, route}) => {
  const isFocused = useIsFocused();
  /////////////////////previous data//////////////
  const [predata] = useState(route.params);

  /////////////redux states///////
  const {
    category_id,
    post_within_value,
    location_lng,
    location_lat,
    sort_by_value,
    slider_distance,
  } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);

  /////////////filter data state/////////////
  const [Categorylist, setCategoryList] = useState('');
  //////////////Api Calling Listing Filter////////////////////
  const ListingsFilter = async () => {
    axios({
      method: 'get',
      url:
        BASE_URL +
        'filterProduct.php?lat=' +
        location_lat +
        '&log=' +
        location_lng +
        '&price=' +
        predata.itemprice +
        '&category_id=' +
        category_id +
        '&time=' +
        post_within_value +
        '&sort=' +
        sort_by_value +
        '&distance=' +
        slider_distance,
    })
      .then(async function (response) {
        console.log('filter listing response : ', response?.data);
        if (response.data.msg === 'No Result') {
          setCategoryList('no');
        } else {
          setCategoryList(response.data);
          dispatch(setSortByDD(''));
          dispatch(setCategoryId(''));
          dispatch(setCategoryName(''));
          setloading(false);
          // dispatch(setLocationLat(""))
          // dispatch(setLocationLng(""))
        }
      })
      .catch(function (error) {
        if (error) {
          console.log('error in data fetching');
        }
        //setModalVisible(true);
        console.log('error', error);
      })
      .finally(() => {
        dispatch(setSortByDD(''));
        dispatch(setCategoryId(''));
        dispatch(setCategoryName(''));
        setloading(false);
      });
  };
  useEffect(() => {
    if (isFocused) {
      ListingsFilter();
    }

    console.log(
      'previos data',
      category_id,
      post_within_value,
      location_lng,
      location_lat,
      sort_by_value,
      predata.itemprice,
    );
  }, [isFocused]);

  const openAffiliateLink = async url => {
    await Linking.openURL(url)
      .then(res => {
        console.log('res : ', res);
      })
      .catch(err => {
        alert(`Invalid affiliate link`);
      });
  };
  const renderItem = ({item}) => {
    return (
      <DashboardCard
        // image={IMAGE_URL + item.images[0]}
        video={item?.video}
        maintext={item.title}
        subtext={item.location}
        price={item?.price}
        added_by={item?.added_by}
        onpress={() => {
          if (item?.added_by == 'admin') {
            openAffiliateLink(item?.description);
          } else {
            navigation.navigate('MainListingsDetails', {
              listing_id: item.id,
            });
          }
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      > */}
      <CustomHeader
        headerlabel={TranslationStrings.FILTER_RESULTS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={'arrow-back'}
      />
      <Loader isLoading={loading} />
      {Categorylist === 'no' ? (
        loading == false && (
          <NoDataFound
            icon={'exclamation-thick'}
            text={TranslationStrings.NO_DATA_FOUND}
          />
        )
      ) : (
        <FlatList
          data={Categorylist}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default FilterListings;
