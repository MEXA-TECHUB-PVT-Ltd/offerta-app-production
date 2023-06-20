import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
} from "react-native";
//////////////map////////////////
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Marker,
  AnimatedRegion,
} from "react-native-maps";

////////////////////app components//////////////
import DescriptionBottomSheet from "../../../../components/CustomBottomSheet/DescriptionBTS";
import Loader from "../../../../components/Loader/Loader";

///////////////app icons////////////
import Icon from "react-native-vector-icons/Ionicons";

/////////////////app components/////////
import Slider from "../../../../components/ImageSlider/Slider";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setExchangeOffer_OtherListing,
  setListingId,
} from "../../../../redux/actions";

////////////////App Heigth Width////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////////////app styles////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";

/////////////////app images///////////
import { appImages } from "../../../../constant/images";

/////////////////async/////////////
import AsyncStorage from "@react-native-async-storage/async-storage";

////////////////helper functions/////////////
import {
  GetListingsDetails,
  GetComments,
  GetLikes,
  GetListingViews,
  GetListingsDetails_New,
  GETLIKES_NEW,
} from "../../../../api/GetApis";
import {
  GET_LIKE_STATUS_NEW,
  post_Like_Listings,
  post_Like_Listings_NEW,
  post_UnLike_Listings,
  post_UnLike_Listings_NEW,
  post_Views_Listings,
} from "../../../../api/PostApis";

///////////////////Menu Data//////////
// import {
//   // offer_options,
//   // exchange_options,
//   // generic_options,
// } from "../../../../data/Menulists";

import BlockUserView from "../../../../components/BlockUserView";
import { get_user_status } from "../../../../api/GetApis";

import ProfileCard from "../../../../components/CustomCards/Profile";
import CustomMenu from "../../../../components/CustomMenu/CustomMenu";
import CustomMenu1 from "../../../../components/CustomMenu/CustomMenu1";
import TranslationStrings from "../../../../utills/TranslationStrings";

import VideoPlayer from "react-native-video-player";

const MainListingsDetails = ({ navigation, route }) => {
  const offer_options = [
    { id: "1", label: TranslationStrings.VIEW_PROFILE, icon: "eye" },
    { id: "2", label: TranslationStrings.REPORT_ITEM, icon: "alert" },
    { id: "3", label: TranslationStrings.MAKE_AN_OFFER, icon: "tag" },
    { id: "4", label: TranslationStrings.SHARE, icon: "share-variant" },
  ];
  const exchange_options = [
    { id: "1", label: TranslationStrings.VIEW_PROFILE, icon: "eye" },
    { id: "2", label: TranslationStrings.REPORT_ITEM, icon: "alert" },
    {
      id: "3",
      label: TranslationStrings.REQUEST_EXCHANGE,
      icon: "swap-horizontal-bold",
    },
    { id: "4", label: TranslationStrings.SHARE, icon: "share-variant" },
  ];
  const generic_options = [
    { id: "1", label: TranslationStrings.VIEW_PROFILE, icon: "eye" },
    { id: "2", label: TranslationStrings.REPORT_ITEM, icon: "alert" },
    { id: "3", label: TranslationStrings.SHARE, icon: "share-variant" },
  ];

  const [isVideoLoading, setIsVideoLoading] = useState(false);

  ///////////////PREVIOUS DATA////////////
  const [predata] = useState(route.params);

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);

  //camera and imagepicker
  const refRBSheet = useRef();

  /////////////////redux////////////
  const {} = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  ////////////Listing Checks//////////////
  const [listing_like_user_id, setListing_Like_User_id] = useState(
    route?.params?.like ? route?.params?.login_user_id : ""
  );
  const [listing_views_user_id, setListing_Views_User_id] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  //-----------like list
  const listing_like = async (props) => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }
    // post_Like_Listings(props).then((response) => {

    //   setListing_Like_User_id(response.data.data.user_id);
    //   likes_count();
    // });
    post_Like_Listings_NEW(props).then((response) => {
      setListing_Like_User_id(response.data.data.user_id);
      likes_count();
    });
  };
  //-----------unlike list
  const listing_unlike = async (props) => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    // post_UnLike_Listings(props).then((response) => {
    //   setListing_Like_User_id(" ");
    //   likes_count();
    // });
    post_UnLike_Listings_NEW(props).then((response) => {
      setListing_Like_User_id(" ");
      likes_count();
    });
  };
  //----------likes count
  const likes_count = async () => {
    // GetLikes(predata.listing_id).then((response) => {
    //   console.log("getting like count od listings : ", response?.data);
    //   if (response.data.msg === "No one liked yet") {
    //     setListing_Likes_count(0);
    //   } else {
    //     setListing_Likes_count(response.data.Total);
    //     // listing_like(predata.listing_id);
    //   }
    // });
    GETLIKES_NEW(predata.listing_id).then((response) => {
      console.log("getting like count od listings : ", response?.data);
      let count = response?.data?.Total ? response?.data?.Total : 0;
      setListing_Likes_count(count);
      // if (response.data.msg === "No one liked yet") {
      //   setListing_Likes_count(0);
      // } else {
      //   setListing_Likes_count(response.data.Total);
      //   // listing_like(predata.listing_id);
      // }
    });
  };
  //---------------comments count
  const comments_count = () => {
    GetComments(predata.listing_id).then((response) => {
      if (response.data.msg === "No Result") {
        setListing_Comments_count(0);
      } else {
        setListing_Comments_count(response.data.length);
      }
    });
  };
  //---------------views count
  const views_count = () => {
    GetListingViews(predata.listing_id).then((response) => {
      setListing_Views_count(response.data.total_views);
    });
  };
  //---------------views post
  const listing_views = () => {
    post_Views_Listings(predata.listing_id).then((response) => {
      setListing_Views_User_id(response.data.data.user_id);
      views_count();
    });
  };
  /////////////Listing Detail states/////////////
  const [listing_user_id, setListing_User_Id] = useState();
  const [listing_images, setListing_Images] = useState([]);
  const [listing_item_title, setListing_Item_Title] = useState("");
  const [listing_item_price, setListing_Item_Price] = useState("");
  const [listing_comments_count, setListing_Comments_count] = useState();
  const [listing_likes_count, setListing_Likes_count] = useState();
  const [listing_views_count, setListing_Views_count] = useState();
  const [listing_details, setListing_Details] = useState();
  const [listing_category, setListing_Category] = useState();
  const [listing_subcategory, setListing_SubCategory] = useState();
  const [listing_condition, setListing_Condition] = useState();
  const [listing_date, setListing_Date] = useState();
  const [listing_location, setListing_Location] = useState();
  const [listing_shippingcost, setListing_ShippingCost] = useState();
  const [listing_youtubelink, setListing_YoutubeLink] = useState();
  const [listingLat, setListingLat] = useState();
  const [listingLng, setListingLng] = useState();

  const [listing_user_detail, setListing_user_detail] = useState(null);

  //-----------------> listings checks
  const [exchange_status, setExchnage_Status] = useState();
  const [fixed_price_status, setFixedPrice_Status] = useState();
  const [giveaway_status, setGiveaway_Status] = useState();

  const [showBlockModal, setShowBlockModal] = useState(false);

  const [listing_files, setListing_files] = useState([]);

  const GetLikeStatus = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    GET_LIKE_STATUS_NEW(predata.listing_id)
      .then((response) => {
        let isLike = response?.data?.islike ? response?.data?.islike : false;
        console.log("isLike  :  ", isLike);
        if (isLike) {
          setListing_Like_User_id(user_id);
        } else {
          setListing_Like_User_id("");
        }
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };
  useEffect(() => {
    GetLikeStatus();
  }, [listing_like_user_id]);

  const GetListData = async () => {
    // GetListingsDetails(predata.listing_id)
    console.log("getting listings details....");
    GetListingsDetails_New(predata.listing_id)
      .then((res) => {
        let response = {
          data: res?.data[0],
        };
        setListing_user_detail(response?.data?.user);
        setListing_User_Id(response.data.user_id);
        dispatch(setExchangeOffer_OtherListing(response.data));

        setListing_Item_Price(response.data.price);
        setListing_Item_Title(response.data.title);
        setListing_Details(response.data.description);
        setListing_Category(response.data.category.category_name);
        setListing_SubCategory(response.data.subcategory.sub_category_name);
        setListing_Condition(response.data.product_condition);
        setListing_Images(response.data.images);

        console.log("response.data.images : ", response.data.images);

        setVideoFile(response.data?.video);

        let list1 = [];
        if (response.data?.video) {
          let obj = {
            type: "video",
            path: response.data?.video,
          };
          list1.push(obj);
        }
        for (const element of response.data.images) {
          list1.push(element);
        }

        console.log(
          "list1 ____________________________________________ ",
          list1
        );
        setListing_files(list1);

        getuser();
        //setListingLat()
        //////////date//////////
        const year =
          response.data.created_at === ""
            ? null
            : response.data.created_at.substring(0, 4);
        const month =
          response.data.created_at === ""
            ? null
            : response.data.created_at.substring(5, 7);
        const day =
          response.data.created_at === ""
            ? null
            : response.data.created_at.substring(8, 10);
        const formattedDate = `${day}/${month}/${year}`;
        setListing_Date(formattedDate);
        setListingLat(response.data.location_lat);
        setListingLng(response.data.location_log);
        setListing_Location(response.data.location);
        setListing_ShippingCost(response.data.shipping_cost);
        setListing_YoutubeLink(response.data.youtube_link);
        //-----------------> listings checks
        setExchnage_Status(response.data.exchange);
        setFixedPrice_Status(response.data.fixed_price);
        setGiveaway_Status(response.data.giveaway);
        comments_count();
        likes_count();
        views_count();
        //listing_like(predata.listing_id)
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setRefreshing(false);
        setloading(false);
      });
  };
  useEffect(() => {
    GetListData();
    listing_views();
    //getuser();
  }, []);
  const [login_user_id, setlogin_user_id] = useState();
  const getuser = async () => {
    var user_id = await AsyncStorage.getItem("Userid");
    setlogin_user_id(user_id);
  };
  ///////////////youtube link////////////
  const handlePress = () => {
    Linking.openURL(youtube_link);
  };

  const handleCommentPress = async () => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    dispatch(setListingId(predata.listing_id));
    navigation.navigate("CommentsDetails", route.params);
  };

  const handleBuyNow = async () => {
    let user_status = await AsyncStorage.getItem("account_status");

    if (user_status == "block") {
      setShowBlockModal(true);
      return;
    }

    if (giveaway_status == true || giveaway_status == "true") {
      navigation.replace("ConfirmAddress", {
        index: -1,
        user_id: listing_user_id,
        listing_user_detail: listing_user_detail,
        type: "giveaway",
      });
    } else {
      // navigation.navigate("ConfirmAddress");
      navigation.replace("PaymentOptions", {
        user_id: listing_user_id,
        listing_user_detail: listing_user_detail,
      });
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    GetListData();
    listing_views();
  };

  // const handleCommentPress = async () => {
  //   navigation.navigate("CommentsDetails");
  // };

  return (
    <SafeAreaView style={styles.container}>
      <BlockUserView visible={showBlockModal} setVisible={setShowBlockModal} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[Colors.Appthemecolor]}
            onRefresh={() => handleRefresh()}
          />
        }
      >
        <StatusBar backgroundColor={"black"} barStyle="light-content" />
        <Loader isLoading={loading} />
        <View>
          <Slider
            // imagearray={listing_images}
            imagearray={listing_files}
            video={videoFile}
            listing_user_id={listing_user_id}
            type={"listing_detail"}
            hideMenu={true}
            hideChat={true}
            menuoptions={
              exchange_status === "true"
                ? exchange_options
                : fixed_price_status === "false"
                ? offer_options
                : generic_options
            }
          />
          <View
            style={{
              marginTop: hp(4),
              marginHorizontal: wp(7),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.maintext}>{listing_item_title}</Text>
            <Text style={styles.pricetext}>
              {giveaway_status === "true" ? "Free" : listing_item_price + " $"}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.iconview, { width: wp(55) }]}
            onPress={() => {
              handleCommentPress();
            }}
          >
            <Icon
              name={"chatbox-sharp"}
              size={20}
              color={Colors.activetextinput}
              style={{ marginRight: wp(3) }}
              onPress={() => {
                {
                  navigation.navigate("CommentsDetails", route.params);
                }
              }}
            />
            <Text
              style={{
                ...styles.icontext,
                width: "auto",
              }}
            >
              {listing_comments_count} {TranslationStrings.COMMENTS}
            </Text>
            <Icon
              name={"chevron-forward-sharp"}
              size={15}
              color={Colors.Appthemecolor}
              style={{ marginLeft: wp(3) }}
              // onPress={() => {
              //   {
              //     handleCommentPress();
              //   }
              // }}
            />
          </TouchableOpacity>
          {listing_like_user_id === login_user_id ? (
            <TouchableOpacity
              onPress={() => listing_unlike(predata.listing_id)}
            >
              <View style={styles.iconview}>
                <Icon
                  name={"heart"}
                  size={20}
                  color={Colors.activetextinput}
                  style={{ marginRight: wp(3) }}
                />
                <Text style={styles.icontext}>
                  {listing_likes_count} {TranslationStrings.LIKES}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.2}
              onPress={() => listing_like(predata.listing_id)}
              style={[styles.iconview, { width: wp(30) }]}
            >
              <Icon
                name={"heart-outline"}
                size={20}
                color={Colors.activetextinput}
                style={{ marginRight: wp(3) }}
              />
              <Text style={styles.icontext}>
                {listing_likes_count} {TranslationStrings.LIKES}{" "}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.iconview}>
            <Icon
              name={
                listing_views_user_id === login_user_id ? "eye" : "eye-outline"
              }
              size={20}
              color={Colors.activetextinput}
              style={{ marginRight: wp(3) }}
              onPress={() => {
                {
                }
              }}
            />
            <Text style={{ ...styles.icontext, width: "auto" }}>
              {listing_views_count} {TranslationStrings.VIEWS}
            </Text>
          </View>
          <View style={{ paddingHorizontal: wp(7) }}>
            <Text style={styles.subtext}>{listing_details}</Text>
          </View>

          <View style={{ paddingHorizontal: wp(7), marginTop: hp(2) }}>
            <View style={styles.rowtextview}>
              <Text style={styles.rowlefttext}>
                {TranslationStrings.CATEGORY}
              </Text>
              <Text style={styles.rowrighttext}>{listing_category}</Text>
            </View>
            <View style={styles.rowtextview}>
              <Text style={styles.rowlefttext}>
                {TranslationStrings.PRODUCT_CONDITION}
              </Text>

              <Text style={styles.rowrighttext}>
                {listing_condition?.toLowerCase() == "like new" ||
                listing_condition == "Como nuevo"
                  ? TranslationStrings.LIKE_NEW
                  : listing_condition?.toLowerCase() == "lightly used" ||
                    listing_condition == "Poco usado"
                  ? TranslationStrings.LIGHTLY_USED
                  : listing_condition?.toLowerCase() == "heavely used" ||
                    listing_condition == "Muy usado"
                  ? TranslationStrings.HEAVELY_USED
                  : listing_condition?.toLowerCase() == "new" ||
                    listing_condition == "Nuevo"
                  ? TranslationStrings.NEW
                  : listing_condition}
              </Text>
            </View>
            {listing_date === "" ? null : (
              <View style={styles.rowtextview}>
                <Text style={styles.rowlefttext}>
                  {TranslationStrings.DATE_OF_LISTING}
                </Text>
                <Text style={styles.rowrighttext}>{listing_date}</Text>
              </View>
            )}

            <View style={styles.rowtextview}>
              <Text style={styles.rowlefttext}>
                {TranslationStrings.LOCATION}
              </Text>
              <Text style={styles.rowrighttext}>{listing_location}</Text>
            </View>
            {listing_shippingcost === "" ? null : (
              <View style={styles.rowtextview}>
                <Text style={styles.rowlefttext}>
                  {TranslationStrings.SHIPPING_COST}
                </Text>
                <Text style={styles.rowrighttext}>{listing_shippingcost}$</Text>
              </View>
            )}
            {listing_youtubelink === "" ? null : (
              <View style={styles.rowtextview}>
                <Text style={styles.rowlefttext}>
                  {TranslationStrings.YOUTUBE_LINK}
                </Text>
                <Text style={styles.rowrighttext} onPress={() => handlePress()}>
                  {listing_youtubelink}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.locationview}>
            <Icon
              name={"location"}
              size={20}
              color={Colors.activetextinput}
              style={{ marginRight: wp(2) }}
            />
            <Text style={styles.locationtext}>{listing_location}</Text>
          </View>
          <View
            style={{
              height: hp(25),
              width: wp(100),
              alignItems: "center",
              marginBottom: hp(0),
            }}
          >
            {listingLat && listingLng > 0 ? (
              <MapView
                style={[styles.mapStyle]}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                initialRegion={{
                  latitude: listingLat,
                  longitude: listingLng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {listingLat && listingLng > 0 ? (
                  <Marker
                    coordinate={{
                      latitude: listingLat,
                      longitude: listingLng,
                    }}
                    //icon={<Ionicons name='location' color={Colors.BottomTabcolor}  size={25}></Ionicons>}
                    //image={appImages.orangeloc}
                  />
                ) : null}
              </MapView>
            ) : null}
          </View>
          <Text style={{ ...styles.maintext, marginTop: 20, marginLeft: 20 }}>
            {TranslationStrings.SELLER_DETAILS}:{" "}
          </Text>
          {listing_user_detail && (
            <View
              style={{
                padding: 20,
                alignItems: "center",
              }}
            >
              {/* <Text style={styles.maintext}>Owner Info : </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: wp(80),
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.maintext}>User Name : </Text>
                <Text style={styles.pricetext}>
                  {listing_user_detail?.user_name}
                </Text>
              </View>{" "}
              */}
              <ProfileCard
                style={{ marginBottom: -30, elevation: 0 }}
                // verificationStatus={listing_user_detail?.subscription}
                verificationStatus={listing_user_detail?.verify_status}
                userRole={listing_user_detail?.role}
                userlogo={listing_user_detail?.image}
                username={listing_user_detail?.user_name}
                useremail={listing_user_detail?.email}
                followers={listing_user_detail?.followers}
                following={listing_user_detail?.following}
                ratting={listing_user_detail?.review}
                ratting_text={TranslationStrings.RATE}
                following_text={TranslationStrings.FOLLOWERS}
                followers_text={TranslationStrings.FOLLOWINGS}
                // followStatus={
                //   follow_user_id === login_user_id ? "Unfollow" : "follow"
                // }
              />
            </View>
          )}

          {/* <Text>exchange_status : {exchange_status}</Text>
          <Text>fixed price : {fixed_price_status}</Text>
          <Text>give away : {giveaway_status}</Text> */}
          <View
            style={{
              flexDirection: "row",
              width: wp(90),
              alignSelf: "center",
            }}
          >
            <View style={styles.btnView1}>
              <TouchableOpacity
                style={{
                  ...styles.btn1,
                  marginTop: 0,
                  backgroundColor: "#01fe91",
                }}
                onPress={() => handleBuyNow()}
              >
                <Text style={styles.btnText}>{TranslationStrings.BUY_NOW}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnView1}>
              <TouchableOpacity
                style={{
                  ...styles.btn1,
                  backgroundColor: "#01a3ff",
                  marginTop: 0,
                }}
                // onPress={() => handleBuyNow()}
                onPress={() => {
                  // console.log("listing user id :  ", listing_user_id);
                  navigation.navigate("ChatScreen", {
                    navtype: "chatlist",
                    // userid: item?.item?.user?.id,
                    userid: listing_user_id,
                  });
                }}
              >
                <Text style={styles.btnText}>{TranslationStrings.CHAT}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: wp(90),
              alignSelf: "center",
            }}
          >
            {fixed_price_status != "true" && fixed_price_status != true && (
              <View style={styles.btnView1}>
                <TouchableOpacity
                  style={{
                    ...styles.btn1,
                    marginTop: 0,
                    // backgroundColor: "#01a3ff",
                  }}
                  // onPress={() => handleBuyNow()}
                  onPress={() => navigation.navigate("PriceOffer")}
                >
                  <Text style={styles.btnText}>
                    {TranslationStrings.MAKE_AN_OFFER}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {/* {exchange_status != "true" && exchange_status != true && (
              <View style={styles.btnView1}>
                <TouchableOpacity
                  style={{
                    ...styles.btn1,
                    marginTop: 0,
                    // backgroundColor: "#01fe91",
                  }}
                  // onPress={() => handleBuyNow()}
                  onPress={() => navigation.navigate("ExchangeOfferList")}
                >
                  <Text style={styles.btnText}>
                    {TranslationStrings.REQUEST_EXCHANGE}
                  </Text>
                </TouchableOpacity>
              </View>
            )} */}
          </View>

          <CustomMenu1
            menudata={
              // exchange_status === "true"
              //   ? exchange_options
              //   : fixed_price_status === "false"
              //   ? offer_options
              //   : generic_options

              generic_options
            }
            setShowBlockModal={true}
          />
        </View>
      </ScrollView>
      <DescriptionBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={TranslationStrings.REPORT_ITEM}
        subtitle={TranslationStrings.ENTER_DESCRIPTION}
        btntext={TranslationStrings.REPORT}
        onpress={() => {
          {
          }
        }}
      />
    </SafeAreaView>
  );
};

export default MainListingsDetails;
