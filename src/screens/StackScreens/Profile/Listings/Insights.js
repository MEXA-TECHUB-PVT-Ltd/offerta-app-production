import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList } from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";

/////////////app styles////////////////
import styles from "./styles";

////////////////app height and width//////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

///////////////////////app colors//////////////////////
import Colors from "../../../../utills/Colors";

////////////////api functions//////////////
import { get_Listings_Insights } from "../../../../api/Sales&Promotions";
import TranslationStrings from "../../../../utills/TranslationStrings";

const Insights = ({ navigation, route }) => {
  ////////////////////previous state///////////////
  const [predata] = useState(route.params);

  ////////////////////data states////////////////
  const [popularity, setPopularity] = useState("");
  const [comments, setComments] = useState("");
  const [likes, setLikes] = useState("");
  const [views, setViews] = useState("");
  const [exchange_requests, setExchange_Requests] = useState("");
  const [visited_cities, setVisited_Cities] = useState("");
  const [most_visited_cities, setMost_Visited_Cities] = useState("");

  useEffect(() => {
    get_Listings_Insights(predata.list_id).then((response) => {
      setPopularity(response?.data?.popularity);
      setViews(response.data?.tatal_view);
      setComments(response.data?.tatal_comments);
      setLikes(response.data?.tatal_like);
      setExchange_Requests(response.data?.tatal_Exchange);
      setVisited_Cities(response.data?.Total_Visted_City);
      setMost_Visited_Cities(response.data?.most_visted);
    });
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ marginHorizontal: wp(1) }}>
        <View style={styles.rowview}>
          <Text style={styles.lefttext}>{item.country}</Text>
          <Text style={styles.righttext}>{item.city}</Text>
        </View>
        <View style={[styles.borderview, { width: wp(87) }]}></View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <CustomHeader
          headerlabel={TranslationStrings.INSIGHTS}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View style={styles.rowview}>
          <Text style={styles.lefttext}>{TranslationStrings.POPULARITY}</Text>
          <Text style={styles.righttext}>{popularity}</Text>
        </View>
        <View style={styles.borderview}></View>
        <View style={styles.rowview}>
          <Text style={styles.lefttext}>{TranslationStrings.COMMENTS}</Text>
          <Text style={styles.righttext}>{comments}</Text>
        </View>
        <View style={styles.borderview}></View>
        <View style={styles.rowview}>
          <Text style={styles.lefttext}>{TranslationStrings.LIKES}</Text>
          <Text style={styles.righttext}>{likes}</Text>
        </View>
        <View style={styles.borderview}></View>
        <View style={styles.rowview}>
          <Text style={styles.lefttext}>{TranslationStrings.VIEWS}</Text>
          <Text style={styles.righttext}>{views}</Text>
        </View>
        <View style={styles.borderview}></View>
        {/* <View style={styles.rowview}>
          <Text style={styles.lefttext}>
            {TranslationStrings.REQUEST_EXCHANGE}
          </Text>
          <Text style={styles.righttext}>{exchange_requests}</Text>
        </View> */}
        {/* <View style={styles.borderview}></View> */}
        <View style={styles.rowview}>
          <Text style={styles.lefttext}>
            {TranslationStrings.TOTAL_VISITED_CITIES}
          </Text>
          <Text style={styles.righttext}>{visited_cities}</Text>
        </View>
        <View style={styles.borderview}></View>
        <View style={{ marginHorizontal: wp(7) }}>
          <Text style={styles.lefttext}>
            {TranslationStrings.MOST_VISITED_CITIES}
          </Text>
        </View>

        <FlatList
          data={most_visited_cities}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insights;
