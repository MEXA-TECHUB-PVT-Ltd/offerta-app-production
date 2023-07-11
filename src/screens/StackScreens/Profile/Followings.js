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
import CustomHeader from '../../../components/Header/CustomHeader';
import ListCard from '../../../components/CustomCards/ListCard';

/////////////app styles////////////////
import styles from './styles';
import Colors from '../../../utills/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////////////////app api/////////////////////////
import axios from 'axios';
import {BASE_URL, IMAGE_URL} from '../../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////app images/////////////////////
import {appImages} from '../../../constant/images';

/////////////app api functions//////////
import {
  get_Login_User_Followings_List,
  get_Specific_User_Followings_List,
} from '../../../api/GetApis';
import TranslationStrings from '../../../utills/TranslationStrings';
import Loader from '../../../components/Loader/Loader';
import {post_UnFollow_Users} from '../../../api/PostApis';
import NoNotificationFound from '../../BottomTab/Notification/NoNotificationFound';

const Followings = ({navigation, route}) => {
  /////////////main menu status states/////////////
  const [followings_list, setFollowings_List] = useState([]);
  const [current_user_id, setCurrent_user_id] = useState(0);
  const [loading, setLoading] = useState(false);
  const GetFollowings = async () => {
    var user_id = await AsyncStorage.getItem('Userid');
    setCurrent_user_id(user_id);
    // get_Login_User_Followings_List().then((response) => {
    //   if (response.data.msg === "No follower yet") {
    //     setFollowings_List("");
    //   } else {
    //     setFollowings_List(response.data);
    //   }
    // });

    setLoading(true);
    get_Specific_User_Followings_List(route?.params?.user_id)
      .then(response => {
        if (response.data.msg === 'No follower yet') {
          setFollowings_List([]);
        } else {
          setFollowings_List(response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    GetFollowings();
  }, []);

  const handleUnFollowUser = async item => {
    setLoading(true);
    post_UnFollow_Users(item?.user?.id)
      .then(response => {
        const filter = followings_list?.filter(
          element => element?.user?.id != item?.user?.id,
        );
        setFollowings_List(filter);
      })
      .finally(() => setLoading(false));
  };
  const renderItem = ({item}) => (
    <ListCard
      onPress={() => handleUnFollowUser(item)}
      list_type={'followings'}
      user_type={
        route?.params?.user_id == current_user_id ? null : 'other_user'
      }
      current_user_id={current_user_id}
      user_id={route?.params?.user_id}
      image={{uri: IMAGE_URL + item.user.image}}
      usename={item.user.user_name}
      fullname={item.user.full_name}
      type={item.status}
      btnstatus={true}
      // onpress={() => navigation.navigate('ListingsDetails')}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      > */}
      <Loader isLoading={loading} />
      <CustomHeader
        headerlabel={TranslationStrings.FOLLOWINGS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={'arrow-back'}
      />
      <FlatList
        data={followings_list}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => <NoNotificationFound />}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Followings;
