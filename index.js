/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Text, TextInput} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {navigationRef} from './RootNavigation';
import {Store} from './src/redux/store';
import {
  setChatCount,
  setChatList,
  setNotificationCount,
  setNotificationList,
} from './src/redux/actions';
import {get_Notifications} from './src/api/GetApis';
import {get_Chat_Users} from './src/api/ChatApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
PushNotification.createChannel(
  {
    channelId: 'fcm_fallback_notification_channel', // (required)
    channelName: 'fcm_fallback_notification_channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const get_user_notifications = async () => {
  get_Notifications()
    .then(async response => {
      if (response.data.msg === 'No Result') {
        Store.dispatch(setNotificationList([]));
      } else if (response.data?.length > 0) {
        let notificationList = response?.data ? response?.data : [];

        Store.dispatch(setNotificationList(notificationList?.reverse()));
      }
    })
    .catch(err => {
      console.log('Error : ', err);
    });
};

const getLastMessage = async user_list => {
  return new Promise((resolve, reject) => {
    try {
      user_list
        .orderBy('createdAt', 'desc')
        .limit(1)
        .get()
        .then(snapshots => {
          let myArr = [];
          snapshots.forEach(item => {
            // if (item?._data?.user?._id != user) {
            let date = new Date(
              item?._data?.createdAt.seconds * 1000 +
                item?._data?.createdAt.nanoseconds / 1000000,
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

const countUnreadMessages_OF_Specific_User = async user_id => {
  return new Promise(async (resolve, reject) => {
    try {
      var user = await AsyncStorage.getItem('Userid');
      let unread_count = 0;
      let docid = user_id > user ? user + '-' + user_id : user_id + '-' + user;
      const user_list = firestore()
        .collection('chats')
        .doc(docid)
        .collection('messages');
      let last_message = await getLastMessage(user_list);
      user_list
        .where('read', '==', false)
        .get()
        .then(snapshots => {
          let myArr = [];
          snapshots.forEach(item => {
            if (item?._data?.user?._id != user) {
              myArr.push(item);
            }
          });
          let obj = {
            last_message: last_message,
            count: myArr?.length,
          };
          resolve(obj);
        });
    } catch (error) {
      console.log('error : ', error);
      resolve(0);
    }
  });
};

// const countUnreadMessages_OF_Specific_User = async (user_id) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       var user = await AsyncStorage.getItem("Userid");
//       let unread_count = 0;
//       let docid = user_id > user ? user + "-" + user_id : user_id + "-" + user;
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
//     } catch (error) {
//       resolve(0);
//     }
//   });
// };

const getDetails = async () => {
  get_Chat_Users().then(async response => {
    if (response.data.msg === 'No Result') {
      dispatch(setChatList([]));
    } else {
      let list = [];
      let totalCount = 0;
      var user_id = await AsyncStorage.getItem('Userid');
      for (const element of response?.data) {
        let chat_user_id =
          element?.user?.id == user_id
            ? element?.chat_user?.id
            : element?.user?.id;
        let messages_detail = await countUnreadMessages_OF_Specific_User(
          chat_user_id,
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
            : 0),
      );
      Store.dispatch(setChatList(sortedList));
    }
  });
};

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    let data = notification;
    console.log('new notification received ::::: ', data);
    console.log(
      'data.userInteraction_______________ ::::: ',
      data.userInteraction,
    );

    console.log('user_id in notification  :  ', data?.data?.user_id);

    //   navigationRef?.current?.navigate('NotificationStackScreens', {
    //     data,
    //   });

    if (data.userInteraction) {
      console.log('navigationRef : ', navigationRef);
      if (data?.data?.type == 'chat') {
        getDetails();
        navigationRef?.current?.navigate('ChatScreen', {
          navtype: 'chatlist',
          userid: data?.data?.user_id,
        });
      } else {
        // navigationRef?.current?.navigate("NotificationStackScreens", {
        //   data,
        // });
        get_user_notifications();

        navigationRef?.current?.navigate('BottomTab', {
          screen: 'Notification',
        });
      }
    } else {
      if (data?.data?.type == 'chat') {
        getDetails();
        let prev_chatCount = Store.getState().userReducer.chatCount;
        Store.dispatch(setChatCount(prev_chatCount + 1));
      } else {
        get_user_notifications();
        let prev_notificationCount =
          Store.getState().userReducer.notificationCount;
        Store.dispatch(setNotificationCount(prev_notificationCount + 1));
      }
    }
  },
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);

//ADD this
if (Text.defaultProps == null) {
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}
