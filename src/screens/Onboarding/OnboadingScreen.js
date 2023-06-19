import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ImageBackground,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from "react-native";

////////////////app icons////////////
import Ionicons from "react-native-vector-icons/Ionicons";

//////////////////////responsive library//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////app images////////
import { appImages } from "../../constant/images";

////////////////app store data//////////////////
import AsyncStorage from "@react-native-async-storage/async-storage";

////////////app styles////////////////
import Onboardingstyles from "../../styles/GlobalStyles/Onboardingstyles";
import Authstyles from "../../styles/GlobalStyles/Authstyles";

const OnboardingScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={appImages.Onboarding}
      resizeMode="cover"
      style={{ flex: 1, alignItems: "center" }}
    >
      <StatusBar backgroundColor={"#26295E"} barStyle="light-content" />

      <View style={Onboardingstyles.textview}>
        <Text style={Onboardingstyles.text}>Discover Your Next Style</Text>
        <Text style={Onboardingstyles.subtext}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod
        </Text>
      </View>

      <TouchableOpacity
        style={Onboardingstyles.btnview}
        onPress={() => navigation.navigate("Login")}
      >
        <View style={Onboardingstyles.btnarrowview}>
          <Ionicons
            name={"arrow-forward"}
            size={25}
            color={"white"}
            //    onPress={iconPress}
          />
        </View>
        <Text style={Onboardingstyles.btntext}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
export default OnboardingScreen;
