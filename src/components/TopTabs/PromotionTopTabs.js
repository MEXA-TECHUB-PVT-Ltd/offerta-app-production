import * as React from "react";
import { View, Text, ActivityIndicator, Image,TouchableOpacity } from "react-native";

///////////////colors/////////////////
import Colors from "../../utills/Colors";

////////////styles//////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

///////////////app fonts///////////////
import { fontFamily } from "../../constant/fonts";

const PromotionTopTabs = (props) => {
  return (
    <TouchableOpacity
    onPress={props.onpress}
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: wp(props.width),
        height:hp(4.5),
        borderRadius:wp(2),
        marginHorizontal:props.type === "sales&orders"?wp(6.4):wp(1),
        backgroundColor:props.selected === props.id ?'white':'#EBEBEB'
      }}
    >
      <Text
        style={{
          color: props.selected === props.id ? Colors.appgreycolor :Colors.Appthemecolor,
          fontSize: hp(1.6),
          fontFamily: fontFamily.Poppins_Medium,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default PromotionTopTabs;
