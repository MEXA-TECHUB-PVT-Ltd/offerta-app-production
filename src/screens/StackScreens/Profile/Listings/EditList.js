import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";

////////////////////paper////////////////////
import { Checkbox, Snackbar } from "react-native-paper";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../../components/Button/CustomButton";
import CustomTextInput from "../../../../components/TextInput/CustomTextInput";
import CamerBottomSheet from "../../../../components/CameraBottomSheet/CameraBottomSheet";
import CustomModal from "../../../../components/Modal/CustomModal";

//-------------->Dropdowns
import Categories from "../../../../components/Dropdowns/Categories";
import ProductCondition from "../../../../components/Dropdowns/ProductCondition";

/////////////app styles////////////////
import styles from "./styles";
import Uploadstyles from "../../../../styles/GlobalStyles/Upload";
import Colors from "../../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setProductCondition,
  setCategoryName,
  setSubCategoryName,
  setItemImagesArray,
  setLocationAddress,
  setLocationLat,
  setLocationLng,
  setSubCategoryId,
  setCategoryId,
} from "../../../../redux/actions";

/////////////////App Api function/////////////////
import {
  edit_Item_Images,
  post_Item_Images,
} from "../../../../api/Upload Item";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../../constant/images";

///////////////////////api funtion///////////////
import {
  GetListingsDetails,
  GetListingsDetails_New,
} from "../../../../api/GetApis";
import TranslationStrings from "../../../../utills/TranslationStrings";
import Loader from "../../../../components/Loader/Loader";

const EditList = ({ navigation, route }) => {
  /////////////redux states///////
  const {
    category_name,
    product_condition,
    sub_category_name,
    category_id,
    sub_category_id,
    item_images_array,
    location_lng,
    location_lat,
    location_address,
    listing_id,
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  // console.log("item_images_array in edit item screen : ", item_images_array);

  ///////////checkbox/////////////
  const [exchangebuychecked, setExchangebuyChecked] = React.useState(false);
  const [fixedpricechecked, setFixedpriceChecked] = React.useState(false);
  const [givingawaychecked, setGivingawayChecked] = React.useState(false);

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();
  const refddRBSheet = useRef();
  const refsubddRBSheet = useRef();
  const refproductcondionddRBSheet = useRef();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  ///////////////data states of Item////////////////////
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [youtubelink, setYoutubeLink] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [shippingprice, setShippingPrice] = React.useState("");

  //////////////Api Calling////////////////////
  const UploadItemDetail = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    var c_lat = parseFloat(location_lat);
    var c_lng = parseFloat(location_lng);
    console.log(
      "here we are:",
      c_lat,
      c_lng,
      user_id,
      category_id,
      sub_category_id,
      product_condition,
      listing_id,
      location_lat,
      location_lng,
      exchangebuychecked,
      givingawaychecked,
      youtubelink,
      description,
      title
    );
    var data = JSON.stringify({
      id: listing_id,
      user_id: user_id,
      title: title,
      description: description,
      price: givingawaychecked != true ? price : "0.0",
      category_id: category_id,
      subcategory_id: sub_category_id,
      product_condition: product_condition,
      fixed_price: fixedpricechecked != true ? "false" : "true",
      location: location_address,
      //   location_lat: parseFloat(location_lat),
      //   location_log: parseFloat(location_lng),
      exchange: exchangebuychecked != true ? "false" : "true",
      giveaway: givingawaychecked != true ? "false" : "true",
      shipping_cost:
        shippingprice === " " || givingawaychecked != true
          ? shippingprice
          : "0.0",
      youtube_link: youtubelink,
    });

    var config = {
      method: "put",
      url: BASE_URL + "updateList.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config).then(function (response) {
      console.log(
        JSON.stringify(response.data),
        "................",
        item_images_array
      );
      setModalVisible(true);
      // edit_Item_Images({
      //   item_id: listing_id,
      //   item_images: item_images_array,
      // })
      post_Item_Images({
        item_id: response.data.id,
        item_images: item_images_array,
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(
            "listing images upload response.................:",
            responseData
          );
          // setModalVisible(true);
        });
    });
  };
  //Api form validation
  const formValidation = async () => {
    // input validation
    if (title == "") {
      setsnackbarValue({ value: "Please Enter Item Title", color: "red" });
      setVisible("true");
    }
    //  else if (price == "") {
    //   setsnackbarValue({ value: "Please Enter Item Price", color: "red" });
    //   setVisible("true");
    // }
    else if (description == "") {
      setsnackbarValue({
        value: "Please Enter Item Description",
        color: "red",
      });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      UploadItemDetail();
    }
  };
  const GetListData = async () => {
    setloading(true);
    // GetListingsDetails(listing_id)
    GetListingsDetails_New(listing_id)
      .then((res) => {
        let response = {
          data: res?.data[0],
        };
        dispatch(setItemImagesArray(response.data.images));
        dispatch(setLocationAddress(response.data.location));
        dispatch(setLocationLat(response.data.location_lat));
        dispatch(setLocationLng(response.data.location_log));
        dispatch(setProductCondition(response.data.product_condition));
        dispatch(setCategoryName(response.data.category.category_name));
        dispatch(setCategoryId(response.data.category.category_id));
        dispatch(
          setSubCategoryName(response.data.subcategory.sub_category_name)
        );
        dispatch(setSubCategoryId(response.data.subcategory.sub_category_id));
        setPrice(response.data.price);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setShippingPrice(response.data.shipping_cost);
        setYoutubeLink(response.data.youtube_link);
        //-----------------> listings checks
        setExchangebuyChecked(
          response.data.exchange === "false" ? false : true
        );
        setFixedpriceChecked(
          response.data.fixed_price === "false" ? false : true
        );
        setGivingawayChecked(response.data.giveaway === "false" ? false : true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    GetListData();
  }, []);

  ////////////////////images view////////////
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: wp(0),
          marginRight: index === item_images_array.length - 1 ? wp(0) : wp(2),
          overflow: "hidden",
        }}
      >
        <ImageBackground
          blurRadius={4}
          resizeMode="cover"
          source={
            route.params.navtype === "edit_list"
              ? { uri: item?.path ? item?.path : IMAGE_URL + item }
              : { uri: item.path }
          }
          style={{
            flex: 1,
            width: wp(84),
            justifyContent: "center",
            overflow: "hidden",
            borderRadius: 20,
          }}
        >
          <Image
            source={
              route.params.navtype === "edit_list"
                ? { uri: item?.path ? item?.path : IMAGE_URL + item }
                : { uri: item.path }
            }
            style={{
              height: hp(20),
              width: wp(84),

              alignSelf: "center",
            }}
            resizeMode="contain"
          />
        </ImageBackground>
        <TouchableOpacity
          onPress={() => navigation.navigate("CameraViewScreen")}
          style={{
            position: "absolute",
            top: hp(1.3),
            right: wp(2),
            backgroundColor: "green",
            borderRadius: wp(5),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              paddingVertical: hp(0.8),
              paddingHorizontal: wp(3),
              fontWeight: "bold",
            }}
          >
            Change
          </Text>
        </TouchableOpacity>
        {/* <Text style={Uploadstyles.uploadtext}>
    {item.path}
    </Text> */}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Loader isLoading={loading} />
        <CustomHeader headerlabel={TranslationStrings.UPLOAD_ITEMS} />
        {item_images_array.length === 0 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("CameraViewScreen")}
          >
            <View style={Uploadstyles.mainview}>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CameraViewScreen")}
                >
                  <Image
                    source={appImages.UploadIcpn}
                    style={Uploadstyles.uploadicon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={Uploadstyles.uploadtext}>
                  {TranslationStrings.UPLOAD_IMAGES}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={Uploadstyles.mainview}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: hp(0),
              }}
            >
              <FlatList
                data={item_images_array}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
              />
              {/* <Text style={Uploadstyles.uploadtext}>
                  {item_images_array.length}
                </Text>
                <Text style={Uploadstyles.uploadtext}>Images Uploaded</Text> */}
            </View>
          </View>
        )}

        <View>
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={title}
            placeholder={TranslationStrings.ITEM_TITLE}
            onTermChange={(itemtitle) => setTitle(itemtitle)}
          />
          {/* {givingawaychecked === true ? null : ( */}
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={price}
            placeholder={TranslationStrings.ITEM_PRICE}
            onTermChange={(itemprice) => setPrice(itemprice)}
            keyboard_type={"numeric"}
          />
          {/* )} */}

          <TouchableOpacity onPress={() => refddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={category_name}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.SELECT_CATEGORY}
              onTermChange={(category) => setCategoryName(category)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => refsubddRBSheet.current.open()}>
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={sub_category_name}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.SELECT_SUB_CATEGORY}
              onTermChange={(subcategory) => setSubCategoryName(subcategory)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refproductcondionddRBSheet.current.open()}
          >
            <CustomTextInput
              icon={appImages.downarrow}
              type={"iconinput"}
              term={product_condition}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.SELECT_PRODUCT_CONDITION}
              onTermChange={(newcountry) => setCondition(newcountry)}
            />
          </TouchableOpacity>
          {/* <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={bannerlink}
            placeholder="Date of listing"
            onTermChange={(newUsername) => setBannerLink(newUsername)}
          /> */}
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={youtubelink}
            placeholder={`${TranslationStrings.YOUTUBE_LINK} (optional)`}
            onTermChange={(itemyoutubelink) => setYoutubeLink(itemyoutubelink)}
          />
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={description}
            multiline={true}
            placeholder={TranslationStrings.DESCRIPTION}
            onTermChange={(desc) => setDescription(desc)}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Location")}>
            <CustomTextInput
              icon={appImages.email}
              type={"withouticoninput"}
              texterror={"invalid"}
              term={location_address}
              editable={false}
              disable={false}
              placeholder={TranslationStrings.ENTER_LOCATION}
              onTermChange={(itemlocation) => setLocationAddress(itemlocation)}
            />
          </TouchableOpacity>

          {/* {givingawaychecked === true ? null : ( */}
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={shippingprice}
            placeholder={TranslationStrings.PICKUP_OR_DELIVERY_SHIPPING_PRICE}
            onTermChange={(itemshippingprice) =>
              setShippingPrice(itemshippingprice)
            }
            keyboard_type={"numeric"}
          />
          {/* )} */}
        </View>

        <View
          style={{
            width: wp(85),
            borderRadius: wp(5),
            marginTop: hp(1),
            marginBottom: hp(1),
            borderColor: "#ccc",
            borderWidth: 1,
            alignSelf: "center",
            // alignItems: "center",
            // justifyContent: "space-between",
            paddingVertical: 13,
          }}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 12,
              // marginTop: 25,
              marginBottom: 15,
              // textAlign: "center",
              paddingHorizontal: wp(4),
            }}
          >
            {/* Don't check any option if you want to receive offers. */}
            {
              TranslationStrings.DONT_CHECK_ANY_OPTION_IF_YOU_WANT_TO_RECEIVE_OFFERS
            }
          </Text>
          <View style={{ paddingHorizontal: wp(4) }}>
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // marginTop: hp(2),
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>
                {TranslationStrings.NO_EXCHANGE_TO_BUY}
              </Text>
              <Checkbox
                status={exchangebuychecked ? "checked" : "unchecked"}
                color={Colors.activetextinput}
                uncheckedColor={Colors.activetextinput}
                onPress={() => {
                  setExchangebuyChecked(!exchangebuychecked);
                }}
              />
            </View> */}
          </View>
          <View style={{ paddingHorizontal: wp(4) }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // marginTop: hp(2),
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{TranslationStrings.FIXED_PRICE}</Text>
              <Checkbox
                status={fixedpricechecked ? "checked" : "unchecked"}
                color={Colors.activetextinput}
                uncheckedColor={Colors.activetextinput}
                onPress={() => {
                  setFixedpriceChecked(!fixedpricechecked);
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: wp(85),
            borderRadius: wp(5),
            marginTop: hp(1),
            marginBottom: hp(1),
            borderColor: "#ccc",
            borderWidth: 1,
            alignSelf: "center",
            // alignItems: "center",
            // justifyContent: "space-between",
            paddingVertical: 13,
          }}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 12,
              // marginTop: 25,
              marginBottom: 15,
              // textAlign: "center",
              paddingHorizontal: wp(4),
            }}
          >
            {/* Check If you want to give item for free. */}
            {TranslationStrings.CHECK_IF_YOU_WANT_TO_GIVE_ITEM_FOR_FREE}
          </Text>
          <View style={{ paddingHorizontal: wp(4) }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // marginTop: hp(2),
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>{TranslationStrings.GIVING_AWAY}</Text>
              <Checkbox
                status={givingawaychecked ? "checked" : "unchecked"}
                color={Colors.activetextinput}
                uncheckedColor={Colors.activetextinput}
                onPress={() => {
                  {
                    setGivingawayChecked(!givingawaychecked),
                      setPrice(0),
                      setShippingPrice(0);
                  }
                }}
              />
            </View>
            {/* {givingawaychecked && (
              <Text style={{ color: "red", fontSize: 11 }}>
                Check If you want to give item for free.
              </Text>
            )} */}
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(8),
            marginTop: hp(2),
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Exchange to Buy</Text>
          <Checkbox
            status={exchangebuychecked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            uncheckedColor={Colors.activetextinput}
            onPress={() => {
              setExchangebuyChecked(!exchangebuychecked);
            }}
          />
        </View> */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(8),
            marginTop: hp(2),
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Fixed Price</Text>
          <Checkbox
            status={fixedpricechecked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            uncheckedColor={Colors.activetextinput}
            onPress={() => {
              setFixedpriceChecked(!fixedpricechecked);
            }}
          />
        </View> */}
        {/* {fixedpricechecked === true || exchangebuychecked === true ? null : ( */}
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: wp(8),
            marginTop: hp(2),
            alignItems: "center",
          }}
        >
          <Text style={styles.text}>Giving Away</Text>
          <Checkbox
            status={givingawaychecked ? "checked" : "unchecked"}
            color={Colors.activetextinput}
            uncheckedColor={Colors.activetextinput}
            onPress={() => {
              {
                setGivingawayChecked(!givingawaychecked),
                  setPrice(0),
                  setShippingPrice(0);
              }
            }}
          />
        </View> */}
        {/* )} */}

        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={TranslationStrings.UPDATE}
            widthset={80}
            topDistance={10}
            loading={loading}
            disabled={disable}
            onPress={() => {
              formValidation();
            }}
          />
        </View>
        <CamerBottomSheet
          refRBSheet={refRBSheet}
          onClose={() => refRBSheet.current.close()}
          title={"From Gallery"}
        />
        <Categories
          refRBSheet={refddRBSheet}
          onClose={() => refddRBSheet.current.close()}
        />
        <Categories
          refRBSheet={refsubddRBSheet}
          onClose={() => refsubddRBSheet.current.close()}
          type={"subcategory"}
        />
        <ProductCondition
          refRBSheet={refproductcondionddRBSheet}
          onClose={() => refproductcondionddRBSheet.current.close()}
        />
        <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(20),
            zIndex: 999,
          }}
        >
          {snackbarValue.value}
        </Snackbar>
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={TranslationStrings.SUCCESS}
          subtext={TranslationStrings.ITEM_UPDATED_SUCCESSFULLY}
          buttontext={TranslationStrings.OK}
          onPress={() => {
            setModalVisible(false), navigation.navigate("Listings");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditList;
