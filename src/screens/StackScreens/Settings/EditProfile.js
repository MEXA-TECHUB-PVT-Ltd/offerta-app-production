import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";

///////////////app components////////////////
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomModal from "../../../components/Modal/CustomModal";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CustomHeader from "../../../components/Header/CustomHeader";
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";

////////////////app pakages////////////
import { Snackbar } from "react-native-paper";

/////////////app styles///////////////////
import styles from "./styles";

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

///////////upload image///////////////
import RNFetchBlob from "rn-fetch-blob";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setUserImage } from "../../../redux/actions";
import { setCountryName, setCityName } from "../../../redux/Location/actions";

////////////////////app images////////
import { appImages } from "../../../constant/images";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

///////////////api functions///////////
import { get_Login_UserData, get_user_status } from "../../../api/GetApis";
import BlockUserView from "../../../components/BlockUserView";
import TranslationStrings from "../../../utills/TranslationStrings";

import Loader from "../../../components/Loader/Loader";

const EditProfile = ({ navigation, route }) => {
  /////////////previous data////////////
  const [predata] = useState(route.params);

  /////////////////////////redux///////////////////
  const { user_image } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  /////////////////////////redux///////////////////
  const { country_name, city_name } = useSelector(
    (state) => state.locationReducer
  );

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  const [isDataLoading, setIsDataLoading] = useState(false);

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  //camera and imagepicker
  const refRBSheet = useRef();

  ///////////////data states////////////////////
  const [user_id1, setuser_id] = React.useState();
  const [username, setusername] = React.useState();
  const [fname, setfname] = React.useState();
  const [lname, setlname] = React.useState();
  const [email, setEmail] = React.useState();
  const [phoneNo, setPhoneNo] = useState("");

  const [showBlockModal, setShowBlockModal] = useState(false);
  //////////////////////Api Calling/////////////////
  const Edit_User_Profile = async () => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }
    setloading(true);
    var user_id = await AsyncStorage.getItem("Userid");
    var data = JSON.stringify({
      user_id: user_id,
      full_name: fname,
      username: username,
      phone_no: phoneNo,
    });

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: BASE_URL + "updateProfile.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        get_user_data();
        setModalVisible(true);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setloading(false));
  };
  const get_user_data = () => {
    setIsDataLoading(true);
    get_Login_UserData()
      .then((response) => {
        if (response?.data?.image) {
          dispatch(setUserImage(IMAGE_URL + response?.data?.image));
        }
        setuser_id(response.data.id);
        setusername(response.data.user_name);
        setfname(response.data.full_name);
        setlname(response.data.full_name);
        setPhoneNo(response?.data?.phone_no);
        setEmail(response.data.email);
      })
      .finally(() => setIsDataLoading(false));
  };
  useEffect(() => {
    get_user_data();
  }, []);

  /////////error stateand function/////////
  const [email_error, setEmailError] = useState("");
  const onpressemail = () => {
    // setEmailError("you can't edit your email");
    setEmailError(TranslationStrings.YOU_CANNOT_EDIT_YOUR_EMAIL);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor={"#26295E"} barStyle="light-content" />

        <Loader isLoading={isDataLoading} />

        <CustomHeader
          headerlabel={TranslationStrings.EDIT_PROFILE}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
          type={"singleicon"}
        />

        <View>
          <View style={styles.userimage}>
            {user_image != "" ? (
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Image
                  source={{ uri: user_image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Image
                  source={appImages.User}
                  style={{ width: wp(10), height: hp(5) }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={{
                position: "absolute",
                bottom: hp(0),
                right: wp(0),
                width: wp(12),
                height: hp(6),
                borderRadius: hp(6) / 2,
              }}
            >
              <Image
                source={appImages.Camera}
                style={{
                  width: wp(12),
                  height: hp(6),
                  position: "absolute",
                  bottom: hp(0),
                  right: wp(0),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View>
            <CustomTextInput
              icon={appImages.email}
              type={"withouticoninput"}
              term={username}
              returnType={"next"}
              onNext={() => {
                ref_input2.current.focus();
              }}
              placeholder={TranslationStrings.ENTER_USERNAME}
              onTermChange={(newUsername) => setusername(newUsername)}
            />
            <CustomTextInput
              onRef={ref_input2}
              icon={appImages.lock}
              type={"withouticoninput"}
              term={fname}
              returnType={"next"}
              onNext={() => {
                ref_input3.current.focus();
              }}
              placeholder={TranslationStrings.ENTER_FIRST_NAME}
              onTermChange={(newFname) => setfname(newFname)}
            />
            <CustomTextInput
              onRef={ref_input3}
              icon={appImages.lock}
              type={"withouticoninput"}
              term={lname}
              placeholder={TranslationStrings.ENTER_LAST_NAME}
              onTermChange={(newLname) => setlname(newLname)}
            />

            <CustomTextInput
              onRef={ref_input4}
              icon={appImages.lock}
              type={"withouticoninput"}
              term={phoneNo}
              placeholder={TranslationStrings.ENTER_PHONE_NUMBER}
              keyboard_type={"number-pad"}
              onTermChange={(text) => setPhoneNo(text)}
            />

            <TouchableOpacity onPress={() => onpressemail()}>
              <CustomTextInput
                onRef={ref_input3}
                icon={appImages.lock}
                type={"withouticoninput"}
                term={email}
                editable={false}
                disable={false}
                placeholder="Enter Email"
                onTermChange={(newLname) => setlname(newLname)}
              />
            </TouchableOpacity>
            <Text style={{ color: "red", marginLeft: wp(10) }}>
              {email_error}
            </Text>
            {/* <TouchableOpacity onPress={() => refCountryddRBSheet.current.open()}>
            <CustomTextInput
              onRef={ref_input3}
              icon={appImages.lock}
              type={"withouticoninput"}
              term={country_name}
              editable={false}
              disable={false}
              placeholder="Enter Country Name"
              onTermChange={(newLname) => setCountry(newLname)}
            />
                 </TouchableOpacity>
          <TouchableOpacity onPress={() => refCityddRBSheet.current.open()}>
          <CustomTextInput
              onRef={ref_input2}
              icon={appImages.lock}
              type={"withouticoninput"}
              term={city_name}
              editable={false}
              disable={false}
              returnType={"next"}
              onNext={() => {
                ref_input3.current.focus();
              }}
              placeholder="Enter City Name"
              onTermChange={(newFname) => setCity(newFname)}
            />
          </TouchableOpacity> */}
          </View>
        </View>
        <View style={{ flex: 0.7, marginTop: hp(0), marginBottom: hp(20) }}>
          <CustomButtonhere
            title={TranslationStrings.UPDATE}
            widthset={80}
            topDistance={18}
            loading={loading}
            disabled={disable}
            onPress={() => {
              Edit_User_Profile();
            }}
          />
        </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={"From Gallery"}
          type={"onepic"}
          type1={"editProfile"}
        />
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
          Icon={appImages.sucess}
          text={TranslationStrings.SUCCESS}
          subtext={TranslationStrings.USER_PROFILE_UPDATED}
          buttontext={TranslationStrings.GO_BACK}
          onPress={() => {
            setModalVisible(false);
            navigation?.goBack();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
