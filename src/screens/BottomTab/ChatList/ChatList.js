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
  RefreshControl,
} from "react-native";
import { Divider, Badge } from "react-native-paper";
import { Avatar } from "react-native-paper";
/////////////////app components/////////////
import NoDataFound from "../../../components/NoDataFound/NoDataFound";

//////////////////app components/////////
import CustomHeader from "../../../components/Header/CustomHeader";

////////////////////App styles///////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////////api data//////////
import { get_Chat_Users } from "../../../api/ChatApis";

////////////image url/////////////
import { IMAGE_URL } from "../../../utills/ApiRootUrl";

///////////////////async//////////////
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../components/Loader/Loader";
import TranslationStrings from "../../../utills/TranslationStrings";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setChatCount, setChatList } from "../../../redux/actions";
import { useFocusEffect } from "@react-navigation/native";

const ChatList = ({ navigation }) => {
  const { chatCount, chatList } = useSelector((state) => state.userReducer);
  ///////////////////data state///////////
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  //textfields
  useEffect(() => {
    setLoading(true);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDetails();
    }, [])
  );

  const countUnreadMessages = async (response) => {
    return new Promise(async (resolve, reject) => {
      try {
        var user = await AsyncStorage.getItem("Userid");
        let unread_count = 0;
        for (const element of response.data) {
          let user_id =
            element?.user?.id == user
              ? element?.chat_user?.id
              : element?.user?.id;
          let docid =
            user_id > user ? user + "-" + user_id : user_id + "-" + user;
          const user_list = firestore()
            .collection("chats")
            .doc(docid)
            .collection("messages");

          user_list
            .where("read", "==", false)
            .get()
            .then((snapshots) => {
              let myArr = [];
              snapshots.forEach((item) => {
                if (item?._data?.user?._id != user) {
                  myArr.push(item);
                }
              });
              resolve(myArr?.length);
            });
        }
        // resolve(0);
        // dispatch(setChatCount(unread_count));
      } catch (error) {
        resolve(0);
      }
    });
  };

  const getLastMessage = async (user_list) => {
    return new Promise((resolve, reject) => {
      try {
        user_list
          .orderBy("createdAt", "desc")
          .limit(1)
          .get()
          .then((snapshots) => {
            let myArr = [];
            snapshots.forEach((item) => {
              // if (item?._data?.user?._id != user) {
              let date = new Date(
                item?._data?.createdAt.seconds * 1000 +
                  item?._data?.createdAt.nanoseconds / 1000000
              );
              let obj = {
                ...item?._data,
                createdAt: date,
              };
              myArr.push(obj);
              return;
              // }
            });
            resolve(myArr[0]);
          });
      } catch (error) {
        resolve(false);
      }
    });
  };

  const countUnreadMessages_OF_Specific_User = async (user_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        var user = await AsyncStorage.getItem("Userid");
        let unread_count = 0;
        let docid =
          user_id > user ? user + "-" + user_id : user_id + "-" + user;
        const user_list = firestore()
          .collection("chats")
          .doc(docid)
          .collection("messages");
        let last_message = await getLastMessage(user_list);
        user_list
          .where("read", "==", false)
          .get()
          .then((snapshots) => {
            let myArr = [];
            snapshots.forEach((item) => {
              if (item?._data?.user?._id != user) {
                myArr.push(item);
              }
            });
            let obj = {
              last_message: last_message,
              count: myArr?.length,
            };
            resolve(obj);
          })
          .catch((err) => {
            console.log("Err : ", err);
          });
      } catch (error) {
        console.log("error : ", error);
        resolve(0);
      }
    });
  };

  // const countUnreadMessages_OF_Specific_User = async (user_id) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       var user = await AsyncStorage.getItem("Userid");
  //       let unread_count = 0;
  //       let docid =
  //         user_id > user ? user + "-" + user_id : user_id + "-" + user;
  //       const user_list = firestore()
  //         .collection("chats")
  //         .doc(docid)
  //         .collection("messages");

  //       user_list
  //         .where("read", "==", false)
  //         .get()
  //         .then((snapshots) => {
  //           let myArr = [];
  //           snapshots.forEach((item) => {
  //             if (item?._data?.user?._id != user) {
  //               myArr.push(item);
  //             }
  //           });
  //           resolve(myArr?.length);
  //         });

  //       user_list
  //         .orderBy("createdAt", "asc")
  //         .limit(1)
  //         .get()
  //         .then((snapshots) => {
  //           let myArr = [];
  //           snapshots.forEach((item) => {
  //             if (item?._data?.user?._id != user) {
  //               myArr.push(item);
  //             }
  //           });

  //         });
  //     } catch (error) {
  //       console.log("error : ", error);
  //       resolve(0);
  //     }
  //   });
  // };

  //

  const getDetails = async () => {
    getuser();
    get_Chat_Users().then(async (response) => {
      if (response.data.msg === "No Result") {
        // setData();
        dispatch(setChatList([]));
      } else {
        //setData(response.data);
        // let count = await countUnreadMessages(response);
        let list = [];
        let totalCount = 0;
        var user_id = await AsyncStorage.getItem("Userid");

        for (const element of response?.data) {
          let chat_user_id =
            element?.user?.id == user_id
              ? element?.chat_user?.id
              : element?.user?.id;
          let messages_detail = await countUnreadMessages_OF_Specific_User(
            chat_user_id
          );
          let count1 = messages_detail?.count;
          let obj = {
            ...element,
            count: count1,
            last_message: messages_detail?.last_message
              ? messages_detail?.last_message
              : null,
          };
          totalCount += count1;
          list.push(obj);
        }

        let sortedList = list.sort(
          (a, b) =>
            (b?.last_message?.createdAt
              ? new Date(b?.last_message?.createdAt)
              : 1) -
            (a?.last_message?.createdAt
              ? new Date(a?.last_message?.createdAt)
              : 0)
        );

        // setData(list);
        dispatch(setChatList(sortedList));
        // dispatch(setChatCount(count));
        dispatch(setChatCount(totalCount));
      }
      setLoading(false);
      setRefreshing(false);
    });
  };

  const [login_user_id, setlogin_user_id] = useState();
  const getuser = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    setlogin_user_id(user_id);
  };
  const handleRefresh = () => {
    setRefreshing(true);
    getDetails();
  };

  ///////////////////flatlist render item///////////////
  const renderitem = (item) => {
    return item?.item?.chat_user == null ||
      item?.item?.user == null ? null : item?.item?.chat_user?.id ===
        login_user_id && item?.item?.user?.id != login_user_id ? (
      <TouchableOpacity
        style={{
          paddingVertical: 5,
          marginBottom: 4,
          paddingHorizontal: 10,
          backgroundColor: item?.item?.count > 0 ? "#EFF6FF" : "transparent",
        }}
        onPress={() =>
          navigation.navigate("ChatScreen", {
            navtype: "chatlist",
            userid: item?.item?.user?.id,
          })
        }
      >
        <View style={{ ...styles.card, marginBottom: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: wp("3%"),
            }}
          >
            <View style={{}}>
              <Avatar.Image
                source={{ uri: IMAGE_URL + item?.item?.user?.image }}
                size={wp(12.4)}
              />
              {/* <Image
                source={{ uri: IMAGE_URL + item?.item?.user?.image }}
                style={styles.userimage}
                resizeMode="contain"
              /> */}
              <View
                style={{ position: "absolute", bottom: 0, right: hp(-1.5) }}
              >
                <Image
                  source={item?.status}
                  style={{ width: wp(10), height: hp(2) }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1B1B1B",
                    fontWeight: "700",
                  }}
                >
                  {item?.item?.user?.full_name}
                </Text>
              </View>

              <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
                {item?.subtext}
              </Text>
              {/* <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
                {item?.item?.last_message?.text}
              </Text> */}
            </View>
          </View>

          {/* <View style={{}}>
            <Text style={[styles.recomend, { color: "#7A8FA6" }]}>1m ago</Text>
            <Badge style={{ marginTop: hp(2) }}>{item?.item?.count}</Badge>
          </View> */}
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={{
          backgroundColor: item?.item?.count > 0 ? "#EFF6FF" : "transparent",
          marginBottom: 4,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
        onPress={() =>
          navigation.navigate("ChatScreen", {
            navtype: "chatlist",
            userid: item.item.chat_user.id,
          })
        }
      >
        <View style={{ ...styles.card, marginBottom: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: wp("3%"),
            }}
          >
            <View style={{}}>
              {/* <Image
                source={{ uri: IMAGE_URL + item?.item?.chat_user?.image }}
                style={styles.userimage}
                resizeMode="contain"
              /> */}
              <Avatar.Image
                source={{ uri: IMAGE_URL + item?.item?.chat_user?.image }}
                size={wp(12.4)}
              />
              <View
                style={{ position: "absolute", bottom: 0, right: hp(-1.5) }}
              >
                <Image
                  source={item?.status}
                  style={{ width: wp(10), height: hp(2) }}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={{ marginLeft: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#1B1B1B",
                    fontWeight: "700",
                  }}
                >
                  {item?.item?.chat_user?.full_name}
                </Text>
              </View>
              <Text style={[styles.recomend, { color: "#7A8FA6" }]}>
                {item?.subtext}
              </Text>
            </View>
          </View>

          {/* <View style={{}}>
            <Text style={[styles.recomend, { color: "#7A8FA6" }]}>1m ago</Text>
            <Badge style={{ marginTop: hp(2) }}>{item?.item?.count}</Badge>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader headerlabel={TranslationStrings.CHATS} />
      <Loader isLoading={loading} />

      <FlatList
        // data={data}
        data={chatList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.Appthemecolor]}
            onRefresh={() => handleRefresh()}
          />
        }
        renderItem={renderitem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <NoDataFound
              icon={"exclamation-thick"}
              text={TranslationStrings.NO_DATA_FOUND}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ChatList;
