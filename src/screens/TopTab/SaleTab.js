import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

//////////////////app components///////////////
import DashboardCard from '../../components/CustomCards/DashboardCard';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const SaleTab = ({navigation, route}) => {
  useEffect(() => {}, []);

  const renderItem = ({item}) => (
    <DashboardCard
      image={'image'}
      video={item?.video}
      maintext={item.title}
      subtext={item.subtext}
      price={item.price}
      onpress={() => navigation.navigate('ListingsDetails')}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <FlatList
          data={DATA}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SaleTab;
