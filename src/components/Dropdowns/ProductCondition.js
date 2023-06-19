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
import { setProductCondition } from "../../redux/actions";
import TranslationStrings from "../../utills/TranslationStrings";

const ProductCondition = (props) => {
  /////////////redux states///////
  const { product_condition } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //////////dropdownlink data/////////////
  const [dddata] = useState([
    // { id: "1", condition: "like new" },
    // { id: "2", condition: "lightly used" },
    // { id: "3", condition: "heavely used" },

    { id: "1", condition: TranslationStrings.LIKE_NEW },
    { id: "2", condition: TranslationStrings.LIGHTLY_USED },
    { id: "3", condition: TranslationStrings.HEAVELY_USED },
    { id: "4", condition: TranslationStrings.NEW },
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
          {TranslationStrings.PRODUCT_CONDITION}
        </Text>
      </View>
      <FlatList
        data={dddata}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              dispatch(setProductCondition(item.condition)),
                props.refRBSheet.current.close();
            }}
          >
            <View style={styles.card}>
              <Text style={styles.cardtext}>{item.condition}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </RBSheet>
  );
};

export default ProductCondition;
