import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Snackbar } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Block_user_message } from "../utills/AppStrings";
const BlockUserView = ({ visible, setVisible }) => {
  const onDismissSnackBar = () => setVisible(false);
  return (
    <Snackbar
      //   duration={400}
      visible={visible}
      onDismiss={onDismissSnackBar}
      style={{
        backgroundColor: "red",
        marginBottom: hp(20),
        zIndex: 999,
        // position: "absolute",
        // top: 200,
      }}
      action={{
        label: "OK",
        onPress: () => {
          // Do something
          setVisible(false);
        },
      }}
    >
      {Block_user_message}
    </Snackbar>
  );
};

export default BlockUserView;

const styles = StyleSheet.create({});
