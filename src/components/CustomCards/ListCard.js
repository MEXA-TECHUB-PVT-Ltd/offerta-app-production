import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

////////app styles////////////
import styles from "./styles";

/////////////app height and width/////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////app images///////////
import { appImages } from "../../constant/images";
import Colors from "../../utills/Colors";
import TranslationStrings from "../../utills/TranslationStrings";

const ListCard = (props) => {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={props.image}
            style={{ width: wp(12), height: hp(6), borderRadius: wp(10) }}
            resizeMode="contain"
          />
          <View style={{ marginLeft: wp(3) }}>
            <Text style={styles.balancetext}>{props.username}</Text>
            <Text style={styles.balancetext}>{props.fullname}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={[
            styles.btnview,
            {
              backgroundColor:
                props.type === true
                  ? Colors.activetextinput
                  : Colors.Appthemecolor,
            },
          ]}
          disabled={props.btnstatus}
        >
          <Text style={styles.btntext}>
            {props.type === true
              ? TranslationStrings.FOLLOWING
              : TranslationStrings.FOLLOW}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ListCard;
