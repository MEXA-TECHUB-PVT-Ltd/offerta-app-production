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

///////////////////api function//////////////
import { get_Privacy_Policy } from "../../api/Blogs";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TranslationStrings from "../../utills/TranslationStrings";

const PrivacyTerms = ({ navigation }) => {
  //////////render html width///////////
  const { width } = useWindowDimensions();

  /////////////data state/////////////
  const [privacyPolicy, setprivacyPolicy] = useState("");

  useEffect(() => {
    get_Privacy_Policy().then((response) => {
      if (response.data.message === "No data available") {
        setdata("");
      } else {
        setprivacyPolicy(response.data[0].privacy_policy);
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
          headerlabel={TranslationStrings.PRIVACY_POLICY}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View style={styles.textview}>
          <Text style={styles.text}>
            <View
              style={{
                alignItems: "center",
                //backgroundColor: "orange",
                alignSelf: "center",
                marginHorizontal: wp(5),
              }}
            >
              <RenderHtml
                contentWidth={width}
                source={{ html: privacyPolicy }}
                tagsStyles={tagsStyles}
              />
            </View>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyTerms;
