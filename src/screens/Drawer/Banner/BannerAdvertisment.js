import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

/////////////render/////////////////
import RenderHtml from "react-native-render-html";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CustomButtonhere from "../../../components/Button/CustomButton";
import CustomModal from "../../../components/Modal/CustomModal";

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";
import TranslationStrings from "../../../utills/TranslationStrings";
import Loader from "../../../components/Loader/Loader";
import { useNavigation } from "@react-navigation/native";

const BannerAdvertisment = ({ route }) => {
  const navigation = useNavigation();
  //////////render html width///////////
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  const [bannerDescription, setBannerDescription] = useState("");
  const GetBannerDescription = async () => {
    axios({
      method: "GET",
      url: BASE_URL + "getbannerDescription.php",
    })
      .then(async function (response) {
        setBannerDescription(response.data.description);
      })
      .catch(function (error) {
        console.log("error in getbannerDescription ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    GetBannerDescription();
  }, []);
  const tagsStyles = {
    p: {
      fontSize: hp(2),
      color: "black",
      width: wp(90),
      marginHorizontal: wp(5),
    },
    ul: {
      marginHorizontal: wp(3),
    },
    li: {
      fontSize: hp(1.7),
      color: "black",
    },
    div: {
      color: "black",
      width: wp(85),
    },
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Loader isLoading={loading} />
        <CustomHeader
          headerlabel={TranslationStrings.BANNER_ADVERTISEMENT}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <View style={styles.textview}>
          <RenderHtml
            contentWidth={width}
            source={{ html: bannerDescription }}
            tagsStyles={tagsStyles}
          />
        </View>
        {!loading && (
          <View style={{ marginBottom: hp(15) }}>
            <CustomButtonhere
              title={TranslationStrings.CONTINUE}
              widthset={80}
              topDistance={10}
              onPress={() => {
                navigation?.navigate("AddBanner");
              }}
            />
          </View>
        )}
        <CustomModal
          modalVisible={modalVisible}
          CloseModal={() => setModalVisible(false)}
          Icon={appImages.confirm}
          text={"Confirmation"}
          type={"confirmation"}
          subtext={"Do you really want to Logout?"}
          buttontext={"Yes"}
          buttontext1={"Cancel"}
          onPress={() => {
            setModalVisible(false);
          }}
          onPress1={() => {
            logout();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BannerAdvertisment;
