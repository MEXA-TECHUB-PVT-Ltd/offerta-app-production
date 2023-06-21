import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../../../components/Button/CustomButton";
import ExcahangeCard from "../../../../../components/CustomCards/ExcahngeCard";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../../../constant/images";

////////////////redux//////////////
import { setLoginUserShippingAddress } from "../../../../../redux/LoginUserActions";
import { useDispatch, useSelector } from "react-redux";
import TranslationStrings from "../../../../../utills/TranslationStrings";
import {
  create_order_Listings,
  create_order_Listings_new,
} from "../../../../../api/Offer";
import Loader from "../../../../../components/Loader/Loader";

const Checkout = ({ navigation, route }) => {
  ////////////////redux/////////////
  const { exchange_other_listing } = useSelector((state) => state.userReducer);
  const { login_user_shipping_address } = useSelector(
    (state) => state.loginuserReducer
  );

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  // // new
  const createListingOrder = async () => {
    try {
      console.log("createListingOrder  _________________________called...");
      setLoading(true);
      let mode = route?.params?.payment_type == "Paypal" ? "paypal" : "stripe";
      create_order_Listings_new(
        exchange_other_listing.user_id,
        exchange_other_listing.id,
        login_user_shipping_address.id,
        "fixed_price",
        mode
      )
        .then((response) => {
          console.log("create order response :  ", response?.data);
          let fee =
            route?.params?.buy_type == "live_stream"
              ? exchange_other_listing.price * route?.params?.quantity
              : exchange_other_listing?.price;
          console.log("fee__________________ : ", fee);
          if (response?.data?.success == true) {
            // setModalVisible(true);
            // handleNext();
            if (route?.params?.payment_type == "Paypal") {
              console.log("Paypal  :::::::::::::::::::::::::  ");
              navigation.navigate("PaypalPayment", {
                fee: fee,
                type: "listing_paypal",
                order_details: response?.data,
                // ...route?.params,
                //live streaming params
                user_id: route?.params?.user_id,
                listing_user_detail: route?.params?.listing_user_detail,
                buy_type: route?.params?.buy_type,
                quantity: route?.params?.quantity,
                streamId: route?.params?.streamId,
              });
            } else {
              // navigation.replace("CardDetails");
              navigation.replace("StripePayment", {
                fee: fee,
                type: "listing_stripe",
                order_details: response?.data,
                // ...route?.params,
                //live streaming params
                user_id: route?.params?.user_id,
                listing_user_detail: route?.params?.listing_user_detail,
                buy_type: route?.params?.buy_type,
                quantity: route?.params?.quantity,
                streamId: route?.params?.streamId,
              });
            }
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => {
          console.log("err : ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const handleNext = () => {
    createListingOrder();
    // if (route?.params?.payment_type == "Paypal") {
    //   navigation.navigate("PaypalPayment", {
    //     fee: exchange_other_listing?.price,
    //     type: "listing_paypal",
    //   });
    // } else {
    //   // navigation.replace("CardDetails");
    //   navigation.replace("StripePayment", {
    //     fee: exchange_other_listing?.price,
    //     type: "listing_stripe",
    //   });
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Loader isLoading={loading} />
        <CustomHeader
          headerlabel={TranslationStrings.BUY}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View
          style={[
            styles.timelineflex,
            {
              marginLeft: wp(0),
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: wp(8),
            }}
          >
            <View style={styles.timelineinnerview}></View>

            <View style={[styles.filedtimeline, { width: wp(36) }]}></View>
            <View style={styles.timelineinnerview}></View>
            <View style={[styles.timeline, { width: wp(37.6) }]}></View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: wp("2%"),
              //backgroundColor: 'red'
            }}
          ></View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: hp(2),
          }}
        >
          <Text style={styles.timelinetext}>{TranslationStrings.CHECKOUT}</Text>
        </View>
        <View>
          <ExcahangeCard
            image={IMAGE_URL + exchange_other_listing.images[0]}
            maintext={exchange_other_listing.title}
            subtext={exchange_other_listing.description}
            pricetext={exchange_other_listing.price}
            //pricetag={exchange_other_listing.price}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(5),
          }}
        >
          <Text style={styles.timelinetext}>
            {TranslationStrings.TOTAL_ITEMS}
          </Text>
          <Text style={styles.timelinetext}>
            {route?.params?.buy_type == "live_stream"
              ? route?.params?.quantity
              : "01"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(5),
          }}
        >
          <Text style={styles.timelinetext}>
            {TranslationStrings.TOTAL_PRICE}
          </Text>
          <Text style={styles.timelinetext}>
            {route?.params?.buy_type == "live_stream"
              ? exchange_other_listing.price * route?.params?.quantity
              : exchange_other_listing.price}
          </Text>
        </View>
        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={TranslationStrings.NEXT}
            widthset={80}
            topDistance={10}
            onPress={() => {
              handleNext();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;
