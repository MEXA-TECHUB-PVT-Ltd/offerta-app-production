import React, {useEffect, useState, useRef} from 'react';
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
import {Avatar, Button, Card} from 'react-native-paper';

import Loader from '../../components/Loader/Loader';
import {appImages} from '../../constant/images';

import {Rating} from 'react-native-rating-element';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fontFamily} from '../../constant/fonts';

import {CheckBox} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButtonhere from '../../components/Button/CustomButton';
import TranslationStrings from '../../utills/TranslationStrings';

import firestore from '@react-native-firebase/firestore';
import {createLiveStream} from '../../api/LiveStreamingApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get_User_Listings, get_all_listings} from '../../api/GetApis';
import {BASE_URL, IMAGE_URL} from '../../utills/ApiRootUrl';
import axios from 'axios';
import LiveStreamingKeys from '../../utills/LiveStreamingKeys';

const CreateLive = ({navigation, route}) => {
  const ref_RBSheet = useRef();
  const [quantity, setQuantity] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const [fixedPrice, setFixedPrice] = useState(false);
  const [giveAway, setGiveAway] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const [data, setData] = useState([
    // {
    //   id: 0,
    //   name: "Item Name",
    //   quantity: 0,
    //   image: appImages.live_stream_bg,
    //   price: 20,
    //   fixedPrice: true,
    //   giveAway: true,
    // },
    // {
    //   id: 1,
    //   name: "Item Name",
    //   quantity: 10,
    //   image: appImages.live_stream_bg,
    //   price: 20,
    //   fixedPrice: true,
    //   giveAway: false,
    // },
    // {
    //   id: 3,
    //   name: "Item Name",
    //   quantity: 10,
    //   image: appImages.live_stream_bg,
    //   price: 5,
    //   fixedPrice: false,
    //   giveAway: true,
    // },
  ]);

  useEffect(() => {
    getCurrentUserProducts();
  }, []);

  const getCurrentUserProducts = async () => {
    setLoading(true);
    get_User_Listings()
      .then(response => {
        if (response?.data?.status == true) {
          setData([]);
        } else {
          setData(response?.data);
        }
      })
      .catch(err => {
        console.log('error : ', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const CustomCheckBox = ({checked, size, onPress}) => (
    <CheckBox
      checkedIcon={
        <MaterialIcons
          name="check-box"
          size={size ? size : 25}
          color={Colors.Appthemecolor}
        />
      }
      uncheckedIcon={
        <MaterialIcons
          name="check-box-outline-blank"
          size={size ? size : 25}
          color={'#D5D4DC'}
        />
      }
      checked={checked}
      onPress={onPress}
      containerStyle={styles.checkboxContainer}
    />
  );

  const handleUpdateItem = async selectedItem => {
    if (quantity?.length == 0 || quantity == 0) {
      alert('Please Enter Quantity');
    } else {
      ref_RBSheet?.current?.close();
      setLoading(true);
      var data1 = JSON.stringify({
        id: selectedItem?.id,
        user_id: selectedItem?.user_id,
        title: selectedItem?.title,
        description: selectedItem?.description,
        price: selectedItem?.price,
        category_id: selectedItem?.category?.category_id,
        // quantity: selectedItem?.quantity,
        subcategory_id: selectedItem?.subcategory?.sub_category_id,
        product_condition: selectedItem?.product_condition,
        // fixed_price: selectedItem?.fixed_price,
        location: selectedItem?.location,
        exchange: selectedItem?.exchange,
        // giveaway: selectedItem?.giveaway,
        shipping_cost: selectedItem?.shipping_cost,
        youtube_link: selectedItem?.youtube_link,
        //
        quantity: quantity,
        fixed_price: fixedPrice,
        giveaway: giveAway,
      });
      var config = {
        method: 'put',
        url: BASE_URL + 'updateList.php',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data1,
      };

      axios(config)
        .then(response => {
          console.log('response  :  ', response?.data);
          if (response?.data?.status == false) {
          } else {
            const newData = data?.map(item => {
              if (item?.id == selectedItem?.id) {
                return {
                  ...item,
                  quantity: quantity,
                  fixed_price: fixedPrice,
                  giveaway: giveAway,
                  selected: true,
                };
              } else {
                return {
                  ...item,
                };
              }
            });
            setData(newData);
          }
        })
        .catch(err => {
          console.log('err :  ', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleUnSelectItem = async id => {
    const newData = data?.map(item => {
      if (item?.id == id) {
        return {
          ...item,
          selected: false,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setData(newData);
  };

  const handleGoLive = async () => {
    var user_id = await AsyncStorage.getItem('Userid');
    setLoading(true);
    let selectedListings = data
      ?.filter(item => item?.selected == true)
      ?.map(element => element?.id);
    let obj = {
      expireTimeInSeconds: 172800, //2 days seconds
      appID: LiveStreamingKeys.appId,
      appCertificate: LiveStreamingKeys.appCertificate,
      // channelName: 'ofertaSV',
      channelName: user_id,
      uid: user_id,
      user_id: user_id,
      uidStr: user_id,
      role: 'host',
      active_status: 'active',
      list_id: selectedListings,
      quantity: '0',
      currentDateTime: new Date(),
      title: title,
      description: description,
    };
    console.log('obj to create live ::: ', obj);
    createLiveStream(obj)
      .then(response => {
        console.log('response : ', response?.data);
        if (response?.data?.stream) {
          let stream_id = response?.data?.stream[0]?.insertedId;
          console.log('stream_id  : ', stream_id);
          console.log(
            'firestore.FieldValue.serverTimestamp() :  ',
            firestore.FieldValue.serverTimestamp(),
          );
          let obj = {
            ...response?.data?.stream[0],
            createdAt: firestore.FieldValue.serverTimestamp(),
          };
          console.log('obj : ', obj);
          firestore()
            .collection('live_stream')
            .doc(stream_id?.toString())
            .collection('stream_detail')
            .add(obj);
          navigation.replace('WatchLiveStream', {
            response: response?.data,
          });
        }
      })
      .catch(err => {
        console.log('err : ', err);
        alert('Something went wrong');
      })
      .finally(() => setLoading(false));

    // let obj = {
    //   id: 0,
    //   name: "test",
    //   createdAt: firestore.FieldValue.serverTimestamp(),
    // };

    // firestore()
    //   .collection("live_stream")
    //   .doc("stream_id")
    //   .collection("stream_detail")
    //   .add(obj);
    // navigation.navigate("WatchLiveStream");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        barStyle="light-content"
      />
      <Loader isLoading={loading} />
      <View
        style={{
          backgroundColor: 'white',
          height: hp(100),
          // alignItems: 'center',
        }}>
        {/* <CustomHeader type={"profile"} headerlabel={"Live Streaming"} /> */}
        <Loader isLoading={loading} />
        <CustomHeader
          headerlabel={'Create Live'}
          iconPress={() => {
            navigation.goBack();
          }}
          type={'left_icon'}
          icon={'arrow-back'}
          searchicon={'plus-box'}
          onpresseacrh={() => {
            navigation.navigate('UploadItem');
          }}
        />
        <CustomTextInput
          maxLength={15}
          icon={appImages.email}
          type={'withouticoninput'}
          texterror={'invalid'}
          term={title}
          placeholder={TranslationStrings.ITEM_TITLE}
          onTermChange={itemtitle => setTitle(itemtitle)}
        />
        <CustomTextInput
          maxLength={30}
          icon={appImages.email}
          type={'withouticoninput'}
          texterror={'invalid'}
          term={description}
          multiline={true}
          Lines={3}
          placeholder={TranslationStrings.DESCRIPTION}
          onTermChange={desc => setDescription(desc)}
        />

        <FlatList
          // ListHeaderComponent={
          //   <CustomHeader
          //     headerlabel={'Create Live'}
          //     iconPress={() => {
          //       navigation.goBack();
          //     }}
          //     type={'left_icon'}
          //     icon={'arrow-back'}
          //     searchicon={'plus-box'}
          //     onpresseacrh={() => {
          //       navigation.navigate('UploadItem');
          //     }}
          //   />
          // }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Card
                style={styles.card}
                // onPress={() => {
                //   setSelectedItemId(item?.id);
                //   ref_RBSheet.current?.open();
                // }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CustomCheckBox
                    checked={item?.selected}
                    onPress={() => {
                      if (!item?.selected) {
                        setSelectedItem(item);
                        setQuantity(item?.quantity);
                        setFixedPrice(
                          item?.fixed_price == 'true' ||
                            item?.fixed_price == true
                            ? true
                            : false,
                        );
                        setGiveAway(
                          item?.giveaway == 'true' || item?.giveaway == true
                            ? true
                            : false,
                        );
                        ref_RBSheet.current?.open();
                      } else {
                        handleUnSelectItem(item?.id);
                      }
                    }}
                  />
                  {/* <View style={styles.cardImageView}> */}
                  {item?.images?.length > 0 ? (
                    <Image
                      source={{uri: IMAGE_URL + item?.images[0]}}
                      style={styles.cardImage}
                    />
                  ) : (
                    <Image
                      source={appImages.no_image}
                      style={{
                        ...styles.cardImage,
                        // height: 50,
                        // width: 50,
                        // resizeMode: "contain",
                      }}
                    />
                  )}
                  {/* </View> */}

                  <View style={{flex: 1}}>
                    <View style={styles.rowView}>
                      <Text
                        style={{...styles.boldText, flex: 0.7}}
                        numberOfLines={1}>
                        {item?.title}
                      </Text>
                      <Text style={styles.boldText}>{item?.price}$</Text>
                    </View>
                    <View style={styles.rowView}>
                      <Text style={styles.mediumText}>
                        {TranslationStrings.QUANTITY}:
                      </Text>
                      <Text style={styles.mediumText}>
                        {item?.quantity == '' ? 0 : item?.quantity}
                      </Text>
                    </View>
                    <View style={styles.tagView}>
                      {item?.fixed_price != 'false' &&
                        item?.fixed_price != false && (
                          <View style={styles.tag}>
                            <Text style={styles.tagText}>Fixed Price</Text>
                          </View>
                        )}
                      {item?.giveaway != 'false' && item?.giveaway != false && (
                        <View style={styles.tag}>
                          <Text style={styles.tagText}>Giving Away</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </Card>
            );
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000'}}>No Record Found</Text>
            </View>
          )}
          ListFooterComponent={() => <View style={{height: 70}} />}
        />

        <TouchableOpacity style={styles.btn} onPress={() => handleGoLive()}>
          <Text style={styles.btnText}>{TranslationStrings.GO_LIVE_NOW}</Text>
        </TouchableOpacity>
        <RBSheet
          ref={ref_RBSheet}
          height={395}
          openDuration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              padding: 20,
            },
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.boldText}>Item Details</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              {selectedItem?.images?.length > 0 ? (
                <Image
                  source={{uri: IMAGE_URL + selectedItem?.images[0]}}
                  style={styles.cardImage}
                />
              ) : (
                <Image
                  source={appImages.no_image}
                  style={{
                    ...styles.cardImage,
                  }}
                />
              )}

              <View style={{flex: 1}}>
                <View style={styles.rowView}>
                  <Text style={styles.mediumText}>{selectedItem?.title}</Text>
                  <Text style={styles.boldText}>{selectedItem?.price}$</Text>
                </View>
                <View style={{...styles.rowView, justifyContent: 'flex-start'}}>
                  <Ionicons
                    name={'location'}
                    size={15}
                    color={Colors.activetextinput}
                  />
                  <Text
                    style={{
                      color: Colors.Appthemecolor,
                      fontFamily: fontFamily.Poppins_Regular,
                      fontSize: 11,
                      marginBottom: -3,
                    }}>
                    {selectedItem?.location}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#00000017',
                marginVertical: 10,
              }}
            />

            <CustomTextInput
              icon={appImages.email}
              type={'withouticoninput'}
              texterror={'invalid'}
              keyboard_type="numeric"
              placeholder={'Enter Quantity'}
              term={quantity?.toString() == 0 ? '' : quantity?.toString()}
              onTermChange={itemtitle => setQuantity(itemtitle)}
            />
            <View
              style={{
                marginVertical: 10,
                height: 50,
              }}>
              <View style={{...styles.rowView, marginBottom: 10}}>
                <Text style={styles.mediumText}>Fixed Price{fixedPrice}</Text>
                <CustomCheckBox
                  checked={fixedPrice}
                  onPress={() => setFixedPrice(!fixedPrice)}
                  size={22}
                />
              </View>
              <View style={styles.rowView}>
                <Text style={styles.mediumText}>Giving Away</Text>
                <CustomCheckBox
                  checked={giveAway}
                  onPress={() => setGiveAway(!giveAway)}
                  size={22}
                />
              </View>
              <CustomButtonhere
                title={TranslationStrings.SAVE}
                widthset={80}
                topDistance={4}
                onPress={() => handleUpdateItem(selectedItem)}
              />
            </View>
          </View>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default CreateLive;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    marginLeft: 13,
    // height: hp(28),
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  cardImageView: {
    height: 50,
    width: 50,
    borderRadius: 10,
    resizeMode: 'stretch',
    // marginHorizontal: 10,
    marginLeft: 10,
    marginRight: 12,
    backgroundColor: '#Ccc',
  },
  cardImage: {
    height: 55,
    width: 55,
    borderRadius: 10,
    resizeMode: 'stretch',
    // marginHorizontal: 10,
    marginLeft: 10,
    marginRight: 12,
    backgroundColor: '#Ccc',
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
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    marginLeft: 7,
    fontFamily: fontFamily.Poppins_Medium,
    marginBottom: -3,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boldText: {
    fontFamily: fontFamily.Poppins_Bold,
    color: Colors.Appthemecolor,
  },
  mediumText: {
    fontFamily: fontFamily.Poppins_Medium,
    color: Colors.Appthemecolor,
  },
  lightText: {
    fontFamily: fontFamily.Poppins_Regular,
    color: Colors.Appthemecolor,
  },
  tagView: {flexDirection: 'row'},
  tag: {
    backgroundColor: '#576AF4',
    marginTop: 10,
    padding: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
  },
  tagText: {color: 'white', fontSize: 10},
  checkboxContainer: {
    margin: 0,
    padding: 0,
    marginHorizontal: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});
