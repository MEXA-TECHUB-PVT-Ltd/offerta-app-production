import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

/////////////react navigation////////////
import { useNavigation } from "@react-navigation/native";

/////////////app components////////////////
import CustomModal from "../Modal/CustomModal";

///////////////APP HEIGTH AND WIDTH///////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////app icons/////////////////////
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../utills/Colors";

////////////////app fonts//////////
import { fontFamily } from "../../constant/fonts";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setExchangeOffer_MyListing } from "../../../../redux/actions";

//////////////////API FUNCTION///////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////app images/////////////
import { appImages } from "../../constant/images";

import BlockUserView from "../BlockUserView";
import { get_user_status } from "../../api/GetApis";
import TranslationStrings from "../../utills/TranslationStrings";
import RattingModal from "../Modal/RattingModal";

import { Snackbar } from "react-native-paper";

const CustomMenu = (props) => {
  /////////////navigation state////////////
  const navigation = useNavigation();

  ////////////////redux/////////////
  const { listing_id, exchange_other_listing } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  //////////////modal states/////////////
  const [modalVisible, setModalVisible] = React.useState(false);
  const [msgmodalVisible, setMsgModalVisible] = React.useState(false);
  const [msgmodalVisible1, setMsgModalVisible1] = React.useState(false);

  const [showBlockModal, setShowBlockModal] = useState(false);

  const [rating, setRating] = useState(3.5);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selected_user_id, setSelected_user_id] = useState("");
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  //////////////delete/////////////
  const delete_Listing = () => {
    var data = JSON.stringify({
      id: listing_id,
    });

    var config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: BASE_URL + "deleteList.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setMsgModalVisible(false);
        navigation.navigate("Listings");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //////////////delete/////////////
  const mark_Status_Listing = () => {
    var data = JSON.stringify({
      list_id: listing_id,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: BASE_URL + "markAsSold.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (props?.otherParams?.type == "sale") {
          setShowRatingModal(true);
        } else {
          navigation.navigate("Listings");
          // navigation.replace("BuyersList", {
          //   listing_id: listing_id,
          // });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const AddRattings = async (ratted_user, rating) => {
    var user = await AsyncStorage.getItem("Userid");
    axios({
      method: "POST",
      url: BASE_URL + "reivewUser.php",
      data: {
        user_id: user,
        reviewed_user_id: ratted_user,
        review: rating,
      },
    })
      .then(async function (response) {
        console.log("response  : ", response?.data);
        // setsnackbarValue({
        //   value: "Review Submitted Successfully",
        //   color: "green",
        // });
        // setVisible(true);
        navigation.replace("Listings");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  //////////////delete/////////////
  const Report = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    var data = JSON.stringify({
      reportedBy_user_id: user_id,
      reported_user_id: exchange_other_listing.user_id,
    });

    var config = {
      method: "post",
      url: BASE_URL + "createReport.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log("report here", response.data);
        setMsgModalVisible(false);
        // navigation.navigate("Listings")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleMenuPress = async () => {
    console.log("this called...");

    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      console.log("her......");
      props.setShowBlockModal(true);

      return;
    }
    setModalVisible(true);
  };

  return (
    <View>
      <RattingModal
        title={TranslationStrings.RATE_BUYER}
        modalVisible={showRatingModal}
        CloseModal={() => setShowRatingModal(false)}
        ratted_user={props?.otherParams?.buyer_id}
        setRating={setRating}
        onDone={() => {
          setShowRatingModal(false);
          AddRattings(props?.otherParams?.buyer_id, rating);
        }}
      />
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: wp(3.5),
                paddingVertical: hp(4),
                borderRadius: wp(5),
                width: wp(50),
                marginRight: wp(5),
                marginTop: hp(2),
              }}
            >
              <FlatList
                data={props.menudata}
                renderItem={({ item, index }) => {
                  const isEnd = index === props.menudata.length - 1;
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          // console.log(item.label);
                          // return;
                          item.label === "View Profile" ||
                          item.label == TranslationStrings.VIEW_PROFILE
                            ? navigation.navigate("OtherProfile")
                            : item.label === "Make an Offer" ||
                              item.label == TranslationStrings.MAKE_AN_OFFER
                            ? navigation.navigate("PriceOffer")
                            : item.label === "Request Exchange" ||
                              item.label == TranslationStrings.REQUEST_EXCHANGE
                            ? navigation.navigate("ExchangeOfferList")
                            : item.label === "Edit Item" ||
                              item.label == TranslationStrings.EDIT_ITEM
                            ? navigation.navigate("EditList", {
                                navtype: "edit_list",
                              })
                            : item.label === "Mark as Sold" ||
                              item.label == TranslationStrings.MARK_AS_SOLD
                            ? mark_Status_Listing()
                            : item.label === "Delete" ||
                              item.label == TranslationStrings.DELETE
                            ? setMsgModalVisible(true)
                            : item.label === "Report Item" ||
                              item.label == TranslationStrings.REPORT_ITEM
                            ? setMsgModalVisible1(true)
                            : null;
                          setModalVisible(false);
                        }}
                        style={{ flexDirection: "row" }}
                      >
                        <MaterialCommunityIcons
                          name={item.icon}
                          color={Colors.appgreycolor}
                          size={20}
                        />
                        <Text
                          style={{
                            marginLeft: wp(2),
                            fontFamily: fontFamily.Poppins_Regular,
                            fontSize: hp(1.8),
                            color: Colors.Appthemecolor,
                          }}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                      {isEnd ? (
                        <View></View>
                      ) : (
                        <View
                          style={{
                            borderWidth: 0.5,
                            borderColor: "rgba(112,112,112,0.3)",
                            marginVertical: hp(1.3),
                            width: wp(38),
                            alignSelf: "center",
                          }}
                        ></View>
                      )}
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {props?.hideMenu == true ? null : (
        <TouchableOpacity onPress={() => handleMenuPress()}>
          <MaterialCommunityIcons
            name={"dots-vertical"}
            color={"#404040"}
            size={22}
            // onPress={() => setModalVisible(true)}
            onPress={() => handleMenuPress()}
          />
        </TouchableOpacity>
      )}
      <CustomModal
        modalVisible={msgmodalVisible}
        CloseModal={() => setMsgModalVisible(false)}
        Icon={appImages.confirm}
        text={TranslationStrings.CONFIRMATION}
        type={"confirmation"}
        subtext={TranslationStrings.DO_YOU_REALLY_WANT_TO_DELETE_THE_LISTINGS}
        buttontext={TranslationStrings.YES}
        buttontext1={TranslationStrings.CANCEL}
        onPress={() => {
          setMsgModalVisible(false);
        }}
        onPress1={() => {
          delete_Listing();
        }}
      />

      <CustomModal
        modalVisible={msgmodalVisible1}
        CloseModal={() => setMsgModalVisible1(false)}
        Icon={appImages.confirm}
        text={TranslationStrings.CONFIRMATION}
        type={"confirmation"}
        subtext={TranslationStrings.DO_YOU_REALLY_WANT_TO_REPORT + "?"}
        buttontext={TranslationStrings.YES}
        buttontext1={TranslationStrings.CANCEL}
        onPress={() => {
          setMsgModalVisible1(false);
        }}
        onPress1={() => {
          Report();
        }}
      />
    </View>
  );
};

export default CustomMenu;
