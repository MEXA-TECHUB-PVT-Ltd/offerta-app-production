import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { appImages } from "../../../constant/images";
import Colors from "../../../utills/Colors";
import TranslationStrings from "../../../utills/TranslationStrings";

const GoogleButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        // backgroundColor: "#4285F4",
        backgroundColor: Colors.Appthemecolor,
        minWidth: TranslationStrings.getLanguage() == "en" ? 184 : 200,
        height: 40,
        // alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          // height: "90%",
          margin: 2,
          alignItems: "center",
          justifyContent: "center",
          width: "20%",
        }}
      >
        <Image
          source={appImages.google1}
          style={{
            height: 20,
            width: 20,
            resizeMode: "contain",
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({});
