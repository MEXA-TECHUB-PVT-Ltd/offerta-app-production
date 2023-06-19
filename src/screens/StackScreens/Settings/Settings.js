import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

/////////////////////app pakages///////////////
import { Avatar } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import SettingsMenu from "../../../components/SettingsView/SettingsMenu";
import CustomButtonhere from "../../../components/Button/CustomButton";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFetchBlob from "rn-fetch-blob";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";
import { get_Login_UserData } from "../../../api/GetApis";
import { useFocusEffect } from "@react-navigation/native";
import TranslationStrings from "../../../utills/TranslationStrings";

const Settings = ({ navigation }) => {
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [userRole, setUserRole] = useState("");

  const logout = async () => {
    await AsyncStorage.removeItem("Userid");
    // navigation.navigate("Login");
    navigation.popToTop();
    navigation.replace("AuthNav", { screen: "Login" });
  };

  // navigation.navigate("AccountVerification", {
  //   signup_role: route?.params?.signup_role,`
  // });

  useFocusEffect(
    React.useCallback(() => {
      getLoginUserDetail();
    }, [])
  );

  const getLoginUserDetail = async () => {
    get_Login_UserData().then((response) => {
      setVerificationStatus(response?.data?.subscription);
      setUserRole(response?.data?.role);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={TranslationStrings.SETTINGS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />

      <View style={{ marginTop: hp(6) }}></View>
      <SettingsMenu
        label={TranslationStrings.EDIT_PROFILE}
        icon={"file-edit-outline"}
        labelPress={() => navigation.navigate("EditProfile")}
      />
      <SettingsMenu
        label={TranslationStrings.CHANGE_PASSWORD}
        icon={"lock"}
        labelPress={() =>
          navigation.navigate("ChangePassword", { navplace: "ChangePassword" })
        }
      />
      <SettingsMenu
        label={TranslationStrings.LOCATION}
        icon={"map-marker"}
        labelPress={() =>
          navigation.navigate("Location", { navplace: "Location" })
        }
      />
      {/* <SettingsMenu
        label={"Verify Account"}
        icon={"shield-check"}
        labelPress={() => navigation.navigate("VerifyAccount")}
      /> */}
      {/* {verificationStatus == "subscribed" ? (
        <SettingsMenu
          // label={"View Verification Docs"}
          label={TranslationStrings.VERIFY_ACCOUNT}
          icon={"shield-check"}
          color={"blue"}
          labelPress={() => navigation.navigate("VerificationDocuments")}
        />
      ) : ( */}
      <SettingsMenu
        // label={"Upload Verification Docs"}
        label={TranslationStrings.VERIFY_ACCOUNT}
        icon={"shield-alert-outline"}
        color={"red"}
        labelPress={() => {
          navigation.replace("AccountVerification", {
            signup_role: userRole,
          });
        }}
      />
      {/* )} */}

      {/* <SettingsMenu
       label={'Allow user to call you'}
       icon={'phone'}
       //labelPress={()=>navigation.navigate('How to Use')}
       /> */}
      <CustomButtonhere
        title={TranslationStrings.LOGOUT}
        widthset={78}
        topDistance={30}
        icon={"power"}
        onPress={() => logout()}
      />
    </SafeAreaView>
  );
};

export default Settings;
