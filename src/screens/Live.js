import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import ZegoUIKitPrebuiltLiveStreaming, {
//   HOST_DEFAULT_CONFIG,
// } from "@zegocloud/zego-uikit-prebuilt-live-streaming-rn";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CustomButtonhere from "../components/Button/CustomButton";

const Live = ({ navigation }) => {
  let userId = String(Math.floor(Math.random() * 100000));
  let liveId = String(Math.floor(Math.random() * 10000));

  console.log("liveId : ", liveId);
  console.log("userId : ", userId);
  return (
    <View style={{ height: hp(100), width: wp(100) }}>
      <CustomButtonhere
        title={"Start Live"}
        widthset={80}
        topDistance={6}
        onPress={() => {
          navigation.navigate("HostPage");
        }}
      />

      <CustomButtonhere
        title={"Watch Live"}
        widthset={80}
        topDistance={16}
        onPress={() => {
          navigation.navigate("AudiencePage");
        }}
      />
      {/* <ZegoUIKitPrebuiltLiveStreaming
        appID={1996592425}
        appSign={
          "a1ed9aefd5c36e06d33aad00b21b4d9f171ebc010f013a33572e5458e968fdfa"
        }
        userID={userId}
        userName={"userName"}
        liveID={liveId}
        config={{
          ...HOST_DEFAULT_CONFIG,
          onLeaveLiveStreaming: () => {
            console.log("stream leaved.....");
          },
        }}
      /> */}
    </View>
  );
};

export default Live;

// export default function LiveStreamingPage(props) {
//   const hostConfig = zegoGetHostConfig(ROLE_HOST);
//   return (
//       <View style={styles.container}>
//           <ZegoUIKitPrebuiltLiveStreaming
//               appID={yourAppID}
//               appSign={yourAppSign}
//               userID={user.userID}
//               userName={user.userName}
//               liveID={liveID}
//               config={hostConfig}
//           />
//       </View>
//   );
// }

// const engine = await ZegoExpressEngine.createEngine(yourAppID, yourAppSign, false, ZegoScenario.General);
// await engine.loginRoom(roomID, {user.userID, user.userName}, config);
// await engine.startPublishingStream(streamID, ZegoPublishChannel.Main, config);
// await engine.startPlayingStream(streamID, new ZegoView(reactTag, viewMode, backgroundColor), config);
// await engine.logoutRoom(roomID);

const styles = StyleSheet.create({});

// import React, { useRef, useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Switch,
// } from "react-native";
// import { PermissionsAndroid, Platform } from "react-native";
// import {
//   ClientRoleType,
//   createAgoraRtcEngine,
//   IRtcEngine,
//   RtcSurfaceView,
//   ChannelProfileType,
// } from "react-native-agora";

// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP as wp,
// } from "react-native-responsive-screen";

// const appId = "2103cc766ad141bf90843544931573d8";
// const channelName = "Test";
// const token =
//   "007eJxTYPjNrvGfR+LH9o99hyKbWC2Dt/fts9ujUjXl34zL6TUXm/4rMBgZGhgnJ5ubmSWmGJoYJqVZGliYGJuamFgaG5qaG6dYFHl1pDQEMjK8PPWAmZEBAkF8FoaQ1OISBgYAuIAhEA==";
// const uid = 0;

// const Live = () => {
//   const agoraEngineRef = useRef(null); // Agora engine instance
//   const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
//   const [isHost, setIsHost] = useState(true); // Client role
//   const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
//   const [message, setMessage] = useState(""); // Message to the user

//   function showMessage(msg) {
//     setMessage(msg);
//   }
//   const getPermission = async () => {
//     if (Platform.OS === "android") {
//       await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//       ]);
//     }
//   };
//   const AgoraEngine = useRef();
//   useEffect(() => {
//     // Initialize Agora engine when the app starts
//     setupVideoSDKEngine();
//   });

//   const setupVideoSDKEngine = async () => {
//     try {
//       // use the helper function to get permissions
//       if (Platform.OS === "android") {
//         await getPermission();
//       }
//       agoraEngineRef.current = createAgoraRtcEngine();
//       const agoraEngine = agoraEngineRef.current;

//       agoraEngine.registerEventHandler({
//         onJoinChannelSuccess: () => {
//           showMessage("Successfully joined the channel " + channelName);
//           setIsJoined(true);
//         },
//         onUserJoined: (_connection, Uid) => {
//           showMessage("Remote user joined with uid " + Uid);
//           setRemoteUid(Uid);
//         },
//         onUserOffline: (_connection, Uid) => {
//           showMessage("Remote user left the channel. uid: " + Uid);
//           setRemoteUid(0);
//         },
//       });
//       agoraEngine.initialize({
//         appId: appId,
//         channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
//       });

//       agoraEngine.enableVideo();
//     } catch (e) {
//       console.log("error : ", e);
//     }
//   };

//   const join = async () => {
//     console.log("join called.....");
//     if (isJoined) {
//       return;
//     }
//     try {
//       agoraEngineRef.current?.setChannelProfile(
//         ChannelProfileType.ChannelProfileLiveBroadcasting
//       );
//       if (isHost) {
//         agoraEngineRef.current?.startPreview();
//         agoraEngineRef.current?.joinChannel(token, channelName, uid, {
//           clientRoleType: ClientRoleType.ClientRoleBroadcaster,
//         });
//       } else {
//         agoraEngineRef.current?.joinChannel(token, channelName, uid, {
//           clientRoleType: ClientRoleType.ClientRoleAudience,
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const leave = () => {
//     try {
//       agoraEngineRef.current?.leaveChannel();
//       setRemoteUid(0);
//       setIsJoined(false);
//       showMessage("You left the channel");
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.main}>
//       <Text style={styles.head}>
//         Enable host if you want to start streaming and then click on join.{"\n"}
//         If you want to join another user stream then simply click on join.
//       </Text>
//       <View style={styles.btnContainer}>
//         <Text onPress={join} style={styles.button}>
//           Join
//         </Text>
//         <Text onPress={leave} style={styles.button}>
//           Leave
//         </Text>
//       </View>
//       <View style={styles.btnContainer}>
//         <Text>Audience</Text>
//         <Switch
//           onValueChange={(switchValue) => {
//             setIsHost(switchValue);
//             if (isJoined) {
//               leave();
//             }
//           }}
//           value={isHost}
//         />
//         <Text>Host</Text>
//       </View>
//       <ScrollView
//         style={styles.scroll}
//         contentContainerStyle={styles.scrollContainer}
//       >
//         {isJoined && isHost ? (
//           <React.Fragment key={0}>
//             <RtcSurfaceView canvas={{ uid: 0 }} style={styles.videoView} />
//             <Text>Local user uid: {uid}</Text>
//           </React.Fragment>
//         ) : (
//           <Text>{isHost ? "Join a channel" : ""}</Text>
//         )}
//         {isJoined && !isHost && remoteUid !== 0 ? (
//           <React.Fragment key={remoteUid}>
//             <RtcSurfaceView
//               canvas={{ uid: remoteUid }}
//               style={styles.videoView}
//             />
//             <Text>Remote user uid: {remoteUid}</Text>
//           </React.Fragment>
//         ) : (
//           <Text>
//             {isJoined && !isHost ? "Waiting for a remote user to join" : ""}
//           </Text>
//         )}
//         <Text style={styles.info}>{message}</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   button: {
//     paddingHorizontal: 25,
//     paddingVertical: 4,
//     fontWeight: "bold",
//     color: "#ffffff",
//     backgroundColor: "#0055cc",
//     margin: 5,
//   },
//   main: { flex: 1, alignItems: "center" },
//   scroll: { flex: 1, backgroundColor: "#ddeeff", width: "100%" },
//   scrollContainer: { alignItems: "center" },
//   videoView: {
//     width: 400,
//     height: hp(80),
//     backgroundColor: "red",
//   },
//   btnContainer: { flexDirection: "row", justifyContent: "center" },
//   head: { fontSize: 12, marginVertical: 18, color: "gray" },
//   info: { backgroundColor: "#ffffe0", paddingHorizontal: 8, color: "#0000ff" },
// });

// export default Live;

// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   StyleSheet,
// //   Text,
// //   View,
// //   PermissionsAndroid,
// //   ActivityIndicator,
// //   Dimensions,
// //   Share,
// //   TouchableOpacity,
// // } from "react-native";

// // import RtcEngine, {
// //   ChannelProfile,
// //   ClientRole,
// //   RtcLocalView,
// //   RtcRemoteView,
// //   VideoRemoteState,

// // } from "react-native-agora";

// // const dimensions = {
// //   width: Dimensions.get("window").width,
// //   height: Dimensions.get("window").height,
// // };

// // const videoStateMessage = (state) => {
// //   switch (state) {
// //     case VideoRemoteState.Stopped:
// //       return "Video turned off by Host";

// //     case VideoRemoteState.Frozen:
// //       return "Connection Issue, Please Wait";

// //     case VideoRemoteState.Failed:
// //       return "Network Error";
// //   }
// // };

// // async function requestCameraAndAudioPermission() {
// //   try {
// //     const granted = await PermissionsAndroid.requestMultiple([
// //       PermissionsAndroid.PERMISSIONS.CAMERA,
// //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
// //     ]);
// //     if (
// //       granted["android.permission.RECORD_AUDIO"] ===
// //         PermissionsAndroid.RESULTS.GRANTED &&
// //       granted["android.permission.CAMERA"] ===
// //         PermissionsAndroid.RESULTS.GRANTED
// //     ) {
// //       console.log("You can use the cameras & mic");
// //     } else {
// //       console.log("Permission denied");
// //     }
// //   } catch (err) {
// //     console.warn(err);
// //   }
// // }

// // export default function Live(props) {
// //   const isBroadcaster = props.route.params.type === "create";
// //   console.log("ChannelProfile.LiveBroadcasting : ", ChannelProfile);
// //   const onShare = async () => {
// //     try {
// //       const result = await Share.share({ message: props.route.params.channel });
// //       if (result.action === Share.sharedAction) {
// //         if (result.activityType) {
// //           // shared with activity type of result.activityType
// //         } else {
// //           // shared
// //         }
// //       } else if (result.action === Share.dismissedAction) {
// //         // dismissed
// //       }
// //     } catch (error) {
// //       console.log(error.message);
// //     }
// //   };

// //   const [joined, setJoined] = useState(false);
// //   const [broadcasterVideoState, setBroadcasterVideoState] = useState(
// //     VideoRemoteState.Decoding
// //   );
// //   const AgoraEngine = useRef();
// //   const init = async () => {
// //     AgoraEngine.current = await RtcEngine.create(
// //       "5cf59d284e3447da910bd1ee6c032ab7"
// //     );
// //     AgoraEngine.current.enableVideo();
// //     AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
// //     if (isBroadcaster)
// //       AgoraEngine.current.setClientRole(ClientRole.Broadcaster);

// //     AgoraEngine.current.addListener("RemoteVideoStateChanged", (uid, state) => {
// //       if (uid === 1) setBroadcasterVideoState(state);
// //     });

// //     AgoraEngine.current.addListener(
// //       "JoinChannelSuccess",
// //       (channel, uid, elapsed) => {
// //         console.log("JoinChannelSuccess", channel, uid, elapsed);
// //         setJoined(true);
// //       }
// //     );
// //   };

// //   const onSwitchCamera = () => AgoraEngine.current.switchCamera();

// //   useEffect(() => {
// //     if (Platform.OS === "android") requestCameraAndAudioPermission();
// //     const uid = isBroadcaster ? 1 : 0;
// //     init().then(() => AgoraEngine.current.joinChannel(null, "2", null, uid));
// //     return () => {
// //       AgoraEngine.current.destroy();
// //     };
// //   }, []);

// //   const renderHost = () =>
// //     broadcasterVideoState === VideoRemoteState.Decoding ? (
// //       <RtcRemoteView.SurfaceView
// //         uid={1}
// //         style={styles.fullscreen}
// //         channelId={props.route.params.channel}
// //       />
// //     ) : (
// //       <View style={styles.broadcasterVideoStateMessage}>
// //         <Text style={styles.broadcasterVideoStateMessageText}>
// //           {videoStateMessage(broadcasterVideoState)}
// //         </Text>
// //       </View>
// //     );

// //   const renderLocal = () => (
// //     <RtcLocalView.SurfaceView
// //       style={styles.fullscreen}
// //       channelId={props.route.params.channel}
// //     />
// //   );

// //   return (
// //     <View style={styles.container}>
// //       {!joined ? (
// //         <>
// //           <ActivityIndicator
// //             size={60}
// //             color="#222"
// //             style={styles.activityIndicator}
// //           />
// //           <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
// //         </>
// //       ) : (
// //         <>
// //           {isBroadcaster ? renderLocal() : renderHost()}
// //           <View style={styles.buttonContainer}>
// //             <TouchableOpacity style={styles.button} onPress={onShare}>
// //               <Text style={styles.buttonText}>Share</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
// //               <Text style={styles.buttonText}>Switch Camera</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   loadingText: {
// //     fontSize: 18,
// //     color: "#222",
// //   },
// //   fullscreen: {
// //     width: dimensions.width,
// //     height: dimensions.height,
// //   },
// //   buttonContainer: {
// //     flexDirection: "row",
// //     position: "absolute",
// //     bottom: 0,
// //   },
// //   button: {
// //     width: 150,
// //     backgroundColor: "#fff",
// //     marginBottom: 50,
// //     paddingVertical: 13,
// //     borderRadius: 8,
// //     alignItems: "center",
// //     marginHorizontal: 10,
// //   },
// //   buttonText: {
// //     fontSize: 17,
// //   },
// //   broadcasterVideoStateMessage: {
// //     position: "absolute",
// //     bottom: 0,
// //     width: "100%",
// //     height: "100%",
// //     backgroundColor: "#222",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     flex: 1,
// //   },
// //   broadcasterVideoStateMessageText: {
// //     color: "#fff",
// //     fontSize: 20,
// //   },
// // });
