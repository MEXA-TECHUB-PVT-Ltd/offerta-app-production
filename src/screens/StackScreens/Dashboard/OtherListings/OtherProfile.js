import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";

///////////////////icons///////////
import Icon from "react-native-vector-icons/Ionicons";

///////////////////react native navigation///////////////
import { useIsFocused } from "@react-navigation/native";

////////////////app components//////////////
import DashboardCard from "../../../../components/CustomCards/DashboardCard";
import ProfileCard from "../../../../components/CustomCards/Profile";
import NoDataFound from "../../../../components/NoDataFound/NoDataFound";
import RattingModal from "../../../../components/Modal/RattingModal";

/////////////app height and width//////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

///////////app styles////////////////
import styles from "./styles";
import Colors from "../../../../utills/Colors";

/////////image url//////////////
import { IMAGE_URL } from "../../../../utills/ApiRootUrl";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setOtherUserFollowersCountINC,
  setOtherUserFollowersCountDEC,
  setOtherUserFollowingsCountINC,
  setOtherUserFollowingsCountDEC,
  setOtherUserFollowersStatus,
  setOtherUserFollowingsStatus,
} from "../../../../redux/OtherUserActions";

//////////////async//////////////
import AsyncStorage from "@react-native-async-storage/async-storage";

////////////////get api data//////////
import {
  get_User_Listings,
  get_Other_UserData,
  get_Other_User_Listing,
} from "../../../../api/GetApis";
import {
  post_Follow_Users,
  post_UnFollow_Users,
} from "../../../../api/PostApis";
import TranslationStrings from "../../../../utills/TranslationStrings";

const OtherProfile = ({ navigation }) => {
  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  /////////////////Price formatter/////////////
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  });

  ////////////////redux/////////////
  const { exchange_other_listing } = useSelector((state) => state.userReducer);
  const { other_user_followers_count } = useSelector(
    (state) => state.otheruserReducer
  );

  const dispatch = useDispatch();

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  ////////////Listing Checks//////////////
  const [follow_user_id, setFollow_User_id] = useState("");
  const [follow_status, setFollow_Status] = useState("");
  //-----------like list
  const follow_user = (props) => {
    post_Follow_Users(exchange_other_listing.user_id).then((response) => {
      setFollow_User_id(response.data.user.id);
      dispatch(
        setOtherUserFollowersCountINC(response.data.following_user.followers)
      );
    });
  };
  //-----------unlike list
  const unfollow_user = (props) => {
    post_UnFollow_Users(exchange_other_listing.user_id).then((response) => {
      setFollow_User_id(" ");
      dispatch(
        setOtherUserFollowersCountDEC(response.data.following_user.followers)
      );
    });
  };

  ///////////////data states////////////////////
  const [username, setUserName] = React.useState("John Deo");
  const [userimage, setUserImage] = React.useState();
  const [useremail, setUseremail] = React.useState();
  const [ratting, setRatting] = React.useState();
  const [followers, setFollowers] = React.useState();
  const [following, setFollowing] = React.useState();

  const [verificationStatus, setVerificationStatus] = useState(null);

  const [userRole, setUserRole] = useState("");

  const GetAcountDetail = async () => {
    get_Other_UserData(exchange_other_listing.user_id).then((response) => {
      // setVerificationStatus(response?.data?.subscription);
      setVerificationStatus(response?.data?.verify_status);
      setUserRole(response?.data?.role);

      //setFollow_User_id(response.data.id)
      setUserName(response.data.full_name);
      setUseremail(response.data.email);
      setUserImage(response.data.image);
      setFollowing(response.data.following);
      setFollowers(response.data.followers);
      setRatting(response.data.review);
      // follow_user();
      //dispatch(setOtherUserFollowersCountINC(response.data.following))
    });
  };

  ////////////////LIST DATA/////////
  const [data, setdata] = useState();

  useEffect(() => {
    // get_User_Listings().then((response) => {
    //   if (response.data.message === "No data available") {
    //     setdata("");
    //   } else {
    //     setdata(response.data);
    //   }
    // });
    get_Other_User_Listing(exchange_other_listing.user_id).then((response) => {
      if (response.data.message === "No data available") {
        setdata("");
      } else {
        setdata(response.data);
      }
    });
  }, [ratting]);
  useEffect(() => {
    if (isfocussed) {
      GetAcountDetail();
      getuser();
      //follow_user()
    }
  }, [isfocussed, ratting]);
  const [login_user_id, setlogin_user_id] = useState();
  const getuser = async () => {
    var userid = await AsyncStorage.getItem("Userid");
    setlogin_user_id(userid);
  };

  const renderItem = ({ item }) => (
    <DashboardCard
      image={item.images === [] ? null : IMAGE_URL + item.images[0]}
      maintext={item.title}
      subtext={item.location}
      sold={item?.sold}
      price={formatter.format(item.price) + "$"}
      onpress={() => {
        navigation.replace("MainListingsDetails", {
          listing_id: item.id,
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <View style={styles.header}>
        <View style={{ marginTop: wp(5) }}>
          <Icon
            name={"arrow-back"}
            size={25}
            color={"white"}
            style={{ marginLeft: wp(3) }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <View style={[styles.footer]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ marginTop: hp(23), marginBottom: hp(2) }}>
            {data === "" ? (
              <NoDataFound
                icon={"exclamation-thick"}
                text={TranslationStrings.NO_DATA_FOUND}
              />
            ) : (
              <FlatList
                data={data}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>
      </View>

      <View
        style={{
          position: "absolute",
          top: hp(10),
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <ProfileCard
          verificationStatus={verificationStatus}
          userRole={userRole}
          //
          userlogo={userimage}
          username={username}
          useremail={useremail}
          ratting_text={TranslationStrings.RATE}
          following_text={TranslationStrings.FOLLOWERS}
          followers_text={TranslationStrings.FOLLOWINGS}
          ratting={ratting}
          followers={other_user_followers_count}
          following={following}
          type={"other_user"}
          followStatus={
            follow_user_id === login_user_id ? "Unfollow" : "follow"
          }
          //facebookicon={appImages.facebookicon}
          onfollowpress={() => follow_user()}
          onunfollowpress={() => unfollow_user()}
          onratepress={() => setModalVisible(true)}
        />
      </View>
      <RattingModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        ratted_user={exchange_other_listing.user_id}
        onPress={() => {
          setModalVisible(false), navigation.navigate("BottomTab");
        }}
      />
    </View>
  );
};

export default OtherProfile;
