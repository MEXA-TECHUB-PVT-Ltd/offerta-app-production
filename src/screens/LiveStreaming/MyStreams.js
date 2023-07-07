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
  StyleSheet,
  ImageBackground,
} from 'react-native';

import CustomHeader from '../../components/Header/CustomHeader';

import Colors from '../../utills/Colors';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Avatar, Button, Card, Modal} from 'react-native-paper';

import Loader from '../../components/Loader/Loader';
import {appImages} from '../../constant/images';

import {Rating} from 'react-native-rating-element';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamily} from '../../constant/fonts';
import {getALLLiveStreams, joinLiveStream} from '../../api/LiveStreamingApi';
import {IMAGE_URL} from '../../utills/ApiRootUrl';
import {async} from 'regenerator-runtime';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import CPaperInput from '../../components/TextInput/CPaperInput';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButtonhere from '../../components/Button/CustomButton';
import LiveStreamingKeys from '../../utills/LiveStreamingKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslationStrings from '../../utills/TranslationStrings';

const MyStreams = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([
    // {
    //   id: 0,
    //   name: "Test",
    //   email: "test@gmail.com",
    //   rating: 3.2,
    //   profile: appImages.user2,
    // },
    // {
    //   id: 1,
    //   name: "John",
    //   email: "johndoe@gmail.com",
    //   rating: 4.5,
    //   profile: appImages.dogIcon,
    // },
    // {
    //   id: 2,
    //   name: "Harry",
    //   email: "harry@gmail.com",
    //   rating: 5,
    //   profile: appImages.draweruser,
    // },
    // {
    //   id: 3,
    //   name: "Harry",
    //   email: "harry@gmail.com",
    //   rating: 5,
    //   profile: appImages.user2,
    // },
    // {
    //   id: 4,
    //   name: "Harry",
    //   email: "harry@gmail.com",
    //   rating: 5,
    //   profile: appImages.user2,
    // },
    // {
    //   id: 4,
    //   name: "Harry",
    //   email: "harry@gmail.com",
    //   rating: 5,
    //   profile: appImages.user2,
    // },
    // {
    //   id: 4,
    //   name: "Harry",
    //   email: "harry@gmail.com",
    //   rating: 5,
    //   profile: appImages.user2,
    // },
  ]);

  useEffect(() => {
    setLoading(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getLiveStreamsData();
    }, []),
  );

  const getLiveStreamsData = async () => {
    getALLLiveStreams()
      .then(async response => {
        let list = [];
        var user_id = await AsyncStorage.getItem('Userid');
        if (response?.data?.error == false) {
          for (const item of response?.data?.stream) {
            if (
              item?.active_status == 'active' &&
              item?.uid != '0' &&
              item?.user != null &&
              item?.user[0]?.id == user_id
            ) {
              let obj = {
                stream: [
                  {
                    list_id: '165',
                    insertedId: item?.id,
                    token: item?.token,
                    // appID: "2103cc766ad141bf90843544931573d8",
                    quantity: item?.quantity,
                    // appCertificate: "9b9ad3f820ab41ada65255fe2d1ef452",
                    channelName: item?.channelName,
                    uid: item?.uid,
                    active_status: item?.active_status,
                    currentDateTime: item?.start_time,
                    view: item?.view,
                    thumbnail: item?.thumbnail,
                    // streamkey: null,

                    title: item?.title,
                    description: item?.description,
                  },
                ],
                user: item?.user,
                Listing: item?.listing,
              };
              list.push(obj);
            }
          }
        }
        setData(list);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const refreshData = async () => {
    setRefreshing(true);
    getLiveStreamsData();
  };

  const handleJoinStream = async item => {
    // navigation.navigate("WatchLiveStream", {
    //   host: false,
    //   response: item,
    // });

    setLoading(true);
    var user_id = await AsyncStorage.getItem('Userid');
    let obj = {
      appID: LiveStreamingKeys.appId,
      appCertificate: LiveStreamingKeys.appCertificate,
      // channelName: 'xyz',
      channelName: item?.user[0]?.id,
      uid: user_id,
      uidStr: user_id,
      role: 'audience',
      expireTimeInSeconds: 172800, //2 days seconds
    };

    joinLiveStream(obj)
      .then(response => {
        console.log('response : ', response?.data);
        let obj = {
          stream: [
            {
              ...item?.stream[0],
              token: response?.data?.tokenWithIntUID,
              uid: response?.data?.uid,
            },
          ],
          user: item?.user,
          Listing: item?.Listing,
        };

        navigation.navigate('WatchLiveStream', {
          host: true,
          response: obj,
        });
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        barStyle="light-content"
      />

      <View
        style={{
          backgroundColor: 'white',
          height: hp(100),
          alignItems: 'center',
        }}>
        {/* <CustomHeader type={"profile"} headerlabel={"Live Streaming"} /> */}
        <Loader isLoading={loading} />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshData()}
            />
          }
          ListHeaderComponent={
            <CustomHeader
              type={'profile'}
              headerlabel={TranslationStrings.MY_STREAMING}
              iconPress={() => {
                navigation.goBack();
              }}
              icon={'arrow-back'}
              // rightText={TranslationStrings.MY_STREAMING}
              // onRightTextPress={() => navigation.navigate('MyStreams')}
            />
          }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <Card
                style={styles.card}
                onPress={() => {
                  // navigation.navigate("WatchLiveStream", {
                  //   host: false,
                  //   response: item,
                  // });

                  handleJoinStream(item);
                }}>
                {/* <ImageBackground
                  blurRadius={3}
                  // source={
                  //   item?.stream && item?.stream[0]?.thumbnail == null
                  //     ? appImages.live_stream_bg
                  //     : { uri: IMAGE_URL + item?.stream[0]?.thumbnail }
                  source={
                    item?.user && item?.user[0]?.image == null
                      ? appImages.no_image
                      : {uri: IMAGE_URL + item?.user[0]?.image}
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                  resizeMode="cover">
                  <ImageBackground
                    style={{
                      width: '100%',
                      height: '100%',
                      justifyContent: 'flex-end',
                    }}
                    resizeMode="contain"
                    // source={
                    //   item?.stream && item?.stream[0]?.thumbnail == null
                    //     ? appImages.live_stream_bg
                    //     : { uri: IMAGE_URL + item?.stream[0]?.thumbnail }
                    // }

                    source={
                      item?.user && item?.user[0]?.image == null
                        ? appImages.no_image
                        : {uri: IMAGE_URL + item?.user[0]?.image}
                    }>
                    <View
                      style={{
                        margin: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Avatar.Image
                        source={{uri: IMAGE_URL + item?.user[0]?.image}}
                        size={35}
                      />
                      <View
                        style={{
                          backgroundColor: '#FFFFFF5C',
                          padding: 3,
                          paddingHorizontal: 8,
                          borderRadius: 18,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Ionicons
                          name="md-eye-outline"
                          color={'white'}
                          size={20}
                        />
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 5,
                            fontFamily: fontFamily.Poppins_Regular,
                            marginBottom: -3,
                          }}>
                          {item?.stream[0]?.view}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </ImageBackground> */}

                {/* <ImageBackground
                  blurRadius={3}
                  // source={
                  //   item?.stream && item?.stream[0]?.thumbnail == null
                  //     ? appImages.live_stream_bg
                  //     : { uri: IMAGE_URL + item?.stream[0]?.thumbnail }
                  source={
                    item?.user && item?.user[0]?.image == null
                      ? appImages.no_image
                      : {uri: IMAGE_URL + item?.user[0]?.image}
                  }
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                  resizeMode="cover"> */}
                <ImageBackground
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                  resizeMode="cover"
                  // source={
                  //   item?.stream && item?.stream[0]?.thumbnail == null
                  //     ? appImages.live_stream_bg
                  //     : { uri: IMAGE_URL + item?.stream[0]?.thumbnail }
                  // }
                  source={
                    item?.user && item?.user[0]?.image == null
                      ? appImages.no_image
                      : {uri: IMAGE_URL + item?.user[0]?.image}
                  }>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        margin: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Avatar.Image
                        source={{uri: IMAGE_URL + item?.user[0]?.image}}
                        size={35}
                      />
                      <View
                        style={{
                          backgroundColor: '#FFFFFF5C',
                          padding: 3,
                          paddingHorizontal: 8,
                          borderRadius: 18,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Ionicons
                          name="md-eye-outline"
                          color={'white'}
                          size={20}
                        />
                        <Text
                          style={{
                            color: 'white',
                            marginLeft: 5,
                            fontFamily: fontFamily.Poppins_Regular,
                            marginBottom: -3,
                          }}>
                          {item?.stream[0]?.view}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {item.stream[0].title && item.stream[0].description && (
                    <View
                      style={{
                        // backgroundColor: '#26295E9E',
                        backgroundColor: '#C7D8EB',

                        // backgroundColor: '#FFFFFF5C',
                        // opacity: 0.7,
                        paddingVertical: hp(1),
                        paddingHorizontal: wp(2),
                        // marginTop: hp(2),
                        // width: wp(38.2),

                        alignItems: 'flex-start',
                      }}>
                      <Text
                        style={{
                          color: '#0A0932',
                          // color: Colors.Stream_TextColor,
                          // fontSize: wp(4),
                          fontSize: hp(1.5),
                          fontFamily: fontFamily.Poppins_Bold,
                          lineHeight: 18,
                        }}>
                        {item.stream[0].title
                          ? item.stream[0].title?.slice(0, 15)
                          : ''}
                      </Text>
                      <Text
                        style={{
                          color: '#0A0932',
                          // color: Colors.Stream_TextColor,
                          // fontSize: 12,
                          // fontFamily: fontFamily.Poppins_Regular,
                          fontSize: hp(1.5),
                          fontFamily: fontFamily.Poppins_Regular,
                          lineHeight: 18,
                        }}>
                        {item.stream[0].description
                          ? item.stream[0].description?.trim()
                          : ''}
                      </Text>
                    </View>
                  )}
                </ImageBackground>
                {/* </ImageBackground> */}
              </Card>
            );
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: '#000'}}>No Record Found</Text>
            </View>
          )}
          ListFooterComponent={() => <View style={{height: 70}} />}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('CreateLive')}>
          <AntDesign name="plus" color={'white'} size={20} />
          <Text style={styles.btnText}>{TranslationStrings.START_LIVE}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MyStreams;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    marginLeft: 13,
    height: hp(28),
    // flex: 1,
    width: wp(42.5),
    borderRadius: 10,
    overflow: 'hidden',
  },
  liveView: {
    backgroundColor: 'red',
    position: 'absolute',
    right: 10,
    top: 7,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  liveText: {color: '#fff', fontWeight: '500'},
  btn: {
    width: wp(85),
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Appthemecolor,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  btnText: {
    color: 'white',
    marginLeft: 7,
    fontFamily: fontFamily.Poppins_Medium,
    marginBottom: -3,
  },
});
