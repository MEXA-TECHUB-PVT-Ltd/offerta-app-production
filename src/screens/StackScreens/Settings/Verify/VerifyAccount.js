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
import CustomHeader from "../../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../../components/Button/CustomButton";
import CustomTextInput from "../../../../components/TextInput/CustomTextInput";
import CustomModal from "../../../../components/Modal/CustomModal";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

/////////////app styles///////////////////
import styles from "./styles";

import Colors from "../../../../utills/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

////////////////////app images////////
import { appImages } from "../../../../constant/images";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BlockUserView from "../../../../components/BlockUserView";
import { get_user_status } from "../../../../api/GetApis";
import TranslationStrings from "../../../../utills/TranslationStrings";

const VerifyAccount = ({ navigation }) => {
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
  const [showBlockModal, setShowBlockModal] = useState(false);
  //Api Calling
  const ForgetUserPassword = async () => {
    console.log("email here:", email);
    axios({
      method: "post",
      url: BASE_URL + "AccountVerifyByEmail.php",
      data: {
        email: email.toLowerCase(),
      },
    })
      .then(function (response) {
        console.log("response", JSON.stringify(response.data));

        if (response.data.message != " ") {
          setloading(0);
          setdisable(0);
          navigation.navigate("VerifyCode", {
            code: response.data.code,
            email: email,
          });
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
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }
    // input validation
    if (email == "") {
      setsnackbarValue({ value: "Please Enter Email", color: "red" });
      setVisible("true");
    } else if (!handleValidEmail(email)) {
      setsnackbarValue({ value: "Incorrect Email", color: "red" });
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
        <CustomHeader
          headerlabel={TranslationStrings.SETTINGS}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={appImages.send_email}
            style={{ height: hp(30), width: wp(70) }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: hp(4),
          }}
        >
          <Text style={styles.toptext}>
            {TranslationStrings.ENTER_YOUR_EMAIL_FOR_ACCOUNT_VERIFICATION}
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

        <View style={{ marginTop: hp(0), marginBottom: hp(35) }}>
          <CustomButtonhere
            title={TranslationStrings.SEND}
            widthset={80}
            topDistance={28}
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

        <BlockUserView
          visible={showBlockModal}
          setVisible={setShowBlockModal}
        />
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.failed}
          text={TranslationStrings.ERROR}
          subtext={TranslationStrings.SOMETHING_WENT_WRONG}
          buttontext={TranslationStrings.GO_BACK}
          onPress={() => {
            setModalVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerifyAccount;
