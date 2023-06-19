import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, Image, View, Text } from "react-native";

///////////////app components////////////////
import CustomButtonhere from "../../components/Button/CustomButton";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import CustomModal from "../../components/Modal/CustomModal";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

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

const ResetPassword = ({ navigation, route }) => {
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
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //////////////Api Calling////////////////////
  const ChangePassword = async () => {
    console.log("predata __________", predata);
    let body = {
      // email: predata.data.email.toLowerCase(),
      email: predata?.data?.email?.toLowerCase(),
      // password: password,
      // conformPassword: confirmPassword,
      newpassword: password,
      cpassword: confirmPassword,
    };
    console.log("body : ", body);
    axios({
      method: "put",
      url: BASE_URL + "ResetPassword.php",
      data: body,
    })
      .then(async function (response) {
        console.log("response", response?.data);
        setloading(0);
        setdisable(0);
        setModalVisible(true);
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
      });
  };
  //Api form validation
  const formValidation = async () => {
    // input validation
    if (password == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_PASSWORD,
        color: "red",
      });
      setVisible("true");
    } else if (password.length <= 5) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_SIX_DIGIT_PASSWORD,
        color: "red",
      });
      setVisible("true");
    } else if (confirmPassword == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_CONFIRM_PASSWORD,
        color: "red",
      });
      setVisible("true");
    } else if (confirmPassword.length <= 5) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_SIX_DIGIT_PASSWORD,
        color: "red",
      });
      setVisible("true");
    } else if (password != confirmPassword) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_SAME_PASSWORD,
        color: "red",
      });
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
              {TranslationStrings.RESET_PASSWORD}
            </Text>
            <Text style={Authstyles.subtext}>
              {TranslationStrings.CREATE_A_STRONG_PASSWORD}
            </Text>
          </View>
          <View>
            <CustomTextInput
              icon={appImages.lock}
              type={"iconinput"}
              term={password}
              placeholder={TranslationStrings.PASSWORD}
              onTermChange={(newPassword) => setPassword(newPassword)}
            />
            <CustomTextInput
              icon={appImages.lock}
              type={"iconinput"}
              term={confirmPassword}
              placeholder={TranslationStrings.CONFIRM_PASSWORD}
              onTermChange={(newPassword) => setConfirmPassword(newPassword)}
            />
          </View>
        </View>

        <View style={{ marginTop: hp(25) }}>
          <CustomButtonhere
            title={TranslationStrings.RESET}
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
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={TranslationStrings.SUCCESS}
          subtext={TranslationStrings.PASSWORD_UPDATED_SUCCESSFULLY}
          buttontext={TranslationStrings.GO_BACK}
          onPress={() => {
            setModalVisible(false), navigation.navigate("Login");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;
