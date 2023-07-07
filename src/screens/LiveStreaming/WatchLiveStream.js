import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Keyboard,
  Switch,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {appImages} from '../../constant/images';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Header from '../../components/LiveStreaming/Header';
import CommentInput from '../../components/LiveStreaming/CommentInput';
import CommentsList from '../../components/LiveStreaming/CommentsList';
import ProductList from './ProductList';
import BottomTabs from '../../components/LiveStreaming/BottomTabs';
import LiveStreaming from '../LiveStreaming';
import ConfirmationModal from '../../components/LiveStreaming/ConfirmationModal';

import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
} from 'react-native-agora';
import {useFocusEffect} from '@react-navigation/native';

import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

import firestore from '@react-native-firebase/firestore';
import {get_Login_UserData, get_specific_user_detail} from '../../api/GetApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {async} from 'regenerator-runtime';
import moment from 'moment';
import ViewShot from 'react-native-view-shot';
import {
  addThumbnail,
  endStream,
  getStreamDetail,
  updateStreamViews,
} from '../../api/LiveStreamingApi';

const appId = '2103cc766ad141bf90843544931573d8';
// const channelName = "xyz";
// const token =
//   "0062103cc766ad141bf90843544931573d8IAB139ED8dXWCWJ+mjRaQrbGkRJDFIpBkWp/NLOaXjfZe2e6juvwa+luIgBdHQAA+LGNZAQAAQCIboxkAwCIboxkAgCIboxkBACIboxk";
// const uid = 94;

import AgoraUIKit from 'agora-rn-uikit';
import LiveStreamingKeys from '../../utills/LiveStreamingKeys';

import {doc, onSnapshot} from 'firebase/firestore';
import {fontFamily} from '../../constant/fonts';

const WatchLiveStream = ({navigation, route}) => {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {
    appId: appId,
    channel: 'Test',
  };
  const rtcCallbacks = {
    EndCall: () => setVideoCall(false),
  };

  const ref_ViewShot = useRef();
  const ref_CommentFlatList = useRef(null);
  const durationRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [showBottomView, setShowBottomView] = useState(true);
  const [comment, setComment] = useState('');
  const [isCommentFocused, setIsCommentFocused] = useState(false);

  const [user_id, setUser_id] = useState('');
  const [username, setUsername] = useState('');
  const [user_detail, setUser_detail] = useState('');
  const [user_profile, setUser_profile] = useState('');

  const [stream_id, setStream_id] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [hostId, setHostId] = useState('');
  const [channelName, setChannelName] = useState('');
  const [hostDetail, setHostDetail] = useState('');

  //to fix onSnapShot issue
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [viewersUpdate, setViewersUpdate] = useState(false);

  const [duration, setDuration] = useState(0);
  const [formatedDuration, setFormatedDuration] = useState('');

  const [commentsList, setCommentsList] = useState([
    // {
    //   id: 0,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 1,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
    // {
    //   id: 2,
    //   user_name: "John Doe",
    //   comment: "Sed consectetur vitae elit et ullamcorper",
    // },
  ]);
  const [productsList, setProductsList] = useState([
    // {
    //   id: 0,
    //   image: appImages.live_stream_bg,
    //   name: "Item Name",
    //   quantity: 20,
    //   price: 15,
    //   sold: false,
    // },
    // {
    //   id: 1,
    //   image: appImages.live_stream_bg,
    //   name: "Item Name",
    //   quantity: 20,
    //   price: 15,
    //   sold: true,
    // },
    // {
    //   id: 2,
    //   image: appImages.live_stream_bg,
    //   name: "Item Name",
    //   quantity: 20,
    //   price: 15,
    //   sold: false,
    // },
    // {
    //   id: 3,
    //   image: appImages.live_stream_bg,
    //   name: "Item Name",
    //   quantity: 20,
    //   price: 15,
    //   sold: false,
    // },
    // {
    //   id: 4,
    //   image: appImages.live_stream_bg,
    //   name: "Item Name",
    //   quantity: 20,
    //   price: 15,
    //   sold: false,
    // },
  ]);

  function secondsToHms(seconds) {
    let d = Number(seconds);

    if (d <= 0) {
      return '00:00:00';
    } else {
      let h = Math.floor(d / 3600);
      let m = Math.floor((d % 3600) / 60);
      let s = Math.floor((d % 3600) % 60);

      let hDisplay = h <= 9 ? '0' + h + ':' : h + ':';
      let mDisplay = m <= 9 ? '0' + m + ':' : m + ':';
      let sDisplay = s <= 9 ? '0' + s : s;
      let formateTime = hDisplay + mDisplay + sDisplay;
      setFormatedDuration(formateTime);
      return formateTime;
    }
  }

  const startDurationInterval = async isHost => {
    let currentSeconds = 0;

    if (!isHost) {
      let start_time = route?.params?.response?.stream[0]?.currentDateTime;

      let x = new Date();
      let y = new Date(start_time);
      let seconds = Math.abs(x - y) / 1000;
      console.log('seconds  :  ', seconds);
      currentSeconds = seconds;
    }

    let counter = currentSeconds ? currentSeconds : 0;
    durationRef.current = setInterval(() => {
      // setDuration((prevSequence) => prevSequence + 1);
      counter = counter + 1;
      let f = secondsToHms(counter);

      // setFormatedDuration(f);
    }, 1000);
  };

  const clearDurationInterval = async () => {
    const intervalId = durationRef.current;
    // also clear on component unmount
    clearInterval(intervalId);
  };

  useEffect(() => {
    const intervalId = durationRef.current;
    // also clear on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleAddComment = async comment => {
    let userName = username;

    let profile = user_profile;

    let userDetails = false;
    if (user_id?.length == 0) {
      userDetails = await get_specific_user_detail(user_id);

      userName = userDetails?.user_name;
      profile = userDetails?.image;
    }

    setComment('');
    let obj = {
      id: commentsList?.length,
      user_name: userName,
      comment: comment,
      profile: profile,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    addCommentToFirebase(obj);
    Keyboard.dismiss();
    // setTimeout(() => {
    //   let prevList = [...commentsList];
    //   let obj = {
    //     id: prevList?.length,
    //     user_name: "John Doe",
    //     comment: comment,
    //   };
    //   prevList.push(obj);
    //   setCommentsList(prevList);
    // }, 200);
  };

  useEffect(() => {
    const backAction = () => {
      setShowModal(true);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // ___________________________________________API functions ________________________________________________
  const updateViewsCount = async (id, count) => {
    updateStreamViews(id, count)
      .then(response => {
        // console.log('update views response :        ', response?.data);
      })
      .catch(err => {
        console.log('error  :   ', err);
      });
  };

  const endStreamApi = async (id, duration) => {
    endStream(id, duration)
      .then(response => {
        console.log('response  :  ', response?.data);
      })
      .catch(err => {
        console.log('Error in end stream  :   ', err);
      });
  };

  const getProductsAddedInStream = async streamId => {
    console.log('getProductsAddedInStream  ____________');
    getStreamDetail(streamId).then(response => {
      let list = response?.data?.stream ? response?.data?.stream : [];
      let listings = list[0]?.listing ? list[0]?.listing : [];
      setProductsList(listings);
    });
  };

  // _____________________________________________________FIREBASE_______________________________________________
  const addUserToFirebase = async (isHost, streamID) => {
    var user_id = await AsyncStorage.getItem('Userid');
    let userDetails = await get_specific_user_detail(user_id);

    if (userDetails) {
      setUser_id(user_id);
      setUsername(userDetails?.user_name ? userDetails?.user_name : '');
      setUser_profile(userDetails?.image ? userDetails?.image : '');

      let obj = {
        // ...userDetails,
        user_id: user_id,
        user_name: userDetails?.user_name ? userDetails?.user_name : '',
        profile: userDetails?.image ? userDetails?.image : '',
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      setViewersUpdate(!viewersUpdate);
      firestore()
        .collection('live_stream')
        .doc(streamID?.toString())
        .collection('users')
        .doc(user_id)
        .set(obj);
    } else {
      console.log(
        'user not found.....and added as viewer of stream in firebase',
      );
    }
  };

  //remove user when he/she will leave stream
  const removeUsrFromFirebase = async () => {
    var user_id = await AsyncStorage.getItem('Userid');
    let stream_id1 = route?.params?.response?.stream[0]?.insertedId;
    firestore()
      .collection('live_stream')
      .doc(stream_id1?.toString())
      .collection('users')
      .doc(user_id)
      .delete();
  };

  const addCommentToFirebase = obj => {
    setCommentUpdate(!commentUpdate);

    let stream_id1 = route?.params?.response?.stream[0]?.insertedId;

    firestore()
      .collection('live_stream')
      .doc(stream_id1?.toString())
      .collection('comments')
      .doc(new Date().getTime().toString())
      .set(obj);
  };

  useEffect(() => {
    const commentRef = firestore()
      .collection('live_stream')
      .doc(stream_id?.toString())
      .collection('comments');
    // .orderBy("createdAt", "asc");
    commentRef.onSnapshot(querySnap => {
      const allmsg = querySnap?.docs?.map(docsnap => {
        const data = docsnap.data();
        return data;
      });
      setCommentsList(allmsg);
    });
  }, [viewersUpdate, commentUpdate]);

  useEffect(() => {
    const usersRef = firestore()
      .collection('live_stream')
      .doc(stream_id?.toString())
      .collection('users')
      .orderBy('createdAt', 'desc');

    usersRef.onSnapshot(querySnap => {
      const allmsg = querySnap?.docs?.map(docsnap => {
        const data = docsnap.data();
        return data;
      });
      setViewersCount(allmsg?.length);
      updateViewsCount(stream_id?.toString(), allmsg.length);
    });
  }, [viewersUpdate]);

  useEffect(() => {
    const purchaseRef = firestore()
      .collection('live_stream')
      .doc(stream_id?.toString())
      .collection('last_purchase')
      .doc(stream_id?.toString());

    purchaseRef.onSnapshot(querySnap => {
      const allmsg = querySnap?.docs?.map(docsnap => {
        const data = docsnap.data();
        return data;
      });
      // console.log("new listing purchase......___________");
      getProductsAddedInStream(stream_id);
    });
  }, [viewersUpdate]);

  // _____________________________________________________FIREBASE_______________________________________________

  //   _______________________________________LIVE STREAM______________________________________________________________
  const agoraEngineRef = useRef(null); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(true); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user
  const [viewersCount, setViewersCount] = useState(0);

  function showMessage(msg) {
    setMessage(msg);
  }
  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };
  const AgoraEngine = useRef();

  //   useEffect(() => {
  //     // Initialize Agora engine when the app starts
  //     setupVideoSDKEngine();
  //     setIsHost(true);

  //     join();
  //   });

  useEffect(() => {
    if (route?.params?.response?.stream) {
      let stream_id1 = route?.params?.response?.stream[0]?.insertedId;

      setStream_id(stream_id1);
      let token = route?.params?.response?.stream[0]?.token;
      let channelName1 = route?.params?.response?.stream[0]?.channelName;
      let uid = parseInt(route?.params?.response?.stream[0]?.uid);

      // let token = LiveStreamingKeys.token;
      // let channelName1 = LiveStreamingKeys.channelName;
      // let uid = LiveStreamingKeys.uid;
      console.log('484 : ', uid);
      // setRemoteUid(uid);

      setTokenId(token);
      setHostId(uid);
      setChannelName(channelName1);
      setHostDetail(route?.params?.response?.user[0]);
      // setProductsList(route?.params?.response?.Listing);
      getProductsAddedInStream(stream_id1);
    } else {
      console.log('data not found');
    }
  }, [route?.params]);

  useFocusEffect(
    React.useCallback(() => {
      console.log(
        'route?.params?.nav_type_____________________________________ : ',
        route?.params?.nav_type,
      );
      // setRemoteUid(127);
      if (route?.params?.nav_type == 'after_payment') {
        console.log('after_payment______________________________');
      } else {
        console.log(
          'else executed............................................................',
        );
        // Initialize Agora engine when the app starts
        console.log('route?.params?.host : ', route?.params?.host);
        let host = route?.params?.host == false ? false : true;
        setupVideoSDKEngine(host);
        // isHost,token,channelName,uid
        if (route?.params?.response?.stream) {
          let stream_id1 = route?.params?.response?.stream[0]?.insertedId;
          setStream_id(stream_id1);
          let token = route?.params?.response?.stream[0]?.token;
          let channelName1 = route?.params?.response?.stream[0]?.channelName;
          let uid1 = parseInt(route?.params?.response?.stream[0]?.uid);
          console.log(
            '----------------------------------- +++++++++++++++++++++++++++++++:+++++++++++++++++++++++++++++++: ',
            route?.params?.response?.stream[0]?.uid,
            uid1,
          );
          // let token = LiveStreamingKeys.token;
          // let channelName1 = LiveStreamingKeys.channelName;
          // let uid = LiveStreamingKeys.uid;

          setChannelName(channelName1);
          console.log('527 : ', uid1);
          // setRemoteUid(uid1);
          setTokenId(token);
          setHostId(uid1);
          setTimeout(() => {
            setIsHost(host);
            join(host, token, channelName1, uid1);
          }, 400);
        } else {
          console.log('data not found');
        }
      }
    }, []),
  );

  const setupVideoSDKEngine = async host => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          // console.log(
          //   'Successfully joined the channel   ........',
          //   isJoined,
          //   isHost,
          //   remoteUid,
          // );
          setIsJoined(true);
          ///fsdfldkff
          // setIsHost(false);
          // setRemoteUid(route?.params?.response?.stream[0]?.uid);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          // console.log('Remote user joined with uid   ........');
          setRemoteUid(Uid);
          console.log('570 : ', Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          // console.log('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: LiveStreamingKeys.appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });

      agoraEngine.enableVideo();

      const Role = host
        ? ClientRoleType.ClientRoleBroadcaster
        : ClientRoleType.ClientRoleAudience;
      agoraEngine.setClientRole(Role);

      //   //   AgoraRTC.initWithConfig(config);
      //   agoraEngine.setVideoSource("camera"); // Use the camera as the video source
      //   // agoraEngine.setChannelProfile(0); // Set channel profile to live broadcasting
      //   // agoraEngine.setClientRole(1); // Set client role to broadcaster
      //   agoraEngine.enableVideo(); // Enable video
    } catch (e) {
      console.log('error : ', e);
    }
  };

  const addStreamStartTime = async stream_id => {
    firestore().collection('live_stream').doc(stream_id?.toString()).set(
      {
        startedAt: new Date(),
      },
      {merge: true},
    );
  };

  const addStreamEndTime = async () => {
    firestore().collection('live_stream').doc(stream_id?.toString()).set(
      {
        endedAt: new Date(),
      },
      {merge: true},
    );
  };

  const join = async (isHost, token, channelName, uid) => {
    // console.log('join called.....', isHost, token, channelName, uid);
    setIsHost(isHost);
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting,
      );
      let streamID = route?.params?.response?.stream[0]?.insertedId;
      // console.log({streamID, uid, isHost});
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
        addUserToFirebase(isHost, streamID);
        addStreamStartTime(streamID);
        startDurationInterval(0); //seconds
        handleSaveThumbnail();

        // console.log('join stream as host.......');
      } else {
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience,
        });
        // console.log('join stream as viewers.......');
        // console.log({channelName, uid});
        setTimeout(() => {
          startDurationInterval(isHost);
        }, 500);

        addUserToFirebase(isHost, streamID);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
      removeUsrFromFirebase();
      if (isHost) {
        addStreamEndTime();
        let stream_id1 = route?.params?.response?.stream[0]?.insertedId;
        let duration = formatedDuration;
        endStreamApi(stream_id1, duration);
      }
      clearDurationInterval();
      navigation?.goBack();
      console.log('You left the channel  :::::');
    } catch (e) {
      console.log(e);
    }
  };

  //   _______________________________________LIVE STREAM______________________________________________________________

  const handleSaveThumbnail = async () => {
    ref_ViewShot.current.capture().then(uri => {
      console.log('uri  :  ', uri);
      let stream_id1 = route?.params?.response?.stream[0]?.insertedId;
      addThumbnail(stream_id1, uri, '1')
        .then(response => {
          console.log('response  :  ', response?.data);
        })
        .catch(err => {
          console.log('Error : ', err);
        })
        .finally(() => {
          //console.log
        });
    });
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <ConfirmationModal
        visible={showModal}
        setVisible={setShowModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          leave();
        }}
      />
      {/* <ImageBackground source={appImages.live_stream_bg} style={{ flex: 1 }}> */}
      <ViewShot
        ref={ref_ViewShot}
        options={{
          fileName: 'Your-File-Name',
          format: 'jpg',
          quality: 0.9,
        }}
        style={{
          height: hp(100) + StatusBar.currentHeight,
          width: wp(100),
        }}>
        <View
          style={{
            paddingTop: StatusBar.currentHeight,
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              height: hp(100) + StatusBar.currentHeight,
              width: wp(100),
              position: 'absolute',
              paddingTop: 70,
              backgroundColor: '#000',
              //   alignItems: "center",
              justifyContent: 'center',
            }}>
            {/* <AgoraUIKit
              connectionData={connectionData}
              rtcCallbacks={rtcCallbacks}
            /> */}
            {isJoined && isHost ? (
              <React.Fragment key={0}>
                <RtcSurfaceView canvas={{uid: 0}} style={styles.videoView} />
                {/* <Text>Local user uid: {uid}</Text> */}
              </React.Fragment>
            ) : (
              <Text>
                {''}
                {/* {isHost ? "Join a channel" : ""} */}
              </Text>
            )}
            {isJoined && !isHost && remoteUid !== 0 ? (
              <React.Fragment key={remoteUid}>
                <RtcSurfaceView
                  canvas={{uid: remoteUid}}
                  style={{
                    ...styles.videoView,
                    // height: hp(80),
                    // width: wp(100),
                    // backgroundColor: "red",
                  }}
                />
                {/* <Text>Remote user uid: {remoteUid}</Text> */}
              </React.Fragment>
            ) : (
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  zIndex: 999,
                  textAlign: 'center',
                }}>
                {isJoined && !isHost ? 'Waiting for a remote user to join' : ''}
              </Text>
            )}
            {/* <Text style={styles.info}>{message}</Text> */}
          </View>

          <Header
            userName={hostDetail?.user_name}
            profile={hostDetail?.image}
            // userName={`${remoteUid} : ${hostDetail?.user_name}`}
            // totalViewers={"100k"}
            totalViewers={viewersCount}
            // duration={duration}
            duration={formatedDuration}
            onBackPress={() => setShowModal(true)}
          />
          {isHost && (
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                flexDirection: 'row',
                backgroundColor: '#FFFFFFB2',
                borderRadius: 15,
                paddingHorizontal: 5,
                alignItems: 'center',
                paddingVertical: 3,
                justifyContent: 'center',
                backgroundColor: 'red',
                width: 75,
                paddingVertical: 5,
                alignSelf: 'flex-end',
                marginRight: -8,
              }}>
              <Text
                style={{
                  color: '#0A0932',
                  fontSize: 10,
                  fontFamily: fontFamily.Poppins_Regular,
                  marginLeft: 4,
                  marginBottom: -2.5,
                  fontSize: 10,
                  color: 'white',
                }}>
                End Stream
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.bottomContainer}>
            {/* <View style={{ height: hp(70), justifyContent: "flex-end" }}>
            <ScrollView
              contentContainerStyle={{
                backgroundColor: "blue",
                height: hp(40),
                flexGrow: 1,
              }}
            > */}
            {showBottomView && (
              <View
                style={{
                  height: hp(40),
                  justifyContent: 'flex-end',
                }}>
                {selectedTab == 0 ? (
                  <CommentsList data={commentsList} />
                ) : (
                  <ProductList
                    data={productsList}
                    isHost={isHost}
                    streamId={stream_id}
                    response={route?.params?.response}
                  />
                )}
              </View>
            )}
            {/* </ScrollView> */}
            {/* </View> */}

            <BottomTabs
              selectedTab={selectedTab}
              onTabPress={value => {
                if (value == 2) {
                  setShowBottomView(!showBottomView);
                } else {
                  setSelectedTab(value);
                }
              }}
              showBottomView={showBottomView}
            />

            {/* <View
              style={{
                alignSelf: "center",
                marginBottom: 8,
              }}
            >
              <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </View> */}
            <CommentInput
              value={comment}
              onChangeValue={text => setComment(text)}
              onPress={text => comment?.length > 0 && handleAddComment(comment)}
            />
            <View
              style={{
                alignSelf: 'center',
                marginTop: 8,
                // marginBottom: -20,
                marginBottom: 9,
              }}>
              <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.BANNER}
                requestOptions={{
                  requestNonPersonalizedAdsOnly: true,
                }}
              />
            </View>
          </View>
        </View>
      </ViewShot>
      {/* </ImageBackground> */}
    </View>
  );
};

export default WatchLiveStream;

const styles = StyleSheet.create({
  bottomContainer: {
    height: hp(90),
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: {flex: 1, alignItems: 'center'},
  scroll: {flex: 1, backgroundColor: '#ddeeff', width: '100%'},
  scrollContainer: {alignItems: 'center'},
  videoView: {
    // width: wp(100),
    // height: hp(100) + 200,
    // backgroundColor: "red",

    height: hp(100) + StatusBar.currentHeight,
    width: wp(100),
    position: 'absolute',
    paddingTop: 70,
    backgroundColor: 'pink',
  },
  btnContainer: {flexDirection: 'row', justifyContent: 'center'},
  head: {fontSize: 12, marginVertical: 18, color: 'gray'},
  info: {backgroundColor: '#ffffe0', paddingHorizontal: 8, color: '#0000ff'},
});
