// import { StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import { GiftedChat } from "react-native-gifted-chat";
// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   return (
//     <GiftedChat
//       messages={messages}
//       // onSend={messages => onSend(messages)}
//       user={{
//         _id: 1,
//       }}
//     />
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({});

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Image,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

///////////////import app components/////////////
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";

//////////////////app icons////////////////
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

////////////////app styles/////////////////////
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////app pakages//////////////////
import ImagePicker from "react-native-image-crop-picker";

//////////////app components///////////////////
import ChatHeader from "../../../components/Chat/ChatHeader";

///////////////////app Packages//////////////
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
} from "react-native-gifted-chat";

//////////////furestore/////////////
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

import uuid from "react-native-uuid";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setChatCount,
  setChatList,
  setExchangeOffer_MyListing,
  setExchangeOffer_OtherListing,
} from "../../../redux/actions";

//////////////////////////app api/////////////////////////
import axios from "axios";
import {
  BASE_URL,
  firebase_server_key,
  IMAGE_URL,
} from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////app images///////////////
import { appImages } from "../../../constant/images";
import Colors from "../../../utills/Colors";

////////////////api function////////////
import { post_User_Chat_Room } from "../../../api/ChatApis";

/////////////////////get api function////////////
import {
  get_Login_UserData,
  get_Other_UserData,
  get_specific_user_detail,
} from "../../../api/GetApis";

import { useFocusEffect, useIsFocused } from "@react-navigation/native";

import BlockUserView from "../../../components/BlockUserView";
import { get_user_status } from "../../../api/GetApis";
import TranslationStrings from "../../../utills/TranslationStrings";
import PushNotification from "react-native-push-notification";

const ChatScreen = ({ route, navigation }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { chatCount, chatList } = useSelector((state) => state.userReducer);

  ////////////////redux/////////////
  const { exchange_other_listing, exchange_my_listing, user_image } =
    useSelector((state) => state.userReducer);

  const [navType, setNavType] = useState("");

  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  // const formattedLikes = formatter.format(props.pricetext);

  ////////////previos data//////////
  const [predata] = useState(route.params);

  const [showBlockModal, setShowBlockModal] = useState(false);

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();

  /////////////////create room chat//////////
  const Chat_Room = (props) => {
    post_User_Chat_Room(props).then((response) => {});
  };

  //////////////chat states/////////////
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  /////////////login user//////////
  const [login_user, setLoginUser] = useState("");
  const [login_user_details, setLogin_user_details] = useState("");
  const [receiverDetails, setReceiverDetails] = useState("");
  const [receiver_FCM_TOKEN, setReceiver_FCM_TOKEN] = useState("");

  /////////get login user//////////
  const getUserMessages = async () => {
    var user = await AsyncStorage.getItem("Userid");
    setLoginUser(user);
  };
  const getUserDetails = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let login_user = await get_Login_UserData();
        // console.log("login user details : ", login_user?.data);
        setLogin_user_details(login_user);
        // setLogin_user_details(login_user);
        // let receiver_id =
        //   route?.params?.navtype == "counter_offer"
        //     ? route?.params?.buyer_id
        //     : route.params.userid;
        // console.log("receiver id to find receiver details  :  ", receiver_id);
        // let user_details = await get_specific_user_detail(receiver_id);
        // console.log("receiver details find  :  ", user_details);
        // setReceiverDetails(user_details);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const AllMessages = async () => {
    var user = await AsyncStorage.getItem("Userid");
    const doc_id =
      route.params.userid > user
        ? user + "-" + route.params.userid
        : route.params.userid + "-" + user;

    console.log("doc_id  :  ", doc_id);

    const messageRef = firestore()
      .collection("chats")
      .doc(doc_id)
      .collection("messages")
      .orderBy("createdAt", "desc");

    messageRef.onSnapshot((querySnap) => {
      const allmsg = querySnap?.docs?.map((docsnap) => {
        const data = docsnap.data();
        if (data.createdAt) {
          return {
            ...docsnap.data(),
            createdAt: docsnap.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docsnap.data(),
            createdAt: new Date(),
          };
        }
      });
      setCount(count + 1);
      setMessages(allmsg);
    });
  };
  const ref = useRef();
  /////////////user data states/////////////
  const [username, setUsername] = useState("");
  const [userimage, setImage] = useState("");
  const GetUserData = async () => {
    get_Other_UserData(route.params.userid).then((response) => {
      setUsername(response.data.full_name);
      setImage(response.data.image);
      //AllMessages();

      setReceiver_FCM_TOKEN(response?.data?.fcm);
    });
  };

  const [count, setCount] = useState(0);
  const countfunc = () => {
    if (count === 0) {
      setCount(count + 1),
        onSend(),
        setExchangeOffer_OtherListing(""),
        setExchangeOffer_MyListing("");
    }
  };

  // useEffect(() => {
  //   console.log("reotue____________________________________________");
  // }, [route?.params]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getData = async () => {
  //       await getUserDetails();
  //     };
  //     getData();
  //   }, [])
  // );

  useEffect(() => {
    // setNavType(route?.params?.navtype);
    // GetUserData();
    // getUserMessages();
    // AllMessages();

    // console.log("count_______________________________", count);
    // return;

    // getUserDetails();
    if (
      route?.params?.navtype == "chatlist" ||
      typeof route?.params?.navtype == "undefined"
    ) {
      console.log("if called  ...........");
      GetUserData();
      getUserMessages();
      AllMessages();
    } else {
      // if (route?.params?.navtype == "counter_offer") {
      //   console.log(
      //     "+++++++++++++++++++++++++++++++++++++counter offer called................................."
      //   );
      //   setCount(count + 1),
      //     setC(count + 1),
      //     onSend(),
      //     setExchangeOffer_OtherListing(""),
      //     setExchangeOffer_MyListing("");
      // } else

      if (count === 0) {
        console.log("count is 0 now_____________________________________");
        setCount(count + 1),
          onSend(),
          setExchangeOffer_OtherListing(""),
          setExchangeOffer_MyListing("");
      }
      GetUserData();
      getUserMessages();
    }
    // console.log("useEffect called.........");
    requestCameraPermission();
  }, [isFocused]);

  // const onSend = useCallback((messages = []) => {
  //   setCount(count + 1);
  //   console.log("onSend called....");
  //   console.log("count :   ", count);
  //   // return;
  //   handleSend(messages);
  //   Chat_Room(route.params.userid);
  // }, []);

  const onSend = (messages) => {
    setCount(count + 1);
    console.log("onSend called....");
    console.log("count :   ", count);
    // return;
    handleSend(messages);
    Chat_Room(route.params.userid);
  };

  useFocusEffect(
    React.useCallback(() => {
      updateUnreadMessages();
    }, [])
  );

  const updateUnreadMessages = async () => {
    try {
      var user = await AsyncStorage.getItem("Userid");
      let docid = "";
      if (route?.params?.navtype == "counter_offer") {
        // console.log("route?.params ::::::::: : :: : : : :: :  ", route?.params);
        docid =
          route.params.buyer_id > user
            ? user + "-" + route.params.buyer_id
            : route.params.buyer_id + "-" + user;
      } else {
        docid =
          route.params.userid > user
            ? user + "-" + route.params.userid
            : route.params.userid + "-" + user;
      }
      let updated = false;
      const messagesList = firestore()
        .collection("chats")
        .doc(docid)
        .collection("messages");
      // console.log("ORDER_ITEMS  :  ", ORDER_ITEMS);
      messagesList
        .where("read", "==", false)
        .get()
        .then((snapshots) => {
          if (snapshots.size > 0) {
            snapshots.forEach((message) => {
              if (message?._data?.user?._id != user) {
                messagesList.doc(message?.id).update({
                  read: true,
                });

                if (!updated) {
                  dispatch(setChatCount(0));
                  let prevChatList = chatList;
                  const newData = prevChatList?.map((item) => {
                    if (item?.user?.id == message?._data?.user?._id) {
                      return {
                        ...item,
                        count: 0,
                      };
                    } else {
                      return {
                        ...item,
                      };
                    }
                  });
                  dispatch(setChatList(newData));

                  updated = true;
                } else {
                  // console.log("else not updated....", updated);
                }
              } else {
                // console.log("else called......");
              }
            });
          }
        });
    } catch (error) {}
  };

  const handleSend = async (messageArray) => {
    console.log("messageArray  :  ", messageArray);
    let user_status = await AsyncStorage.getItem("account_status");
    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    var user = await AsyncStorage.getItem("Userid");
    let docid = "";
    if (route?.params?.navtype == "counter_offer") {
      // console.log("route?.params ::::::::: : :: : : : :: :  ", route?.params);
      docid =
        route.params.buyer_id > user
          ? user + "-" + route.params.buyer_id
          : route.params.buyer_id + "-" + user;
    } else {
      docid =
        route.params.userid > user
          ? user + "-" + route.params.userid
          : route.params.userid + "-" + user;
    }

    // return;
    let myMsg = null;
    // var count = 0;
    // if (imageUrl !== "") {
    //   const msg = messageArray[0];
    //   myMsg = {
    //     ...msg,
    //     //text: "price hree",
    //     senderId: user,
    //     receiverId: route.params.userid,
    //     image: imageUrl,
    //     user: {
    //       _id: user,
    //       name: "ali",
    //     },
    //   };
    // } else {
    const msg = messageArray ? messageArray[0] : null;

    if (route?.params?.navtype == "counter_offer" && count === 0) {
      console.log("counter_offer....");
      myMsg = {
        ...msg,
        _id: uuid.v4(),
        textimg1: route?.params?.listing_image,
        textprice: route.params.item_price,
        offerprice: route.params.offerprice,
        offerid: route.params.offerid,
        type: "counter_offer",
        text: "counter_offer", //added....
        senderId: user,
        // receiverId: route.params.userid,
        receiverId: route.params.buyer_id,
        buyer_id: route?.params?.buyer_id,
        sale_by: route?.params?.sale_by,
        listing_id: route?.params?.listing_id,
        read: false,
        user: {
          _id: user,
          name: "ali",
        },
      };
    } else if (route.params.navtype === "price_offer" && count === 0) {
      console.log("price offer ....");
      myMsg = {
        ...msg,
        _id: uuid.v4(),
        textimg1: exchange_other_listing.images[0],
        textprice: route.params.item_price,
        offerprice: route.params.offerprice,
        offerid: route.params.offerid,
        type: "price_offer",
        text: "price_offer", //added....
        senderId: user,
        receiverId: route.params.userid,
        buyer_id: route?.params?.buyer_id,
        sale_by: route?.params?.sale_by,
        listing_id: route?.params?.listing_id,
        read: false,
        user: {
          _id: user,
          name: "ali",
        },
      };
    } else if (route.params.navtype === "exchange_offer" && count === 0) {
      console.log("exchange offer ....");
      myMsg = {
        ...msg,
        _id: uuid.v4(),
        text: "exchange_offer",
        textimg1: exchange_my_listing.images[0],
        textimg2: exchange_other_listing.images[0],
        textprice1: route.params.itemprice1,
        textprice2: route.params.itemprice2,
        itemname1: route.params.item1,
        itemname2: route.params.item2,
        offerId: route.params.offerId,
        offer_detail: route.params.offer_detail,
        type: "exchange_offer",
        senderId: user,
        receiverId: route.params.userid,
        read: false,
        user: {
          _id: user,
          name: "ali",
        },
        count: 1,
      };
    } else if (route.params.navtype === "chatlist" && user_image === "") {
      console.log("chatlist offer ....");
      myMsg = {
        ...msg,
        _id: uuid.v4(),
        type: "simple_text",
        senderId: user,
        receiverId: route.params.userid,
        read: false,
        user: {
          _id: user,
          name: "ali",
        },
      };
    } else if (route.params.navtype === "chatlist") {
      console.log("chatlist 2....");
      myMsg = {
        ...msg,
        _id: uuid.v4(),
        text_image: user_image,
        type: "image_text",
        senderId: user,
        receiverId: route.params.userid,
        read: false,
        user: {
          _id: user,
          name: "ali",
        },
      };
    } else {
      console.log("last else ....");
      myMsg = {
        ...msg,
        _id: uuid.v4(),
        text_image: "image",
        //type: "image_text",
        senderId: user,
        receiverId: route.params.userid,
        read: false,
        user: {
          _id: user,
          name: "ali",
        },
      };
    }

    // console.log("myMsg  :  ", myMsg);
    // return;

    // console.log("myMsg  ___________________________", myMsg);
    // return;

    setExchangeOffer_MyListing("");
    setExchangeOffer_OtherListing("");
    setCount(count + 1);
    //countfunc()
    setMessages([]);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, myMsg)
    );

    firestore()
      .collection("chats")
      .doc(docid)
      .collection("messages")
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    // .finally(() => {
    //   if (route?.params?.navtype == "counter_offer") {
    //     route.params.navtype = null;
    //     console.log(
    //       "parms is null now+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    //     );
    //   }
    // });

    //remove navtype from route params

    messages.forEach((message) => {});
    // myMsg = "";
    setCount(count + 1);
    AllMessages();
    setImageUrl("");
    setImageData(null);

    // ________________________________hadnle push notification _ __________________________________

    let user_detail = await get_specific_user_detail(myMsg.receiverId);
    // let user_detail = receiverDetails;
    let login_user = await get_Login_UserData();
    // let login_user = login_user_details;
    let receiver_fcm = user_detail ? user_detail.fcm : null;
    //not
    //price_offer
    //exchange_offer
    if (receiver_fcm) {
      let description = "";
      if (myMsg?.type == "counter_offer") {
        description = "sended an counter offer";
      } else if (myMsg?.type == "price_offer") {
        description = "sended a price offer";
        return;
      } else if (myMsg?.type == "exchange_offer") {
        description = "sended an exchange offer";
        return;
      } else if (myMsg?.text_image == "image") {
        description = "sended a photo";
      } else {
        description = myMsg?.text ? myMsg?.text : "sended a message";
      }
      console.log("description : ", description);
      let body = {
        to: receiver_fcm,
        notification: {
          title: login_user?.data?.user_name,
          body: description,
          // mutable_content: true,
          sound: "default",
        },
        data: {
          user_id: user,
          type: "chat",
        },
      };
      console.log("push notification bodyd :   ", body);
      if (description) {
        sendPushNotification(receiver_fcm, body);
      }
    } else {
      console.log("receiver_fcm not found : ", user_detail);
    }

    // ________________________________hadnle push notification _ __________________________________
  };

  const sendPushNotification = async (recevierFCMToken, body) => {
    console.log("notification body : m ", body);
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${firebase_server_key}`,
      },
      body: JSON.stringify(body),
    };

    fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let res = JSON.parse(response);
        console.log("push notification response :  ", res);
      })
      .catch((err) => {
        console.log("error :  ", err);
      });
  };
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      setImageData(image.path);
      //uplaodImage(image)
      handleImageUpload(
        image.path.substring(image.path.lastIndexOf("/") + 1),
        image.path
      );
    });
  };

  const handleStoreImage = async (image) => {
    var user = await AsyncStorage.getItem("Userid");
    const docid =
      route.params.userid > user
        ? user + "-" + route.params.userid
        : route.params.userid + "-" + user;
    let msgObj = {
      _id: uuid.v4(),
      text_image: "image",
      //type: "image_text",
      type: "image",
      text: image,
      url: image,
      senderId: user,
      receiverId: route.params.userid,
      read: false,
      user: {
        _id: user,
        name: "ali",
      },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, msgObj)
    );
    firestore()
      .collection("chats")
      .doc(docid)
      .collection("messages")
      .add({
        ...msgObj,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    console.log("msgobj : ", msgObj);

    let user_detail = await get_specific_user_detail(msgObj.receiverId);
    // let user_detail = receiverDetails;
    let login_user = await get_Login_UserData();
    // let login_user = login_user_details;
    let receiver_fcm = user_detail ? user_detail.fcm : null;
    if (receiver_fcm) {
      let description = "sended a photo";
      let body = {
        to: receiver_fcm,
        notification: {
          title: login_user?.data?.user_name,
          body: description,
          // mutable_content: true,
          sound: "default",
        },
        data: {
          user_id: user,
          type: "chat",
        },
      };
      console.log("push notification bodyd :   ", body);
      sendPushNotification(receiver_fcm, body);
    } else {
      console.log("receiver_fcm not found : ", user_detail);
    }
  };

  const handleImageUpload = useCallback(async (fileName, filePath) => {
    try {
      if (!fileName) return;
      // let fileName = file?.path?.split('/').pop();

      const uploadTask = storage().ref().child(fileName).putFile(filePath);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const progress = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          // );
        },
        (error) => {
          // alert(error);
        },
        async () => {
          const url = await storage().ref(fileName).getDownloadURL();

          setImageUrl(url);
          //onSend(message)
          //handleSend(message, url, );
        }
      );
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const handleCounterOfferPress = async (props) => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    navigation.navigate("CounterOffer", {
      sale_by: props.currentMessage.sale_by,
      buyer_id: props.currentMessage.buyer_id,
      offer_type: props.currentMessage.type,
      receiverId: props.currentMessage.receiverId,
      senderId: props.currentMessage.senderId,
      listing_id: props.currentMessage.listing_id,

      item_img: props.currentMessage.textimg1,
      offer_price: props.currentMessage.offerprice,
      offerid: props.currentMessage.offerid,
      itemprice: props.currentMessage.textprice,
      navtype: "chat",
      userid: props.currentMessage.receiverId,
      type: "view",
      // userid: route.params.userid,
    });
  };

  const handlePriceOfferPress = async (props) => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }
    navigation.navigate("PriceOfferNoti", {
      sale_by: props.currentMessage.sale_by,
      buyer_id: props.currentMessage.buyer_id,
      offer_type: props.currentMessage.type,
      receiverId: props.currentMessage.receiverId,
      senderId: props.currentMessage.senderId,
      listing_id: props.currentMessage.listing_id,

      item_img: props.currentMessage.textimg1,
      offer_price: props.currentMessage.offerprice,
      offerid: props.currentMessage.offerid,
      itemprice: props.currentMessage.textprice,
      navtype: "chat",
      userid: props.currentMessage.receiverId,
      // userid: route.params.userid,
    });
  };

  const renderComposer = (composerProps) => {
    return (
      <Composer
        {...composerProps}
        placeholder={TranslationStrings.TYPE_A_MESSAGE}
        // Add any additional props or styles you want to customize
      />
    );
  };

  const CustomInputToolbar = (props) => {
    return (
      <View
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          bottom: hp(3),
          height: hp(10),
          borderWidth: hp(0.1),
          paddingBottom: hp(3),
          borderColor: Colors.inactivetextinput,
          borderTopRightRadius: wp(3),
          borderTopLeftRadius: wp(3),
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        {/* <View
          style={{
            backgroundColor: "red",
            position: "absolute",
            top: 0,
            left: wp(2),
            width: "100%",
          }}
        > */}
        <InputToolbar
          {...props}
          // renderComposer={renderComposer}
          // renderComposer={(composerProps) => (
          //   <InputToolbar {...composerProps} />
          // )}
          containerStyle={{
            //   backgroundColor: 'red',
            height: hp(7),
            borderColor: "#ccc",
            borderTopColor: "#ccc",
            borderWidth: 0.3,
            borderRadius: wp(5),
            marginLeft: wp(5),
            width: wp(76),
            position: "absolute",
            top: 0,
            left: wp(2),
            bottom: hp(0),
            marginTop: hp(1),
            paddingLeft: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
          textInputStyle={{ color: "black" }}
          // renderComposer={(props) => (
          //   <Composer
          //     {...props}
          //     textInputProps={{
          //       value:
          //         route.params.navtype === "price_offer"
          //           ? "Price Offer"
          //           : route.params.navtype === "exchange_offer"
          //           ? "Exchange Offer"
          //           : "",
          //     }}
          //   />
          // )}
        />
        {/* <TouchableOpacity onPress={()=> choosePhotoFromLibrary()}> */}
        <View style={{ position: "absolute", top: hp(3), left: 30 }}>
          <MaterialCommunityIcons
            name={"camera"}
            size={25}
            color={"black"}
            onPress={async () => {
              let user_status = await AsyncStorage.getItem("account_status");

              if (user_status == "block") {
                setShowBlockModal(true);
                return;
              }
              refRBSheet.current.open();
            }}
          />
        </View>
        {/* </TouchableOpacity> */}

        {/* </View> */}
      </View>
    );
  };

  const SendComponent = (props) => {
    return (
      <Send
        {...props}
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: hp(6),
          width: wp(12),
          borderRadius: wp(10),
          position: "absolute",
          bottom: hp(0),
          right: -wp(13.5),
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View
          style={
            {
              // justifyContent: "center",
              // alignItems: "center",
              // height: hp(6),
              // width: wp(12),
              // borderRadius: wp(10),
              // position: "absolute",
              // bottom: hp(0),
              // left: wp(2),
              // backgroundColor: "white",
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 2,
              // },
              // shadowOpacity: 0.25,
              // shadowRadius: 3.84,
              // elevation: 5,
            }
          }
        >
          <Image
            source={appImages.sendicon}
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
            }}
          />
        </View>
      </Send>
    );
  };
  const CustomBubbleText = (props) => {
    return (
      <View>
        {props.currentMessage.type === "counter_offer" ? (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.p_mainview}
            onPress={() => {
              handleCounterOfferPress(props);
            }}
          >
            <Image
              source={{ uri: IMAGE_URL + props.currentMessage.textimg1 }}
              style={styles.p_image}
              resizeMode="cover"
            />
            <View style={{}}>
              <Text style={styles.p_text}>
                {/* {"Item Price " + props.currentMessage.textprice} */}
                {TranslationStrings.ITEM_PRICE} : $
                {props.currentMessage.textprice
                  ? formatter.format(props.currentMessage.textprice)
                  : props.currentMessage.textprice}
              </Text>
              <Text style={styles.p_text}>
                {/* {"Offer Price " + props.currentMessage.offerprice} */}
                {TranslationStrings.OFFER_PRICE} : $
                {props.currentMessage.offerprice
                  ? formatter.format(props.currentMessage.offerprice)
                  : props.currentMessage.offerprice}
              </Text>
            </View>
          </TouchableOpacity>
        ) : props.currentMessage.type === "price_offer" ? (
          <TouchableOpacity
            onPress={() => {
              // console.log(
              //   "props.currentMessage.sale_by  :_____________________________________________  ",
              //   props.currentMessage.sale_by
              // );
              handlePriceOfferPress(props);
            }}
            style={styles.p_mainview}
          >
            <Image
              source={{ uri: IMAGE_URL + props.currentMessage.textimg1 }}
              style={styles.p_image}
              resizeMode="cover"
            />
            <View style={{}}>
              <Text style={styles.p_text}>
                {/* {"Item Price " + props.currentMessage.textprice} */}
                {TranslationStrings.ITEM_PRICE} : $
                {props.currentMessage.textprice
                  ? formatter.format(props.currentMessage.textprice)
                  : props.currentMessage.textprice}
              </Text>
              <Text style={styles.p_text}>
                {/* {"Offer Price " + props.currentMessage.offerprice} */}
                {TranslationStrings.OFFER_PRICE} : $
                {props.currentMessage.offerprice
                  ? formatter.format(props.currentMessage.offerprice)
                  : props.currentMessage.offerprice}
              </Text>
            </View>
          </TouchableOpacity>
        ) : props.currentMessage.type === "exchange_offer" ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("ExchangeNoti", {
                item_img1: props.currentMessage.textimg1,
                item_img2: props.currentMessage.textimg2,
                itemname1: props.currentMessage.itemname1,
                itemname2: props.currentMessage.itemname2,
                itemprice1: props.currentMessage.textprice1,
                itemprice2: props.currentMessage.textprice2,
                navtype: "chat",
                userid: props.currentMessage.receiverId,
                receiverId: props.currentMessage.receiverId,
                senderId: props.currentMessage.senderId,
                offerId: props.currentMessage.offerId,
                offer_detail: props.currentMessage.offer_detail,
              });
            }}
          >
            <View style={styles.e_mainview}>
              <View style={styles.e_itemview}>
                <Image
                  source={{ uri: IMAGE_URL + props.currentMessage.textimg1 }}
                  style={styles.e_image}
                  resizeMode="contain"
                />
                <Text style={styles.e_text}>
                  {props.currentMessage.itemname1}
                </Text>
                <Text style={styles.e_text}>
                  {/* {props.currentMessage.textprice1} */}$
                  {props.currentMessage.textprice1
                    ? formatter.format(props.currentMessage.textprice1)
                    : props.currentMessage.textprice1}
                </Text>
              </View>

              <MaterialCommunityIcons
                name={"swap-horizontal-bold"}
                size={30}
                color={"white"}
                //onPress={() => navigation.toggleDrawer()}
              />
              <View style={styles.e_itemview}>
                <Image
                  source={{ uri: IMAGE_URL + props.currentMessage.textimg2 }}
                  style={styles.e_image}
                  resizeMode="contain"
                />
                <Text
                  style={styles.e_text}
                  // onPress={() =>
                  //   navigation.navigate("ExchangeNoti", {
                  //     item_img1: props.currentMessage.textimg1,
                  //     item_img2: props.currentMessage.textimg2,
                  //     itemname1: props.currentMessage.itemname1,
                  //     itemname2: props.currentMessage.itemname2,
                  //     itemprice1: props.currentMessage.textprice1,
                  //     itemprice2: props.currentMessage.textprice2,
                  //     navtype: "chat",
                  //     userid: props.currentMessage.receiverId,
                  //   })
                  // }
                >
                  {props.currentMessage.itemname2}
                </Text>
                <Text
                  style={styles.e_text}
                  // onPress={() =>
                  //   navigation.navigate("ExchangeNoti", {
                  //     item_img1: props.currentMessage.textimg1,
                  //     item_img2: props.currentMessage.textimg2,
                  //     itemname1: props.currentMessage.itemname1,
                  //     itemname2: props.currentMessage.itemname2,
                  //     itemprice1: props.currentMessage.textprice1,
                  //     itemprice2: props.currentMessage.textprice2,
                  //     navtype: "chat",
                  //     userid: props.currentMessage.receiverId,
                  //   })
                  // }
                >
                  {/* {props.currentMessage.textprice2} */}$
                  {props.currentMessage.textprice2
                    ? formatter.format(props.currentMessage.textprice2)
                    : props.currentMessage.textprice2}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : props.currentMessage.type === "image" ? (
          <Image
            source={{ uri: IMAGE_URL + props?.currentMessage?.url }}
            style={{
              height: 150,
              width: 150,
              resizeMode: "contain",
            }}
          />
        ) : (
          <Text
            style={{
              color: "#fff",
              paddingHorizontal: wp(1),
              paddingVertical: 0,
              //fontWeight: "bold",
            }}
          >
            {props.currentMessage.text}
          </Text>
        )}
      </View>
    );
  };
  const [composerValue, setComposerValue] = useState("Hello world");

  // useEffect(() => {
  //   // Save the default value to the database
  //   //onSend(composerValue);
  // }, []);

  function saveComposerValueToDatabase(value) {
    // Save the value to the database
  }

  return (
    <SafeAreaView style={styles.container}>
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />

      <ChatHeader
        onPress={() => {}}
        username={username}
        picture={{ uri: IMAGE_URL + userimage }}
        onlineStatus={TranslationStrings.ONLINE}
        viewstate={true}
      />

      <GiftedChat
        // placeholder={TranslationStrings.TYPE_A_MESSAGE}
        alwaysShowSend
        // isKeyboardInternallyHandled={true}
        renderInputToolbar={(props) => {
          return <CustomInputToolbar {...props} />;
        }}
        renderSend={(props) => {
          return <SendComponent {...props} />;
        }}
        messagesContainerStyle={{
          paddingBottom: 25,
        }}
        messages={messages}
        onSend={(text) => {
          onSend(text);
        }}
        user={{
          _id: predata.userid,
        }}
        custontext={{}}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  color: Colors.Appthemecolor,
                  backgroundColor:
                    props.currentMessage.text != ""
                      ? Colors.Appthemecolor
                      : "orange",
                  // width: props.currentMessage.text != "" ? wp(80) : wp(70),
                  marginBottom: hp(1.2),
                  paddingTop: hp(2),
                  paddingHorizontal: wp(3),
                },
                left: {
                  color: Colors.Appthemecolor,
                  backgroundColor:
                    props.currentMessage.text != ""
                      ? Colors.inactivetextinput
                      : "orange",
                  //width: props.currentMessage.text != "" ? wp(80) : wp(70),
                  marginBottom: hp(1.2),
                  paddingTop: hp(1),
                  paddingHorizontal: wp(2),
                },
              }}
            />
          );
        }}
        renderMessageText={(props) => {
          return <CustomBubbleText {...props} />;
        }}
      />

      <CamerBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={"From Gallery"}
        type={"Chat_image"}
        onImageUpload={(uploaded_url) => {
          console.log("camera pressed", uploaded_url);
          handleStoreImage(uploaded_url);
        }}
        // onGalleryPress={() => {
        //   console.log("gallery pressed");
        // }}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
