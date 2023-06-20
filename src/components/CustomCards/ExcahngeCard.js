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
import { fontFamily } from "../../constant/fonts";

import Entypo from "react-native-vector-icons/Entypo";

const ExcahangeCard = (props) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  const formattedLikes =
    props.pricetext == null ? null : formatter.format(props.pricetext);
  return (
    // <TouchableOpacity
    //   onPress={() =>
    //     navigation.navigate("SliderScreen", {
    //       navplace: "Market",
    //       navtype: item.type,
    //     })
    //   }
    // >
    <TouchableOpacity
      disabled={props?.onPress ? false : true}
      onPress={props?.onPress}
      style={styles.Exchangecard}
    >
      {/* <View style={{backgroundColor:'red',height:hp(2),width:wp(5)}}>
  
  </View> */}
      {/* <View style={{ marginBottom: hp(4), marginTop: hp(5),alignItems:"center" }}> */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            height: hp(8),
            width: wp(18),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props?.image ? (
            <Image
              source={{ uri: props.image }}
              style={styles.Exchangeimage}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={require("../../assets/images/image.png")}
              style={{
                height: 40,
                width: 40,
                resizeMode: "contain",
                tintColor: "#ccc",
              }}
            />
          )}
        </View>

        <View style={{ marginLeft: wp(3), marginTop: 5 }}>
          <Text style={{ ...styles.Exchangetext }}>{props.maintext}</Text>
          <Text style={styles.Exchangesubtext}>{props.subtext}</Text>
        </View>
      </View>

      {props?.order_status && (
        <TouchableOpacity
          onPress={props?.onOrderStatusPress}
          style={{
            backgroundColor: props?.order_status == "pending" ? "red" : "green",
            position: "absolute",
            right: 0,
            borderBottomLeftRadius: 8,
            paddingHorizontal: 15,
            paddingTop: 3,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: fontFamily.Poppins_Regular,
              color: props?.promotion?.color == "#FFFFFF" ? "#000" : "#fff",
            }}
          >
            {props?.order_status}
          </Text>
        </TouchableOpacity>
      )}

      <View
        style={{
          flexDirection: props.pricetag != undefined ? "column" : "row",
          marginTop: hp(1),
        }}
      >
        {formattedLikes && (
          <Text
            style={[
              styles.Exchangepricetext,
              {
                right: props.pricetag != undefined ? wp(3) : wp(2),
                marginTop: 15,
              },
            ]}
            //numberOfLines={1}
          >
            $
            {props.pricetag != undefined
              ? formattedLikes + props.pricetag
              : formattedLikes}
          </Text>
        )}

        {props.cardtype === "like" ? (
          <Ionicons
            name={"heart"}
            size={20}
            color={"red"}
            style={{ right: wp(8.5) }}
            //onPress={() => navigation.navigate("Search")}
          />
        ) : null}
      </View>

      {/* </View> */}
    </TouchableOpacity>
    // </TouchableOpacity>
  );
};

export default ExcahangeCard;
