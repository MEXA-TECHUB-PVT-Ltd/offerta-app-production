import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

///////////////////app pakages///////////////
import RBSheet from "react-native-raw-bottom-sheet";

////////////app styles//////////////
import styles from "./styles";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import {
  setSortByDD,
  setSortByDDValue,
  setPostWithinDD,
  setPostWithinDDValue,
} from "../../redux/actions";
import TranslationStrings from "../../utills/TranslationStrings";

const FilterDD = (props) => {
  /////////////redux states///////
  const { product_condition } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [rangedata] = useState([
    { id: "1", post_within: TranslationStrings.ONE_DAY, value: "1_day" },
    { id: "2", post_within: TranslationStrings.ONE_WEEK, value: "7_day" },
    { id: "3", post_within: TranslationStrings.ONE_MONTH, value: "month" },
  ]);
  const [sortdata] = useState([
    { id: "1", sortBy: TranslationStrings.NAME, value: "a" },
    { id: "2", sortBy: TranslationStrings.TIME, value: "t" },
  ]);
  return (
    <RBSheet
      //sstyle={{flex:1}}
      ref={props.refRBSheet}
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
          height: hp(35),
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
          {props.type === "PostedRange"
            ? TranslationStrings.SELECT_POSTED_RANGE
            : TranslationStrings.SELECT_SORT_BY}
        </Text>
      </View>
      <FlatList
        data={props.type === "PostedRange" ? rangedata : sortdata}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              props.type === "PostedRange"
                ? dispatch(setPostWithinDD(item.post_within))
                : dispatch(setSortByDD(item.sortBy));
              props.type === "PostedRange"
                ? dispatch(setPostWithinDDValue(item.value))
                : dispatch(setSortByDDValue(item.value));
              props.refRBSheet.current.close();
            }}
          >
            <View style={styles.card}>
              <Text style={styles.cardtext}>
                {props.type === "PostedRange" ? item.post_within : item.sortBy}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </RBSheet>
  );
};

export default FilterDD;
