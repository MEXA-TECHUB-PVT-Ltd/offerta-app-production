import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, Image, View, Text } from "react-native";

///////////////app components////////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CustomModal from "../../../components/Modal/CustomModal";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

/////////////app styles///////////////////
import styles from "./styles";
import Authstyles from "../../../styles/GlobalStyles/Authstyles";
import Logostyles from "../../../styles/GlobalStyles/Logostyles";
import Colors from "../../../utills/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

////////////////////app images////////
import { appImages } from "../../../constant/images";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontFamily } from "../../../constant/fonts";
import BlockUserView from "../../../components/BlockUserView";
import { get_user_status } from "../../../api/GetApis";
import TranslationStrings from "../../../utills/TranslationStrings";

const ChangePassword = ({ navigation, route }) => {
  /////////////////////previous data//////////////
  const [predata] = useState(route.params);

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  //password eye function and states
  const [data, setData] = React.useState({
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  ///////////////data states////////////////////
  const [old_password, setOldPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);
  //////////////Api Calling////////////////////
  const ChangePassword = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    axios({
      method: "put",
      url: BASE_URL + "changePasswordApi.php",
      data: {
        id: user_id,
        password: old_password,
        newpassword: password,
        confirmpassword: confirmPassword,
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        if (response?.data?.status == true) {
          setloading(0);
          setdisable(0);
          setModalVisible(true);
        } else {
          //error
          setsnackbarValue({
            value: "Old Password incorrect",
            color: "red",
          });
          setVisible("true");
        }

        //navigation.navigate('Login')
      })
      .catch(function (error) {
        setloading(0);
        setdisable(0);
        if (error) {
          console.log("Email or Password is incorrect");
        }
        setModalVisible(true);
        console.log("error", error);
      })
      .finally(() => {
        setloading(0);
        setdisable(0);
      });
  };
  //Api form validation
  const formValidation = async () => {
    // let user_status = await get_user_status();
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    // input validation
    if (old_password == "") {
      setsnackbarValue({ value: "Please Enter Old Password", color: "red" });
      setVisible("true");
    }
    if (password == "") {
      setsnackbarValue({ value: "Please Enter Password", color: "red" });
      setVisible("true");
    } else if (password.length <= 5) {
      setsnackbarValue({
        value: "Please Enter 6 digit Password",
        color: "red",
      });
      setVisible("true");
    } else if (confirmPassword == "") {
      setsnackbarValue({
        value: "Please Enter Confirm Password",
        color: "red",
      });
      setVisible("true");
    } else if (confirmPassword.length <= 5) {
      setsnackbarValue({
        value: "Please Enter 6 digit Password",
        color: "red",
      });
      setVisible("true");
    } else if (password != confirmPassword) {
      setsnackbarValue({ value: "Please Enter Same Password", color: "red" });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      ChangePassword();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
      >
        <CustomHeader
          headerlabel={TranslationStrings.CHANGE_PASSWORD}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <View>
          <View>
            <CustomTextInput
              icon={appImages.lock}
              type={"iconinput"}
              term={old_password}
              placeholder={TranslationStrings.OLD_PASSWORD}
              onTermChange={(newPassword) => setOldPassword(newPassword)}
              mode={"password"}
              secureTextEntry={!showOldPass}
              onclick={() => setShowOldPass(!showOldPass)}
            />
            <CustomTextInput
              icon={appImages.lock}
              type={"iconinput"}
              term={password}
              placeholder={TranslationStrings.NEW_PASSWORD}
              onTermChange={(newPassword) => setPassword(newPassword)}
              mode={"password"}
              secureTextEntry={!showNewPass}
              onclick={() => setShowNewPass(!showNewPass)}
            />

            <CustomTextInput
              icon={appImages.lock}
              type={"iconinput"}
              term={confirmPassword}
              placeholder={TranslationStrings.CONFIRM_PASSWORD}
              onTermChange={(newPassword) => setConfirmPassword(newPassword)}
              mode={"password"}
              secureTextEntry={!showCPass}
              onclick={() => setShowCPass(!showCPass)}
            />
          </View>
        </View>

        <View
          style={{ marginTop: hp(25), justifyContent: "flex-end", flex: 0.8 }}
        >
          <CustomButtonhere
            title={TranslationStrings.CHANGE}
            widthset={80}
            topDistance={0}
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
            marginBottom: "20%",
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
          Icon={appImages.sucess}
          text={"Sucess"}
          subtext={"Password Changed Successfully"}
          buttontext={"GO BACK"}
          onPress={() => {
            setModalVisible(false),
              //  navigation.navigate("Settings");
              navigation?.goBack();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
