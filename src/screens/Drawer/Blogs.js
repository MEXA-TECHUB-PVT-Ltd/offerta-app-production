import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";

//////////////////app components///////////////
import CustomHeader from "../../components/Header/CustomHeader";
import BlogCard from "../../components/CustomCards/BlogCard";

/////////////app styles////////////////
import styles from "./styles";

import Loader from "../../components/Loader/Loader";

/////////////api function/////////////////
import { get_All_Blogs } from "../../api/Blogs";
import TranslationStrings from "../../utills/TranslationStrings";

const Blogs = ({ navigation, route }) => {
  ////////////////LIST DATA/////////
  const [data, setdata] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    get_All_Blogs()
      .then((response) => {
        if (response.data.message === "No data available") {
          setdata("");
        } else {
          let list = response?.data ? response?.data : [];
          setdata(list?.reverse());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderItem = (item) => {
    return (
      <BlogCard
        image={item?.item?.cover_img}
        maintext={item?.item?.title}
        subtext={item?.item?.category?.category_name}
        subtext1={item?.item?.sub_category?.sub_category_name}
        onpress={() =>
          navigation.navigate("BlogsDetails", { blog_id: item.item.id })
        }
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        headerlabel={TranslationStrings.BLOGS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={"arrow-back"}
      />
      <Loader isLoading={loading} />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Blogs;
