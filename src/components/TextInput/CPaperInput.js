import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DefaultTheme, TextInput as TextInputPaper } from "react-native-paper";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// import {useSelector} from 'react-redux';

const CPaperInput = (props) => {
  let isDarkMode = false;
  return (
    <TextInputPaper
      // label={'Email'}
      {...props}
      //   placeholder="Password"
      //   secureTextEntry={!showPassword}
      //   value={password}
      //   onChangeText={text => setPassword(text)}
      //   left={props?.left}
      //   right={props?.right}
      underlineColor={paperInputStyle.underlineColor}
      theme={{
        colors: paperInputStyle.paperInputThemeColor,
        // fonts: {
        //   bodyLarge: {
        //     ...DefaultTheme.fonts.bodyLarge,
        //     fontFamily: appFonts.Poppins_Light,
        //   },
        // },
      }}
      contentStyle={{
        // backgroundColor: 'red',
        // marginTop: 4,
        paddingTop: 5,
      }}
      style={{ ...paperInputStyle.paperInputContinaer, ...props.style }}
    />
  );
};

export default CPaperInput;

const paperInputStyle = StyleSheet.create({
  paperInputThemeColor: {
    primary: Colors.Appthemecolor,
    // surface: 'red',
    text: "#fff",

    // backgroundColor: 'red',
    onSurfaceVariant: "#000",
    // placeholder: 'red',
    // underlineColor: 'red',
  },
  paperInputContinaer: {
    width: wp(85),
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: 14,
    // marginVertical: 10,
    marginBottom: 10,
    marginTop: -10,
    // paddingHorizontal: 10,
    // height: 30,
    // paddingHorizontal: 0,
  },
  underlineColor: "#858585",
  iconSize: 23,
  iconColor: "gray",
});
