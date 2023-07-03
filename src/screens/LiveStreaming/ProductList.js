import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useState} from 'react';
import {Card} from 'react-native-paper';
import {fontFamily} from '../../constant/fonts';
import Colors from '../../utills/Colors';
import {IMAGE_URL} from '../../utills/ApiRootUrl';
import {appImages} from '../../constant/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setExchangeOffer_OtherListing} from '../../redux/actions';
import {get_specific_user_detail} from '../../api/GetApis';
import {useNavigation} from '@react-navigation/native';
import QuantityModal from '../../components/LiveStreaming/QuantityModal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Loader from '../../components/Loader/Loader';
import TranslationStrings from '../../utills/TranslationStrings';

const ProductList = ({data, isHost, streamId, response}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //quantity modal
  const [quantity, setQuantity] = useState('');
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleBuyNow = async (
    giveaway_status,
    listing_user_id,
    item,
    quantity,
  ) => {
    if (quantity?.length == 0) {
      alert('Please Enter quantity');
    } else {
      console.log({giveaway_status, listing_user_id});
      setLoading(true);
      let user_detail = await get_specific_user_detail(listing_user_id);
      dispatch(setExchangeOffer_OtherListing(item));

      // let user_status = await AsyncStorage.getItem("account_status");

      // // if (user_status == "block") {
      // //   setShowBlockModal(true);
      // //   return;
      // // }

      console.log('quantity  :   ', quantity);
      setLoading(false);
      setShowQuantityModal(false);
      setQuantity('');
      if (giveaway_status == true || giveaway_status == 'true') {
        navigation.navigate('ConfirmAddress', {
          index: -1,
          user_id: listing_user_id,
          listing_user_detail: user_detail,
          type: 'giveaway',
          buy_type: 'live_stream',
          quantity: quantity,
          streamId: streamId,
          response: response,
          host: isHost,
        });
      } else {
        // navigation.navigate("ConfirmAddress");
        navigation.navigate('PaymentOptions', {
          user_id: listing_user_id,
          listing_user_detail: user_detail,
          buy_type: 'live_stream',
          quantity: quantity,
          streamId: streamId,
          response: response,
          host: isHost,
        });
      }
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      {showQuantityModal && (
        <View
          style={{
            position: 'absolute',
            left: -20,
            right: 0,
            top: -heightPercentageToDP(45),
            bottom: 0,
            height: heightPercentageToDP(100) + 50,
            width: widthPercentageToDP(100),
            zIndex: showQuantityModal ? 888 : 0,
          }}>
          <QuantityModal
            visible={showQuantityModal}
            setVisible={setShowQuantityModal}
            value={quantity}
            setValue={setQuantity}
            onPress={() => {
              handleBuyNow(
                selectedItem?.giveaway,
                selectedItem?.user_id,
                selectedItem,
                quantity,
              );
            }}
          />
        </View>
      )}

      <Loader isLoading={loading} />
      <View>
        <FlatList
          fadingEdgeLength={100}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <>
                <Card
                  style={{
                    ...styles.card,
                    opacity:
                      item?.quantity == '0' ||
                      item?.quantity?.length == 0 ||
                      item?.quantity == 0 ||
                      item?.quantity <= 0
                        ? 0.5
                        : 1,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
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

                    <View style={{flex: 1}}>
                      <View style={styles.rowView}>
                        <Text style={styles.boldText}>{item?.title}</Text>
                        <Text style={styles.boldText}>{item?.price}$</Text>
                      </View>
                      <View style={styles.rowView}>
                        <Text style={styles.mediumText}>
                          {TranslationStrings.QUANTITY}:
                          <Text style={styles.lightText}>
                            {item?.quantity ? item?.quantity : 0}
                          </Text>
                        </Text>

                        {!isHost && (
                          <TouchableOpacity
                            style={styles.tag}
                            onPress={() => {
                              // handleBuyNow(item?.giveaway, item?.user_id, item)
                              setSelectedItem(item);
                              setShowQuantityModal(true);
                            }}>
                            <Text style={styles.tagText}>
                              {TranslationStrings.BUY}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  </View>
                </Card>
                {(item?.quantity == '0' ||
                  item?.quantity?.length == 0 ||
                  item?.quantity == 0 ||
                  item?.quantity <= 0) && (
                  <View
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      top: 20,
                      zIndex: 999,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#F86E0B',
                        width: 120,
                        paddingVertical: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: fontFamily.Poppins_Regular,
                          marginBottom: -3,
                          fontSize: 13,
                        }}>
                        SOLD OUT
                      </Text>
                    </View>
                  </View>
                )}
              </>
            );
          }}
        />
      </View>
    </View>
  );
};

export default memo(ProductList);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginBottom: 8,
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  cardImage: {
    height: 50,
    width: 50,
    borderRadius: 10,
    resizeMode: 'stretch',
    // marginHorizontal: 10,
    // marginLeft: 10,
    marginRight: 12,
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
    backgroundColor: Colors.Appthemecolor,
    marginTop: 10,
    padding: 18,
    paddingVertical: 5,
    borderRadius: 20,
    // marginRight: 10,
  },
  tagText: {color: 'white', fontSize: 10},
});
