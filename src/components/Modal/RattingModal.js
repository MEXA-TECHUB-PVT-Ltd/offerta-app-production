import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

////////////////////app pakages////////////////////////
import { Rating, AirbnbRating } from "react-native-ratings";

//////////////app styles////////////////
import styles from "./styles";
import Colors from "../../utills/Colors";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TranslationStrings from "../../utills/TranslationStrings";

const RattingModal = (props) => {
  useEffect(() => {}, []);
  ////////////ratting stsates////////
  const [ratting, setRatting] = useState(4.5);

  ////////////////post review function//////////////
  const AddRattings = async () => {
    var user = await AsyncStorage.getItem("Userid");
    console.log("userid:", user, ratting, props.ratted_user);
    props.CloseModal();

    axios({
      method: "POST",
      url: BASE_URL + "reivewUser.php",
      data: {
        user_id: user,
        reviewed_user_id: props.ratted_user,
        review: ratting,
      },
    })
      .then(async function (response) {
        console.log("response", JSON.stringify(response.data));
        props.CloseModal();
      })
      .catch(function (error) {
        if (error) {
          console.log("error in submittion");
        }

        console.log("error", error);
      });
  };

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    setRatting(rating);
    props?.setRating(rating);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.CloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.textview}>
            <Text style={styles.toptext}>
              {props?.title ? props?.title : TranslationStrings.RATE_PROFILE}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginTop: hp(3),
            }}
          >
            <Rating
              type="star"
              ratingCount={5}
              imageSize={30}
              //showRating
              onFinishRating={ratingCompleted}
            />
          </View>
          {props?.onDone ? (
            <TouchableOpacity
              style={[styles.ApprovedView, { marginTop: hp(5) }]}
              onPress={props.onDone}
            >
              <Text style={styles.Pendingtext}>{TranslationStrings.DONE}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => AddRattings()}
              style={[styles.ApprovedView, { marginTop: hp(5) }]}
            >
              <Text style={styles.Pendingtext}>{TranslationStrings.DONE}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default RattingModal;
