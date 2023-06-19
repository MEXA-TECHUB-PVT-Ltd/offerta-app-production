import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

//////////////////app icons////////////////
import Ionicons from "react-native-vector-icons/Ionicons";

import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { appImages } from "../../constant/images";

const ExcahangeOffersCards = (props) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  const formattedLikes = formatter.format(props.pricetext);
  return (
    // <TouchableOpacity
    //   onPress={() =>
    //     navigation.navigate("SliderScreen", {
    //       navplace: "Market",
    //       navtype: item.type,
    //     })
    //   }
    // >
    <View style={styles.Exchangeofferscard}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: props.image }}
          style={styles.Exchangeofferimage}
          resizeMode="contain"
        ></Image>
        <Text style={styles.Exchangetext}>{props.maintext}</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={appImages.horizontalexchangeicon}
          style={styles.Exchangeoffericon}
          resizeMode="contain"
        ></Image>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          source={{ uri: props.image2 }}
          style={styles.Exchangeofferimage}
          resizeMode="contain"
        ></Image>
        <Text style={styles.Exchangetext}>{props.maintext2}</Text>
      </View>
    </View>
    // </TouchableOpacity>
  );
};

export default ExcahangeOffersCards;
