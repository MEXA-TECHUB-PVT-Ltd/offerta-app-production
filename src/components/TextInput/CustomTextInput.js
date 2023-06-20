import React, { useState } from "react";

import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

/////////app icons//////////
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

////////////app colors///////////////
import Colors from "../../utills/Colors";

////////////////app fonts////////////
import { fontFamily } from "../../constant/fonts";

//////////////////////responsive library//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CustomTextInput = ({
  term,
  placeholder,
  onTermChange,
  type,
  icon,
  disable,
  editable,
  length,
  returnType,
  onNext,
  onRef,
  mode,
  secureTextEntry,
  onclick,
  multiline,
  keyboard_type,
  Lines,
  maxLength,
  borderWidth,
  borderBottomWidth,
  width,
  height,
}) => {
  const [isfocused, setisFocused] = useState(false);
  return (
    <View>
      <View
        style={[
          styles.TextFieldView,
          {
            width: width ? width : length === "small" ? wp(39) : wp(84),
            borderColor:
              isfocused == true
                ? Colors.activetextinput
                : Colors.inactivetextinput,
            height: height ? height : multiline === true ? hp(20) : hp(7),
            borderRadius: multiline === true ? wp(8) : wp(10),
            borderWidth: borderWidth ? borderWidth : 1,
            borderBottomWidth: borderBottomWidth ? borderBottomWidth : 1,
          },
        ]}
      >
        <TextInput
          style={[
            styles.TextField,
            {
              width: width
                ? width
                : length === "small"
                ? wp(23)
                : type === "iconinput"
                ? wp(64)
                : wp(74),
              textAlignVertical: multiline === true ? "top" : null,
              height: height ? height : multiline === true ? hp(16) : null,
              marginTop: multiline === true ? hp(0) : null,
            },
          ]}
          ref={onRef}
          maxLength={maxLength}
          autoCorrect={false}
          clearTextOnFocus={true}
          placeholder={placeholder}
          value={term}
          editable={editable}
          disabled={disable}
          returnKeyType={returnType}
          keyboardType={keyboard_type}
          // keyboardType={'numeric'}
          placeholderTextColor={Colors.inputplaceholder}
          onFocus={() => setisFocused(true)}
          onChangeText={onTermChange}
          onEndEditing={() => setisFocused(false)}
          onSubmitEditing={onNext}
          secureTextEntry={secureTextEntry}
          numberOfLines={Lines}
          multiline={multiline}
        ></TextInput>
        {type == "phone" && (
          <TouchableOpacity style={{ position: "absolute", right: 0 }}>
            <MaterialCommunityIcons
              name="phone"
              color={"#818181"}
              size={19}
              style={{ marginRight: wp(4) }}
            />
          </TouchableOpacity>
        )}
        {type === "iconinput" && mode === "password" ? (
          <TouchableOpacity onPress={onclick}>
            {secureTextEntry ? (
              <Ionicons
                name="lock-closed"
                color={"#818181"}
                size={19}
                style={{ marginRight: wp(8) }}
              />
            ) : (
              <Ionicons
                name="lock-open"
                color={"#818181"}
                size={19}
                style={{ marginRight: wp(8) }}
              />
            )}
          </TouchableOpacity>
        ) : type === "iconinput" || type === "iconinput_short" ? (
          <Image
            source={icon}
            style={[
              styles.icon,
              { marginRight: type === "iconinput_short" ? wp(8) : wp(6) },
            ]}
            resizeMode="contain"
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextField: {
    fontSize: hp(1.6),
    marginHorizontal: wp(5),
    fontFamily: fontFamily.Poppins_Regular,
    color: "#6B6B6B",
    width: wp(20),
    //backgroundColor:'red'
  },
  TextFieldView: {
    flexDirection: "row",
    height: hp(7),
    width: wp(85),
    borderRadius: wp(10),
    marginTop: hp(1),
    marginBottom: hp(1),
    borderColor: "#6B6B6B",
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    //backgroundColor:'yellow'
  },
  icon: {
    marginRight: wp(8),
    width: wp(4),
    height: hp(3),
  },
  ErrorText: {
    fontSize: 12,
    color: "red",
    marginHorizontal: 20,
  },
});

export default CustomTextInput;
