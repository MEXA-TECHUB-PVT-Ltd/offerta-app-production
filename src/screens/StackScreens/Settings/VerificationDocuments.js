import React, { useEffect, useState, useRef } from "react";
import {
  Image,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

///////////////app code fields/////////////
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

///////////////timer/////////////////////
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

///////////////app images//////////////
import { appImages } from "../../../constant/images";

/////////////////app components/////////////////
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomModal from "../../../components/Modal/CustomModal";

/////////////////////app styles/////////////////////

import Authstyles from "../../../styles/GlobalStyles/Authstyles";
import Authtextstyles from "../../../styles/GlobalStyles/Authtextstyles";
import Logostyles from "../../../styles/GlobalStyles/Logostyles";
import styles from "./styles";
import Colors from "../../../utills/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setPhoneNumber, setLoginUser } from "../../redux/actions";

////////////////api////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontFamily } from "../../../constant/fonts";
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";
import { Snackbar } from "react-native-paper";
import CustomHeader from "../../../components/Header/CustomHeader";
import TranslationStrings from "../../../utills/TranslationStrings";

const VerificationDocuments = ({ navigation, route }) => {
  const refRBSheet = useRef();
  const [cnicImage, setCnicImage] = useState({
    uri: "",
    type: "",
    name: "",
  });
  const [userImage, setUserImage] = useState({
    uri: "",
    type: "",
    name: "",
  });
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState("");

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let user_id = await AsyncStorage.getItem("Userid");
    console.log("user_id", user_id);
    let user_detail = await getUserDetail(user_id);
    console.log("user_detail   :  ", user_detail?.cnic);
    console.log("user_detail   :  ", user_detail?.live_image);
    setCnicImage({ ...cnicImage, uri: IMAGE_URL + user_detail?.cnic });
    setUserImage({ ...cnicImage, uri: IMAGE_URL + user_detail?.live_image });
  };

  const getUserDetail = async (user_id) => {
    return new Promise((resolve, reject) => {
      try {
        let url = BASE_URL + `getUserById.php?user_id=${user_id}`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log("data :  ", data);
            resolve(data);
          })
          .catch((err) => {
            console.log("error raised : :   ", data);
            resolve(false);
          });
      } catch (error) {
        console.log("error  :  ", error);
        resolve(false);
      }
    });
  };

  const handleVerifyAccount = async () => {
    let user_id = await AsyncStorage.getItem("Userid");
    console.log("user_id  :   ", user_id);
    if (!user_id) {
      setsnackbarValue({
        value: "User not found",
        color: "red",
      });
      setVisible(true);
    } else if (userImage?.uri == "") {
      setsnackbarValue({
        value: "Please upload your picture",
        color: "red",
      });
      setVisible(true);
    } else if (cnicImage?.uri == "") {
      setsnackbarValue({
        value: "Please upload your  CNIC Image",
        color: "red",
      });
      setVisible(true);
    } else {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("cnic", cnicImage);
      formData.append("live_image", userImage);
      let url = BASE_URL + "accountVerify.php";
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("rsponse :  ", response);
          if (response?.status == true) {
            navigation.navigate("Drawerroute");
          } else {
            setsnackbarValue({
              value: response?.message,
              color: "red",
            });
            setVisible(true);
          }
        })
        .catch((err) => {
          console.log("error : ", err);
          setsnackbarValue({
            value: "Something went wrong",
            color: "red",
          });
          setVisible(true);
        });

      console.log("formData", formData);
    }
  };
  const onDismissSnackBar = () => setVisible(false);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CustomHeader
          headerlabel={TranslationStrings.VERIFICATION_DOCUMENTS}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
          type={"singleicon"}
        />

        <View>
          <Text
            style={{
              marginLeft: 30,
              color: "#000",
              fontSize: hp(2),
              marginTop: 25,
              fontFamily: fontFamily.Poppins_Regular,
            }}
          >
            {TranslationStrings.PROFILE_PICTURE} :
          </Text>
          <View style={style.card}>
            <View style={{ alignItems: "center" }}>
              <View style={style.imageView}>
                {userImage.uri && (
                  <Image
                    source={{ uri: userImage.uri }}
                    style={style.imageView}
                    resizeMode={"contain"}
                  />
                )}
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text
            style={{
              marginLeft: 30,
              color: "#000",
              fontSize: hp(2),
              marginTop: 25,
              fontFamily: fontFamily.Poppins_Regular,
            }}
          >
            {TranslationStrings.DOCUMENTS} :
          </Text>
          <View style={style.card}>
            <View style={{ alignItems: "center" }}>
              <View style={style.imageView}>
                {cnicImage.uri && (
                  <Image
                    source={{ uri: cnicImage.uri }}
                    style={style.imageView}
                    resizeMode={"contain"}
                  />
                )}
              </View>
            </View>
          </View>
        </View>

        <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(20),
            zIndex: 999,
          }}
        >
          {snackbarValue.value}
        </Snackbar>

        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={"From Gallery"}
          type={"verify"}
          onCameraImageSelect={(file) => {
            if (file) {
              let obj = {
                uri: file.path,
                type: file.mime,
                name: file.path.split("/").pop(),
              };
              console.log("selected :    ", selected);
              if (selected == 0) {
                setUserImage(obj);
              } else {
                setCnicImage(obj);
              }
            }
          }}
          onGalleryImageSelect={(file) => {
            if (file) {
              let obj = {
                uri: file.path,
                type: file.mime,
                name: file.path.split("/").pop(),
              };
              console.log("selected :    ", selected);
              if (selected == 0) {
                setUserImage(obj);
              } else {
                setCnicImage(obj);
              }
            }
            console.log("image selected from gallery :   ", file);
          }}
        />
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.failed}
          text={"Error"}
          subtext={"OTP Not Matched Confirm it or Resend it"}
          buttontext={"GO BACK"}
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerificationDocuments;

const style = StyleSheet.create({
  card: {
    width: wp(85),
    height: wp(55),
    borderRadius: 20,
    borderWidth: 1.5,
    alignSelf: "center",
    borderColor: Colors.appgreycolor,
    marginTop: wp("5%"),
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: wp("5%"),
    overflow: "hidden",
  },
  imageView: {
    width: wp(85),
    height: wp(55),
    borderRadius: 20,
  },
});
