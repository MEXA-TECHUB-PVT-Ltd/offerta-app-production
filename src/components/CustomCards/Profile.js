import * as React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";

//////////////////navigation/////////////////
import { useNavigation } from "@react-navigation/native";

////////////app styles////////////
import styles from "./styles";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////app icons////////////
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//////////////app pakages/////////////
import { Avatar } from "react-native-paper";

///////////////////////Pic URL///////////////
import { IMAGE_URL } from "../../utills/ApiRootUrl";

const ProfileCard = (props) => {
  //console.log('here props:',props)

  const navigation = useNavigation();
  return (
    <View style={{ ...styles.profilecard, ...props.style }}>
      {props.userlogo === "" ? (
        <Avatar.Text
          size={wp(25)}
          label={
            props.username === ""
              ? null
              : props.username.substring(0, 2).toUpperCase()
          }
          style={{ backgroundColor: Colors.Appthemecolor }}
        />
      ) : (
        <Avatar.Image
          source={{ uri: IMAGE_URL + props.userlogo }}
          //source={props.userlogo}
          size={wp(25)}
          style={{ backgroundColor: Colors.appgreycolor }}
        />
      )}

      {/* <View style={{
           // justifyContent: "center", alignContent: 'center',
          width:wp(60)
        }}> */}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              marginTop: hp(2),
              alignItems: "center",
              width: wp(78),
              justifyContent: "center",
            }}
          >
            <Text style={styles.itemmaintext}>{props.username}</Text>
            {props.type === "other_user" ? (
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.inactivetextinput,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: hp(0.4),
                  paddingHorizontal: wp(3),
                  borderRadius: wp(5),
                  marginLeft: wp(0.8),
                }}
                onPress={
                  props.followStatus === "follow"
                    ? props.onfollowpress
                    : props.onunfollowpress
                }
              >
                <Text
                  style={styles.verticletext}
                  onPress={
                    props.followStatus === "follow"
                      ? props.onfollowpress
                      : props.onunfollowpress
                  }
                >
                  {props.followStatus}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={styles.itemsubtext}>{props.useremail}</Text>
        </View>

        {props?.verificationStatus == "verified" ? (
          <MaterialIcons
            name="verified-user"
            size={25}
            color={props?.userRole == "user" ? "blue" : "orange"}
            style={{
              position: "absolute",
              right: props.type === "other_user" ? wp(3) : wp(10),
            }}
          />
        ) : (
          <MaterialCommunityIcons
            name="shield-alert-outline"
            size={25}
            color={"red"}
            style={{
              position: "absolute",
              right: props.type === "other_user" ? wp(3) : wp(10),
            }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          marginTop: hp(1.5),
          marginBottom: hp(1),
          //backgroundColor:"red",
          width: props.type === "other" ? wp(45) : wp(62),
        }}
      >
        <View style={{ alignItems: "center" }}>
          {props.type === "other" ? (
            <Icon name={"facebook"} size={25} color={"blue"} />
          ) : (
            <Text style={styles.verticletext}>{props.followers}</Text>
          )}

          <Text
            style={styles.verticletext}
            onPress={() =>
              props.type === "other_user"
                ? null
                : navigation.navigate("Followers")
            }
          >
            {props.following_text}
          </Text>
        </View>
        <View style={styles.verticleLine}></View>
        <View style={{ alignItems: "center" }}>
          {props.type === "other" ? (
            <Icon name={"star"} size={25} color={"orange"} />
          ) : (
            <Text style={styles.verticletext}>{props.following}</Text>
          )}
          <Text
            style={styles.verticletext}
            onPress={() =>
              props.type === "other_user"
                ? null
                : navigation.navigate("Followings")
            }
          >
            {props.followers_text}
          </Text>
        </View>
        {props.type === "other" ? null : (
          <View style={styles.verticleLine}></View>
        )}
        {props.type === "other_user" ? (
          <View style={{ alignItems: "center" }}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Text style={styles.verticletext}>
                {props?.ratting ? props?.ratting?.toFixed(1) : 0}
              </Text>
              <Icon name={"star"} size={20} color={"orange"} />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.inactivetextinput,
                paddingVertical: hp(0.6),
                paddingHorizontal: wp(3),
                borderRadius: wp(5),
              }}
            >
              <Text style={styles.verticletext} onPress={props.onratepress}>
                {props.ratting_text}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.verticletext}>
              {props?.ratting ? props?.ratting?.toFixed(1) : 0}
            </Text>

            <Text
              style={styles.verticletext}
              //onPress={() => navigation.navigate("Reviews")}
            >
              {props.ratting_text}
            </Text>
          </View>
        )}
      </View>
      {/* </View> */}
    </View>
  );
};

export default ProfileCard;
