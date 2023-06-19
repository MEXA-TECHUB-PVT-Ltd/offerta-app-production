import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import { Checkbox } from "react-native-paper";
//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";

/////////////app styles////////////////
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { fontFamily } from "../../../constant/fonts";
import TranslationStrings from "../../../utills/TranslationStrings";

const PaymentMethods1 = ({ navigation, route }) => {
  const [selected_index, setSelected_index] = useState(-1);

  const handlePress = async (index) => {
    //credit_card  : 0
    //paypal  : 1
    //crypto  : 2

    setSelected_index(index);
    // if (index !== 1) {
    //   //   navigation.navigate("ConfirmAddress", {
    //   //     index: index,
    //   //   });
    //   navigation.replace("CardDetails", route?.params);
    // }
    // if (index == 1) {
    //   //paypal payment
    //   navigation.navigate("PaypalPayment", route?.params);
    // }
    navigation.replace("ConfirmAddress", {
      index: route?.params?.index,
      payment_type: index == 0 ? "Credit_card" : "Paypal",
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          //   headerlabel={TranslationStrings.BUY}
          headerlabel={"Payment Method"}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              color: Colors.Appthemecolor,
              fontFamily: fontFamily.Poppins_Bold,
              marginBottom: 30,
            }}
          >
            {TranslationStrings.CHOOSE_PAYMENT_METHOD}
          </Text>
          {route?.params?.listing_user_detail?.bank == "true" && (
            <TouchableOpacity
              style={styles1.btn}
              onPress={() => handlePress(0)}
            >
              <Text style={styles1.btnText}>Stripe</Text>
              {selected_index == 0 && (
                <View style={styles1.checkedView}>
                  <Checkbox status={"checked"} />
                </View>
              )}
            </TouchableOpacity>
          )}

          {route?.params?.listing_user_detail?.paypal == "true" && (
            <TouchableOpacity
              style={styles1.btn}
              onPress={() => handlePress(1)}
            >
              {/* <Text style={styles1.btnText}>{TranslationStrings.BIT_COIN}</Text> */}
              <Text style={styles1.btnText}>Paypal</Text>
              {selected_index == 1 && (
                <View style={styles1.checkedView}>
                  <Checkbox status={"checked"} />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethods1;
const styles1 = StyleSheet.create({
  btn: {
    height: hp(15),
    width: wp(90),
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: Colors.Appthemecolor,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  btnText: {
    color: "#000",
    fontSize: 18,
  },
  checkedView: { position: "absolute", top: hp(15) / 3, left: 0 },

  //
});
const styles = StyleSheet.create({
  ////////////////////////timeline////////////////
  timelineflex: {
    justifyContent: "center",

    //backgroundColor:'green'
  },
  timelinemainview: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: 80,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineinnerview: {
    width: wp("5%"),
    height: wp("5%"),
    borderRadius: 50,
    //borderColor: 'black',
    // borderWidth: 1,
    alignSelf: "center",
    backgroundColor: Colors.activetextinput,
  },
  timeline: {
    width: wp("31%"),
    borderColor: "#C7D8EB",
    borderTopWidth: 5,
  },
  filedtimeline: {
    width: wp("31%"),
    borderColor: Colors.activetextinput,
    borderTopWidth: 5,
  },
  timelinetext: {
    color: Colors.Appthemecolor,
    fontSize: hp(1.8),
    fontFamily: fontFamily.Poppins_Medium,
    marginTop: wp("2%"),
  },
});
