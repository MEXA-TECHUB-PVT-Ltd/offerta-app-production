import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useTheme, Drawer, Text, Avatar, Title} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

//////////////////app components//////////
import CustomModal from '../../components/Modal/CustomModal';

import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////app styles//////////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';

/////////////////app images///////////
import {appImages} from '../../constant/images';

///////////////app fonts/////////////
import {fontFamily} from '../../constant/fonts';

/////////////image url////////////////
import {IMAGE_URL} from '../../utills/ApiRootUrl';

////////////////api function of user data/////////////
import {get_Login_UserData} from '../../api/GetApis';
import TranslationStrings from '../../utills/TranslationStrings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export const DrawerContent = props => {
  const paperTheme = useTheme();
  //Modal States
  const [modalVisible, setModalVisible] = useState(false);

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const logout = async () => {
    await AsyncStorage.removeItem('Userid');
    // props.navigation.navigate("Login");
    props.navigation.replace('AuthNav', {screen: 'Login'});
  };
  /////////////main menu status states/////////////
  const [username, setUsername] = useState('');
  const [user_image, setUser_Image] = useState('');
  const [user_fullname, setUser_FullName] = useState('');
  const GetUserData = async () => {
    get_Login_UserData().then(response => {
      setUsername(response.data.user_name);
      setUser_FullName(response.data.full_name);
      setUser_Image(response.data.image);
    });
  };
  useEffect(() => {
    GetUserData();
  }, []);
  const handleProfilePress = async () => {
    let userid = await AsyncStorage.getItem('Userid');
    props.navigation.navigate('Profile', {
      item: 'profile',
      id: userid,
    });
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{marginTop: 25, alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  handleProfilePress();
                }}>
                <Avatar.Image
                  source={{uri: IMAGE_URL + user_image}}
                  style={{backgroundColor: 'grey'}}
                  size={wp(20)}
                />
              </TouchableOpacity>
            </View>
            <View style={{alignSelf: 'center', marginLeft: wp(4)}}>
              <Title style={styles.title}>{user_fullname}</Title>
              <Title style={styles.caption}>{username}</Title>
            </View>
          </View>
          <View
            style={{
              marginTop: hp(3),
              height: hp(0.4),
              backgroundColor: 'rgba(112, 112,112, 0.1)',
              width: wp(65),
              alignSelf: 'center',
              marginBottom: hp(3),
            }}></View>
          <Drawer.Section style={styles.drawerSection} showDivider={false}>
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Image
                  source={appImages.drawerpayment}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label="Manage Stripe"
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate("StripePayments");
              }}
            /> */}

            <DrawerItem
              icon={({color, size}) => (
                <Image source={appImages.drawercard} style={styles.icon} />
              )}
              label={TranslationStrings.MANAGE_SHIPPING_ADDRESS}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('ShippingAddressList');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={appImages.drawerlanguage}
                  style={[styles.icon, {width: wp(7)}]}
                  resizeMode="contain"
                />
              )}
              label={TranslationStrings.Language}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('Language');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <MaterialIcons
                  name="live-tv"
                  size={wp(7)}
                  color={Colors.Appthemecolor}
                  style={{marginBottom: 6}}
                />
              )}
              label={'Live Streaming'}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('LiveUsers');
              }}
            />

            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={appImages.drawerchat}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label={TranslationStrings.INVITE_FRIENDS}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('InviteFriends');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={appImages.drawerbanner}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label={TranslationStrings.BANNER_ADVERTISEMENT}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('BannerAdvertisment');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={appImages.drawerblogs}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label={TranslationStrings.BLOGS}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('Blogs');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={appImages.drawerpolicy}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label={TranslationStrings.PRIVACY_POLICY}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('PrivacyTerms');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Image
                  source={appImages.drawerterms}
                  style={styles.icon}
                  resizeMode="contain"
                />
              )}
              label={TranslationStrings.TERMS_AND_CONDITIONS}
              labelStyle={styles.subtitle}
              onPress={() => {
                props.navigation.navigate('TermsCondition');
              }}
            />
          </Drawer.Section>
        </View>
        <Drawer.Section style={styles.bottomDrawerSection} showDivider={false}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              borderRadius: wp(8),
              width: wp(60),
              height: hp(6),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.Appthemecolor,
              marginBottom: hp(1),
            }}>
            <Text
              style={{color: 'white', fontSize: hp(1.6), fontWeight: 'bold'}}>
              {TranslationStrings.LOGOUT}
            </Text>
          </TouchableOpacity>
        </Drawer.Section>
      </DrawerContentScrollView>
      <CustomModal
        modalVisible={modalVisible}
        CloseModal={() => setModalVisible(false)}
        Icon={appImages.confirm}
        text={TranslationStrings.CONFIRMATION}
        type={'confirmation'}
        subtext={TranslationStrings.DO_YOU_REALLY_WANT_TO_LOGOUT}
        buttontext={TranslationStrings.YES}
        buttontext1={TranslationStrings.CANCEL}
        onPress={() => {
          setModalVisible(false);
        }}
        onPress1={() => {
          logout();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    marginTop: hp(3),
    paddingLeft: wp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  caption: {
    fontSize: hp(1.6),
    fontFamily: fontFamily.Poppins_Regular,
    lineHeight: 12,
  },
  title: {
    fontSize: hp(2),
    marginTop: hp(5),
    fontFamily: fontFamily.Poppins_SemiBold,
  },

  drawerSection: {
    marginTop: hp(0),
  },

  subtitle: {
    fontSize: hp(1.5),
    fontFamily: fontFamily.Poppins_Medium,
    color: '#404040',
  },
  bottomDrawerSection: {
    marginBottom: hp(3),
    marginTop: hp(10),
  },
  icon: {
    width: wp(6),
    height: hp(2.3),
    tintColor: Colors.Appthemecolor,
  },
});
