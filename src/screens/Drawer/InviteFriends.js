import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';

//////////////////app icons/////////////
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/////////////app styles///////////////////
import styles from './styles';
import Logostyles from '../../styles/GlobalStyles/Logostyles';
import Colors from '../../utills/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

////////////////////app images////////
import {appImages} from '../../constant/images';
import TranslationStrings from '../../utills/TranslationStrings';
import AppLink from '../../utills/AppLink';
import {openInbox, openComposer} from 'react-native-email-link';

const InviteFriends = ({navigation}) => {
  // const shareWhatsapp = async () => {
  //   // const shareOptions1 = {
  //   //   title: 'Shared on Whatsapp',
  //   //   social: Share.Social.EMAIL,
  //   //   failOnCancel: false,
  //   //   // urls: [image1, image2],
  //   // };

  //   // const shareOptions = {
  //   //   // title: 'Share via',
  //   //   // message: 'some message',
  //   //   url: 'some share url',
  //   //   social: Share.Social.WHATSAPP,
  //   //   whatsAppNumber: '+92 3434', // country code + phone number
  //   //   // filename: 'test', // only for base64 file in Android
  //   // };
  //   // try {
  //   //   const ShareResponse = await Share.open(shareOptions);
  //   // } catch (error) {
  //   //   console.log('Error =>', error);
  //   // }

  //   // Share.shareSingle({
  //   //   title: 'Share via',
  //   //   message: 'some message',
  //   //   url: 'some share url',
  //   //   social: Share.Social.WHATSAPP,
  //   // });
  //   var SendIntentAndroid = require('react-native-send-intent');
  //   SendIntentAndroid.sendText({
  //     text: AppLink,
  //     type: SendIntentAndroid.TEXT_PLAIN,
  //     packageName: 'com.google.android.gm',
  //   });
  //   // packageName: 'com.whatsapp',
  //   // packageName: 'com.facebook.orca',
  // };

  const shareWhatsapp = async () => {
    const url1 = AppLink; // Replace with your app link
    if (Platform.OS === 'android') {
      const encodedUrl = encodeURIComponent(url1);
      Linking.openURL(`whatsapp://send?text=${encodedUrl}`);
    } else {
      Linking.openURL(`whatsapp://send?text=${url1}`);
    }
  };

  const shareLinkOnMessenger = url => {
    const url1 = AppLink; // Replace with your app link
    if (Platform.OS === 'android') {
      Linking.openURL(`fb-messenger://share?link=${encodeURIComponent(url1)}`);
    } else {
      Linking.openURL(`fb-messenger://share/?link=${url1}`);
    }
  };
  const shareLinkOnEmail = async url => {
    openComposer({
      // to: 'support@example.com',
      // subject: 'Down',
      body: AppLink,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Ionicons
          name={'arrow-back'}
          size={25}
          color={Colors.Appthemecolor}
          style={{marginLeft: wp(5), marginTop: hp(3)}}
          onPress={() => navigation.goBack()}
        />
        <View style={[Logostyles.Logoview, {marginTop: hp(5)}]}>
          <Image
            source={appImages.logo}
            style={Logostyles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={{alignItems: 'center', marginBottom: hp(5)}}>
          <Text style={styles.friendsmaintext}>
            {TranslationStrings.INVITE_FRIENDS_VIA}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => shareLinkOnMessenger()}
          style={[styles.friendsview, {backgroundColor: '#576AF4'}]}>
          <MaterialCommunityIcons
            name={'facebook-messenger'}
            size={25}
            color={'white'}
            // onPress={() => navigation.goBack()}
          />
          <Text style={styles.friendstext}>
            {TranslationStrings.INVITE_FRIENDS_VIA_MESSENGER}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => shareWhatsapp()}
          style={[styles.friendsview, {backgroundColor: '#00AC28'}]}>
          <MaterialCommunityIcons
            name={'whatsapp'}
            size={25}
            color={'white'}
            // onPress={() => navigation.goBack()}
          />
          <Text style={[styles.friendstext]}>
            {TranslationStrings.INVITE_FRIENDS_VIA_WHATSAPP}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => shareLinkOnEmail()}
          style={[styles.friendsview, , {backgroundColor: '#EA4335'}]}>
          <MaterialCommunityIcons
            name={'email'}
            size={25}
            color={'white'}
            // onPress={() => navigation.goBack()}
          />
          <Text style={styles.friendstext}>
            {TranslationStrings.INVITE_FRIENDS_VIA_MAIL}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InviteFriends;
