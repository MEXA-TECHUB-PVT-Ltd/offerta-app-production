import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  useWindowDimensions,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../components/Header/CustomHeader";

/////////////render/////////////////
import RenderHtml from "react-native-render-html";

/////////////app styles////////////////
import styles from "./Banner/styles";

////////////////////api function////////////////////
import { get_Terms_Condition } from "../../api/Blogs";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TranslationStrings from "../../utills/TranslationStrings";

const TermsCondition = ({ navigation }) => {
  //////////render html width///////////
  const { width } = useWindowDimensions();

  /////////////data state/////////////
  const [termsAndConditions, settermsAndConditions] = useState("");

  useEffect(() => {
    get_Terms_Condition().then((response) => {
      if (response.data.message === "No data available") {
        setdata("");
      } else {
        settermsAndConditions(response.data[0].terms_and_conditions);
      }
    });
  }, []);
  const tagsStyles = {
    p: {
      fontSize: hp(2),
      color: "black",
      width: wp(90),
      marginHorizontal: wp(5),
    },
    ul: {
      marginHorizontal: wp(3),
    },
    li: {
      fontSize: hp(1.7),
      color: "black",
    },
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.TERMS_AND_CONDITIONS}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View style={styles.textview}>
          <Text style={styles.text}>
            <View style={{ alignItems: "center", backgroundColor: "orange" }}>
              <RenderHtml
                contentWidth={width}
                source={{ html: termsAndConditions }}
                tagsStyles={tagsStyles}
              />
            </View>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsCondition;
