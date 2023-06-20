import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { Divider } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

////////////app pakages////////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import RBSheet from "react-native-raw-bottom-sheet";

///////////////app styles//////////////////
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setUserImage, editUserImage } from "../../redux/actions";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";

//////////////app pakages//////////////////
import ImagePicker from "react-native-image-crop-picker";

//////////////////app Images////////////////
import { appImages } from "../../constant/images";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Image } from "react-native-compressor";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import TranslationStrings from "../../utills/TranslationStrings";
import Permissions from "react-native-permissions";

const VideoBottomSheet = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    requestCameraPermission();
  }, []);

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
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          "Camera Permission denied",
          "Please open Settings to allow Camera permissions.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "Open Setting", onPress: () => Permissions.openSettings() },
          ]
        );
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhotoFromCamera = async () => {
    requestCameraPermission();
    var options = {
      storageOptions: {
        skipBackup: true,
        // path: "images",
      },
      mediaType: "video",
      videoQuality: "low",
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
    };

    await launchCamera(options)
      .then(async (res) => {
        console.log("response :  ", res);
        if (res.didCancel) {
          console.log("User cancelled image picker");
        } else if (res.error) {
          console.log("ImagePicker Error: ", res.error);
        } else if (res.customButton) {
          console.log("User tapped custom button: ", res.customButton);
        } else {
          let image = {
            path: res.assets[0].uri,
            mime: res.assets[0].type,
            name: res.assets[0].fileName,
          };
          props.onFilePicked(image);
        }
      })
      .catch((err) => {
        console.log("error in camera image uploading  :  ", err);
      });
  };

  const choosePhotoFromLibrary = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        // path: "images",
      },
      mediaType: "video",
      videoQuality: "low",
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.5,
    };
    await launchImageLibrary(options).then((res) => {
      if (res.didCancel) {
        console.log("User cancelled image picker");
      } else if (res.error) {
        console.log("ImagePicker Error: ", res.error);
      } else if (res.customButton) {
        console.log("User tapped custom button: ", res.customButton);
      } else {
        let image = {
          path: res.assets[0].uri,
          mime: res.assets[0].type,
          name: res.assets[0].fileName,
        };
        props.onFilePicked(image);
        props.refRBSheet.current.close();
      }
    });
  };

  return (
    <RBSheet
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      animationType="fade"
      minClosingHeight={0}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(52, 52, 52, 0.5)",
        },
        draggableIcon: {
          backgroundColor: "white",
        },
        container: {
          borderTopLeftRadius: wp(10),
          borderTopRightRadius: wp(10),
          height: hp(25),
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: wp(8),
          alignItems: "center",
        }}
      >
        <Text style={styles.maintext}>Upload Video</Text>
        <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
          <Ionicons
            name="close"
            size={22}
            color={"#303030"}
            onPress={() => props.refRBSheet.current.close()}
          />
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "center", marginTop: hp(3) }}>
        <TouchableOpacity
          onPress={() => {
            takePhotoFromCamera();
            props.refRBSheet.current.close();
          }}
          //onPress={props.takePhotoFromCamera}
          style={styles.modaltextview}
        >
          <Ionicons name="camera" size={25} color={"#707070"} />

          <Text style={styles.optiontext}>
            {TranslationStrings.UPLOAD_FROM_CAMERA}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: "#DCDCDC",
            borderBottomWidth: 1,
            width: wp(85),
            alignSelf: "center",
            marginBottom: hp(2),
            marginTop: hp(2),
          }}
        ></View>
        <TouchableOpacity
          onPress={() => {
            choosePhotoFromLibrary();
            props.refRBSheet.current.close();
          }}
          style={styles.modaltextview}
        >
          <Ionicons name="image" size={25} color={"#707070"} />
          {/* <Image
                 source={require('../../assets/imagepicker/gallery.png')}
                 style={styles.uploadicon}
                  resizeMode='contain'
              /> */}
          <Text style={styles.optiontext}>
            {TranslationStrings.UPLOAD_FROM_GALLERY}
          </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default VideoBottomSheet;
