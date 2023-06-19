import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";

///////////////app components////////////////
import CustomButtonhere from "../../components/Button/CustomButton";
import CustomModal from "../../components/Modal/CustomModal";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import CustomHeader from "../../components/Header/CustomHeader";
import CamerBottomSheet from "../../components/CameraBottomSheet/CameraBottomSheet";

/////////////////dropdowns/////////////
import CountryDropDown from "../../components/Dropdowns/Location/Country";
import CityDropDown from "../../components/Dropdowns/Location/City";

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
import { setCountryName, setCityName } from "../../redux/Location/actions";

////////////////////app images////////
import { appImages } from "../../constant/images";

//////////////////////////app api/////////////////////////
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TranslationStrings from "../../utills/TranslationStrings";

const CreateProfile = ({ navigation, route }) => {
  /////////////previous data////////////
  const [predata] = useState(route.params);

  /////////////////////////redux///////////////////
  const { user_image } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  /////////////////////////redux///////////////////
  const { country_name, city_name } = useSelector(
    (state) => state.locationReducer
  );
  //////////////link dropdown////////////////
  const refCountryddRBSheet = useRef();
  const refCityddRBSheet = useRef();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  //camera and imagepicker
  const refRBSheet = useRef();

  ///////////////data states////////////////////
  const [username, setusername] = React.useState("");
  const [fname, setfname] = React.useState("");
  const [lname, setlname] = React.useState("");
  const [city, setCity] = React.useState("");
  const [country, setCountry] = React.useState("");

  //////////////////////Api Calling/////////////////
  const CreateProfile = async () => {
    const data = [
      {
        name: "profile",
        filename: "avatar-png.png",
        type: "image/foo",
        data: RNFetchBlob.wrap(user_image),
      },
      { name: "email", data: predata.useremail },
      { name: "username", data: username },
      { name: "fullName", data: fname + lname },
      { name: "city", data: city_name },
      { name: "country", data: country_name },
    ];
    RNFetchBlob.fetch(
      "POST",
      BASE_URL + "createProfile.php",
      {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        "Content-Type": "multipart/form-data",
      },
      data
    )
      .then((response) => response.json())
      .then(async (response) => {
        await AsyncStorage.setItem("Userid", response.data.id);
        dispatch(setCountryName(""));
        dispatch(setCityName(""));
        navigation.navigate("Drawerroute");
        // navigation.navigate("AccountVerification", {
        //   signup_role: route?.params?.signup_role,
        // });
      })
      .catch((error) => {
        alert("error" + error);
      });
  };

  //Api form validation
  const formValidation = async () => {
    // input validation
    if (username?.length == 0) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_USERNAME,
        color: "red",
      });
      setVisible("true");
    } else if (fname?.length == 0) {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_FIRST_NAME,
        color: "red",
      });
      setVisible("true");
    } else if (lname?.length == 0) {
      setsnackbarValue({
        value: TranslationStrings.ENTER_LAST_NAME,
        color: "red",
      });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      CreateProfile();
    }
  };
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar backgroundColor={"#26295E"} barStyle="light-content" />
        <CustomHeader
          headerlabel={"Create Profile"}
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
              style={{ position: "absolute", bottom: hp(0), right: wp(0) }}
            >
              <Image
                source={appImages.Camera}
                style={{
                  width: wp(12),
                  height: hp(6),
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
            <TouchableOpacity
              onPress={() => refCountryddRBSheet.current.open()}
            >
              <CustomTextInput
                onRef={ref_input3}
                icon={appImages.lock}
                type={"withouticoninput"}
                term={country_name}
                editable={false}
                disable={false}
                placeholder={TranslationStrings.ENTER_COUNTRY_NAME}
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
                placeholder={TranslationStrings.ENTER_CITY_NAME}
                onTermChange={(newFname) => setCity(newFname)}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 0.7, marginTop: hp(0), marginBottom: hp(20) }}>
          <CustomButtonhere
            title={TranslationStrings.CREATE}
            widthset={80}
            topDistance={18}
            loading={loading}
            disabled={disable}
            onPress={() => {
              formValidation();
            }}
          />
        </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={"From Gallery"}
          type={"onepic"}
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
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.failed}
          text={TranslationStrings.ERROR}
          subtext={TranslationStrings.USER_ALREADY_REGISTERED}
          buttontext={TranslationStrings.GO_BACK}
          onPress={() => {
            setModalVisible(false);
          }}
        />
        <CountryDropDown
          refRBSheet={refCountryddRBSheet}
          onClose={() => refCountryddRBSheet.current.close()}
        />
        <CityDropDown
          refRBSheet={refCityddRBSheet}
          onClose={() => refCityddRBSheet.current.close()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProfile;
