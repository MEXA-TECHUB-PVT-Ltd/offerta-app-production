import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import SettingsMenu from "../../../../components/SettingsView/SettingsMenu";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TranslationStrings from "../../../../utills/TranslationStrings";

const Exchanges = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={TranslationStrings.EXCHANGES}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"chevron-back"}
      />

      <View style={{ marginTop: hp(0) }}></View>
      <SettingsMenu
        label={TranslationStrings.IN_COMING_EXCHANGE}
        labelPress={() => navigation.navigate("IncomingExchange")}
      />
      <SettingsMenu
        label={TranslationStrings.OUT_GOING_EXCHANGE}
        labelPress={() => navigation.navigate("OutGoingExchange")}
      />
      <SettingsMenu
        label={TranslationStrings.SUCCESS_EXCHANGE}
        labelPress={() => navigation.navigate("SucessExchange")}
      />
      <SettingsMenu
        label={TranslationStrings.FAILED_EXCHANGE}
        labelPress={() => navigation.navigate("FailedExchange")}
      />
    </SafeAreaView>
  );
};

export default Exchanges;
