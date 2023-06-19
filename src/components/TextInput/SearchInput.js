import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  View,
} from "react-native";

/////////app icons//////////
import Ionicons from "react-native-vector-icons/Ionicons";

////////////////app fonts////////////
import { fontFamily } from "../../constant/fonts";

//////////////////////responsive library//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SearchTextInput = ({
  term,
  placeholder,
  onTermChange,
  disable,
  editable,
  returnType,
  onNext,
  onRef,
  secureTextEntry,
  keyboard_type,
  searchiconpress,
}) => {
  return (
    <View>
      <View style={[styles.TextFieldView]}>
        <TextInput
          style={[styles.TextField]}
          ref={onRef}
          autoCorrect={false}
          clearTextOnFocus={true}
          placeholder={placeholder}
          value={term}
          editable={editable}
          disabled={disable}
          returnKeyType={returnType}
          keyboardType={keyboard_type}
          placeholderTextColor={'white'}
          onChangeText={onTermChange}
          onSubmitEditing={onNext}
          secureTextEntry={secureTextEntry}
        ></TextInput>
        <Ionicons
        name={'search'}
        size={25}
        color={"white"}
        onPress={searchiconpress}
        style={{ marginRight: wp(4) }}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TextField: {
    fontSize: hp(1.6),
    marginLeft:wp(5),
    fontFamily: fontFamily.Poppins_Regular,
    color: "white",
    width: wp(62),
    //backgroundColor:'red'
  },
  TextFieldView: {
    flexDirection: "row",
    height: hp(7),
    width: wp(80),
    borderRadius: wp(3),
    marginTop: hp(1),
    marginBottom: hp(1),
    borderColor: "white",
    borderWidth: 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: wp(8),
    width: wp(3.5),
    height: hp(2.5),
  },
});

export default SearchTextInput;
