import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, FlatList, View } from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../../../components/Header/CustomHeader";
import ExcahangeCard from "../../../../components/CustomCards/ExcahngeCard";
import NoDataFound from "../../../../components/NoDataFound/NoDataFound";

/////////////app styles////////////////
import styles from "./styles";

/////////////import ap function//////////
import { get_sucess_Exchnages } from "../../../../api/GetExchanges";
import TranslationStrings from "../../../../utills/TranslationStrings";

const SucessExchange = ({ navigation }) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();

  useEffect(() => {
    get_sucess_Exchnages().then((response) => {
      if (response.data.msg === "No Result") {
        setdata("");
      } else {
        setdata(response.data);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={TranslationStrings.SUCCESS_EXCHANGE}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"chevron-back"}
      />
      <View style={{ flex: 1 }}>
        {data === "" ? (
          <NoDataFound
            icon={"exclamation-thick"}
            text={TranslationStrings.NO_RECORD_FOUND}
          />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <ExcahangeCard
                image={
                  item.user2_item.images[0] === []
                    ? null
                    : item.user2_item.images[0]
                }
                maintext={"Item Name"}
                subtext={"username want to exchange with item name"}
                pricetext={"78$"}
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

export default SucessExchange;
