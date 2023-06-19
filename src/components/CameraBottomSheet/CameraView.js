import "react-native-gesture-handler";
import React, { useState, useRef } from "react";
import {
  ScrollView,
  ImageBackground,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  Linking,
} from "react-native";
import Permissions from "react-native-permissions";
import { Text, TouchableRipple, Appbar } from "react-native-paper";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setItemImagesArray } from "../../redux/actions";

//////////////////app color/////////////////
import Colors from "../../utills/Colors";

////////////////app image picker/////////////////
import ImagePicker from "react-native-image-crop-picker";

/////////////////app icons//////////////
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

//////////////App Heigth and width///////////////
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TranslationStrings from "../../utills/TranslationStrings";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Loader from "../../components/Loader/Loader";

function CameraViewScreen({ route, navigation }) {
  /////////////redux states///////
  const { item_images_array } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  // console.log("item_images_array : ", item_images_array);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);
  const scrollRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  ///////////////camera mode///////////
  const [camera_mode, setCamera_Mode] = useState(true);

  ///////////toggle camera mode////////////
  const togglecamera = () => {
    if (camera_mode === true) {
      setCamera_Mode(false);
    } else {
      setCamera_Mode(true);
    }
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
    setLoading(true);
    var options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };

    await launchCamera(options)
      .then(async (res) => {
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

          setImage(image.path);
          setImages([...images, image]);
          dispatch(
            setItemImagesArray([
              ...data,
              {
                path: image.path,
              },
            ])
          );
          setData([
            ...data,
            {
              path: image.path,
            },
          ]);

          scrollRef.current.scrollToEnd();
        }
      })
      .catch((err) => {
        console.log("Error Occured: " + err);
      })
      .finally(() => {
        setLoading(false);
      });

    // await ImagePicker.openCamera({
    //   // width: 500,
    //   // height: 500,
    //   //cropping: true,
    //   useFrontCamera: camera_mode,
    //   //compressImageQuality: 0.7,
    // }).then((image) => {
    //   setImage(image.path);
    //   setImages([...images, image]);
    //   dispatch(
    //     setItemImagesArray([
    //       ...data,
    //       {
    //         path: image.path,
    //       },
    //     ])
    //   );
    //   setData([
    //     ...data,
    //     {
    //       path: image.path,
    //     },
    //   ]);

    //   scrollRef.current.scrollToEnd();
    // });
  };
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    setLoading(true);
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      //cropping: true,
      // compressImageQuality: 0.7,
    })
      .then((image) => {
        setImage(image.path);
        setImages([...images, image]);
        dispatch(
          setItemImagesArray([
            ...data,
            {
              path: image.path,
            },
          ])
        );
        setData([
          ...data,
          {
            path: image.path,
          },
        ]);
        scrollRef.current.scrollToEnd();
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Loader isLoading={loading} />
      <Appbar.Header
        style={{
          backgroundColor: "white",
        }}
      >
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title={""} />
        <Appbar.Action
          icon="send"
          color={Colors.Appthemecolor}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Appbar.Header>
      <View
        style={{
          flex: 0.77,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.appgreycolor,
        }}
      >
        {image == null ? (
          <View
            style={{
              borderRadius: 10,
              width: wp(98),
              height: hp(70),
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: Colors.appgreycolor,
              borderStyle: "dashed",
            }}
          >
            <Text>{TranslationStrings.NO_IMAGE_SELECTED}</Text>
          </View>
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              resizeMode: "cover",
              padding: 10,
              borderRadius: wp(1),
              width: wp(98),
              height: hp(70),
            }}
          />
        )}
      </View>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: wp(3),
          position: "absolute",
          bottom: hp(10.3),
        }}
      >
        {images.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setImage(item.path);
              setVisible(true);
            }}
            key={index}
          >
            <ImageBackground
              source={{ uri: item.path }}
              style={{
                width: wp(17.3),
                height: hp(8.5),
                backgroundColor: "white",

                marginRight: 10,
              }}
              imageStyle={{
                borderRadius: wp(1),
                borderWidth: 0.3,
                borderColor: Colors.appgreycolor,
              }}
            >
              <TouchableRipple
                onPress={() => {
                  images.splice(index, 1);
                  setImages([...images]);
                }}
              >
                <Ionicons
                  name="close-circle"
                  size={25}
                  color={Colors.appgreycolor}
                  style={{
                    right: -10,
                    top: -3,
                    position: "absolute",
                  }}
                />
              </TouchableRipple>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: wp(100),
          alignItems: "center",
          position: "absolute",
          bottom: image == null ? hp(2) : hp(2),
          paddingHorizontal: wp(5),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            choosePhotoFromLibrary();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="image" size={wp(8)} color={"#404040"} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            takePhotoFromCamera();
          }}
          activeOpacity={0.8}
          style={{
            width: wp(17),
            height: hp(8.3),
            backgroundColor: Colors.Appthemecolor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <View
            style={{
              width: wp(14.8),
              height: hp(7.5),
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <View
              style={{
                width: wp(13.8),
                height: hp(7),
                backgroundColor: Colors.Appthemecolor,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 50,
              }}
            ></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            togglecamera();
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="camera-reverse" size={wp(8)} color={"#404040"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CameraViewScreen;
