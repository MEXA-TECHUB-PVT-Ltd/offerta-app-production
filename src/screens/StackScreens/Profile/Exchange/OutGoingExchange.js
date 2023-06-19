import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import ExcahangeOffersCards from "../../../../components/CustomCards/ExchangeOffersCards";
import NoDataFound from "../../../../components/NoDataFound/NoDataFound";

/////////////app styles////////////////
import styles from "./styles";

/////////////////api function//////////////////
import { get_outgoing_Exchnages } from "../../../../api/GetExchanges";

///////////////image url//////////////////////
import { IMAGE_URL } from "../../../../utills/ApiRootUrl";
import TranslationStrings from "../../../../utills/TranslationStrings";

const OutGoingExchange = ({ navigation }) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState([]);

  useEffect(() => {
    //getdat()
    get_outgoing_Exchnages().then((response) => {
      if (
        response.data.msg === "No Result" ||
        response?.data?.message == "No data available"
      ) {
        setdata([]);
      } else {
        // console.log("else....", response?.data);
        setdata(response.data);
      }
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={TranslationStrings.OUT_GOING_EXCHANGE}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"chevron-back"}
      />
      <View style={{ flex: 1 }}>
        {data?.length == 0 ? (
          <NoDataFound
            icon={"exclamation-thick"}
            text={TranslationStrings.NO_RECORD_FOUND}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              // console.log("item.item.user::", item?.user_item?.images?.length)

              <ExcahangeOffersCards
                image={
                  typeof item?.user_item?.images?.length == "undefined" ||
                  item?.user_item?.images?.length === 0
                    ? null
                    : IMAGE_URL + item?.user_item?.images[0]
                }
                image2={
                  typeof item?.user2_item?.images?.length == "undefined" ||
                  item?.user2_item?.images?.length == 0
                    ? null
                    : IMAGE_URL + item?.user2_item?.images[0]
                }
                maintext={item?.user_item?.title}
                maintext2={item?.user2_item?.title}
                // subtext={item.user2_item.description}
                // pricetext={item.user2_item.price}
              />
            )}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OutGoingExchange;
