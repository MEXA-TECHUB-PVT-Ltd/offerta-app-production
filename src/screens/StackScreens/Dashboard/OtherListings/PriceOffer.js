import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

/////////////app icons/////////////////////
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import DashboardCard from "../../../../components/CustomCards/DashboardCard";
import CustomTextInput from "../../../../components/TextInput/CustomTextInput";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setExchangeOffer_OtherListing } from "../../../../redux/actions";

////////////////app Colors/////////////
import Colors from "../../../../utills/Colors";

/////////////app styles////////////////
import styles from "./styles";

//////////////app functions///////////////
import { post_Listings_Price_Offer } from "../../../../api/PostApis";

/////////////image url/////////////
import { IMAGE_URL } from "../../../../utills/ApiRootUrl";

///////////////////App Heigth and width///////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

/////////////////app images//////////
import { appImages } from "../../../../constant/images";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BlockUserView from "../../../../components/BlockUserView";
import { get_user_status } from "../../../../api/GetApis";
import TranslationStrings from "../../../../utills/TranslationStrings";

//////////////////appImages.//////////////////

const PriceOffer = ({ navigation, route }) => {
  ////////////////redux/////////////
  const { exchange_other_listing, exchange_my_listing } = useSelector(
    (state) => state.userReducer
  );

  console.log("exchange_other_listing  : ", exchange_other_listing);
  const dispatch = useDispatch();

  //////////////////Textinput state////////////
  const [offerprice, setOfferPrice] = React.useState(0);

  const [showBlockModal, setShowBlockModal] = useState(false);

  ////////////LISTING LIKES//////////
  const Listings_Exchange_Offer = async (props) => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    // console.log("props   :  ", props);
    // console.log("exchange_other_listing  :   ", exchange_other_listing.user_id);
    // console.log("exchange_other_listing  :   ", exchange_other_listing.id);
    // return;

    setList_Date({
      otheruser_id: exchange_other_listing.user_id,
      other_item_id: exchange_other_listing.id,
      item_offerprice: props,
    });

    var user_id = await AsyncStorage.getItem("Userid");

    post_Listings_Price_Offer(
      exchange_other_listing.user_id,
      exchange_other_listing.id,
      offerprice
    )
      .then((response) => {
        //dispatch(setExchangeOffer_OtherListing(list_data))
        console.log("exchnage response hereL:", response?.data);

        navigation.replace("ChatScreen", {
          buyer_id: user_id,
          sale_by: exchange_other_listing.user_id,
          userid: exchange_other_listing.user_id,
          offerprice: props,
          offerid: response.data.data.id,
          item_price: exchange_other_listing.price,
          navtype: "price_offer",
          listing_id: exchange_other_listing.id,
        });
        // setListing_Like_User_id(response.data.data.user_id);
      })
      .catch((err) => {
        console.log("Error  : ", err);
      });
  };
  const [list_data, setList_Date] = useState({
    otheruser_id: exchange_other_listing.user_id,
    other_item_id: exchange_other_listing.id,
    item_offerprice: offerprice,
  });
  useEffect(() => {
    console.log("image here:", exchange_other_listing);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.PRICE_OFFER}
          iconPress={() => {
            navigation.goBack();
          }}
          type={"no_icon"}
          icon={"arrow-back"}
        />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{ uri: IMAGE_URL + exchange_other_listing.images[0] }}
            style={{ width: wp(90), height: hp(30), borderRadius: wp(4) }}
            resizeMode="cover"
          />
        </View>
        <View style={{ paddingHorizontal: wp(3), marginTop: hp(3) }}>
          <Text style={{ color: "black" }}>
            {TranslationStrings.ITEM_PRICE}
          </Text>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={exchange_other_listing.price + "$"}
            placeholder={TranslationStrings.SHIPPING_PRICE}
            editable={false}
            //onTermChange={(my_price) => setMyPrice(my_price)}
            keyboard_type={"numeric"}
          />
          <Text style={{ color: "black" }}>
            {TranslationStrings.OFFER_PRICE}
          </Text>
          <CustomTextInput
            type={"withouticoninput"}
            texterror={"invalid"}
            term={offerprice}
            placeholder={TranslationStrings.ENTER_PRICE}
            onTermChange={(offer_price) => setOfferPrice(offer_price)}
            keyboard_type={"numeric"}
          />
        </View>

        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => Listings_Exchange_Offer(offerprice)}
          >
            <Text style={styles.btnText}>{TranslationStrings.SUBMIT}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PriceOffer;
