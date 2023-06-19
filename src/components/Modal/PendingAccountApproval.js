import React from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";

import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////app colors////////////
import Colors from "../../utills/Colors";
import { fontFamily } from "../../constant/fonts";

const PendingAccountApproval = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.CloseModal}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.CloseModal}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Image
            source={props.Icon}
            style={{ width: wp(45), height: wp(40) }}
            resizeMode="contain"
          />

          <View
            style={{
              justifyContent: "center",
              marginTop: hp(2),
              alignItems: "center",
              marginBottom: hp(2),
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: hp(2.2),
                fontFamily: fontFamily.Poppins_Medium,
                color: Colors.Appthemecolor,
                // fontFamily: "Poppins",
                textAlign: "center",

                marginBottom: hp(1),
              }}
            >
              {props.text}
            </Text>
          </View>
          {props.subtext && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: hp(5),
                alignSelf: "center",
              }}
            >
              <Text style={styles.modalsubtext}>{props.subtext}</Text>
            </View>
          )}
          {props.buttontext &&
            (props.type === "confirmation" ? null : (
              <TouchableOpacity onPress={props.onPress}>
                <View style={styles.ApprovedView}>
                  <Text style={styles.Pendingtext}>{props.buttontext}</Text>
                </View>
              </TouchableOpacity>
            ))}
          {props.type === "confirmation" ? (
            <View style={styles.logoutbtnView}>
              <TouchableOpacity
                onPress={props.onPress}
                style={styles.cancelbtn}
              >
                <Text
                  style={[styles.Pendingtext, { color: Colors.Appthemecolor }]}
                >
                  {props.buttontext1}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onPress1} style={styles.donebtn}>
                <Text style={styles.Pendingtext}>{props.buttontext}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PendingAccountApproval;
