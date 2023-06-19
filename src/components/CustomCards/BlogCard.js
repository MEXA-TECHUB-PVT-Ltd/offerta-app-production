import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

////HEIGHT AND WIDTH////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

///////////////FONTS//////////////////////
import { fontFamily } from "../../constant/fonts";

//////////////IMAGE URL///////////////////////////
import { ADMIN_IMAGE_URL } from "../../utills/ApiRootUrl";
import TranslationStrings from "../../utills/TranslationStrings";

const BlogCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onpress} activeOpacity={0.9}>
      <View style={styles.blogcard}>
        <View style={{ marginBottom: hp(0), marginTop: hp(0) }}>
          <Image
            source={{ uri: ADMIN_IMAGE_URL + props.image }}
            style={styles.blogimage}
            resizeMode={"cover"}
          ></Image>
        </View>
        <View style={{ width: wp(38), paddingLeft: wp(1) }}>
          <Text numberOfLines={1} style={styles.blogmaintext}>
            {props.maintext}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: wp(15),
            }}
          >
            <View>
              <Text
                style={[
                  styles.blogsubtext,
                  { width: wp(15), fontFamily: fontFamily.Poppins_SemiBold },
                ]}
              >
                {TranslationStrings.CATEGORY}
              </Text>
              <Text style={[styles.blogsubtext, { width: wp(18) }]}>
                {props.subtext}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.blogsubtext,
                  {
                    textAlign: "right",
                    width: wp(15),
                    fontFamily: fontFamily.Poppins_SemiBold,
                  },
                ]}
              >
                {TranslationStrings.SUB_CATEGORY}
              </Text>
              <Text
                style={[
                  styles.blogsubtext,
                  { textAlign: "right", width: wp(15) },
                ]}
              >
                {props.subtext1}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BlogCard;
