import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackground,
} from "react-native";

/////////////render/////////////////
import RenderHtml from "react-native-render-html";

import moment from "moment/moment";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";

//////////////app pakages//////////////////
import ImagePicker from "react-native-image-crop-picker";

////////////////////app date picker pakaage////////////////////
import DateTimePicker from "@react-native-community/datetimepicker";

/////////////app styles////////////////
import styles from "./styles";
import Uploadstyles from "../../../styles/GlobalStyles/Upload";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setUserImage } from "../../../redux/actions";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

///////////upload image///////////////
import RNFetchBlob from "rn-fetch-blob";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

import BlockUserView from "../../../components/BlockUserView";
import { get_user_status } from "../../../api/GetApis";
import TranslationStrings from "../../../utills/TranslationStrings";
import Loader from "../../../components/Loader/Loader";

import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AddBanner = ({ route }) => {
  const navigation = useNavigation();
  //camera and imagepicker
  const refRBSheet = useRef();

  /////////////////////////redux///////////////////
  const { user_image } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //////////render html width///////////
  const { width } = useWindowDimensions();

  ///////////picker state/////////
  const [image, setImage] = useState("");

  const [showBlockModal, setShowBlockModal] = useState(false);

  const [loading1, setLoading1] = useState(false);

  //////////////////////cameraimage//////////////////
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      refRBSheet.current.close();

      setImage(image.path);
      let newfile = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf("/") + 1),
      };
      imagehandleUpload(newfile);
    });
  };
  ////////////////////library image//////////////////
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      refRBSheet.current.close();
      setImage(image.path);
      let newfile = {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf("/") + 1),
      };
      imagehandleUpload(newfile);
    });
  };

  ///////////////data states////////////////////
  const [bannerlink, setBannerLink] = React.useState("");
  // const [startdate, setStartDate] = React.useState();
  // const [enddate, setEndDate] = React.useState();
  //////////////////////Api Calling/////////////////
  const CreateProfile = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    const data = [
      {
        name: "app_img",
        filename: "avatar-png.png",
        type: "image/foo",
        data: RNFetchBlob.wrap(user_image),
      },
      { name: "user_id", data: user_id },
      { name: "start_date", data: startDate },
      { name: "end_date", data: endDate },
      { name: "app_img_link", data: bannerlink },
    ];
    RNFetchBlob.fetch(
      "POST",
      BASE_URL + "bannerAdApi.php",
      {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        "Content-Type": "multipart/form-data",
      },
      data
    )
      .then((response) => response.json())
      .then(async (responsehere) => {
        console.log(" api result", responsehere);
      })
      .catch((error) => {
        alert("error" + error);
      });
  };

  const validateURL = (url) => {
    var validUrl = require("valid-url");
    if (validUrl.isUri(url)) {
      console.log("Looks like an URI");
      return true;
    } else {
      console.log("Not a URI");
      return false;
    }
  };
  //////////////////////Api Calling/////////////////
  const CreateBanner = async () => {
    setLoading(true);
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      setLoading(false);
      return;
    }
    if (user_image === "" || user_image?.length == 0) {
      console.log("start date : ", startDate_String);
      setsnackbarValue({ value: "Please upload image", color: "red" });
      setVisible(true);
      setLoading(false);
    } else if (startDate_String?.length == 0) {
      setsnackbarValue({ value: "Please Select Start Date", color: "red" });
      setVisible(true);
      setLoading(false);
    } else if (endDate_String?.length == 0) {
      setsnackbarValue({ value: "Please Select end Date", color: "red" });
      setVisible(true);
      setLoading(false);
    } else if (bannerlink?.length == 0) {
      setsnackbarValue({ value: "Please Enter banner link", color: "red" });
      setVisible(true);
      setLoading(false);
    } else if (!validateURL(bannerlink)) {
      setsnackbarValue({
        value: "Please Enter valid banner link",
        color: "red",
      });
      setVisible(true);
      setLoading(false);
    } else {
      let imageObj = {
        uri: user_image,
        name: user_image?.split("/")?.pop(),
        type: "image/jpeg",
      };
      var user_id = await AsyncStorage.getItem("Userid");

      // navigation?.replace("CardDetails", {
      //   type: "addbanner",
      //   user_id: user_id,
      //   start_date: moment(startDate).format("YYYY-MM-DD"),
      //   end_date: moment(endDate).format("YYYY-MM-DD"),
      //   app_img: imageObj,
      //   app_img_link: bannerlink,
      //   cast: bannerPrice * daysDifference,
      // });

      navigation.replace("PaymentMethods", {
        type: "addbanner",
        user_id: user_id,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        app_img: imageObj,
        app_img_link: bannerlink,
        cast: bannerPrice * daysDifference,
        fee: bannerPrice * daysDifference,
      });

      setLoading(false);
    }
    setLoading(false);

    return;
    var formdata = new FormData();
    formdata.append("user_id", user_id);
    formdata.append("start_date", moment(startDate).format("YYYY-MM-DD"));
    formdata.append("end_date", moment(endDate).format("YYYY-MM-DD"));
    formdata.append("app_img", imageObj);
    formdata.append("app_img_link", bannerlink);
    formdata.append("cast", bannerPrice * daysDifference);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(BASE_URL + "bannerAdApi.php", requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log("create banner response : ", response);
        if (response?.status == true) {
          alert(response?.message); //success
        } else {
          alert(response?.message); //error
        }
      })
      .catch((error) => console.log("error in create banner api", error));
  };

  const [bannerDescription, setBannerDescription] = useState("");
  const GetBannerDescription = async () => {
    axios({
      method: "GET",
      url: BASE_URL + "getbannerDescription.php",
    })
      .then(async function (response) {
        // console.log("response  :   ", response.data.description);
        setBannerDescription(response.data.description.split[0]);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  const [bannerPrice, setBannerPrice] = useState("");
  const GetBannerPrice = async () => {
    setLoading(true);
    axios({
      method: "GET",
      url: BASE_URL + "getBannerConfiguration.php",
    })
      .then(async function (response) {
        setBannerPrice(response.data.app_cost);
      })
      .catch(function (error) {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    GetBannerDescription();
    GetBannerPrice();
  }, []);
  const tagsStyles = {
    p: {
      fontSize: hp(2),
      color: "black",
      width: wp(90),
      marginHorizontal: wp(5),
    },
    ul: {
      marginHorizontal: wp(3),
    },
    li: {
      fontSize: hp(1.7),
      color: "black",
    },
    div: {
      color: "black",
      width: wp(85),
    },
  };
  ////////////////datetime picker states////////////////
  const [date, setDate] = useState(new Date());
  const [startdatemode, setStartDateMode] = useState("date");
  const [enddatemode, setEndDateMode] = useState("date");
  const [startdateshow, setStartDateShow] = useState(false);
  const [enddateshow, setEndDateShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [startDate_String, setStartDate_String] = useState("");
  const [endDate_String, setEndDate_String] = useState("");

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  const [showyearwise, setshowyearwise] = useState(false);
  const [showdaywise, setshowdaywise] = useState("");

  const [daysDifference, setDaysDifference] = useState(0);

  const onstartdateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setStartDateShow(Platform.OS === "ios");
    setStartDate(currentDate);
    var d = new Date();
    d = selectedDate;
    // console.log(d)
    //console.log(selectedDate)
    if (d != undefined) {
      let year = d.getFullYear();
      let month = (d.getMonth() + 1).toString().padStart(2, "0");
      let day = d.getDate().toString().padStart(2, "0");
      console.log(year + "-" + month + "-" + day);
      console.log(typeof (year + "-" + month + "-" + day));
      setshowyearwise(year + "-" + month + "-" + day);
      // setStartDate(year + "-" + month + "-" + day);

      let date_str = year + "-" + month + "-" + day;
      setStartDate_String(date_str);

      getDaysDifference(selectedDate, endDate, date_str, endDate_String);
      //console('date',showyearwise)
    }
  };
  const onenddateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setEndDateShow(Platform.OS === "ios");
    setEndDate(currentDate);
    var d = new Date();
    d = selectedDate;
    // console.log(d)
    //console.log(selectedDate)
    if (d != undefined) {
      let year = d.getFullYear();
      let month = (d.getMonth() + 1).toString().padStart(2, "0");
      let day = d.getDate().toString().padStart(2, "0");
      console.log(year + "-" + month + "-" + day);
      console.log(typeof (year + "-" + month + "-" + day));
      setshowyearwise(year + "-" + month + "-" + day);
      // setEndDate(year + "-" + month + "-" + day);
      let date_str = year + "-" + month + "-" + day;
      setEndDate_String(date_str);
      getDaysDifference(startDate, selectedDate, startDate_String, date_str);
      //console('date',showyearwise)
    }
  };

  const showStartDateMode = (currentMode) => {
    setStartDateShow(true);
    setStartDateMode(currentMode);
    console.log("mode", enddatemode);
  };

  const showEndDateMode = (currentMode) => {
    setEndDateShow(true);
    setEndDateMode(currentMode);
    console.log("mode", enddatemode);
  };

  const showStartDatepicker = () => {
    showStartDateMode("date");
  };
  const showEndDatepicker = () => {
    showEndDateMode("date");
  };

  const getDaysDifference = async (
    startDate,
    endDate,
    startDate_String,
    endDate_String
  ) => {
    if (startDate_String?.length > 0 && endDate_String?.length > 0) {
      if (startDate_String == endDate_String) {
        console.log("days :  1 ");
        setDaysDifference(1);
        console.log("both dates are equal");
      } else {
        var start = moment(startDate, "YYYY-MM-DD");
        var end = moment(endDate, "YYYY-MM-DD");
        let days = moment.duration(end.diff(start)).asDays();
        console.log("days :  ", days);
        setDaysDifference(days);
      }
    }

    // console.log("start Date  :    ", startDate_String);
    // console.log("End Date  :    ", endDate_String);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />

      <Loader isLoading={loading} />
      <Snackbar
        duration={2000}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {startdateshow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={startDate}
            mode={startdatemode}
            display="default"
            locale="es-ES"
            themeVariant="light"
            onChange={onstartdateChange}
            maximumDate={endDate_String ? endDate : null}
            style={{
              shadowColor: "#fff",
              shadowRadius: 0,
              shadowOpacity: 1,
              shadowOffset: { height: 0, width: 0 },
              color: "#1669F",
              textColor: "#1669F",
            }}
          />
        )}
        {enddateshow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={endDate}
            mode={enddatemode}
            display="default"
            locale="es-ES"
            themeVariant="light"
            onChange={onenddateChange}
            minimumDate={startDate_String ? startDate : null}
            style={{
              shadowColor: "#fff",
              shadowRadius: 0,
              shadowOpacity: 1,
              shadowOffset: { height: 0, width: 0 },
              color: "#1669F",
              textColor: "#1669F",
            }}
          />
        )}
        <CustomHeader
          headerlabel={TranslationStrings.ADD_BANNER}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={styles.toptext}>
            {bannerPrice + "$/" + TranslationStrings.DAY}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: hp(2),
            marginBottom: hp(3),
          }}
        >
          <RenderHtml
            contentWidth={width}
            source={{ html: bannerDescription }}
            tagsStyles={tagsStyles}
          />
        </View>
        {user_image === "" || user_image?.length == 0 ? (
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <View style={Uploadstyles.mainview}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Image
                  source={appImages.UploadIcpn}
                  style={Uploadstyles.uploadicon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text style={Uploadstyles.uploadtext}>
                {TranslationStrings.UPLOAD_IMAGE}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              ...Uploadstyles.mainview,
              overflow: "hidden",
            }}
          >
            <ImageBackground
              blurRadius={4}
              resizeMode="cover"
              source={{ uri: user_image }}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <Image
                source={{ uri: user_image }}
                style={{ height: hp(20), width: wp(83) }}
                resizeMode="contain"
              />
            </ImageBackground>
          </View>
        )}
        <View>
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={bannerlink}
            placeholder={TranslationStrings.ADD_BANNER_LINK}
            onTermChange={(newUsername) => setBannerLink(newUsername)}
          />
          <TouchableOpacity onPress={showStartDatepicker}>
            <CustomTextInput
              icon={appImages.lock}
              type={"withouticoninput"}
              // term={startDate}
              term={startDate_String}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.START_DATE}
              onTermChange={(newFname) => setStartDate(newFname)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={showEndDatepicker}>
            <CustomTextInput
              icon={appImages.lock}
              type={"withouticoninput"}
              // term={endDate}
              term={endDate_String}
              editable={false}
              placeholder={TranslationStrings.END_DATE}
              onTermChange={(newLname) => setEndDate(newLname)}
            />
          </TouchableOpacity>
          <View
            style={{
              paddingHorizontal: 30,
              padding: 20,
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.toptext}>
              {TranslationStrings.TOTAL_AMOUNT} : {bannerPrice * daysDifference}
              {"$"}
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={TranslationStrings.PAY_NOW}
            widthset={80}
            topDistance={3}
            onPress={() => {
              CreateBanner();
              //navigation.navigate("PaymentMethod");
            }}
          />
        </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={"From Gallery"}
          type={"onepic"}
          takePhotoFromCamera={takePhotoFromCamera}
          choosePhotoFromLibrary={choosePhotoFromLibrary}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddBanner;
