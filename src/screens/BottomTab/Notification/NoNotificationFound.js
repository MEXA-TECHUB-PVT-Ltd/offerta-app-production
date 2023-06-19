import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TranslationStrings from "../../../utills/TranslationStrings";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import FontAwesome from "react-native-vector-icons/FontAwesome";

const NoNotificationFound = ({ loading }) => {
  return (
    <View
      style={{
        height: 100,
        width: wp(100),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!loading && (
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="exclamation-circle" size={28} color={"gray"} />
          <Text
            style={{
              color: "gray",
              textAlign: "center",
              fontSize: 15,
              marginTop: 8,
            }}
          >
            {TranslationStrings.NO_RECORD_FOUND}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NoNotificationFound;

const styles = StyleSheet.create({});
