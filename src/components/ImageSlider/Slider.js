import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";

////////////Customs///////////
import SlideItem from "./SlideItem";
import Pagination from "./Pagination";
import BannerSliderItem from "./Bannerslider";
import CustomMenu from "../CustomMenu/CustomMenu";

///////////////Share Library////////////////
import Share from "react-native-share";

//////////////////paper//////////////
import { Menu, Divider, Provider } from "react-native-paper";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

///////////////app icons////////////
import Icon from "react-native-vector-icons/Ionicons";

////////////////app iamges///////////
import { appImages } from "../../constant/images";

////////////navigation/////////////
import { useNavigation } from "@react-navigation/native";

////////////////////navigation////////////////
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setExchangeOffer_MyListing } from "../../../../redux/actions";
import BlockUserView from "../BlockUserView";
import { get_user_status } from "../../api/GetApis";

const Slider = (props) => {
  ////////////////redux/////////////
  const { exchange_other_listing } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [current_user_id, setCurrent_user_id] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);

  //////////share function///////////
  const share = () => {
    const options = {
      url: "https://www.google.com/search?q=image+urto+share&rlz=1C1ONGR_enPK1027PK1027&sxsrf=ALiCzsadXf60FzdCLtRKDMLrXgQWXujQ_Q:1672990618647&source=lnms&tbm=isch&sa=X&ved=2ahUKEwijwqXct7L8AhVnif0HHVt9DqEQ_AUoAXoECAEQAw&biw=1920&bih=929&dpr=1#imgrc=bdDvKj96HpaiFM",
      message: "hello here",
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  //////////////////menu//////////////////
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = (event) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  useEffect(() => {
    getdata();
  }, []);
  const [userdata, setUserData] = useState();
  const getdata = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    setUserData(user_id);
    setCurrent_user_id(user_id);
  };
  const handleChatPress = async () => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }
    navigation.navigate("ChatScreen", {
      userid: exchange_other_listing.user_id,
    });
  };

  return (
    <View>
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />
      <FlatList
        style={{ marginTop: 35 }}
        ListEmptyComponent={() => {
          return <View style={{ height: showBlockModal ? 250 : 10 }}></View>;
        }}
        data={props.imagearray}
        renderItem={({ item }) =>
          props.slidertype === "dashboard" ? (
            <BannerSliderItem item={item} />
          ) : (
            <SlideItem item={item} />
          )
        }
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      {props.slidertype === "dashboard" ? null : (
        <View style={{ ...styles.content, backgroundColor: "#FFF" }}>
          <Icon
            name={"arrow-back"}
            size={25}
            color={"black"}
            //style={{marginLeft:wp(30)}}
            onPress={() => {
              {
                navigation.goBack();
              }
            }}
          />

          {props?.hideChat == true
            ? null
            : props?.listing_owner_id != current_user_id &&
              (userdata === exchange_other_listing.user_id &&
              props.type === "listing_details" ? null : userdata ===
                  exchange_other_listing.user_id ||
                props.type === "comments" ? null : (
                <TouchableOpacity
                  onPress={() => {
                    handleChatPress();
                  }}
                  style={{ width: wp(15), height: wp(8), left: wp(30) }}
                >
                  <Image
                    source={appImages.sliderchat}
                    style={{
                      width: wp(15),
                      height: wp(8),
                      // left: wp(35),
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ))}

          {userdata === exchange_other_listing.user_id &&
          props.type === "listing_details" ? null : userdata ===
              exchange_other_listing.user_id ||
            props.type === "comments" ? null : (
            <CustomMenu
              hideMenu={props?.hideMenu}
              menudata={props.menuoptions}
              setShowBlockModal={setShowBlockModal}
              otherParams={props?.otherParams}
            />
          )}

          {/* <Text style={styles.price}>item.price</Text> */}
        </View>
      )}

      <Pagination data={props.imagearray} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 2.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
    //alignItems: 'center',
    //backgroundColor:'red'
  },
  image: {
    flex: 1,
    width: width,
    // height:height/2.3,
  },
  shadowview: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 17,
  },
  content: {
    //flex: 0.4,,
    // width: wp(93),
    width: wp(100),
    alignSelf: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
    // marginTop: hp(2),
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
});
