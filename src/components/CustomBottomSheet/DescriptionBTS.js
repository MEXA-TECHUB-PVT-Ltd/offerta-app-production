import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Snackbar } from "react-native-paper";

//////////////////app components///////////////////
import CustomModal from "../Modal/CustomModal";
import CustomTextInput from "../TextInput/CustomTextInput";
import CustomButtonhere from "../Button/CustomButton";

////////////app icons////////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";

///////////////app packages/////////////
import RBSheet from "react-native-raw-bottom-sheet";

///////////////app styles//////////////////
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setUserImage, editUserImage } from "../../redux/actions";

//////////////////app Images////////////////
import { appImages } from "../../constant/images";
import { Colors } from "react-native/Libraries/NewAppScreen";

///////////////api functions/////////////
import { post_Comments_Listings } from "../../api/PostApis";
import { GetComments } from "../../api/GetApis";
import TranslationStrings from "../../utills/TranslationStrings";

const DescriptionBottomSheet = (props) => {
  const navigation = useNavigation();
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  /////////////redux states///////
  const { listing_id } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ////////////////textinput state//////////////
  const [description, setDescription] = useState("");
  const [data, setData] = useState({});

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({ value: "", color: "" });
  const onDismissSnackBar = () => setVisible(false);

  //-----------like list
  const listing_Comments = (props) => {
    setData({ listing_id, description });
    post_Comments_Listings(listing_id, description).then((response) => {
      setDescription("");
      setloading(0);
      setdisable(0);
      setModalVisible(true);
    });
  };
  //Api form validation
  const formValidation = async () => {
    // input validation
    if (description == "") {
      setsnackbarValue({
        value: "Please Enter Comment description",
        color: "red",
      });
      setVisible("true");
    } else {
      setloading(1);
      setdisable(1);
      listing_Comments();
    }
  };
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
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: hp(50),
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: wp(7),
        }}
      >
        <Text style={styles.maintext}>{props.title}</Text>
        <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
          <Ionicons
            name={"close"}
            size={22}
            color={Colors.Appthemecolor}
            onPress={() => props.refRBSheet.current.close()}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: hp(3), paddingHorizontal: wp(7) }}>
        <Text style={styles.subtext}>{props.subtitle}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginHorizontal: wp("5%"),
        }}
      >
        <CustomTextInput
          icon={appImages.email}
          type={"withouticoninput"}
          texterror={"invalid"}
          term={description}
          multiline={true}
          placeholder={TranslationStrings.DESCRIPTION}
          onTermChange={(desc) => setDescription(desc)}
        />
      </View>
      <View style={{ marginTop: hp(0) }}>
        <CustomButtonhere
          title={TranslationStrings.ADD}
          widthset={80}
          topDistance={7}
          loading={loading}
          disabled={disable}
          onPress={() => {
            //navigation.navigate("Drawerroute");
            formValidation();
          }}
        />
      </View>
      <View style={styles.btnView}>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress={() =>   listing_Comments(data)}
        >
          <Text style={styles.btnText}>{props.btntext}</Text>
        </TouchableOpacity> */}
      </View>
      <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        Icon={appImages.sucess}
        text={TranslationStrings.SUCCESS}
        subtext={
          props?.description
            ? props?.description
            : props.btntext === "REPORT"
            ? TranslationStrings.REPORT_SUCCESSFULLY
            : TranslationStrings.REVIEW_ADDED_SUCCESSFULLY
        }
        buttontext={TranslationStrings.OK}
        onPress={() => {
          props.onClose();
          setModalVisible(false);
          //navigation.navigate('CommentsDetails')
        }}
      />
      <Snackbar
        duration={400}
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
    </RBSheet>
  );
};

export default DescriptionBottomSheet;
