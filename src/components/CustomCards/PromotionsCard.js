import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

////////////app styles//////////
import styles from "./styles";

///////////////app color/////////////
import Colors from "../../utills/Colors";

/////////app heigth and width//////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import TranslationStrings from "../../utills/TranslationStrings";

const PromotionsCard = (props) => {
  const navigation = useNavigation();
  /////////price formatter
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  const formattedLikes = formatter.format(props.pricetext);

  return (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate("SliderScreen", {
        //   navplace: "Market",
        //   navtype: item.type,
        // });

        navigation.navigate("ListingsDetails", {
          // listing_id: props.item?.listing?.id,
          listing_id: props.item?.listing_detail?.id,
        });
      }}
      style={styles.Promotionscard}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            backgroundColor:
              props.type === "Urgent" ||
              props.type === "urgent" ||
              props.type === "Urget" ||
              props.type === TranslationStrings.URGENT
                ? props?.tag_detail?.color
                  ? props?.tag_detail?.color
                  : "red"
                : props.type === "Advertisement" ||
                  props.type === "advertisement" ||
                  props.type == TranslationStrings.ADVERTISEMENT
                ? props?.tag_detail?.color
                  ? props?.tag_detail?.color
                  : "#576AF4"
                : Colors.inactivetextinput,
            height: hp(3.5),
            width:
              props.type === "Advertisement" || props.type === "advertisement"
                ? wp(15)
                : wp(20),
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-end",
            borderTopRightRadius: hp(2),
          }}
        >
          <Text style={styles.Promotionstagtext}>
            {props.type === "Urgent" ||
            props.type === "urgent" ||
            props.type === TranslationStrings.URGENT
              ? TranslationStrings.URGENT
              : props.type === "Advertisement" ||
                props.type === "advertisement" ||
                props.type == TranslationStrings.ADVERTISEMENT
              ? TranslationStrings.AD
              : TranslationStrings.EXPIRED}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: hp(10),
              width: wp(20),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: props.image }}
              // style={styles.Promotionsimage}
              style={{
                // height: wp(15),
                // width: wp(15),
                height: "100%",
                width: "100%",
                borderRadius: 10,
                resizeMode: "contain",
                backgroundColor: "gray",
              }}
            />
          </View>

          <View style={{ marginLeft: wp(3) }}>
            <Text style={styles.Promotionstext}>{props.maintext}</Text>
            <Text style={styles.Promotionssubtext}>{props.subtext}</Text>
          </View>

          <Text
            style={[
              styles.Promotionspricetext,
              { right: wp(0), width: "auto" },
            ]}
            numberOfLines={1}
          >
            {formattedLikes === "0" ? "free" : "$" + formattedLikes}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PromotionsCard;
