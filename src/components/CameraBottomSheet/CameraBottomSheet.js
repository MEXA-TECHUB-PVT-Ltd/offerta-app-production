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

const CamerBottomSheet = (props) => {
  const navigation = useNavigation();

  /////////////redux states///////
  const { nav_place } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ///////////picker state/////////
  const [image, setImage] = useState("");

  //////////////////////cameraimage//////////////////
  // const takePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     // compressImageMaxWidth: 300,
  //     // compressImageMaxHeight: 300,
  //     cropping: true,
  //     width: 300,
  //     height: 300,
  //     compressImageQuality: 0.2,
  //   }).then(async (image) => {
  //     // const result = await Image.compress(image.path, {
  //     //   // compressionMethod: "manual",
  //     //   maxWidth: 200,
  //     //   quality: 0.2,
  //     // });
  //     // let compressedImageObj = {
  //     //   path: result,
  //     //   mime: "image/jpeg",
  //     // };

  //     // console.log("compressed image :::::     :::  :::  ::  ", result);

  //     props.refRBSheet.current.close();
  //     if (props?.type == "verify") {
  //       props?.onCameraImageSelect(image);
  //     } else {
  //       props?.type1 === "editProfile" && handleUpdateUserProfile(image);
  //       props.type === "Chat_image"
  //         ? Uploadpic(image)
  //         : dispatch(setUserImage(image.path));
  //       setImage(image.path);
  //     }
  //   });
  // };

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
        path: "images",
      },
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
          // const result = await Image.compress(res.assets[0].uri, {
          //   compressionMethod: "auto",
          // });
          // let image = {
          //   path: result,
          //   mime: "image.jpeg",
          //   name: result?.split("/").pop(),
          // };

          console.log("picked image : ", image);
          props.refRBSheet.current.close();
          if (props?.type == "verify") {
            props?.onCameraImageSelect(image);
          } else {
            props?.type1 === "editProfile" && handleUpdateUserProfile(image);
            props.type === "Chat_image"
              ? Uploadpic(image)
              : dispatch(setUserImage(image.path));
            setImage(image.path);
          }
        }
      })
      .catch((err) => {
        console.log("error in camera image uploading  :  ", err);
      });
  };

  ////////////////////library image//////////////////
  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.5,
  //   }).then((image) => {
  //     props.refRBSheet.current.close();
  //     if (props?.type == "verify") {
  //       props?.onGalleryImageSelect(image);
  //     } else {
  //       props?.type1 === "editProfile" && handleUpdateUserProfile(image);
  //       props.type === "Chat_image"
  //         ? Uploadpic(image)
  //         : dispatch(setUserImage(image.path));

  //       setImage(image.path);
  //     }
  //   });
  // };

  const choosePhotoFromLibrary = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
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
        props.refRBSheet.current.close();
        if (props?.type == "verify") {
          props?.onGalleryImageSelect(image);
        } else {
          props?.type1 === "editProfile" && handleUpdateUserProfile(image);
          props.type === "Chat_image"
            ? Uploadpic(image)
            : dispatch(setUserImage(image.path));
          setImage(image.path);
        }
      }
    });
  };

  const handleUpdateUserProfile = async (image) => {
    console.log("updated user profile called  .....", image);
    if (image) {
      let user_id = await AsyncStorage.getItem("Userid");

      console.log("user_id  ______________________________________", user_id);
      const formData = new FormData();
      formData.append("id", user_id);
      let obj = {
        uri: image.path,
        type: image.mime,
        name: image?.path?.split("/")?.pop(),
      };
      formData.append(`profile`, obj);

      fetch(BASE_URL + "updateProfilePicture.php", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("update user profile response :", responseData);
          // dispatch(setUserImage(responseData.image));
          dispatch(setUserImage(image.path));
        })
        .catch((err) => {
          console.log("error raised while updating user image : ", err);
        });
    }
  };
  const [selectedimage, setselectedimage] = useState(false);
  /////////////////image api calling///////////////
  const Uploadpic = (file) => {
    const formData = new FormData();
    let imageobj = {
      uri: file.path,
      type: file.mime,
      name: file.path.split("/").pop(),
    };
    formData.append(`image`, imageobj);
    console.log("image obj  : ", imageobj);
    let url = BASE_URL + "uploadImage.php";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData  ::    ", responseData);
        dispatch(setUserImage(responseData.image));
        props.onImageUpload(responseData.image);
      })
      .catch((err) => {
        console.log("error raised while uploading image :  ", err);
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
        <Text style={styles.maintext}>{TranslationStrings.UPLOAD_IMAGE}</Text>
        <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
          <Ionicons
            name="close"
            size={22}
            color={"#303030"}
            onPress={() => props.refRBSheet.current.close()}
          />
          {/* <Image
               source={appImages.Closeicon}
                  style={styles.icons}
                  resizeMode='contain'
              /> */}
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "center", marginTop: hp(3) }}>
        <TouchableOpacity
          onPress={() => {
            props.type === "onepic" ||
            props.type === "Chat_image" ||
            props.type === "verify"
              ? takePhotoFromCamera()
              : navigation.navigate("CameraViewScreen", "Take Photo"),
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
            props.type === "onepic" ||
            props.type === "Chat_image" ||
            props.type === "verify"
              ? choosePhotoFromLibrary()
              : navigation.navigate("CameraViewScreen", "Take Photo"),
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

export default CamerBottomSheet;
