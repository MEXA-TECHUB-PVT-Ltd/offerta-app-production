import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

///////////////app icons///////////////
import Icon from "react-native-vector-icons/Ionicons";

////////////////navigation///////////////
import { useNavigation } from "@react-navigation/native";

////////////////////Heigth and width//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;

////////////////Colors/////////////////
import Colors from "../../utills/Colors";

////////////app fonts//////////
import { fontFamily } from "../../constant/fonts";

////////////////app images//////////////
import { appImages } from "../../constant/images";

const ChatHeader = ({
  username,
  bio,
  picture,
  onlineStatus,
  onPress,
  viewstate,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name={"arrow-back"}
          size={25}
          color={"white"}
          onPress={() => navigation.goBack()}
          style={{ marginLeft: wp(0) }}
        />
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          <View>
            <Image source={picture} style={styles.image} resizeMode="contain" />
            <View style={{ position: "absolute", right: 0, bottom: hp(0.5) }}>
              <Image
                source={appImages.onlinechatdot}
                style={styles.icondot}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.onlineStatus}>{onlineStatus}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.Appthemecolor,
    borderBottomRightRadius: wp(3),
    borderBottomLeftRadius: wp(3),
    height: Height * 0.1,
    width: wp(100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  backButton: {
    alignSelf: "center",
    paddingHorizontal: wp(2.5),
  },
  profileOptions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(2),
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#fff",
    flex: 4,
  },
  image: {
    height: hp(7),
    width: wp(15),
    borderRadius: wp(10),
  },
  icondot: {
    height: hp(1.8),
    width: wp(4),
  },
  usernameAndOnlineStatus: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: wp(2),
  },
  username: {
    color: "white",
    fontSize: hp(2),
    fontFamily: fontFamily.Poppins_SemiBold,
  },
  onlineStatus: {
    color: Colors.appgreycolor,
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Regular,
  },
});

export default ChatHeader;
