import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

////////////////////paper////////////////////
import { Checkbox } from "react-native-paper";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";

////////////////country picker package/////////////
import CountryPicker from "react-native-country-picker-modal";

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

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

const PaymentMethod = ({ navigation, route }) => {
  ///////////checkbox/////////////
  const [checked, setChecked] = React.useState(false);

  ///////////////data states////////////////////
  const [cardno, setCardNo] = React.useState();
  const [expirydate, setExpiryDate] = React.useState();
  const [cvv, setCvv] = React.useState();
  const [country, setCountry] = React.useState();

  ////////////country picker states/////////////
  const [CountryPickerView, setCountryPickerView] = useState(false);
  const [countryCode, setCountryCode] = useState("92");
  const [countryname, setCountryName] = useState("Pak");

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
        <CustomHeader
          headerlabel={"Payment Method"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={cardno}
            placeholder="Enter Card Number"
            onTermChange={(newUsername) => setCardNo(newUsername)}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={expirydate}
            placeholder="expiry date ( MM/YY )"
            onTermChange={(newFname) => setExpiryDate(newFname)}
          />
          <CustomTextInput
            type={"withouticoninput"}
            term={cvv}
            placeholder="Enter CVC"
            onTermChange={(newCvv) => setCvv(newCvv)}
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
              placeholder="Select Country"
              onTermChange={(newcountry) => setCountryName(newcountry)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(8),
            marginTop: hp(2),
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Giving Away</Text>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            uncheckedColor={Colors.activetextinput}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={"PAY"}
            widthset={80}
            topDistance={10}
            onPress={() => {
              navigation.navigate("Drawerroute");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethod;
