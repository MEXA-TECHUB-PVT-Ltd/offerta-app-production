import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

///////////////////paper///////////////
import { Checkbox } from "react-native-paper";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../../components/Button/CustomButton";
import CustomTextInput from "../../../../components/TextInput/CustomTextInput";
import CustomModal from "../../../../components/Modal/CustomModal";

////////////////country picker package/////////////
import CountryPicker from "react-native-country-picker-modal";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../../constant/images";
import TranslationStrings from "../../../../utills/TranslationStrings";

const Payment = ({ navigation, route }) => {
  //////////////Modal States////////////////////////
  const [modalVisible, setModalVisible] = useState(false);
  /////////////////checkbox////////
  const [checked, setChecked] = React.useState(false);

  ///////////////data states////////////////////
  const [cardno, setCardNo] = React.useState();
  const [expirydate, setExpiryDate] = React.useState();
  const [cvv, setCvv] = React.useState();
  ////////////country picker states/////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState("92");
  const [countryname, setCountryName] = useState("Pak");

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      {CountryPickerView == true ? (
        <CountryPicker
          withFilter={true}
          withCallingCode={true}
          withModal={true}
          withFlag={true}
          withFlagButton={true}
          withCountryNameButton={true}
          onSelect={(e) => {
            console.log("country here", e);
            var name = e.name.substring("4");
            setCountryPickerView(false);
            if (e.name === "Antarctica") {
              setCountryCode("672");
            }
            if (e.name === "Bouvet Island") {
              setCountryCode("55");
            } else {
              setCountryCode(JSON.parse(e.callingCode));
            }
            //setCountryFlag(JSON.parse(e.flag))
            //setCountryCode(JSON.parse(e.callingCode))
            setCountryName(e.name);
          }}
          onClose={(e) => {
            setCountryPickerView(false);
          }}
          visible={CountryPickerView}
        />
      ) : (
        <View></View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.PAYMENT_METHOD}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View
          style={[
            styles.timelineflex,
            {
              marginLeft: wp(0),
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: wp(8),
            }}
          >
            <View style={styles.timelineinnerview}></View>

            <View style={[styles.filedtimeline, { width: wp(34.5) }]}></View>
            <View style={styles.timelineinnerview}></View>
            <View style={[styles.filedtimeline, { width: wp(34.5) }]}></View>
            <View style={styles.timelineinnerview}></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: wp("2%"),
              //backgroundColor: 'red'
            }}
          ></View>
        </View>

        <View>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={cardno}
            placeholder={TranslationStrings.ENTER_CARD_NUMBER}
            onTermChange={(newCardno) => setCardNo(newCardno)}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={expirydate}
            placeholder={`${TranslationStrings.EXPIRY_DATE} ( MM/YY )`}
            onTermChange={(newexpirydate) => setExpiryDate(newexpirydate)}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={cvv}
            placeholder={TranslationStrings.ENTER_CVC}
            onTermChange={(newcvv) => setCvv(newcvv)}
          />

          <TouchableOpacity
            onPress={() => {
              setCountryPickerView(true);
            }}
          >
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={countryname}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.SELECT_COUNTRY}
              onTermChange={(newcountry) => setCountryName(newcountry)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(5),
            marginTop: hp(3),
          }}
        >
          <Text style={styles.timelinetext}>
            {TranslationStrings.SAVE_CARD}
          </Text>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
        <View style={{ marginBottom: hp(25) }}>
          <CustomButtonhere
            title={TranslationStrings.PAY}
            widthset={80}
            topDistance={25}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </View>
      </ScrollView>
      <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        Icon={appImages.sucess}
        text={TranslationStrings.SUCCESS}
        subtext={TranslationStrings.PAYED_SUCCESSFULLY}
        buttontext={TranslationStrings.OK}
        onPress={() => {
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Payment;
