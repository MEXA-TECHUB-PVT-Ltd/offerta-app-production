import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//////////////////app icons/////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

/////////////app styles///////////////////
import styles from "./styles";
import Logostyles from "../../styles/GlobalStyles/Logostyles";
import Colors from "../../utills/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

////////////////////app images////////
import { appImages } from "../../constant/images";
import TranslationStrings from "../../utills/TranslationStrings";

const InviteFriends = ({ navigation }) => {
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
        <View style={{ alignItems: "center", marginBottom: hp(5) }}>
          <Text style={styles.friendsmaintext}>
            {TranslationStrings.INVITE_FRIENDS_VIA}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.friendsview, { backgroundColor: "#576AF4" }]}
        >
          <MaterialCommunityIcons
            name={"facebook-messenger"}
            size={25}
            color={"white"}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.friendstext}>
            {TranslationStrings.INVITE_FRIENDS_VIA_MESSENGER}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.friendsview, { backgroundColor: "#00AC28" }]}
        >
          <MaterialCommunityIcons
            name={"whatsapp"}
            size={25}
            color={"white"}
            onPress={() => navigation.goBack()}
          />
          <Text style={[styles.friendstext]}>
            {TranslationStrings.INVITE_FRIENDS_VIA_WHATSAPP}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.friendsview, , { backgroundColor: "#EA4335" }]}
        >
          <MaterialCommunityIcons
            name={"email"}
            size={25}
            color={"white"}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.friendstext}>
            {TranslationStrings.INVITE_FRIENDS_VIA_MAIL}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InviteFriends;
