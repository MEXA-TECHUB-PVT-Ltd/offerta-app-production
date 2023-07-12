import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Linking} from 'react-native';

///////////////app components//////////
import Loader from '../../components/Loader/Loader';

////////////////app store data//////////////////
import AsyncStorage from '@react-native-async-storage/async-storage';
import TranslationStrings, {
  ChangeAppLanguage,
} from '../../utills/TranslationStrings';
import {get_Chat_Users} from '../../api/ChatApis';
import {useDispatch} from 'react-redux';
import {setChatCount, setNotificationCount} from '../../redux/actions';
import firestore from '@react-native-firebase/firestore';
import {
  GetListingsDetails_New,
  get_Notifications,
  get_user_status,
} from '../../api/GetApis';

const LoaderScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [isUrl, setIsUrl] = useState(false);
  const [listing_id, setListing_id] = useState('');
  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        handleDeeplink(url);
      })
      .catch(err => {
        console.warn('Deeplinking error', err);
      });

    const listener = Linking.addListener('url', e => {
      handleDeeplink(e.url);
    });
    return () => listener.remove();
  }, []);

  const handleDeeplink = async url => {
    if (url) {
      let id = url?.split('/')?.pop();
      setIsUrl(true);
      setListing_id(id);
      getData(true, id);
    } else {
      getData(false, '');
    }
    console.log('handleDeeplink  : ', url);
  };

  ////////////////loading/////////////
  const [loading, setloading] = useState(false);
  const getData = async (isUrl, listing_id) => {
    try {
      getSelectedLanguage();
      await AsyncStorage.getItem('Userid')
        .then(async db => {
          let user_id = db;
          // setloading(false);
          console.log('usertype...', {db});
          // let url = await Linking.getInitialURL();
          // let id = url?.split('/')?.pop(); //listing id
          let url = isUrl;
          let id = listing_id;
          console.log('URL______________________ ', {url, id});
          if (db === null) {
            setloading(false);
            // navigation.replace('Login');
            if (url) {
              navigation.replace('AuthNav', {
                screen: 'Login',
                params: {type: 'deep_linking', listing_id: id},
              });
            } else {
              navigation.replace('AuthNav', {screen: 'Login'});
            }
          } else {
            let user_status = await AsyncStorage.getItem('account_status');
            if (user_status == null || user_status?.length == 0) {
              console.log(
                'user_status updated..............................................',
              );
              let user_status = await get_user_status();
              if (typeof user_status != 'undefined') {
                await AsyncStorage.setItem(
                  'account_status',
                  user_status?.toString(),
                );
              }
            }

            console.log('url deep link:_______________________________  ', url);
            if (url) {
              //handle deep link

              let adminId = await getListingAdminId(id);
              if (user_id == adminId) {
                setTimeout(() => {
                  console.log('here..');
                  setloading(false);
                  navigation.replace('Drawerroute');
                  navigation.navigate('ListingsDetails', {
                    listing_id: id,
                  });
                }, 2000);
              } else {
                setTimeout(() => {
                  console.log('here..');
                  setloading(false);
                  navigation.replace('Drawerroute');
                  navigation.navigate('MainListingsDetails', {
                    listing_id: id,
                  });
                }, 2000);
              }
              console.log('adminId :  ', adminId);
            } else {
              setTimeout(() => {
                console.log('here..');
                setloading(false);
                navigation.replace('Drawerroute');
              }, 2000);
            }
          }
        })
        .done();
    } catch (error) {
      console.log('error  :  ', error);
    }
  };

  const getListingAdminId = async id => {
    return new Promise((resolve, reject) => {
      try {
        GetListingsDetails_New(id).then(res => {
          if (res?.data[0]?.user_id) {
            resolve(res?.data[0]?.user_id);
          } else {
            resolve(false);
          }
        });
      } catch (error) {
        resolve(false);
      }
    });
  };

  useEffect(() => {
    setloading(true);
    getDetails();
    get_user_notifications();
    // getData();
  }, []);

  const getSelectedLanguage = async () => {
    let language = await AsyncStorage.getItem('Language');
    if (language) {
      console.log('language : ', language);
      ChangeAppLanguage(language);
      ChangeAppLanguage(language);
      console.log('______________', TranslationStrings.getLanguage());
    } else {
      ChangeAppLanguage('es');
      console.log('else_________________________________');
      await AsyncStorage.setItem('Language', 'es');
    }
  };

  const countUnreadMessages = async response => {
    return new Promise(async (resolve, reject) => {
      try {
        var user = await AsyncStorage.getItem('Userid');
        let unread_count = 0;
        for (const element of response.data) {
          let user_id =
            element?.user?.id == user
              ? element?.chat_user?.id
              : element?.user?.id;
          let docid =
            user_id > user ? user + '-' + user_id : user_id + '-' + user;
          const user_list = firestore()
            .collection('chats')
            .doc(docid)
            .collection('messages');

          user_list
            .where('read', '==', false)
            .get()
            .then(snapshots => {
              let myArr = [];
              snapshots.forEach(item => {
                console.log(
                  'item?._data?.user?._id  :  ',
                  item?._data?.user?._id,
                  user,
                );
                if (item?._data?.user?._id != user) {
                  myArr.push(item);
                }
              });
              // console.log("myArr  : ", );
              // console.log("filter :  ", filter);
              resolve(myArr?.length);
            });
        }
        // resolve(0);
        // dispatch(setChatCount(unread_count));
      } catch (error) {
        console.log(
          'Error_____________________________________________',
          error,
        );
        resolve(0);
      }
    });
  };

  const getDetails = async () => {
    get_Chat_Users()
      .then(async response => {
        if (response.data.msg === 'No Result') {
          //
          console.log('////////////////');
        } else {
          let count = await countUnreadMessages(response);
          console.log('count ______________________________', count);
          dispatch(setChatCount(count));
        }
      })
      .catch(err => {
        console.log('126 error : ', err);
      });
  };

  const get_user_notifications = async () => {
    get_Notifications()
      .then(async response => {
        //setData(response.data)

        if (response.data.msg === 'No Result') {
          // setNotification("");
          console.log('no record found........... ');
        } else {
          if (response.data?.length > 0) {
            let notificationList = response.data;

            let lastNotification = await AsyncStorage.getItem(
              'LastNotification',
            );
            const filter = notificationList.filter(
              item => parseInt(item?.id) > parseInt(lastNotification),
            );

            dispatch(setNotificationCount(filter?.length));
            let lastItem = response.data?.pop();
            await AsyncStorage.setItem(
              'LastNotification',
              lastItem?.id?.toString(),
            );
            console.log('notification count  :  ', filter?.length);
            console.log('last item     :  ', lastItem?.id?.toString());
            //setNotification(notificationList.reverse());
          }
        }
      })
      .catch(err => {
        console.log('Error : ', err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};
export default LoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
