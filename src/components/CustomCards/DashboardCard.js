import * as React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

////////////react native paper/////////////
import { Checkbox } from "react-native-paper";

/////////////styles///////////////
import styles from "./styles";

/////////////colors////////////
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////app icons////////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import { fontFamily } from "../../constant/fonts";
import TranslationStrings from "../../utills/TranslationStrings";
import moment from "moment";
import { appImages } from "../../constant/images";

const DashboardCard = (props) => {
  const [checked, setChecked] = React.useState(true);

  /////////price formatter
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });
  const formattedLikes = formatter.format(props.price);

  return (
    <TouchableOpacity onPress={props.onpress} activeOpacity={0.9}>
      <View
        style={[
          styles.dashboardcard,
          {
            width: props.type === "Exchange_Request" ? wp(90) : wp(45),
            height: props.type === "Exchange_Request" ? hp(27) : hp(23),
            overflow: "hidden",
          },
        ]}
      >
        <View style={{ marginBottom: hp(0), marginTop: hp(0) }}>
          {props?.image ? (
            <ImageBackground
              blurRadius={4}
              resizeMode="cover"
              source={{ uri: props.image }}
              style={{
                // ...styles.dasboardimage,
                // flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: props.image }}
                style={[
                  // styles.dasboardimage,
                  {
                    width: props.type === "Exchange_Request" ? wp(90) : wp(45),
                    height: props.type === "Exchange_Request" ? hp(18) : hp(15),
                  },
                ]}
                resizeMode="contain"
              ></Image>
            </ImageBackground>
          ) : (
            <View
              style={{
                width: props.type === "Exchange_Request" ? wp(90) : wp(45),
                height: props.type === "Exchange_Request" ? hp(18) : hp(15),
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={appImages.no_image}
                style={{ height: 80, width: 80, tintColor: "gray" }}
                resizeMode="contain"
              />
            </View>
          )}

          {/* {(props?.tag == "sold" ||
            props?.tag == true ||
            props?.tag == "true") && (
            <View
              style={{
                backgroundColor: "red",
                position: "absolute",
                right: 0,
                borderBottomLeftRadius: 8,
                paddingHorizontal: 8,
                paddingTop: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily.Poppins_Regular,
                  color: "#fff",
                }}
              >
                {props?.tag}
              </Text>
            </View>
          )} */}

          {/* moment(new Date())?.format("YYYY-MM-DD") <
              moment(item?.promoted_detail?.Expirydate)?.format("YYYY-MM-DD") */}

          {(props?.promotion?.tag == "Advertised" ||
            props?.promotion?.tag == "Advertisement") &&
            moment(new Date())?.format("YYYY-MM-DD") <
              moment(props?.promotion?.Expirydate)?.format("YYYY-MM-DD") && (
              <View
                style={{
                  backgroundColor: props?.promotion?.color
                    ? props?.promotion?.color
                    : "#576AF4",
                  position: "absolute",
                  left: 0,
                  borderBottomLeftRadius: 8,
                  paddingHorizontal: 15,
                  paddingTop: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamily.Poppins_Regular,
                    color:
                      props?.promotion?.color == "#FFFFFF" ? "#000" : "#fff",
                  }}
                >
                  {/* Ad */}
                  {TranslationStrings.AD}
                </Text>
              </View>
            )}

          {(props?.promotion?.tag == "urgent" ||
            props?.promotion?.tag == "Urgent") &&
            moment(new Date())?.format("YYYY-MM-DD") <
              moment(props?.promotion?.Expirydate)?.format("YYYY-MM-DD") && (
              <View
                style={{
                  backgroundColor: props?.promotion?.color
                    ? props?.promotion?.color
                    : "#576AF4",
                  position: "absolute",
                  left: 0,
                  borderBottomLeftRadius: 8,
                  paddingHorizontal: 15,
                  paddingTop: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: fontFamily.Poppins_Regular,
                    color:
                      props?.promotion?.color == "#FFFFFF" ? "#000" : "#fff",
                  }}
                >
                  {/* Urgent */}
                  {TranslationStrings.URGENT}
                </Text>
              </View>
            )}

          {(props?.sold == "sold" ||
            props?.sold == true ||
            props?.sold == "true") && (
            <View
              style={{
                backgroundColor: "red",
                position: "absolute",
                right: 0,
                borderBottomLeftRadius: 8,
                paddingHorizontal: 8,
                paddingTop: 3,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily.Poppins_Regular,
                  color: "#fff",
                }}
              >
                {TranslationStrings.SOLD}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            width: props.type === "Exchange_Request" ? wp(85) : wp(42),
            paddingLeft: wp(1),
            marginTop: hp(1),
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: props?.added_by == "admin" ? 15 : 0,
            }}
          >
            <Text numberOfLines={1} style={styles.dashboardmaintext}>
              {props.maintext}
            </Text>
            <Text numberOfLines={1} style={styles.pricetext}>
              {props?.added_by == "admin"
                ? ""
                : formattedLikes === "0"
                ? "free"
                : "$" + formattedLikes}
              {/* //+"$"  */}
            </Text>
          </View>
          {props.type === "Exchange_Request" ? null : props.subtext ? (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Ionicons
                name={"location"}
                size={15}
                color={Colors.activetextinput}
                onPress={() => navigation.toggleDrawer()}
              />
              <Text numberOfLines={2} style={styles.blogsubtext}>
                {props.subtext}
              </Text>
            </View>
          ) : (
            <View style={{}}></View>
          )}
        </View>
      </View>
      {props.selected === true && props.type === "Selected_List" ? (
        <View
          style={{
            backgroundColor: "rgba(87,106,244,0.42)",
            position: "absolute",
            height: hp(23.3),
            width: wp(45),
            marginVertical: hp(2),
            marginHorizontal: wp(3),
            borderRadius: wp(4),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={"checkmark"}
            size={25}
            color={"white"}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
      ) : null}
      {props.selected === props.id && props.type === "Exchange_Offer" ? (
        <View
          style={{
            position: "absolute",
            height: hp(23.3),
            width: wp(45),
            marginVertical: hp(3),
            marginHorizontal: wp(3),
            borderRadius: wp(4),
          }}
        >
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(checked);
            }}
            color={"red"}
            //uncheckedColor={Colors.activetextinput}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default DashboardCard;
