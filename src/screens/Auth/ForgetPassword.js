import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";

///////////////app components////////////////
import CustomButtonhere from "../../components/Button/CustomButton";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import CustomModal from "../../components/Modal/CustomModal";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

/////////////app styles///////////////////
import styles from "./styles";
import Authstyles from "../../styles/GlobalStyles/Authstyles";
import Logostyles from "../../styles/GlobalStyles/Logostyles";

import Colors from "../../utills/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

////////////////////app images////////
import { appImages } from "../../constant/images";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontFamily } from "../../constant/fonts";
import TranslationStrings from "../../utills/TranslationStrings";

const ForgetPassword = ({ navigation }) => {
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  ///////////email//////////////////
  const handleValidEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    if (reg.test(val)) {
      console.log("true");
      return true;
    } else {
      console.log("falsse");
      return false;
    }
  };

  ///////////////data states////////////////////
  const [email, setEmail] = React.useState("");
  const [errorMEssage, setErrorMEssage] = useState("");
  //Api Calling
  const ForgetUserPassword = async () => {
    console.log("email here:", email);
    axios({
      method: "post",
      url: BASE_URL + "forgetPassword.php",
      data: {
        email: email?.trim()?.toLowerCase(),
      },
    })
      .then(function (response) {
        console.log("response", response?.data);

        // setsnackbarValue({ value: "Incorrect Email", color: "red" });
        // setVisible("true");
        setloading(0);
        setdisable(0);
        if (response.data.status == true || response?.data?.Error == false) {
          navigation.navigate("Verification", {
            code: response.data?.otp,
            email: email?.trim()?.toLowerCase(),
          });
        } else if (
          response.data.status == false ||
          response?.data?.Error == true
        ) {
          setsnackbarValue({
            value: response?.data?.message
              ? response?.data?.message
              : response?.data?.Message,
            color: "red",
          });
          setVisible("true");
        } else {
          setloading(0);
          setdisable(0);
          setModalVisible(true);
        }
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  //Api form validation
  const formValidation = async () => {
    // navigation.navigate("Verification");
    // return;
    // input validation
    if (email == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_EMAIL,
        color: "red",
      });
      setVisible("true");
    } else if (!handleValidEmail(email)) {
      setsnackbarValue({
        value: TranslationStrings.INCORRECT_EMAIL,
        color: "red",
      });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      ForgetUserPassword();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Ionicons
          name={"arrow-back"}
          size={25}
          color={Colors.Appthemecolor}
          style={{ marginLeft: wp(5), marginTop: hp(3) }}
          onPress={() => navigation.goBack()}
        />
        <View style={[Logostyles.Logoview, { marginTop: hp(5) }]}>
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode="contain"
          />
        </View>
        <View>
          <View style={Authstyles.textview}>
            <Text style={Authstyles.maintext}>
              {TranslationStrings.FORGET_PASSWORD}
            </Text>
            <Text style={{ ...Authstyles.subtext, width: "auto" }}>
              {TranslationStrings.ENTER_EMAIL_TO_GET_A_VERIFICATION_CODE}
            </Text>
          </View>
          <View>
            <CustomTextInput
              icon={appImages.email}
              type={"iconinput"}
              texterror={"invalid"}
              term={email}
              placeholder={TranslationStrings.EMAIL_ADDRESS}
              onTermChange={(newEmail) => setEmail(newEmail)}
            />
          </View>
        </View>

        <View style={{ marginTop: hp(0), marginBottom: hp(35) }}>
          <CustomButtonhere
            title={TranslationStrings.GET_CODE}
            widthset={80}
            topDistance={35}
            loading={loading}
            disabled={disable}
            onPress={() => {
              formValidation();
            }}
          />
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
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.failed}
          text={TranslationStrings.ERROR}
          // subtext={TranslationStrings.SOMETHING_WENT_WRONG}
          subtext={errorMEssage}
          buttontext={TranslationStrings.GO_BACK}
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgetPassword;
