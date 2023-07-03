import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {appImages} from '../../constant/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import {fontFamily} from '../../constant/fonts';
import {IMAGE_URL} from '../../utills/ApiRootUrl';

const Header = ({userName, profile, totalViewers, duration, onBackPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{alignItems: 'center', flexDirection: 'row', zIndex: 999}}>
        <TouchableOpacity onPress={onBackPress}>
          <AntDesign name="arrowleft" color={'white'} size={22} />
        </TouchableOpacity>

        <View style={styles.userContainer}>
          {profile ? (
            <Avatar.Image source={{uri: IMAGE_URL + profile}} size={30} />
          ) : (
            <Avatar.Image
              source={appImages.User}
              size={30}
              style={{backgroundColor: '#fff'}}
            />
          )}
          <Text style={styles.name}>{userName ? userName : 'Anonymous'}</Text>
        </View>
      </View>
      <View style={{alignSelf: 'flex-end'}}>
        <View style={{...styles.totalViewsContainer, marginBottom: 4}}>
          <Ionicons name="md-eye-outline" color={'#0A0932'} size={17} />
          <Text style={styles.viewersText}>{totalViewers}</Text>
        </View>
        <View style={{...styles.totalViewsContainer, marginBottom: 8}}>
          <Text style={styles.viewersText}>{duration}</Text>
        </View>
        {/* <View
          style={{
            ...styles.totalViewsContainer,
            backgroundColor: 'red',
            width: 85,
            paddingVertical: 8,
          }}>
          <Text style={{...styles.viewersText, fontSize: 10, color: 'white'}}>
            End Stream
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  userContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000059',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
  },
  name: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
    fontFamily: fontFamily.Poppins_Regular,
    marginBottom: -3,
  },
  totalViewsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFFB2',
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 3,
    justifyContent: 'center',
  },
  viewersText: {
    color: '#0A0932',
    fontSize: 10,
    fontFamily: fontFamily.Poppins_Regular,
    marginLeft: 4,
    marginBottom: -2.5,
  },
});
