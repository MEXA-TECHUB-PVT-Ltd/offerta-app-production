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
  StyleSheet,
  ImageBackground,
} from "react-native";

import CustomHeader from "../../components/Header/CustomHeader";

import Colors from "../../utills/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar, Button, Card, Modal } from "react-native-paper";

import Loader from "../../components/Loader/Loader";
import { appImages } from "../../constant/images";

import { Rating } from "react-native-rating-element";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { fontFamily } from "../../constant/fonts";
import { getALLLiveStreams } from "../../api/LiveStreamingApi";
import { IMAGE_URL } from "../../utills/ApiRootUrl";
import { async } from "regenerator-runtime";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import CPaperInput from "../../components/TextInput/CPaperInput";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import CustomButtonhere from "../../components/Button/CustomButton";

const LiveUsers = ({ navigation, route }) => {
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
    }, [])
  );

  const getLiveStreamsData = async () => {
    getALLLiveStreams()
      .then((response) => {
        let list = [];
        if (response?.data?.error == false) {
          for (const item of response?.data?.stream) {
            if (
              item?.active_status == "active" &&
              item?.uid != "0" &&
              item?.user != null
            ) {
              let obj = {
                stream: [
                  {
                    list_id: "165",
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        barStyle="light-content"
      />

      <View
        style={{
          backgroundColor: "white",
          height: hp(100),
          alignItems: "center",
        }}
      >
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
              type={"profile"}
              headerlabel={"Live Streaming"}
              iconPress={() => {
                navigation.goBack();
              }}
              icon={"arrow-back"}
            />
          }
          data={data}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <Card
                style={styles.card}
                onPress={() => {
                  navigation.navigate("WatchLiveStream", {
                    host: false,
                    response: item,
                  });
                  // let start_time = item?.stream[0]?.currentDateTime;
                  // let x = new Date();
                  // let y = new Date(start_time);
                  // let dif = Math.abs(x - y) / 1000;
                  // console.log("seconds  :  ", dif);

                  // let start_time = item?.stream[0]?.currentDateTime;
                  // console.log("start_time :   ", start_time);
                  // let dt = new Date();
                  // let seconds = Math.floor(dt / 1000);
                  // seconds = seconds.toFixed(0);
                  // console.log("seconds :  ", moment.duration(new Date()));
                }}
              >
                <ImageBackground
                  blurRadius={3}
                  // source={
                  //   item?.stream && item?.stream[0]?.thumbnail == null
                  //     ? appImages.live_stream_bg
                  //     : { uri: IMAGE_URL + item?.stream[0]?.thumbnail }
                  source={
                    item?.user && item?.user[0]?.image == null
                      ? appImages.no_image
                      : { uri: IMAGE_URL + item?.user[0]?.image }
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                  resizeMode="cover"
                >
                  <ImageBackground
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "flex-end",
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
                        : { uri: IMAGE_URL + item?.user[0]?.image }
                    }
                  >
                    <View
                      style={{
                        margin: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Avatar.Image
                        source={{ uri: IMAGE_URL + item?.user[0]?.image }}
                        size={35}
                      />
                      <View
                        style={{
                          backgroundColor: "#FFFFFF5C",
                          padding: 3,
                          paddingHorizontal: 8,
                          borderRadius: 18,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Ionicons
                          name="md-eye-outline"
                          color={"white"}
                          size={20}
                        />
                        <Text
                          style={{
                            color: "white",
                            marginLeft: 5,
                            fontFamily: fontFamily.Poppins_Regular,
                            marginBottom: -3,
                          }}
                        >
                          {item?.stream[0]?.view}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                </ImageBackground>
              </Card>
            );
          }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#000" }}>No Record Found</Text>
            </View>
          )}
          ListFooterComponent={() => <View style={{ height: 70 }} />}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("CreateLive")}
        >
          <AntDesign name="plus" color={"white"} size={20} />
          <Text style={styles.btnText}>Start Live</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LiveUsers;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    margin: 10,
    marginLeft: 13,
    height: hp(28),
    // flex: 1,
    width: wp(42.5),
    borderRadius: 10,
    overflow: "hidden",
  },
  liveView: {
    backgroundColor: "red",
    position: "absolute",
    right: 10,
    top: 7,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  liveText: { color: "#fff", fontWeight: "500" },
  btn: {
    width: wp(85),
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: Colors.Appthemecolor,
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
  },
  btnText: {
    color: "white",
    marginLeft: 7,
    fontFamily: fontFamily.Poppins_Medium,
    marginBottom: -3,
  },
});
