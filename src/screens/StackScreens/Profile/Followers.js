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

////////////app api function///////////
import {
  get_Login_User_Followers_List,
  get_Specific_User_Followers_List,
} from '../../../api/GetApis';
import TranslationStrings from '../../../utills/TranslationStrings';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import NoNotificationFound from '../../BottomTab/Notification/NoNotificationFound';
import Loader from '../../../components/Loader/Loader';
import {post_Follow_Users} from '../../../api/PostApis';

const Followers = ({navigation, route}) => {
  const [current_user_id, setCurrent_user_id] = useState(0);
  ////////////Folllowr list data///////////
  const [follwer_list, setFollower_List] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const GetFollowers_List = async () => {
    setLoading(true);
    var user_id = await AsyncStorage.getItem('Userid');
    setCurrent_user_id(user_id);
    // get_Login_User_Followers_List().then(response => {
    //   if (response.data.msg === 'No follower yet') {
    //     setFollower_List('');
    //   } else {
    //     setFollower_List(response.data);
    //   }
    // });

    get_Specific_User_Followers_List(route?.params?.user_id)
      .then(response => {
        setFollower_List([]);
        if (
          response.data.msg === 'No follower yet' ||
          response.data.msg === 'No Result'
        ) {
          setFollower_List([]);
        } else {
          setFollower_List(response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    GetFollowers_List();
  }, []);

  const follow_user = item => {
    setLoading(true);
    post_Follow_Users(item?.user?.id)
      .then(response => {
        const newData = follwer_list?.map(element => {
          if (element?.user?.id == item?.user?.id) {
            return {
              ...element,
              user: element?.user,
              status: element?.status == true ? false : true,
            };
          } else {
            return {
              ...element,
            };
          }
        });
        setFollower_List(newData);
        // setFollow_User_id(response.data.user.id);
        // disspatch(
        //   setOtherUserFollowersCountINC(response.data.following_user.followers),
        // );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderItem = ({item}) => (
    <ListCard
      onFollowPress={() => follow_user(item)}
      user_type={
        route?.params?.user_id == current_user_id ? null : 'other_user'
      }
      current_user_id={current_user_id}
      // user_id={route?.params?.user_id}
      user_id={item?.user?.id}
      image={{uri: IMAGE_URL + item.user.image}}
      usename={item?.user?.user_name}
      fullname={item?.user?.full_name}
      type={item?.status}
      btnstatus={item.status === true ? true : false}
      onpress={() => navigation.navigate('ListingsDetails')}
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
        headerlabel={TranslationStrings.FOLLOWERS}
        iconPress={() => {
          navigation.goBack();
        }}
        icon={'arrow-back'}
      />
      <FlatList
        data={follwer_list}
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

export default Followers;
