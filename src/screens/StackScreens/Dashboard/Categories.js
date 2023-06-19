import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../components/Header/CustomHeader";
import CategoryCard from "../../../components/CustomCards/CategoriesCard";
/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//////////////////////////app api/////////////////////////
import axios from "axios";
import { BASE_URL, IMAGE_URL } from "../../../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

/////////////////////app images/////////////////////
import { appImages } from "../../../constant/images";

///////////////////app fonts/////////////
import { fontFamily } from "../../../constant/fonts";
import TranslationStrings from "../../../utills/TranslationStrings";

const Categories = ({ navigation, route }) => {
  /////////////category state and function/////////////
  const [Category, setCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const GetCategories = async () => {
    await axios({
      method: "GET",
      url: BASE_URL + "getAllCategory.php",
    })
      .then(function (response) {
        //console.log("response get here dispatcher", JSON.stringify(response.data))
        setCategory(response.data);
        setRefreshing(false);
      })
      .catch(function (error) {
        console.log("error", error);
        setRefreshing(false);
      });
  };
  useEffect(() => {
    GetCategories();
  }, []);
  const handleRefresh = () => {
    setRefreshing(true);
    GetCategories();
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
        <CustomHeader
          headerlabel={TranslationStrings.Categories1}
          iconPress={() => {
            navigation.goBack();
          }}
          icon={"arrow-back"}
        />

        <FlatList
          data={Category}
          numColumns={2}
          // renderItem={({ item }) => (
          //   <CategoryCard
          //     // image={item.image_url.replace("{{baseurl}}", "")}
          //     // image={{ uri: IMAGE_URL + item?.image }}
          //     image={item?.image}
          //     maintext={item.name}
          //   />
          // )}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                // navigation.navigate("SliderScreen", {
                //   navplace: "Market",
                //   navtype: props?.item?.type ? props?.item?.type : "",
                // });

                navigation.navigate("AllListingsByCategory", {
                  id: item?.id,
                  name: item?.name,
                });
              }}
            >
              <View style={styles.Categoriescard}>
                <View
                  style={{
                    marginBottom: hp(4),
                    marginTop: hp(5),
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: IMAGE_URL + item.image,
                    }}
                    style={styles.Categoriesimage}
                    resizeMode="contain"
                  ></Image>
                  <Text style={styles.Categoriestext}>{item?.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Categories;
