import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
  Linking,
} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import DashboardCard from '../../../../components/CustomCards/DashboardCard';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';

/////////////app styles////////////////

/////////////api function/////////
import {
  get_Categories_Listings,
  get_Categories_Listings_new,
  get_User_Listings,
} from '../../../../api/GetApis';

///////////////image url///////////////
import {IMAGE_URL} from '../../../../utills/ApiRootUrl';
import {useFocusEffect} from '@react-navigation/native';
import Colors from '../../../../utills/Colors';
import Loader from '../../../../components/Loader/Loader';
import TranslationStrings from '../../../../utills/TranslationStrings';
import moment from 'moment';

const AllListingsByCategory = ({navigation, route}) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   get_User_Listings().then((response) => {
  //     if (response.data.message === "No data available") {
  //       setdata("");
  //     } else {
  //       setdata(response.data);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    setLoading(true);
    getData();
  }, [route?.params]);

  const getData = async () => {
    // get_Categories_Listings(route?.params?.id)
    get_Categories_Listings_new(route?.params?.id)
      .then(response => {
        if (response.data.message === 'No data available') {
          setdata('');
        } else {
          let list = response?.data ? response?.data : [];
          // setdata(response.data);
          const urgentList = list?.filter(
            item =>
              item?.Promotion[0]?.tag == 'Urgent' &&
              moment(new Date())?.format('YYYY-MM-DD') <
                moment(item?.Promotion[0]?.Expirydate)?.format('YYYY-MM-DD'),
          );

          const urgentList_expire = list?.filter(
            item =>
              item?.Promotion[0]?.tag == 'Urgent' &&
              moment(new Date())?.format('YYYY-MM-DD') >=
                moment(item?.Promotion[0]?.Expirydate)?.format('YYYY-MM-DD'),
          );

          const orthersList = list?.filter(
            item => item?.Promotion[0]?.tag !== 'Urgent',
          );
          const finallist = [
            ...urgentList,
            ...orthersList,
            ...urgentList_expire,
          ];
          // setCategoryList(finallist);
          setdata(finallist);
        }
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    getData();
  };
  const openAffiliateLink = async url => {
    await Linking.openURL(url)
      .then(res => {
        console.log('res : ', res);
      })
      .catch(err => {
        alert(`Invalid affiliate link`);
      });
  };
  const renderItem = ({item}) => (
    <DashboardCard
      image={item.images?.length == 0 ? null : IMAGE_URL + item.images[0]}
      video={item?.video}
      maintext={item.title}
      subtext={item.location}
      price={item.price}
      sold={item?.sold}
      promotion={item?.Promotion[0]}
      added_by={item?.added_by}
      onpress={() => {
        if (item?.added_by == 'admin') {
          openAffiliateLink(item?.description);
        } else {
          // navigation.navigate("ListingsDetails", { listing_id: item.id });
          navigation.navigate('MainListingsDetails', {
            listing_id: item.id,
          });
        }
      }}
    />
  );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Loader isLoading={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.Appthemecolor]}
            onRefresh={() => handleRefresh()}
          />
        }>
        <CustomHeader
          headerlabel={
            route?.params?.name
              ? route?.params?.name
              : TranslationStrings.LISTINGS
          }
          iconPress={() => {
            navigation.goBack();
          }}
          icon={'arrow-back'}
        />
        {data === '' ? (
          <NoDataFound
            icon={'exclamation-thick'}
            text={TranslationStrings.NO_DATA_FOUND}
          />
        ) : (
          <FlatList
            data={data}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllListingsByCategory;
