import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

/////////////////////navigation///////////////
import { useIsFocused } from "@react-navigation/native";

/////////////////app components/////////
import Slider from "../../../../components/ImageSlider/Slider";
import DescriptionBottomSheet from "../../../../components/CustomBottomSheet/DescriptionBTS";
import Loader from "../../../../components/Loader/Loader";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setName, setAge } from "../../../../redux/actions";

////////////////APP HEIGHT AND WIDTH////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

/////////////////////app styles////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";

/////////////////app images///////////
import { appImages } from "../../../../constant/images";

////////////////////app ratting  pakages////////////////////////
import { Rating, AirbnbRating } from "react-native-ratings";

//////////////api helper functions//////////
import {
  GetComments,
  GetListingsDetails,
  GetListingsDetails_New,
} from "../../../../api/GetApis";
import { post_Comments_Listings } from "../../../../api/PostApis";

/////////////////image url/////////////
import { IMAGE_URL } from "../../../../utills/ApiRootUrl";
import TranslationStrings from "../../../../utills/TranslationStrings";
import { Avatar } from "react-native-paper";

const CommentsDetails = ({ navigation, route }) => {
  //////////////redux///////////////
  const { listing_id } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  ///////////////////loader loading state///////////////
  const [loading, setloading] = useState(true);

  /////////////naviagtion////////////////
  const isFocused = useIsFocused();

  //camera and imagepicker
  const refRBSheet = useRef();
  /////////////Listing Detail states/////////////
  const [listing_images, setListing_Images] = useState([]);

  /////////////Comments list states/////////////
  const [Comments, setComments] = useState([]);

  useEffect(() => {
    if (isFocused) {
      doSomethingCallback();
    }
  }, [isFocused, Comments]);

  const doSomethingCallback = useCallback(() => {
    // GetListingsDetails(listing_id)
    GetListingsDetails_New(listing_id).then((response) => {
      let imagesList = response?.data?.images ? response.data.images : [];
      setListing_Images(imagesList);
      GetComments(listing_id)
        .then((response) => {
          if (
            response.data.msg === "No Result" ||
            response?.data?.message == "id is null"
          ) {
            setComments([]);
            setloading(false);
          } else {
            setComments(response.data);
            setloading(false);
          }
        })
        .finally(() => setRefreshing(false));
    });
  }, [Comments]);
  const [ratting, setRatting] = useState(4.5);

  const handleRefresh = () => {
    setRefreshing(true);
    doSomethingCallback();
  };
  ///////////////ratings function//////////////
  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    setRatting(rating);
  };

  const renderItem = (item) => {
    return (
      <View style={{ paddingHorizontal: wp(5) }}>
        <View style={{ flexDirection: "row" }}>
          <Avatar.Image
            source={{ uri: IMAGE_URL + item.user.image }}
            size={wp(12)}
          />
          {/* <Image
            source={{ uri: IMAGE_URL + item.user.image }}
            style={{ width: wp(12), height: hp(6), borderRadius: wp(10) }}
            resizeMode="contain"
          /> */}
          <View style={{ marginLeft: wp(4), justifyContent: "center" }}>
            <Text style={styles.usertext}>{item.user.user_name}</Text>
            {/* <View
          style={{alignItems: 'center', alignSelf: 'center', marginTop: hp(3)}}> */}
            {/* <Rating
                type="star"
                ratingCount={item.user.reviews}
                imageSize={20}
                //showRating={false}
                //startingValue={item.user.reviews}
                readonly={true}
                //onFinishRating={ratingCompleted}
              /> */}
            {/* </View> */}
          </View>
        </View>
        <View style={{ marginTop: hp(1.5), marginLeft: wp(3) }}>
          <Text style={styles.subtext}>{item.comment}</Text>
        </View>

        <View
          style={{
            width: wp(85),
            borderWidth: 0.3,
            borderColor: Colors.inactivetextinput,
            alignSelf: "center",
            marginTop: hp(3),
            marginBottom: hp(3),
          }}
        ></View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
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
        <Slider imagearray={listing_images} type={"comments"} />

        <View
          style={{
            marginTop: hp(5),
            marginHorizontal: wp(7),
            marginBottom: hp(2),
          }}
        >
          <Text style={styles.maintext}>{TranslationStrings.COMMENTS}</Text>
        </View>

        {Comments?.map((item, key) => renderItem(item))}

        {/* <FlatList
        data={Comments}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}

        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => refRBSheet.current.open()}
          >
            <Text style={styles.btnText}>{TranslationStrings.ADD_COMMENT}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DescriptionBottomSheet
        refRBSheet={refRBSheet}
        onClose={() => refRBSheet.current.close()}
        title={TranslationStrings.ADD_COMMENT}
        subtitle={TranslationStrings.ENTER_COMMENT}
        btntext={TranslationStrings.ADD}
        listingID={listing_id}
        description={"Comment added successfully!"}
        onpress={() => {
          {
            doSomethingCallback();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default CommentsDetails;
