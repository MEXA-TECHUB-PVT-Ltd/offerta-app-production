import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

////////////app styles///////////////
import styles from "./styles";

////////////////app height and width///////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

///////////app images/////////////
import { appImages } from "../../constant/images";

const ReviewCards = (props) => {
  return (
    <View style={styles.card}>
      <View style={{ paddingHorizontal: wp(5) }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={appImages.dogIcon}
            style={{ width: wp(12), height: hp(6), borderRadius: wp(10) }}
            resizeMode="contain"
          />
          <View style={{ marginLeft: wp(4) }}>
            <Text style={styles.usertext}>Username</Text>
            <Text style={styles.userfullnametext}>Username</Text>
          </View>
        </View>
        <View style={{ marginTop: hp(1) }}></View>
        <Text style={styles.subtext}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et
        </Text>
      </View>
    </View>
  );
};

export default ReviewCards;
