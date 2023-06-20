import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

///////////////app components////////////////
import CustomButtonhere from "../../components/Button/CustomButton";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import CustomModal from "../../components/Modal/CustomModal";

///////////////////dropdown////////////////
import SignupRole from "../../components/Dropdowns/SignupRole";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";

/////////////app styles///////////////////
import styles from "./styles";
import Authstyles from "../../styles/GlobalStyles/Authstyles";
import Logostyles from "../../styles/GlobalStyles/Logostyles";
import Authlaststyles from "../../styles/GlobalStyles/Authlaststyles";
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

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setsignupRole } from "../../redux/actions";

import messaging from "@react-native-firebase/messaging";
import TranslationStrings, {
  ChangeAppLanguage,
} from "../../utills/TranslationStrings";
import SocialIcons from "../../components/SocialView/SocialIcons";

import GoogleButton from "../../components/Button/GoogleButton";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import LanguageSelector from "../../components/LanguageSelector";

const SignUp = ({ navigation }) => {
  //////////////redux////////////////////
  const { signup_role } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();

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
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  const getUserFCMToken = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          const fcmToken = await messaging().getToken();
          resolve(fcmToken);
        } else {
          resolve("");
        }
      } catch (error) {
        resolve("");
      }
    });
  };
  //////////////Api Calling////////////////////
  const SignupUser = async () => {
    let fcm_token = await getUserFCMToken();
    axios({
      method: "post",
      url: BASE_URL + "regisrationApi.php",
      data: {
        email: email.toLowerCase(),
        password: password,
        conformPassword: confirmPassword,
        role: signup_role,
        fcm: fcm_token,
        phone: phoneNumber,
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        setloading(0);
        setdisable(0);
        if (response.data.message === "User Register successful") {
          await AsyncStorage.setItem("Userid", response.data.data.id);
          await AsyncStorage.setItem("UserEmail", response.data.data.email);
          navigation.navigate("CreateProfile", {
            useremail: response.data.data.email,
            signup_role: signup_role,
          });
        } else {
          setloading(0);
          setdisable(0);
          setModalVisible(true);
        }
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

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };
  const gmailLoginHandler = async () => {
    console.log("gmailLoginHandler  :  ");
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();

      console.log("User Info --> ", userInfo);
      // console.log('User Info currentUser tokeen--> ', currentUser);
      setUserInfo(userInfo);
      _signOut();
      GoogleSignupUser(userInfo.user.email);
    } catch (error) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //alert('Play Services Not Available or Outdated');
      } else {
        //alert(error.message);
      }
    }
  };

  //////////////Google Signup Api Calling////////////////////
  const GoogleSignupUser = async (props) => {
    if (signup_role == "" || signup_role?.length == 0) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_SELECT_ROLE,
        color: "red",
      });
      setVisible("true");
    } else {
      let fcm_token = await getUserFCMToken();
      setloading(true);
      axios({
        method: "post",
        url: BASE_URL + "regisrationApi.php",
        data: {
          email: props.toLowerCase(),
          password: "google123",
          conformPassword: "google123",
          role: signup_role,
          fcm: fcm_token,
          phone: "",
        },
      })
        .then(async function (response) {
          console.log("response", response.data);
          // if (response.data.message === "User Already Registered") {
          //   GoogleLoginUser(props);
          // } else {
          //   await AsyncStorage.setItem("Userid", response.data.data.id);
          //   navigation.navigate("Drawerroute");
          // }

          setloading(0);
          setdisable(0);
          if (
            response.data?.data?.message === "User Register successful" ||
            response?.data?.message === "User Register successful"
          ) {
            console.log("if_________________________");
            await AsyncStorage.setItem("Userid", response.data.data.id);
            await AsyncStorage.setItem("UserEmail", response.data.data.email);
            navigation.navigate("CreateProfile", {
              useremail: response.data.data.email,
              signup_role: signup_role,
            });
          } else {
            console.log("else____________________________");
            setloading(0);
            setdisable(0);
            setModalVisible(true);
          }
        })
        .catch(function (error) {
          console.log("error  : ", error);
          if (error) {
            console.log("Wrong");
          }
        });
    }
  };
  //Api form validation
  const formValidation = async () => {
    // navigation.navigate("AccountVerification");
    // return;

    // navigation.navigate("CreateProfile", {
    //   useremail: "test@gmail.com",
    //   signup_role: "user",
    // });
    // return;

    // input validation
    if (signup_role == "" || signup_role?.length == 0) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_SELECT_ROLE,
        color: "red",
      });
      setVisible("true");
    } else if (email == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_EMAIL,
        color: "red",
      });
      setVisible("true");
    } else if (phoneNumber?.length == 0) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_PHONE_NUMBER,
        color: "red",
      });
      setVisible("true");
    } else if (!handleValidEmail(email)) {
      console.log("a");
      setsnackbarValue({
        value: TranslationStrings.INCORRECT_EMAIL,
        color: "red",
      });
      setVisible("true");
    } else if (password == "") {
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
      SignupUser();
    }
  };

  const [language, setLanguage] = useState("");
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
          style={{
            marginLeft: wp(5),
            marginTop: hp(3),

            width: wp(15),
          }}
          onPress={() => navigation.goBack()}
        />
        <View style={[Logostyles.Logoview, { marginTop: hp(5) }]}>
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode="contain"
          />
        </View>
        <LanguageSelector
          onChange={(value) => {
            setLanguage(value);
          }}
        />
        <View>
          <View style={Authstyles.textview}>
            <Text style={Authstyles.maintext}>
              {TranslationStrings.SIGN_UP}
            </Text>
            <Text style={Authstyles.subtext}>
              {TranslationStrings.SIGN_UP_TO_CREATE_YOUR_ACCOUNT}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <CustomTextInput
                icon={appImages.downarrow}
                type={"iconinput"}
                term={signup_role}
                editable={false}
                disable={false}
                placeholder={TranslationStrings.SELECT_ROLE}
                onTermChange={(newcountry) => setsignupRole(newcountry)}
              />
            </TouchableOpacity>

            <CustomTextInput
              icon={appImages.email}
              type={"iconinput"}
              texterror={"invalid"}
              texttype="email-address"
              term={email}
              returnType={"next"}
              onNext={() => {
                ref_input2.current.focus();
              }}
              placeholder={TranslationStrings.EMAIL_ADDRESS}
              onTermChange={(newEmail) => setEmail(newEmail)}
            />
            <CustomTextInput
              icon={appImages.email}
              type={"phone"}
              texterror={"invalid"}
              texttype="number-pad"
              keyboard_type={"number-pad"}
              term={phoneNumber}
              returnType={"next"}
              // onNext={() => {
              //   ref_input2.current.focus();
              // }}
              placeholder={TranslationStrings.ENTER_PHONE_NO}
              onTermChange={(newEmail) => setPhoneNumber(newEmail)}
            />
            <CustomTextInput
              onRef={ref_input2}
              icon={appImages.lock}
              type={"iconinput"}
              term={password}
              returnType={"next"}
              onNext={() => {
                ref_input3.current.focus();
              }}
              placeholder={TranslationStrings.PASSWORD}
              onTermChange={(newPassword) => setPassword(newPassword)}
              mode={"password"}
              secureTextEntry={data.secureTextEntry ? true : false}
              onclick={() => updateSecureTextEntry()}
            />
            <CustomTextInput
              onRef={ref_input3}
              icon={appImages.lock}
              type={"iconinput"}
              term={confirmPassword}
              placeholder={TranslationStrings.CONFIRM_PASSWORD}
              onTermChange={(newPassword) => setConfirmPassword(newPassword)}
              mode={"password"}
              secureTextEntry={data.secureTextEntry ? true : false}
              onclick={() => updateSecureTextEntry()}
            />
          </View>
        </View>

        <View
          style={{
            marginHorizontal: wp(5),
            flexDirection: "row",
            justifyContent: "space-between",
            // width: wp(60),
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          {/* <SocialIcons icon={appImages.apple} bgcolor={"#000000"} /> */}
          {/* <SocialIcons
            icon={appImages.facebook}
            bgcolor={"#4267B2"}
            onpress={() => fbLogin()}
          /> */}
          {/* <SocialIcons
            icon={appImages.google}
            bgcolor={"#4285F4"}
            onpress={() => gmailLoginHandler()}
          /> */}

          <GoogleButton
            // title="Sign up with Google"
            title={TranslationStrings.SIGN_UP_WITH_GOOGLE}
            onPress={() => gmailLoginHandler()}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginTop: hp(3),
          }}
        >
          <View style={{ marginTop: hp(0) }}>
            <CustomButtonhere
              title={TranslationStrings.SIGN_UP}
              widthset={80}
              topDistance={0}
              loading={loading}
              disabled={disable}
              onPress={() => {
                formValidation();
              }}
            />
          </View>

          <View style={[Authlaststyles.lasttextview, { marginTop: hp(1) }]}>
            <Text style={Authlaststyles.lasttextgrey}>
              {TranslationStrings.ALREADY_HAVE_AN_ACCOUNT}?
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
              // style={{ width: wp(16) }}
            >
              <Text style={Authlaststyles.lasttextblue}>
                {" "}
                {TranslationStrings.SIGN_IN}
              </Text>
            </TouchableOpacity>
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
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.failed}
          text={TranslationStrings.ERROR}
          subtext={TranslationStrings.USER_ALREADY_REGISTERED}
          buttontext={"GO BACK"}
          onPress={() => {
            setModalVisible(false);
          }}
        />
        <SignupRole
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
