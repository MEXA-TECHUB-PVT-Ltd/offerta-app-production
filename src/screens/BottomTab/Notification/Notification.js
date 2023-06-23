import React, { useEffect, useState } from "react";
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
} from "react-native";

////////////////app components///////////
import CustomHeader from "../../../components/Header/CustomHeader";

/////////////app styles///////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appImages } from "../../../constant/images";

////////////////////api function/////////////
import { get_Notifications } from "../../../api/GetApis";
import { useDispatch, useSelector } from "react-redux";
import {
  setChatCount,
  setExchangeOffer_OtherListing,
  setNotificationCount,
  setNotificationList,
} from "../../../redux/actions";
import Loader from "../../../components/Loader/Loader";
import { useFocusEffect } from "@react-navigation/native";

import BlockUserView from "../../../components/BlockUserView";
import { get_user_status } from "../../../api/GetApis";

import moment from "moment";

import TranslationStrings from "../../../utills/TranslationStrings";
import { Avatar } from "react-native-paper";
import { update_notification } from "../../../api/PostApis";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import LikesNotifications from "./LikesNotifications";
import CommentNotifications from "./CommentNotifications";
import OffersNotifications from "./OffersNotifications";

const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  const { chatCount, notificationList } = useSelector(
    (state) => state.userReducer
  );

  ///////////////////data state///////////
  const [notification, setNotification] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  //textfields
  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     get_user_notifications();
  //     // getTimeZone();
  //   }, [])
  // );

  const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
  );

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: TranslationStrings.OFFERS },
    { key: "second", title: TranslationStrings.LIKES },
    { key: "third", title: TranslationStrings.COMMENTS },
  ]);
  const renderScene = SceneMap({
    first: OffersNotifications,
    second: LikesNotifications,
    third: CommentNotifications,
  });

  function changeDatetimeByTimezone(datetime, timezone) {
    console.log("datetime, timezone  :   ", datetime, timezone);
    const parsedDateAsUtc = moment
      .utc()
      .startOf("day")
      .add(datetime.substring(0, 2), "hours")
      .add(datetime.substring(3, 5), "minutes");
    return parsedDateAsUtc?.clone()?.tz(timezone)?.format("hh:mm");
  }

  const convertUTCToLocalTime = (dateString) => {
    try {
      let date = new Date(dateString);
      const milliseconds = Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      );
      const localTime = new Date(milliseconds);
      // localTime.getDate(); // local date
      // let hours = localTime.getHours(); // local hour

      return moment(localTime).fromNow();
    } catch (error) {
      return "";
    }
  };

  const getTimeZone = () => {
    setLoading(false);
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    convertUTCToLocalTime("2023-04-08 04:12:57");
    var localTime = moment
      .utc(new Date("2023-04-08 04:12:57"), "HH:mm")
      .tz(timeZone)
      .format("HH:mm");
    console.log(localTime);

    // const dateTimeBE = changeDatetimeByTimezone(
    //   new Date("2023-04-08 04:12:57"),
    //   timeZone
    // ); // 17:35
    // console.log("dateTimeBE  :  ", dateTimeBE);
    // let date1 = new Date(element.timestamp);
    // let date1 = new Date("2023-04-08 04:12:57");
    // const t = new Date(date1);
    // const date = ("0" + t.getDate()).slice(-2);
    // const month = ("0" + (t.getMonth() + 1)).slice(-2);
    // const year = t.getFullYear() % 100;
    // const hours = ("0" + t.getHours()).slice(-2);
    // const minutes = ("0" + t.getMinutes()).slice(-2);
    // const seconds = ("0" + t.getSeconds()).slice(-2);
    // const time = `${hours}:${minutes} ${date}/${month}/${year}`;
    // console.log(time);
  };

  const get_user_notifications = async () => {
    get_Notifications()
      .then(async (response) => {
        //setData(response.data)
        if (response.data.msg === "No Result") {
          setNotification("");
        } else {
          if (response.data?.length > 0) {
            let notificationList1 = response.data;
            let sorted_list = notificationList1.reverse();
            setNotification(sorted_list);
            dispatch(setNotificationList(sorted_list));

            // let lastItem = response.data?.pop();
            let lastItem = notificationList1[0];
            console.log("lastItem?.id :  ", lastItem?.id);
            await AsyncStorage.setItem(
              "LastNotification",
              lastItem?.id?.toString()
            );
            let lastNotification = await AsyncStorage.getItem(
              "LastNotification"
            );
            const filter = notificationList1.filter(
              (item) => parseInt(item?.id) > parseInt(lastNotification)
            );
            dispatch(setNotificationCount(filter?.length));
          }
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      })
      .finally(() => {
        setRefreshing(false);
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    get_user_notifications();
  };

  const handleNotificationPress = async (item) => {
    updateNotificationStatus(item?.id, true);
    // dispatch(setExchangeOffer_OtherListing(""));
    // navigation.navigate("ListingsDetails", {
    //   listing_id: item?.list?.id,
    // });

    // let user_status = await get_user_status();
    // if (user_status == "block") {
    //   setShowBlockModal(true);
    //   return;
    // }

    // console.log("item?.type : ", item?.type);

    // return;

    if (item?.type == "Price Offer") {
      console.log("notification is price offer");
      dispatch(setExchangeOffer_OtherListing(item?.list));
      console.log("item :::", item?.offer_status);
      if (item?.offer_status == "reject") {
        //handle offer reject
        // let obj = {
        //   sale_by: item?.offer?.sale_by,
        //   buyer_id: item?.offer?.user_id,
        //   offer_type: "price_offer",
        //   receiverId: item?.offer?.sale_by,
        //   senderId: item?.offer?.user_id,
        //   listing_id: item?.list?.id,

        //   item_img: item?.list?.images?.length > 0 ? item?.list?.images[0] : "",
        //   offer_price: item?.offer?.price,
        //   offerid: item?.offer?.id,
        //   itemprice: item?.list?.price,
        //   navtype: "notification",
        //   userid: item?.offer?.sale_by,
        // };

        let obj = {
          // sale_by: item?.offer?.sale_by,
          sale_by: item?.list?.user_id,
          buyer_id: item?.offer?.user_id,
          offer_type: "price_offer",
          receiverId: item?.offer?.user_id,
          // receiverId: item?.list?.user_id,
          senderId: item?.offer?.user_id,
          // senderId: item?.requester?.id,
          listing_id: item?.list?.id,
          item_img: item?.list?.images?.length > 0 ? item?.list?.images[0] : "",
          offer_price: item?.offer?.price,
          offerid: item?.offer?.id,
          itemprice: item?.list?.price,
          navtype: "notification",
          // userid: item?.offer?.sale_by,
          // userid: item?.list?.user_id,
          userid: item?.offer?.requester_id,
          offer_status: item?.offer_status,
        };
        console.log("reject offer response  :;  ", obj);
        navigation.navigate("PriceOfferNoti", obj);
      } else if (item?.offer_status == "accept") {
        // navigation.navigate("ConfirmAddress", {
        //   index: 0,
        // });

        console.log("item?.list  : ", item?.list);

        dispatch(setExchangeOffer_OtherListing(item?.list));
        navigation.navigate("PaymentOptions", {
          index: 0,
        });
      } else if (
        item?.offer_status == "pending" ||
        item?.offer_status == "created"
      ) {
        // navigation.navigate("MainListingsDetails", {
        //   listing_id: item?.list?.id,
        // });
        let obj = {
          // sale_by: item?.offer?.sale_by,
          sale_by: item?.list?.user_id,
          buyer_id: item?.offer?.requester_id,
          // buyer_id: item?.requester?.id,
          offer_type: "price_offer",
          receiverId: item?.offer?.user_id,
          // receiverId: item?.list?.user_id,
          senderId: item?.offer?.requester_id,
          // senderId: item?.requester?.id,
          listing_id: item?.list?.id,
          item_img: item?.list?.images?.length > 0 ? item?.list?.images[0] : "",
          offer_price: item?.offer?.price,
          offerid: item?.offer?.id,
          itemprice: item?.list?.price,
          navtype: "notification",
          // userid: item?.offer?.sale_by,
          // userid: item?.list?.user_id,
          userid: item?.offer?.user_id,
        };

        console.log("obj : ", obj);
        navigation.navigate("PriceOfferNoti", obj);
      }
    } else if (item?.type == "Counter Offer") {
      if (item?.offer_status == "created") {
        let obj = {
          buyer_id: item?.offer?.requester_id,
          item_img: item?.list?.images?.length > 0 ? item?.list?.images[0] : "",
          itemprice: item?.list?.price,
          listing_id: item?.list?.id,
          navtype: "notification",
          offer_price: item?.offer?.price,
          offer_type: "counter_offer",
          price_offer: item?.offer?.price,
          offerid: item?.offer?.id,
          receiverId: item?.offer?.user_id,
          // sale_by: item?.offer?.sale_by,
          sale_by: item?.list?.user_id,
          senderId: item?.offer?.requester_id,
          userId: item?.offer?.requester_id,
          offer_status: item?.offer_status,
          type: "view",
        };
        navigation.navigate("CounterOffer", obj);
      } else {
        let obj = {
          buyer_id: item?.offer?.requester_id,
          item_img: item?.list?.images?.length > 0 ? item?.list?.images[0] : "",
          itemprice: item?.list?.price,
          listing_id: item?.list?.id,
          navtype: "notification",
          offer_price: item?.offer?.price,
          offer_type: "counter_offer",
          price_offer: item?.offer?.price,
          offerid: item?.offer?.id,
          receiverId: item?.offer?.user_id,
          // sale_by: item?.offer?.sale_by,
          sale_by: item?.list?.user_id,
          senderId: item?.offer?.requester_id,
          userId: item?.offer?.requester_id,
          offer_status: item?.offer_status,
          type: "view",
        };
        navigation.navigate("CounterOffer", obj);
      }
    } else if (item?.type == "exchange") {
      //item1  : requester_list
      //item2 : list

      let obj = {
        item_img1: item?.requester_list?.images[0],
        item_img2: item?.list?.images[0],
        itemname1: item?.requester_list?.title,
        itemname2: item?.list?.title,
        itemprice1: item?.requester_list?.price,
        itemprice2: item?.list?.price,
        navtype: "notification",

        // userid:
        //   item?.status == "incomming" || item?.status == "reject"
        //     ? item?.offer?.user_id
        //     : item?.list?.user_id,
        userid:
          item?.status == "incomming" || item?.status == "reject"
            ? item?.offer?.user_id
            : item?.requester_list?.user_id,
        receiverId: item?.list?.user_id,
        senderId: item?.requester_list?.user_id,
        offerId: item?.offer?.id,
        offer_detail: {
          id: item?.offer?.id,
          user_id: item?.offer?.user_id,
          second_user: item?.list?.user_id,
          item: item?.offer?.item,
          item2: item?.offer?.item2,
        },
      };
      console.log("obj : ", obj);
      navigation.navigate("ExchangeNoti", obj);
    } else {
      console.log("other type that is not handled yet  :  ", item?.type);
    }
  };

  const updateNotificationStatus = async (id, status) => {
    setLoading(true);
    update_notification(id, status)
      .then((response) => {
        const newData = notification?.map((item) => {
          if (item?.id == id) {
            return {
              ...item,
              read: true,
            };
          } else {
            return {
              ...item,
            };
          }
        });
        setNotification(newData);
        dispatch(setNotificationList(newData));
      })
      .catch((err) => {
        console.log("err : ", err);
      })
      .finally(() => setLoading(false));
  };
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{
          ...styles.card,
          width: wp(100),
          paddingVertical: 5,
          paddingHorizontal: 15,
          marginBottom: 2,
          backgroundColor:
            item?.item?.read == "false" || item?.item?.read == false
              ? "#EFF6FF"
              : "transparent",
          minHeight: 65,
        }}
        onPress={() => {
          handleNotificationPress(item?.item);
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", width: wp(100) }}
        >
          <Avatar.Image
            size={wp(12)}
            source={{ uri: IMAGE_URL + item.item.requester.image }}
          />
          <View style={{ marginLeft: wp(3), flex: 0.9, paddingRight: 10 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...styles.username }}>
                {item.item.requester.full_name}
              </Text>
              <Text
                style={[styles.recomend, { color: "#7A8FA6", width: "auto" }]}
              >
                {item?.item?.created_at &&
                  convertUTCToLocalTime(item?.item?.created_at)}
              </Text>
            </View>
            <Text
              style={[styles.recomend, { color: "#7A8FA6", width: wp(57) }]}
            >
              {item.item.notification}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // const renderItem = (item) => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.card}
  //       onPress={() => {
  //         handleNotificationPress(item?.item);
  //         // navigation.navigate("ExchangeNoti", {
  //         //   data: item.item,
  //         //   navtype: "Notification",
  //         // });
  //       }}
  //     >
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-around",
  //           alignItems: "center",
  //           marginBottom: 20,
  //         }}
  //       >
  //         <View style={{}}>
  //           <Image
  //             source={{ uri: IMAGE_URL + item.item.requester.image }}
  //             style={styles.userimage}
  //             resizeMode="contain"
  //           />
  //         </View>
  //         <View style={{ marginLeft: wp(3) }}>
  //           <Text style={styles.username}>{item.item.requester.full_name}</Text>
  //           <Text
  //             style={[styles.recomend, { color: "#7A8FA6", width: wp(57) }]}
  //           >
  //             {item.item.notification}
  //           </Text>
  //         </View>
  //       </View>

  //       <View style={{ marginLeft: 0 }}>
  //         <Text style={[styles.recomend, { color: "#7A8FA6", width: wp(30) }]}>
  //           {/* {item?.item?.created_at && moment(item?.item?.created_at).fromNow()} */}
  //           {item?.item?.created_at &&
  //             convertUTCToLocalTime(item?.item?.created_at)}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        barStyle="light-content"
      />
      <CustomHeader
        type={"profile"}
        headerlabel={TranslationStrings.NOTIFICATIONS}
      />
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />
      {/* <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        style={{ backgroundColor: "#fff" }}
        initialLayout={{ width: layout.width }}
      /> */}

      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{ backgroundColor: "#F7F9FC" }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: focused ? Colors.Appthemecolor : "#8f9bb3",
                    // fontFamily: fontFamily.OpenSans_Bold,
                    fontSize: hp(1.8),
                  }}
                >
                  {route.title}
                </Text>
              )}
              activeColor={"#fff"}
              indicatorStyle={{
                padding: 1.5,
                marginBottom: -2,
                backgroundColor: Colors.Appthemecolor,
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;
