import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ImageBackground,
} from "react-native";

////////////////////paper////////////////////
import { Checkbox, Snackbar } from "react-native-paper";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomTextInput from "../../../components/TextInput/CustomTextInput";
import CamerBottomSheet from "../../../components/CameraBottomSheet/CameraBottomSheet";
import CustomModal from "../../../components/Modal/CustomModal";
import IconsTopTabs from "../../../components/TopTabs/IconsTabs/IconsTopTabs";
//-------------->Dropdowns
import Categories from "../../../components/Dropdowns/Categories";
import ProductCondition from "../../../components/Dropdowns/ProductCondition";

/////////////app styles////////////////
import styles from "./styles";
import Uploadstyles from "../../../styles/GlobalStyles/Upload";
import Colors from "../../../utills/Colors";
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
} from "../../../redux/actions";

/////////////////App Api function/////////////////
import { post_Item_Images } from "../../../api/Upload Item";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

import BlockUserView from "../../../components/BlockUserView";
import { get_user_status } from "../../../api/GetApis";
import CustomModal1 from "../../../components/Modal/CustomModal1";
import TranslationStrings from "../../../utills/TranslationStrings";

import RBSheet from "react-native-raw-bottom-sheet";

const UploadItem = ({ navigation, route }) => {
  const refRBSheetSubCat = useRef(null);
  const [subCatList, setSubCatList] = useState([]);
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
    nav_place,
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ///////////checkbox/////////////
  const [exchangebuychecked, setExchangebuyChecked] = React.useState(false);
  const [fixedpricechecked, setFixedpriceChecked] = React.useState(false);
  const [givingawaychecked, setGivingawayChecked] = React.useState(false);

  const [showBlockModal, setShowBlockModal] = useState(false);

  ////////Bottom sheet references/////////
  const refRBSheet = useRef();
  const refddRBSheet = useRef();
  const refsubddRBSheet = useRef();
  const refproductcondionddRBSheet = useRef();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

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

  const [addedListingId, setAddedListingId] = useState("");

  //////////////Api Calling////////////////////
  // const UploadItemDetail = async () => {
  //   var user_id = await AsyncStorage.getItem("Userid");
  //   var c_lat = parseFloat(location_lat);
  //   var c_lng = parseFloat(location_lng);
  //   console.log(
  //     "here we are:",
  //     c_lat,
  //     c_lng,
  //     user_id,
  //     parseFloat(location_lat),
  //     parseFloat(location_lng),
  //     exchangebuychecked,
  //     givingawaychecked
  //   );
  //   shippingprice === " "
  //     ? setShippingPrice("0")
  //     : setShippingPrice(shippingprice);
  //   var data = JSON.stringify({
  //     user_id: user_id,
  //     title: title,
  //     description: description,
  //     price: givingawaychecked != true ? price : "0.0",
  //     category_id: category_id,
  //     subcategory_id: sub_category_id,
  //     product_condition: product_condition,
  //     fixed_price: fixedpricechecked != true ? "false" : "true",
  //     location: location_address,
  //     location_lat: parseFloat(location_lat),
  //     location_log: parseFloat(location_lng),
  //     exchange: exchangebuychecked != true ? "false" : "true",
  //     giveaway: givingawaychecked != true ? "false" : "true",
  //     shipping_cost:
  //       shippingprice === " " || givingawaychecked != true
  //         ? shippingprice
  //         : "0.0",
  //     youtube_link: youtubelink,
  //   });

  //   var config = {
  //     method: "post",
  //     url: BASE_URL + "PostingList.php",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios(config).then(function (response) {
  //     console.log(
  //       "update item response :     _______________",
  //       JSON.stringify(response.data)
  //     );

  //     console.log(
  //       "item_images_array  ___________________ : ",
  //       item_images_array
  //     );
  //     post_Item_Images({
  //       item_id: response.data.id,
  //       item_images: item_images_array,
  //     })
  //       .then((response) => response.json())
  //       .then((responseData) => {
  //         console.log("heer data:", responseData);
  //         dispatch(setItemImagesArray([]));
  //         dispatch(setLocationAddress());
  //         dispatch(setLocationLat());
  //         dispatch(setLocationLng());
  //         dispatch(setProductCondition());
  //         dispatch(setCategoryName());
  //         dispatch(setSubCategoryName());
  //         setPrice("");
  //         setTitle("");
  //         setYoutubeLink("");
  //         setDescription("");
  //         setShippingPrice("");
  //         setExchangebuyChecked(false);
  //         setFixedpriceChecked(false);
  //         setGivingawayChecked(false);
  //         setloading(0);
  //         setdisable(0);
  //         setModalVisible(true);
  //       })
  //       .catch((err) => {
  //         console.log("error raised : ", err);
  //         setloading(0);
  //       });
  //   });
  // };

  const UploadItemDetail = async () => {
    // setloading(0);
    // setModalVisible(true);
    // setAddedListingId("70");
    // return;
    var user_id = await AsyncStorage.getItem("Userid");
    var c_lat = parseFloat(location_lat);
    var c_lng = parseFloat(location_lng);
    console.log(
      "here we are:",
      c_lat,
      c_lng,
      user_id,
      parseFloat(location_lat),
      parseFloat(location_lng),
      exchangebuychecked,
      givingawaychecked
    );
    shippingprice === " "
      ? setShippingPrice("0")
      : setShippingPrice(shippingprice);
    var data = JSON.stringify({
      user_id: user_id,
      title: title,
      description: description,
      price: givingawaychecked != true ? price : "0.0",
      category_id: category_id,
      subcategory_id: sub_category_id,
      product_condition: product_condition,
      fixed_price: fixedpricechecked != true ? "false" : "true",
      location: location_address,
      location_lat: parseFloat(location_lat),
      location_log: parseFloat(location_lng),
      exchange: exchangebuychecked != true ? "false" : "true",
      giveaway: givingawaychecked != true ? "false" : "true",
      shipping_cost:
        shippingprice == ""
          ? "0.0"
          : shippingprice === " " || givingawaychecked != true
          ? shippingprice
          : "0.0",
      youtube_link: youtubelink,
    });

    console.log("data : ", data);
    // setloading(0);
    // return;

    var config = {
      method: "post",
      url: BASE_URL + "PostingList.php",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        let res = response.data;
        console.log("upload listing response : ", res);
        if (res?.status == false) {
          setsnackbarValue({
            value: res?.message,
            color: "red",
          });
          setVisible("true");
          setloading(0);
        } else {
          console.log(
            "listing images  ___________________ : ",
            item_images_array
          );
          console.log("response.data.id: ", response.data.id);
          if (item_images_array?.length > 0) {
            post_Item_Images({
              item_id: response.data.id,
              item_images: item_images_array,
            })
              .then((response) => response.json())
              .then((responseData) => {
                console.log(
                  "upload listing images response data:",
                  responseData
                );
                dispatch(setItemImagesArray([]));
                dispatch(setLocationAddress());
                dispatch(setLocationLat());
                dispatch(setLocationLng());
                dispatch(setProductCondition());
                dispatch(setCategoryName());
                dispatch(setSubCategoryName());
                setPrice("");
                setTitle("");
                setYoutubeLink("");
                setDescription("");
                setShippingPrice("");
                setExchangebuyChecked(false);
                setFixedpriceChecked(false);
                setGivingawayChecked(false);
                setloading(0);
                setdisable(0);
                // listing_id
                console.log("res?.id  : ", res?.id, res?.id);

                let listing_id = res?.id;
                setAddedListingId(listing_id);
                setModalVisible(true);
              })
              .catch((err) => {
                console.log(
                  "error raised while uploading listing images : ",
                  err
                );
                setloading(0);
              });
          } else {
            dispatch(setItemImagesArray([]));
            dispatch(setLocationAddress());
            dispatch(setLocationLat());
            dispatch(setLocationLng());
            dispatch(setProductCondition());
            dispatch(setCategoryName());
            dispatch(setSubCategoryName());
            setPrice("");
            setTitle("");
            setYoutubeLink("");
            setDescription("");
            setShippingPrice("");
            setExchangebuyChecked(false);
            setFixedpriceChecked(false);
            setGivingawayChecked(false);
            setloading(0);
            setdisable(0);
            let listing_id = res?.id;
            console.log("res?.id  : ", res?.id, res?.id);

            setAddedListingId(listing_id);
            setModalVisible(true);
          }
        }
      })
      .catch((err) => {
        console.log("error raised while adding listing : ", err);
      });
  };
  //Api form validation

  const formValidation = async () => {
    console.log("uploaded images list  :  ", item_images_array);
    // return;
    // post_Item_Images({
    //   item_id: "147",
    //   item_images: item_images_array,
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log("response: ", response);
    //   });
    // return;
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    // input validation
    if (title == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_ITEM_TITLE,
        color: "red",
      });
      setVisible("true");
    }
    //  else if (price == "") {
    //   setsnackbarValue({ value: "Please Enter Item Price", color: "red" });
    //   setVisible("true");
    // }
    else if (description == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_ENTER_ITEM_DESCRIPTION,
        color: "red",
      });
      setVisible("true");
    } else if (location_address == "") {
      setsnackbarValue({
        value: TranslationStrings.LOCATION_IS_REQUIRED,
        color: "red",
      });
      setVisible("true");
    } else if (category_id == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_SELECT_A_CATEGORY,
        color: "red",
      });
      setVisible("true");
    } else if (sub_category_id == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_SELECT_A_SUB_CATEGORY,
        color: "red",
      });
      setVisible("true");
    } else if (product_condition == "") {
      setsnackbarValue({
        value: TranslationStrings.PLEASE_SELECT_PRODUCT_CONDITION,
        color: "red",
      });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      UploadItemDetail();
    }
  };
  useEffect(() => {}, []);
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          height: hp(25),
          width: wp(82),
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: wp(0),
          alignSelf: "center",
          // marginLeft:wp(1.3),
          //marginRight:index === item_images_array.length - 1?wp(0):wp(2),
          borderRadius: wp(6),
          overflow: "hidden",
        }}
      >
        <ImageBackground
          blurRadius={4}
          resizeMode="cover"
          source={{ uri: item.path }}
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Image
            //source={appImages.dogIcon}
            source={{ uri: item.path }}
            // style={{ height: hp(25), width: wp(80), borderRadius: wp(6) }}
            style={{
              height: "100%",
              width: "100%",
              // backgroundColor: "white",
              // borderRadius: wp(6),
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
  useEffect(() => {
    console.log("Category changed ....   :   ", category_id, category_name);
    GetItemSubCategories(category_id);
  }, [category_id]);

  const GetItemSubCategories = async (category_id) => {
    console.log("category_id  passed  :::::::::::::::::::::: ", category_id);
    axios({
      method: "POST",
      url: BASE_URL + "specficdsubvcategors.php",
      data: {
        category_id: category_id,
      },
    })
      .then((res) => {
        if (res?.data?.error == false) {
          setSubCatList(res?.data?.Subcategory);
          console.log("res?.data?.Subcategory :  ", res?.data?.Subcategory);
        } else {
          setSubCatList([]);
          console.log("no data found......");
        }
        // console.log("res : ", res?.data);
      })
      .finally(() => {
        //handle final
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
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
          <View
            style={[Uploadstyles.mainview, { height: hp(25), width: wp(82) }]}
          >
            {/* <View style={{ alignItems: "center", justifyContent: "center" ,marginTop:hp(0),height:hp(0),width:wp(0),}}> */}
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
            {/* </View> */}
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
            editable={givingawaychecked ? false : true}
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
              onTermChange={(category) => {
                console.log("category selected :  ", category);
                setCategoryName(category);
              }}
            />
          </TouchableOpacity>
          {category_name?.length == 0 ? null : (
            <TouchableOpacity
              // onPress={() => refsubddRBSheet.current.open()}
              onPress={() => refRBSheetSubCat.current?.open()}
            >
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
          )}

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
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={youtubelink}
            placeholder={
              TranslationStrings.YOUTUBE_LINK +
              `(${TranslationStrings.OPTIONAL})`
            }
            onTermChange={(itemyoutubelink) => setYoutubeLink(itemyoutubelink)}
          />
          <CustomTextInput
            icon={appImages.email}
            type={"withouticoninput"}
            texterror={"invalid"}
            term={description}
            multiline={true}
            Lines={4}
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
            // placeholder="Shipping Price"
            placeholder={
              TranslationStrings.PICKUP_OR_DELIVERY_SHIPPING_PRICE +
              `(${TranslationStrings.OPTIONAL})`
            }
            onTermChange={(itemshippingprice) =>
              setShippingPrice(itemshippingprice)
            }
            keyboard_type={"numeric"}
            editable={givingawaychecked ? false : true}
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
            {/* {exchangebuychecked && (
              <Text style={{ color: "red", fontSize: 11 }}>
                Check if you don't want to see Exchange offers on your listing.
              </Text>
            )} */}
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
            {/* {fixedpricechecked && (
              <Text style={{ color: "red", fontSize: 11 }}>
                Check if you don't want to see different offers on your listing.
              </Text>
            )} */}
          </View>
        </View>
        {/* {fixedpricechecked === true || exchangebuychecked === true ? null : ( */}

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
                  setGivingawayChecked(!givingawaychecked),
                    setPrice(0),
                    setShippingPrice(0);
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
        {/* <Text
          style={{
            color: "#000",
            fontSize: 12,
            marginTop: 25,
            textAlign: "center",
          }}
        >
          Don't check any option if you want to receive offers.
        </Text> */}
        {/* )} */}

        <View style={{ marginBottom: hp(15) }}>
          <CustomButtonhere
            title={TranslationStrings.UPLOAD}
            widthset={80}
            topDistance={6}
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
        {/* <CustomModal
          // modalVisible={modalVisible}
          modalVisible={true}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={"Success"}
          subtext={
            "Item Upload Sucessfully \n\n Do you want to promote Your Listing"
          }
          buttontext={"OK k"}
          onPress={() => {
            setModalVisible(false),
              nav_place === "exchange"
                ? navigation.navigate("ExchangeOfferList")
                : addedListingId != ""
                ? navigation?.navigate("ListingsDetails", {
                    listing_id: addedListingId,
                  })
                : navigation.navigate("Home");
          }}
        /> */}

        <CustomModal1
          // modalVisible={modalVisible}
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.sucess}
          text={TranslationStrings.SUCCESS}
          subtext={`${TranslationStrings.ITEM_UPLOADED_SUCCESSFULLY} \n\n ${TranslationStrings.DO_YOU_WANT_TO_PROMOTE_YOUR_LISTING}`}
          buttontext={TranslationStrings.YES}
          cancelText={TranslationStrings.NOT_NOW}
          cancelPress={() => {
            setModalVisible(false);
            navigation?.navigate("ListingsDetails", {
              listing_id: addedListingId,
            });
          }}
          cancelable={true}
          onPress={() => {
            setModalVisible(false),
              // navigation?.navigate("ListingsDetails", {
              //   listing_id: addedListingId,
              // });

              navigation.navigate("Promote", { list_id: addedListingId });

            // nav_place === "exchange"
            //   ? navigation.navigate("ExchangeOfferList")
            //   : addedListingId != ""
            //   ? navigation?.navigate("ListingsDetails", {
            //       listing_id: addedListingId,
            //     })
            //   : navigation.navigate("Home");
          }}
        />
      </ScrollView>

      {/* ____________________________subcategory_________________________________________ */}
      <RBSheet
        //sstyle={{flex:1}}
        ref={refRBSheetSubCat}
        closeOnDragDown={true}
        closeOnPressMask={false}
        openDuration={50}
        closeDuration={50}
        animationType="fade"
        //height={500}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(52, 52, 52, 0.5)",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
          container: {
            borderTopLeftRadius: wp(10),
            borderTopRightRadius: wp(10),
            height: hp(95),
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 0,
          }}
        >
          <Text style={styles.bottomsheettext}>
            {TranslationStrings.SELECT_SUB_CATEGORY}
          </Text>
        </View>

        <FlatList
          data={subCatList}
          renderItem={({ item, index, separators }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                refRBSheetSubCat.current?.close();
                dispatch(setSubCategoryName(item.name));
                dispatch(setSubCategoryId(item.id));
              }}
            >
              <View style={styles.card}>
                <Text style={styles.cardtext}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "gray", marginVertical: 40, fontSize: 14 }}
                >
                  No Record Found
                </Text>
              </View>
            );
          }}
        />
      </RBSheet>
      {/* ____________________________subcategory_________________________________________ */}
    </SafeAreaView>
  );
};

export default UploadItem;
