import React, {useEffect, useState, useRef} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';

//////////////////app components///////////////
import CustomHeader from '../../../../components/Header/CustomHeader';
import DashboardCard from '../../../../components/CustomCards/DashboardCard';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL} from '../../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////app images/////////////////////
import {appImages} from '../../../../constant/images';
import TranslationStrings from '../../../../utills/TranslationStrings';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    subtext: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
    price: '20$',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    subtext: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
    price: '20$',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    subtext: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
    price: '20$',
  },
];

const SelectedList = ({navigation, route}) => {
  const [data, setdata] = useState([
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      subtext: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      price: '20$',
      selectitem: false,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      subtext: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      price: '20$',
      selectitem: false,
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      subtext: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      price: '20$',
      selectitem: false,
    },
  ]);

  ///////////////select function/////////////
  const onselect = (ind, type) => {
    const temdata = data.map((item, index) => {
      if (item.id === ind) {
        return {...item, selectitem: type};
      } else {
        return item;
      }
    });
    setdata(temdata);
  };
  useEffect(() => {}, []);

  const renderItem = ({item, index}) => (
    <DashboardCard
      video={item?.video}
      image={'image'}
      maintext={item.title}
      subtext={item.subtext}
      price={item.price}
      selected={item.selectitem}
      type={'Selected_List'}
      onpress={() => onselect(item.id, !item.selectitem)}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      > */}
      <CustomHeader
        headerlabel={TranslationStrings.SELECT_ITEM}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={'arrow-back'}
      />
      <FlatList
        data={data}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SelectedList;
