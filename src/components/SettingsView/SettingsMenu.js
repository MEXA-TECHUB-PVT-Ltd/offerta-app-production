import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

/////////////app icons/////////////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//////////////////app styles//////////////////
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////checkbox///////////////////
import { Checkbox } from "react-native-paper";

////////////////app redux///////////
import { useSelector } from "react-redux";
import Colors from "../../utills/Colors";

const SettingsMenu = ({ navigation, label, labelPress, icon, color }) => {
  ////////////////////redux/////////////////////
  const { theme } = useSelector((state) => state.userReducer);

  ////////////////////checkbox///////////////////
  const [checked, setChecked] = React.useState(false);

  return (
    <TouchableOpacity onPress={labelPress} style={styles.mainview}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: wp(80),
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name={icon}
            color={color ? color : "#404040"}
            size={22}
            onPress={labelPress}
          />
          <Text
            style={[
              styles.labeltext,
              { marginLeft: icon === undefined ? wp(0) : wp(3) },
            ]}
          >
            {label}
          </Text>
        </View>
        {icon === "phone" ? (
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            uncheckedColor={Colors.activetextinput}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        ) : (
          <Ionicons
            name="chevron-forward"
            color={"#404040"}
            size={20}
            onPress={labelPress}
          />
        )}
      </View>
      <View
        style={{
          width: wp(85),
          borderWidth: 0.3,
          borderColor: Colors.inactivetextinput,
          alignSelf: "center",
          marginTop: hp(2),
        }}
      ></View>
    </TouchableOpacity>
  );
};

export default SettingsMenu;
