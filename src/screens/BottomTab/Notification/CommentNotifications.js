import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
  useWindowDimensions,
} from 'react-native';

////////////////app components///////////
import CustomHeader from '../../../components/Header/CustomHeader';

/////////////app styles///////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL, IMAGE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appImages} from '../../../constant/images';

////////////////////api function/////////////
import {
  get_Notifications,
  get_comment_notifications,
  get_like_notifications,
} from '../../../api/GetApis';
import {useDispatch, useSelector} from 'react-redux';
import {
  setChatCount,
  setExchangeOffer_OtherListing,
  setListingId,
  setNotificationCount,
  setNotificationList,
} from '../../../redux/actions';
import Loader from '../../../components/Loader/Loader';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import BlockUserView from '../../../components/BlockUserView';
import {get_user_status} from '../../../api/GetApis';

import moment from 'moment';
import 'moment-timezone';

import TranslationStrings from '../../../utills/TranslationStrings';
import {Avatar} from 'react-native-paper';
import {
  update_comment_notification,
  update_notification,
} from '../../../api/PostApis';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import NoNotificationFound from './NoNotificationFound';

const CommentNotifications = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {chatCount, notificationList} = useSelector(state => state.userReducer);

  ///////////////////data state///////////
  const [notification, setNotification] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      get_user_notifications();
    }, []),
  );

  const get_user_notifications = async () => {
    console.log('getting comment notifications....');
    get_comment_notifications()
      .then(async response => {
        //setData(response.data)
        if (
          response.data.msg === 'No Result' ||
          response?.data[0]?.message == 'No record found'
        ) {
          console.log('not lsfjsdfjlsdj found..');
          // setNotification("");
          setData([]);
        } else {
          console.log('else executed');
          if (response.data?.length > 0) {
            let notificationList1 = response.data;
            //sort list by date_time
            // let sorted_list = notificationList1.sort(
            //   (a, b) => Date.parse(b?.created_at) - Date.parse(a?.created_at)
            // );
            let sorted_list = notificationList1.sort(
              (a, b) => new Date(b?.created_at) - new Date(a.created_at),
            );

            // setData(notificationList1);
            setNotification(sorted_list);
            setData(sorted_list);
            //   dispatch(setNotificationList(sorted_list));

            // let lastItem = response.data?.pop();
            // let lastItem = notificationList1[0];
            // console.log("lastItem?.id :  ", lastItem?.id);
            // await AsyncStorage.setItem(
            //   "LastNotification",
            //   lastItem?.id?.toString()
            // );
            // let lastNotification = await AsyncStorage.getItem(
            //   "LastNotification"
            // );
            // const filter = notificationList1.filter(
            //   (item) => parseInt(item?.id) > parseInt(lastNotification)
            // );
            // dispatch(setNotificationCount(filter?.length));
          }
        }
      })
      .catch(err => {
        console.log('Error : ', err);
      })
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  };
  const convertUTCToLocalTime = dateString => {
    try {
      let date = new Date(dateString);
      const milliseconds = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      );
      const localTime = new Date(milliseconds);
      // localTime.getDate(); // local date
      // let hours = localTime.getHours(); // local hour
      return moment(localTime).fromNow();
    } catch (error) {
      return '';
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    get_user_notifications();
  };

  const handleNotificationPress = async item => {
    try {
      dispatch(setNotificationCount(0));
      updateNotificationStatus(item?.id);
      dispatch(setExchangeOffer_OtherListing(item?.listing));
      dispatch(setListingId(item?.listing?.id));

      navigation.navigate('CommentsDetails', {
        listing_id: item?.listing?.id,
      });
    } catch (error) {
      console.log('Error raised in notification press : ', error);
    }
  };

  const updateNotificationStatus = async id => {
    console.log('id passed to update notificationStatus :  ', id);

    setLoading(true);
    update_comment_notification(id)
      .then(response => {
        console.log('update like noti response : ', response?.data);
        const newData = data?.map(item => {
          if (item?.id == id) {
            return {
              ...item,
              status: true,
            };
          } else {
            return {
              ...item,
            };
          }
        });
        // setNotification(newData);
        // dispatch(setNotificationList(newData));
        setData(newData);
      })
      .catch(err => {
        console.log('err : ', err);
      })
      .finally(() => setLoading(false));
  };
  const renderItem = item => {
    return (
      <TouchableOpacity
        style={{
          ...styles.card,
          width: wp(100),
          paddingVertical: 5,
          paddingHorizontal: 15,
          marginBottom: 2,
          backgroundColor:
            item?.item?.status == 'false' || item?.item?.status == false
              ? '#EFF6FF'
              : 'transparent',
          minHeight: 65,
        }}
        onPress={() => {
          handleNotificationPress(item?.item);
        }}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: wp(100)}}>
          <Avatar.Image
            size={wp(12)}
            source={{uri: IMAGE_URL + item.item?.user?.image}}
          />
          <View style={{marginLeft: wp(3), flex: 0.9, paddingRight: 10}}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{...styles.username}}>
                {item?.item?.user?.full_name}
              </Text>
              {/* <Text
                style={[styles.recomend, { color: "#7A8FA6", width: "auto" }]}
              >
                {item?.item?.created_at &&
                  convertUTCToLocalTime(item?.item?.created_at)}
              </Text> */}
            </View>
            <Text style={[styles.recomend, {color: '#7A8FA6', width: wp(57)}]}>
              {item?.item?.Message}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        barStyle="light-content"
      />
      {/* <CustomHeader
        type={"profile"}
        headerlabel={TranslationStrings.NOTIFICATIONS}
      /> */}
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />

      <View style={{...styles.postcard, marginTop: 0}}>
        <Loader isLoading={loading} />

        <FlatList
          style={{
            width: wp(100),
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[Colors.Appthemecolor]}
              onRefresh={() => handleRefresh()}
            />
          }
          // data={notification}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NoNotificationFound loading={loading} />}
          ListFooterComponent={() => <View style={{marginBottom: hp(13)}} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default CommentNotifications;
