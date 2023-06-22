import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SelectCountry } from "react-native-element-dropdown";
import TranslationStrings, {
  ChangeAppLanguage,
} from "../../utills/TranslationStrings";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { appImages } from "../../constant/images";
import { fontFamily } from "../../constant/fonts";

const LanguageSelector = ({ onChange }) => {
  const language = [
    {
      value: "en",
      lable: "ENG",
      image: appImages.usa,
    },
    {
      value: "es",
      lable: "SPA",
      image: appImages.spain,
    },
  ];

  const [country, setCountry] = useState(TranslationStrings.getLanguage());
  return (
    <SelectCountry
      style={[
        {
          //   width: wp(28),
          width: 96,
          alignSelf: "center",
          height: 38,
          borderColor: "gray",
          borderWidth: 0.5,
          borderRadius: 5,
          paddingHorizontal: 8,
          position: "absolute",
          right: 20,
          top: 15,
        },
      ]}
      placeholderStyle={{
        fontSize: 14,
        fontFamily: fontFamily.Rockwell,
        marginLeft: 5,
        color: "#000",
      }}
      selectedTextStyle={{
        fontSize: 14,
        fontFamily: fontFamily.Rockwell,
        marginLeft: 5,
        color: "#000",
      }}
      imageStyle={{
        width: 16,
        height: 16,
      }}
      search={false}
      maxHeight={200}
      value={country}
      data={language}
      valueField="value"
      labelField="lable"
      imageField="image"
      placeholder=""
      searchPlaceholder="Search..."
      onChange={(e) => {
        onChange && onChange(e.value);
        ChangeAppLanguage(e.value);
        setCountry(e.value);
        console.log("e.value  : ", e.value);
      }}
    />
  );
};

export default LanguageSelector;

const styles = StyleSheet.create({});
