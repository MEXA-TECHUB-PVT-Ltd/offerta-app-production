import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

//////////////////app components///////////////
import CustomHeader from "../../components/Header/CustomHeader";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import TranslationStrings, {
  ChangeAppLanguage,
} from "../../utills/TranslationStrings";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Language = ({ navigation, route }) => {
  const [Englishisfocused, setEnglishisFocused] = useState(false);
  const [Frenchisfocused, setFrenchisFocused] = useState(false);
  const [Arabicisfocused, setArabicisFocused] = useState(false);
  const [SpanishISFocused, setSpanishISFocused] = useState(false);

  useEffect(() => {
    getSelectedLanguage();
  }, []);

  const getSelectedLanguage = async () => {
    // let language = await AsyncStorage.getItem("Language");
    let language = TranslationStrings.getLanguage();
    if (language == "en") {
      setEnglishisFocused(true),
        setFrenchisFocused(false),
        setArabicisFocused(false);
      setSpanishISFocused(false);
    } else if (language == "es") {
      setEnglishisFocused(false),
        setFrenchisFocused(false),
        setArabicisFocused(false);
      setSpanishISFocused(true);
    }
  };

  const handleEnglishPress = async () => {
    setEnglishisFocused(true),
      setFrenchisFocused(false),
      setArabicisFocused(false);
    setSpanishISFocused(false);
    ChangeAppLanguage("en");
    await AsyncStorage.setItem("Language", "en");
    navigation.replace("Drawerroute");
  };
  const handleSpanishPress = async () => {
    setEnglishisFocused(false),
      setFrenchisFocused(false),
      setArabicisFocused(false);
    setSpanishISFocused(true);
    ChangeAppLanguage("es");
    await AsyncStorage.setItem("Language", "es");
    navigation.replace("Drawerroute");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.Language}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <TouchableOpacity
          style={[
            styles.Languagepickerview,
            {
              borderColor:
                Englishisfocused === false
                  ? Colors.inactivetextinput
                  : Colors.activetextinput,
            },
          ]}
          onPress={() => {
            handleEnglishPress();
          }}
        >
          <Text
            style={[
              styles.languagetext,
              {
                color:
                  Englishisfocused === false
                    ? Colors.inactivetextinput
                    : Colors.activetextinput,
              },
            ]}
          >
            English
          </Text>
          {Englishisfocused === true ? (
            <Icon
              name={"checkmark"}
              size={25}
              color={Colors.activetextinput}
              style={{ marginLeft: wp(30) }}
            />
          ) : null}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.Languagepickerview,
            {
              borderColor:
                SpanishISFocused === false
                  ? Colors.inactivetextinput
                  : Colors.activetextinput,
            },
          ]}
          onPress={() => {
            handleSpanishPress();
          }}
        >
          <Text
            style={[
              styles.languagetext,
              {
                color:
                  SpanishISFocused === false
                    ? Colors.inactivetextinput
                    : Colors.activetextinput,
              },
            ]}
          >
            Spanish
          </Text>
          {SpanishISFocused === true ? (
            <Icon
              name={"checkmark"}
              size={25}
              color={Colors.activetextinput}
              style={{ marginLeft: wp(30) }}
            />
          ) : null}
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[
            styles.Languagepickerview,
            {
              borderColor:
                Frenchisfocused === false
                  ? Colors.inactivetextinput
                  : Colors.activetextinput,
            },
          ]}
          onPress={() => {
            setEnglishisFocused(false),
              setFrenchisFocused(true),
              setArabicisFocused(false);
          }}
        >
          <Text
            style={[
              styles.languagetext,
              {
                color:
                  Frenchisfocused === false
                    ? Colors.inactivetextinput
                    : Colors.activetextinput,
              },
            ]}
          >
            French
          </Text>
          {Frenchisfocused === true ? (
            <Icon
              name={"checkmark"}
              size={25}
              color={Colors.activetextinput}
              style={{ marginLeft: wp(30) }}
            />
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.Languagepickerview,
            {
              borderColor:
                Arabicisfocused === false
                  ? Colors.inactivetextinput
                  : Colors.activetextinput,
            },
          ]}
          onPress={() => {
            setEnglishisFocused(false),
              setFrenchisFocused(false),
              setArabicisFocused(true);
          }}
        >
          <Text
            style={[
              styles.languagetext,
              {
                color:
                  Arabicisfocused === false
                    ? Colors.inactivetextinput
                    : Colors.activetextinput,
              },
            ]}
          >
            Arabic
          </Text>
          {Arabicisfocused === true ? (
            <Icon
              name={"checkmark"}
              size={25}
              color={Colors.activetextinput}
              style={{ marginLeft: wp(30) }}
            />
          ) : null}
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Language;
