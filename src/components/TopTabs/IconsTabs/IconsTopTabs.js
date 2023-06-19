import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

/////////////////styles////////////
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////react native paper//////
import { IconButton } from "react-native-paper";

////////////////app fonts//////////////
import { fontFamily } from "../../../constant/fonts";

////////////////amage url//////////
import { ADMIN_IMAGE_URL } from "../../../utills/ApiRootUrl";

const IconsTopTabs = (props) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        // width: wp(props.width),
        maxWidth: 150,
        marginHorizontal: 5,
      }}
      onPress={props.onpress}
    >
      <IconButton
        icon={({ size, color }) => (
          <Image
            source={{ uri: ADMIN_IMAGE_URL + props.icon }}
            style={{ width: wp(8), height: hp(5) }}
          />
        )}
        color={props.selected === props.id ? Colors.activetextinput : "grey"}
        iconColor={
          props.selected === props.id ? Colors.activetextinput : "grey"
        }
        size={20}
      />
      <Text
        style={{
          color:
            props.selected === props.id ? Colors.activetextinput : "#AAAAAA",
          fontSize: hp(1.6),
          fontFamily: fontFamily.Poppins_Medium,
        }}
        numberOfLines={2}
      >
        {props.title}
      </Text>
      {props.selected === props.id && (
        <View
          style={{
            height: hp(0.5),
            // width: wp(props.width),
            width: "100%",
            marginTop: hp(1.2),
            backgroundColor:
              props.selected === props.id ? Colors.activetextinput : "#AAAAAA",
            borderRadius: wp(2),
          }}
        ></View>
      )}
    </TouchableOpacity>
  );
};

export default IconsTopTabs;
