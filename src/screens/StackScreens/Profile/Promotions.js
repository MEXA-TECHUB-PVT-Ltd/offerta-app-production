import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import CustomHeader from "../../../components/Header/CustomHeader";
import PromotionTopTabs from "../../../components/TopTabs/PromotionTopTabs";
import PromotionsCard from "../../../components/CustomCards/PromotionsCard";
import styles from "./styles";
import TopTabstyles from "../../../styles/GlobalStyles/TopTabstyles";

import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { get_user_all_promotions } from "../../../api/GetApis";
import { IMAGE_URL } from "../../../utills/ApiRootUrl";
import TranslationStrings from "../../../utills/TranslationStrings";
import Loader from "../../../components/Loader/Loader";
import NoNotificationFound from "../../BottomTab/Notification/NoNotificationFound";
import moment from "moment";

const Promotions = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState("Urgent");
  const Top_Tab = [
    {
      id: "1",
      // title: "Urgent",
      title: TranslationStrings.URGENT,
    },
    {
      id: "2",
      // title: "Advertisement",
      title: TranslationStrings.ADVERTISEMENT,
    },
    {
      id: "3",
      // title: "Expired",
      title: TranslationStrings.EXPIRED,
    },
  ];

  const [urgent_promotion_list, setUrgent_Promotion__List] = useState([]);
  const [advertisement_promotion_list, setAdvertisement_Promotion__List] =
    useState("");
  const [expire_list, setExpire_list] = useState([]);

  const getFormattedPrice = async (price) => {
    if (price) {
      const formatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
        compactDisplay: "short",
      });
      const formattedPrice = formatter.format(price);

      return formattedPrice;
    } else {
      return 0;
    }
  };

  const getAllUserPromotions = async () => {
    get_user_all_promotions()
      .then((response) => {
        let responseList = response.data?.data ? response.data?.data : [];
        const filter = responseList?.filter(
          (item) => item?.listing_detail != null
        );
        const urgent_promotion_list = filter?.filter(
          (item) =>
            item?.tag_detail?.tag == "Urgent" &&
            moment(new Date())?.format("YYYY-MM-DD") <
              moment(item?.promoted_detail?.Expirydate)?.format("YYYY-MM-DD")
        );
        const advertisement_promotion_list = filter?.filter(
          (item) =>
            item?.tag_detail?.tag == "Advertisement" &&
            moment(new Date())?.format("YYYY-MM-DD") <
              moment(item?.promoted_detail?.Expirydate)?.format("YYYY-MM-DD")
        );
        const expire_promotionsList = filter?.filter(
          (item) =>
            moment(new Date())?.format("YYYY-MM-DD") >=
            moment(item?.promoted_detail?.Expirydate)?.format("YYYY-MM-DD")
        );
        setAdvertisement_Promotion__List(
          advertisement_promotion_list?.reverse()
        );
        setUrgent_Promotion__List(urgent_promotion_list?.reverse());
        setExpire_list(expire_promotionsList?.reverse());
      })
      .catch((err) => {
        console.log("Error : ", err);
      })
      .finally(() => {
        setLoading(false);
        setIsRefreshing(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getAllUserPromotions();
    // dateTest();
  }, []);

  ////////////select state////////////
  const [selectedId, setSelectedId] = useState("1");
  ///////////////select function/////////////
  const onselect = (item) => {
    setSelectedId(item.id);
    setSelectedType(item?.title);
  };

  const renderItem = ({ item, index }) => {
    return (
      //   <TouchableOpacity onPress={()=> {item.title === "Urgent"?GetUrgentPromotionsList():
      //   item.title === "Advertisement"?GetAdvertisementPromotionsList():
      //   GetExpiredPromotionsList()}
      // }>
      <PromotionTopTabs
        title={item.title}
        width={"28%"}
        selected={selectedId}
        id={item.id}
        onpress={() => {
          onselect(item);
          // item.title === "Urgent"
          //   ? GetUrgentPromotionsList()
          //   : item.title === "Advertisement"
          //   ? GetAdvertisementPromotionsList()
          //   : GetExpiredPromotionsList();
        }}
      />
      // </TouchableOpacity>
    );
  };

  const list_renderItem = ({ item, index }) => {
    return (
      //item.listing === "No data available"?null:
      <PromotionsCard
        image={
          item.listing_images?.length == 0
            ? null
            : IMAGE_URL + item.listing_images[0]
        }
        maintext={
          item?.listing_detail?.title ? item?.listing_detail?.title : null
        }
        subtext={
          item?.listing_detail?.description
            ? item?.listing_detail?.description
            : null
        }
        pricetext={
          item?.listing_detail?.price ? item?.listing_detail?.price : null
          // item?.listing_detail?.price
          //   ? getFormattedPrice(item?.listing_detail?.price)
          //   : null
        }
        // type={item?.promotion?.type}
        type={selectedType}
        tag_detail={item?.tag_detail}
        item={item}
      />
    );
  };
  const handlePullToRefresh = async () => {
    setIsRefreshing(true);
    getAllUserPromotions();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <CustomHeader
        headerlabel={TranslationStrings.PROMOTIONS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />

      <View style={TopTabstyles.TopTabView}>
        <FlatList
          data={Top_Tab}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={
            selectedId == "1"
              ? urgent_promotion_list
              : selectedId == "2"
              ? advertisement_promotion_list
              : expire_list
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              colors={[Colors.Appthemecolor]}
              onRefresh={() => handlePullToRefresh()}
            />
          }
          renderItem={list_renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => {
            return <NoNotificationFound loading={loading} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Promotions;

// import React, { useEffect, useState, useRef } from "react";
// import { SafeAreaView, FlatList, View, TouchableOpacity } from "react-native";

// //////////////////app components///////////////
// import CustomHeader from "../../../components/Header/CustomHeader";
// import PromotionTopTabs from "../../../components/TopTabs/PromotionTopTabs";
// import PromotionsCard from "../../../components/CustomCards/PromotionsCard";

// /////////////app styles////////////////
// import styles from "./styles";
// import TopTabstyles from "../../../styles/GlobalStyles/TopTabstyles";

// ////////////app colors////////////
// import Colors from "../../../utills/Colors";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// /////////////////api functions///////////
// import {
//   get_Advertisement_Promotion_List,
//   get_Urgent_Promotion_List,
//   get_Expired_Promotion_List,
//   get_user_all_promotions,
// } from "../../../api/GetApis";
// import { IMAGE_URL } from "../../../utills/ApiRootUrl";
// import TranslationStrings from "../../../utills/TranslationStrings";
// import Loader from "../../../components/Loader/Loader";
// import NoNotificationFound from "../../BottomTab/Notification/NoNotificationFound";

// const Promotions = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const [selectedType, setSelectedType] = useState("Urgent");
//   const Top_Tab = [
//     {
//       id: "1",
//       // title: "Urgent",
//       title: TranslationStrings.URGENT,
//     },
//     {
//       id: "2",
//       // title: "Advertisement",
//       title: TranslationStrings.ADVERTISEMENT,
//     },
//     {
//       id: "3",
//       // title: "Expired",
//       title: TranslationStrings.EXPIRED,
//     },
//   ];

//   /////////////main menu status states/////////////
//   const [urgent_promotion_list, setUrgent_Promotion__List] = useState([]);
//   const [advertisement_promotion_list, setAdvertisement_Promotion__List] =
//     useState("");

//   const getAllUserPromotions = async () => {
//     get_user_all_promotions()
//       .then((response) => {
//         console.log("response : ", response?.data);
//         const urgent_promotion_list = response.data?.data?.filter(
//           (item) => item?.tag_detail?.tag == "Urgent"
//         );
//         const advertisement_promotion_list = response.data?.data?.filter(
//           (item) => item?.tag_detail?.tag == "Advertisement"
//         );
//         console.log("total  : ", response?.data?.data?.length);
//         console.log("urgent_promotion_list  : ", urgent_promotion_list?.length);
//         console.log(
//           "advertisement_promotion_list  : ",
//           advertisement_promotion_list?.length
//         );
//       })
//       .catch((err) => {
//         console.log("Error : ", err);
//       });
//   };

//   const GetUrgentPromotionsList = async (props) => {
//     try {
//       setLoading(true);
//       get_Urgent_Promotion_List()
//         .then((response) => {
//           if (response?.data?.msg == "No Result") {
//             setUrgent_Promotion__List([]);
//           } else {
//             setUrgent_Promotion__List(response.data?.reverse());
//           }
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       setUrgent_Promotion__List([]);
//       setLoading(false);
//     }
//   };
//   const GetAdvertisementPromotionsList = async (props) => {
//     try {
//       setLoading(true);
//       get_Advertisement_Promotion_List()
//         .then((response) => {
//           console.log("GetAdvertisementPromotionsList   : ", response?.data);
//           if (response?.data?.msg == "No Result") {
//             setUrgent_Promotion__List([]);
//           } else {
//             setUrgent_Promotion__List(response.data?.reverse());
//           }
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       setLoading(false);
//       setUrgent_Promotion__List([]);
//     }
//   };
//   const GetExpiredPromotionsList = async (props) => {
//     try {
//       setLoading(true);
//       get_Expired_Promotion_List()
//         .then((response) => {
//           console.log("GetExpiredPromotionsList   : ", response?.data);
//           if (response?.data?.msg == "No Result") {
//             setUrgent_Promotion__List([]);
//           } else {
//             setUrgent_Promotion__List(response.data?.reverse());
//           }
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       setLoading(false);
//       setUrgent_Promotion__List([]);
//     }
//   };
//   const togglePromotionsList = async (props) => {
//     console.log("props  ; ", props);
//     // if (props === "Urgent") {
//     //   GetUrgentPromotionsList();
//     // } else {
//     //   GetAdvertisementPromotionsList();
//     // }

//     if (props === "Urgent" || props == "Urget") GetUrgentPromotionsList();
//     else if (props === "Advertisement") GetAdvertisementPromotionsList();
//     else GetExpiredPromotionsList();
//   };
//   useEffect(() => {
//     // GetUrgentPromotionsList();
//     getAllUserPromotions();
//   }, []);
//   ////////////select state////////////
//   const [selectedId, setSelectedId] = useState("1");
//   ///////////////select function/////////////
//   const onselect = (item) => {
//     setSelectedId(item.id);
//     togglePromotionsList(item.title);
//     setSelectedType(item?.title);
//   };

//   const renderItem = ({ item, index }) => {
//     return (
//       //   <TouchableOpacity onPress={()=> {item.title === "Urgent"?GetUrgentPromotionsList():
//       //   item.title === "Advertisement"?GetAdvertisementPromotionsList():
//       //   GetExpiredPromotionsList()}
//       // }>
//       <PromotionTopTabs
//         title={item.title}
//         width={"28%"}
//         selected={selectedId}
//         id={item.id}
//         onpress={() => {
//           onselect(item);
//           // item.title === "Urgent"
//           //   ? GetUrgentPromotionsList()
//           //   : item.title === "Advertisement"
//           //   ? GetAdvertisementPromotionsList()
//           //   : GetExpiredPromotionsList();
//         }}
//       />
//       // </TouchableOpacity>
//     );
//   };

//   const list_renderItem = ({ item, index }) => {
//     return (
//       //item.listing === "No data available"?null:
//       <PromotionsCard
//         image={
//           item.listing === "No data available"
//             ? null
//             : IMAGE_URL + item.listing.images[0]
//         }
//         maintext={
//           item?.listing === "No data available" ? null : item?.listing?.title
//         }
//         subtext={
//           item?.listing === "No data available"
//             ? null
//             : item?.listing?.description
//         }
//         pricetext={
//           item?.listing === "No data available" ? null : item?.listing?.price
//         }
//         // type={item?.promotion?.type}
//         type={selectedType}
//         item={item}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Loader isLoading={loading} />
//       <CustomHeader
//         headerlabel={TranslationStrings.PROMOTIONS}
//         iconPress={() => {
//           navigation.goBack();
//         }}
//         icon={"arrow-back"}
//       />

//       <View style={TopTabstyles.TopTabView}>
//         <FlatList
//           data={Top_Tab}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index}
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//           horizontal={true}
//         />
//       </View>
//       <View style={{ flex: 1 }}>
//         {urgent_promotion_list?.length == 0 ? (
//           <NoNotificationFound loading={loading} />
//         ) : (
//           <FlatList
//             data={urgent_promotion_list}
//             renderItem={list_renderItem}
//             keyExtractor={(item, index) => index}
//             showsVerticalScrollIndicator={false}
//             showsHorizontalScrollIndicator={false}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Promotions;
