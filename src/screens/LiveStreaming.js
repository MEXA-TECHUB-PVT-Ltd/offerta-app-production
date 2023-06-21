import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
} from "react-native";
import { PermissionsAndroid, Platform } from "react-native";
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  RtcSurfaceView,
  ChannelProfileType,
  VideoCanvas,
} from "react-native-agora";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import LiveStreamingKeys from "../utills/LiveStreamingKeys";

const appId = LiveStreamingKeys.appId;
const channelName = LiveStreamingKeys.channelName;
const token = LiveStreamingKeys.token;
const uid = LiveStreamingKeys.uid;

// const channelName = "new1234";
// const token =
//   "0062103cc766ad141bf90843544931573d8IADHm/QlshZvnLvfQbSiu3Jrh2VNt6PDsoxgTpfUOBGPCU91ie8AAAAAIgC59gAALN6OZAQAAQAQDgAAAwAQDgAAAgAQDgAABAAQDgAA";
// const uid = 0;

//api with uid 0
// const channelName = "Test";
// const token =
//   "0062103cc766ad141bf90843544931573d8IABdWZ8Cuq86ufPNijsinYhrwE/RDQn9kyJ9iU+JAHuscDLRTXgAAAAAIgAbaQEA3tSOZAQAAQAQbExkAwAQbExkAgAQbExkBAAQbExk";
// const uid = 0;

const LiveStreaming = () => {
  const agoraEngineRef = useRef(null); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [isHost, setIsHost] = useState(true); // Client role
  const [remoteUid, setRemoteUid] = useState(117); // Uid of the remote user
  const [message, setMessage] = useState(""); // Message to the user

  function showMessage(msg) {
    console.log(":::: ,msg", msg);
    setMessage(msg);
  }
  const getPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };
  const AgoraEngine = useRef();
  useEffect(() => {
    // Initialize Agora engine when the app starts
    setupVideoSDKEngine();
  });

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === "android") {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage("Successfully joined the channel " + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage("Remote user joined with uid " + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage("Remote user left the channel. uid: " + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });

      agoraEngine.enableVideo();
    } catch (e) {
      console.log("error : ", e);
    }
  };

  const join = async () => {
    console.log("join called.....");
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting
      );
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleBroadcaster,
        });
      } else {
        agoraEngineRef.current?.joinChannel(token, channelName, uid, {
          clientRoleType: ClientRoleType.ClientRoleAudience,
        });
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
      showMessage("You left the channel");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.head}>
        Enable host if you want to start streaming and then click on join.{"\n"}
        If you want to join another user stream then simply click on join.
      </Text>
      <View style={styles.btnContainer}>
        <Text onPress={join} style={styles.button}>
          Join
        </Text>
        <Text onPress={leave} style={styles.button}>
          Leave
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Text>Audience</Text>
        <Switch
          onValueChange={(switchValue) => {
            setIsHost(switchValue);
            if (isJoined) {
              leave();
            }
          }}
          value={isHost}
        />
        <Text>Host</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContainer}
      >
        {isJoined && isHost ? (
          <React.Fragment key={0}>
            <RtcSurfaceView canvas={{ uid: 0 }} style={styles.videoView} />
            <Text>Local user uid: {uid}</Text>
          </React.Fragment>
        ) : (
          <Text>{isHost ? "Join a channel" : ""}</Text>
        )}
        {isJoined && !isHost && remoteUid !== 0 ? (
          <React.Fragment key={remoteUid}>
            <RtcSurfaceView
              canvas={{ uid: remoteUid }}
              style={styles.videoView}
            />
            <Text>Remote user uid: {remoteUid}</Text>
          </React.Fragment>
        ) : (
          <Text>
            {isJoined && !isHost ? "Waiting for a remote user to join" : ""}
          </Text>
        )}
        <Text style={styles.info}>{message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#0055cc",
    margin: 5,
  },
  main: { flex: 1, alignItems: "center" },
  scroll: { flex: 1, backgroundColor: "#ddeeff", width: "100%" },
  scrollContainer: { alignItems: "center" },
  videoView: {
    width: 400,
    height: hp(80),
    backgroundColor: "red",
  },
  btnContainer: { flexDirection: "row", justifyContent: "center" },
  head: { fontSize: 12, marginVertical: 18, color: "gray" },
  info: { backgroundColor: "#ffffe0", paddingHorizontal: 8, color: "#0000ff" },
});

export default LiveStreaming;

// import React, { useState, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import { createAgoraRtcEngine } from "react-native-agora";

// import "react-native-get-random-values";
// import { v4 as uuid } from "uuid";

// import RtcEngine from "react-native-agora";

// export default function LiveStreaming() {
//   const AgoraEngine = useRef();
//   const navigation = useNavigation();
//   const [joinChannel, setJoinChannel] = useState("");
//   const init = async () => {
//     AgoraEngine.current = await RtcEngine.create(
//       "5cf59d284e3447da910bd1ee6c032ab7"
//     );
//   };
//   const createLive = () => {
//     const engine = createAgoraRtcEngine();
//     engine.initialize({ appId: "5cf59d284e3447da910bd1ee6c032ab7" });
//     navigation.navigate("Live", { type: "create", channel: uuid() });
//   };
//   const joinLive = () =>
//     navigation.navigate("Live", { type: "join", channel: joinChannel });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Livestream App</Text>
//       <View style={styles.createContainer}>
//         <TouchableOpacity style={styles.button} onPress={createLive}>
//           <Text style={styles.buttonText}>Start</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.joinContainer}>
//         <TextInput
//           value={joinChannel}
//           onChangeText={setJoinChannel}
//           placeholder="Enter Livestream Id"
//           style={styles.joinChannelInput}
//         />
//         <TouchableOpacity
//           onPress={joinLive}
//           disabled={joinChannel === ""}
//           style={[
//             styles.button,
//             { backgroundColor: joinChannel === "" ? "#555555" : "#78b0ff" },
//           ]}
//         >
//           <Text style={styles.buttonText}>Join</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 30,
//     marginBottom: 50,
//     color: "#333",
//   },
//   createContainer: {
//     width: "90%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   joinContainer: {
//     width: "90%",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 50,
//     paddingTop: 50,
//     borderTopWidth: 1,
//     borderColor: "#22222255",
//   },
//   joinChannelInput: {
//     backgroundColor: "#cccccc77",
//     width: "100%",
//     borderRadius: 8,
//     paddingHorizontal: 20,
//     fontSize: 17,
//     textAlign: "center",
//   },
//   button: {
//     width: "100%",
//     marginTop: 15,
//     borderRadius: 8,
//     paddingVertical: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#78b0ff",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 20,
//   },
// });
