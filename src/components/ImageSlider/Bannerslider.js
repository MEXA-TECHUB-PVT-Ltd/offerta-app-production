import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import React from "react";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Colors from "../../utills/Colors";
import { IMAGE_URL } from "../../utills/ApiRootUrl";

const { width, height } = Dimensions.get("screen");

const BannerSliderItem = ({ item }) => {
  const translateYImage = new Animated.Value(40);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={[styles.container]}>
      <View style={styles.imageview}>
        <Image
          source={{ uri: IMAGE_URL + item.app_img_link }}
          resizeMode="cover"
          style={[styles.image]}
        />
      </View>
    </View>
  );
};
export default BannerSliderItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: hp(25),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    alignItems: "center",
    //backgroundColor:'red'
  },
  image: {
    flex: 1,
    width: wp(90),
    height: hp(22),
    borderRadius: wp(6),
  },
  imageview: {
    width: wp(90.1),
    height: hp(25),
    borderRadius: wp(6),
    bordercolor: Colors.inactivetextinput,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
});
