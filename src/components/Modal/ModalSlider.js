import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";

import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////app colors////////////
import Colors from "../../utills/Colors";

////////////slider package///////////
import Slider from "@react-native-community/slider";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setSliderDistance } from "../../redux/actions";
import TranslationStrings from "../../utills/TranslationStrings";

const SliderModal = (props) => {
  ////////////////redux/////////////
  const { slider_distance } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //////////////slider states///////////
  const [mindistance, setMindistance] = useState(0);
  const [maxdistance, setMaxdistance] = useState(0);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.CloseModal}
    >
      <View style={styles.centeredView}>
        <View
          style={[
            styles.modalView,
            { paddingTop: hp(5), paddingBottom: hp(2) },
          ]}
        >
          <Text style={[styles.modaltext, { marginBottom: hp(5) }]}>
            {TranslationStrings.SELECT_THE_DISTANCE}
          </Text>
          <Text style={styles.modalsubtext}>{maxdistance}</Text>
          <Slider
            style={{ width: wp(80), height: hp(5) }}
            thumbTintColor={Colors.Appthemecolor}
            minimumValue={0}
            maximumValue={1000}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#000000"
            onSlidingComplete={(i) => {
              dispatch(setSliderDistance(i));
            }}
            onValueChange={(j) => {
              setMaxdistance(j), dispatch(setSliderDistance(j));
            }}
          />
          <View style={[styles.ApprovedView, { marginTop: hp(5) }]}>
            <TouchableOpacity onPress={props.onPress}>
              <Text style={styles.Pendingtext}>{TranslationStrings.DONE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SliderModal;
