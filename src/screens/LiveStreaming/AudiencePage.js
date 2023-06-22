import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
// import ZegoUIKitPrebuiltLiveStreaming, {
//   AUDIENCE_DEFAULT_CONFIG,
// } from "@zegocloud/zego-uikit-prebuilt-live-streaming-rn";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const AudiencePage = ({navigation}) => {
  let userId = String(Math.floor(Math.random() * 100000));
  let liveId = String(Math.floor(Math.random() * 10000));
  return (
    <View style={{height: hp(100), width: wp(100)}}>
      {/* <ZegoUIKitPrebuiltLiveStreaming
        appID={1996592425}
        appSign={
          "a1ed9aefd5c36e06d33aad00b21b4d9f171ebc010f013a33572e5458e968fdfa"
        }
        userID={userId}
        userName={"audience_user"}
        liveID={"5185"}
        config={{
          ...AUDIENCE_DEFAULT_CONFIG,
          onLeaveLiveStreaming: () => {
            console.log("stream leaved.....");
            navigation?.goBack();
          },
        }}
      /> */}
    </View>
  );
};

export default AudiencePage;
