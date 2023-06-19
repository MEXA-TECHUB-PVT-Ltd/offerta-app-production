import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";

///////////////app components//////////
import Loader from "../../components/Loader/Loader";

////////////////app store data//////////////////
import AsyncStorage from "@react-native-async-storage/async-storage";
import TranslationStrings, {
  ChangeAppLanguage,
} from "../../utills/TranslationStrings";
import { get_Chat_Users } from "../../api/ChatApis";
import { useDispatch } from "react-redux";
import { setChatCount, setNotificationCount } from "../../redux/actions";
import firestore from "@react-native-firebase/firestore";
import { get_Notifications, get_user_status } from "../../api/GetApis";

const LoaderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  ////////////////loading/////////////
  const [loading, setloading] = useState(false);
  const getData = async () => {
    try {
      getSelectedLanguage();
      await AsyncStorage.getItem("Userid")
        .then(async (db) => {
          // setloading(false);
          console.log("usertype...", { db });
          if (db === null) {
            setloading(false);
            navigation.replace("Login");
          } else {
            let user_status = await AsyncStorage.getItem("account_status");
            if (user_status == null || user_status?.length == 0) {
              console.log(
                "user_status updated.............................................."
              );
              let user_status = await get_user_status();
              if (typeof user_status != "undefined") {
                await AsyncStorage.setItem(
                  "account_status",
                  user_status?.toString()
                );
              }
            }
            setTimeout(() => {
              console.log("here..");
              setloading(false);
              navigation.replace("Drawerroute");
            }, 2000);
          }
        })
        .done();
    } catch (error) {
      console.log("error  :  ", error);
    }
  };

  useEffect(() => {
    setloading(true);
    getDetails();
    get_user_notifications();
    getData();
  }, []);

  const getSelectedLanguage = async () => {
    let language = await AsyncStorage.getItem("Language");
    if (language) {
      console.log("language : ", language);
      ChangeAppLanguage(language);
      ChangeAppLanguage(language);
      console.log("______________", TranslationStrings.getLanguage());
    } else {
      ChangeAppLanguage("es");
      console.log("else_________________________________");
      await AsyncStorage.setItem("Language", "es");
    }
  };

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
                console.log(
                  "item?._data?.user?._id  :  ",
                  item?._data?.user?._id,
                  user
                );
                if (item?._data?.user?._id != user) {
                  myArr.push(item);
                }
              });
              // console.log("myArr  : ", );
              // console.log("filter :  ", filter);
              resolve(myArr?.length);
            });
        }
        // resolve(0);
        // dispatch(setChatCount(unread_count));
      } catch (error) {
        console.log(
          "Error_____________________________________________",
          error
        );
        resolve(0);
      }
    });
  };

  const getDetails = async () => {
    get_Chat_Users()
      .then(async (response) => {
        if (response.data.msg === "No Result") {
          //
          console.log("////////////////");
        } else {
          let count = await countUnreadMessages(response);
          console.log("count ______________________________", count);
          dispatch(setChatCount(count));
        }
      })
      .catch((err) => {
        console.log("126 error : ", err);
      });
  };

  const get_user_notifications = async () => {
    get_Notifications()
      .then(async (response) => {
        //setData(response.data)

        if (response.data.msg === "No Result") {
          // setNotification("");
          console.log("no record found........... ");
        } else {
          if (response.data?.length > 0) {
            let notificationList = response.data;

            let lastNotification = await AsyncStorage.getItem(
              "LastNotification"
            );
            const filter = notificationList.filter(
              (item) => parseInt(item?.id) > parseInt(lastNotification)
            );

            dispatch(setNotificationCount(filter?.length));
            let lastItem = response.data?.pop();
            await AsyncStorage.setItem(
              "LastNotification",
              lastItem?.id?.toString()
            );
            console.log("notification count  :  ", filter?.length);
            console.log("last item     :  ", lastItem?.id?.toString());
            //setNotification(notificationList.reverse());
          }
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};
export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
