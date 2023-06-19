import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { Card, Snackbar } from "react-native-paper";
///////////height and width/////////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
/////////////////////app styles////////////

import Colors from "../../../../utills/Colors";
/////////////////app images///////////
import { appImages } from "../../../../constant/images";

import Loader from "../../../../components/Loader/Loader";
import CustomHeader from "../../../../components/Header/CustomHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TranslationStrings from "../../../../utills/TranslationStrings";
import { BASE_URL, IMAGE_URL } from "../../../../utills/ApiRootUrl";
import { get_Sales } from "../../../../api/Sales&Promotions";
import RattingModal from "../../../../components/Modal/RattingModal";
import axios from "axios";
import NoDataFound from "../../../../components/NoDataFound/NoDataFound";

const BuyersList = ({ navigation, route }) => {
  ///////////previous data///////////
  const [predata] = useState(route.params);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const [selected_BuyerID, setselected_BuyerID] = useState("second");

  const [rating, setRating] = useState(3.5);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selected_user_id, setSelected_user_id] = useState("");
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    setLoading(true);
    getBuyers();
  }, []);

  const getBuyers = async () => {
    get_Sales()
      .then((response) => {
        if (
          response.data[0]?.order_by === [] ||
          response.data?.status == false
        ) {
          setData([]);
        } else {
          let buyersList = response?.data ? response?.data : [];
          const filter = buyersList?.filter(
            (item) => item?.listing?.id == predata?.listing_id
          );
          setData(filter);
        }
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  const AddRattings = async (ratted_user, rating) => {
    // setsnackbarValue({
    //   value: "Review Submitted Successfully",
    //   color: "green",
    // });
    // setVisible(true);
    // return;
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
        console.log("response : ", response?.data);
        if (response?.data?.status == true) {
          setsnackbarValue({
            value: "Review Submitted Successfully",
            color: "green",
          });
          setVisible(true);
        } else {
          console.log("else.");
          setsnackbarValue({
            value: response?.data?.message
              ? response?.data?.message
              : response?.data?.msg,
            color: "red",
          });
          setVisible(true);
        }
        // navigation.replace("Listings");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    getBuyers();
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={TranslationStrings.BUYERS}
        iconPress={() => navigation.goBack()}
        icon={"chevron-back"}
      />
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
        <Loader isLoading={loading} />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Card style={styles.card}>
                <View style={styles.rowView}>
                  <Image
                    source={{ uri: IMAGE_URL + item?.order_by?.image }}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                  <View style={{ marginLeft: 20, flex: 1 }}>
                    <Text style={styles.title}>
                      {item?.order_by?.user_name}
                    </Text>
                    {/* <Text style={styles.description}>dfsdfsdfs</Text> */}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setselected_BuyerID(item?.order_by?.id);
                      setShowRatingModal(true);
                    }}
                    style={styles.btn}
                  >
                    <Text style={styles.btnText}>
                      {TranslationStrings.RATE_BUYER}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <NoDataFound
                icon={"exclamation-thick"}
                text={TranslationStrings.NO_DATA_FOUND}
              />
            );
          }}
        />

        <RattingModal
          title={TranslationStrings.RATE_BUYER}
          modalVisible={showRatingModal}
          CloseModal={() => setShowRatingModal(false)}
          ratted_user={selected_BuyerID}
          setRating={setRating}
          onDone={() => {
            setShowRatingModal(false);
            AddRattings(selected_BuyerID, rating);
          }}
        />
      </ScrollView>
      <Snackbar
        duration={1000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: snackbarValue.color,
          marginBottom: hp(9),
          zIndex: 999,
        }}
      >
        {snackbarValue.value}
      </Snackbar>
    </SafeAreaView>
  );
};

export default BuyersList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  card: {
    backgroundColor: "#fff",
    marginVertical: 5,
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  avatar: {
    width: wp("13%"),
    height: wp("13%"),
    borderRadius: wp(10),
    resizeMode: "contain",
  },
  title: {
    fontSize: 15,
    color: "#1B1B1B",
    fontWeight: "700",
  },
  description: {
    fontSize: hp("1.3%"),
    color: "#7A8FA6",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.Appthemecolor,
    padding: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  btnText: { color: "#FFFFFF" },
});
