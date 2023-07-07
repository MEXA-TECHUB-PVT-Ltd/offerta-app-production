import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

///////////////app icons///////////////
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/////////////app styles///////////////////
import styles from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app redux///////////
import {useSelector} from 'react-redux';
import Colors from '../../utills/Colors';
import {fontFamily} from '../../constant/fonts';

const CustomHeader = ({
  navigation,
  headerlabel,
  iconPress,
  icon,
  onpresseacrh,
  type,
  searchicon,
  rightText,
  onRightTextPress,
}) => {
  ////////////////////redux/////////////////////
  const {theme} = useSelector(state => state.userReducer);

  return (
    <View
      style={[
        styles.headerView,
        {marginBottom: type === 'profile' ? hp(0) : hp(3.5)},
      ]}>
      <StatusBar
        backgroundColor={Colors.Appthemecolor}
        translucent={false}
        barStyle={'light-content'}
      />
      <Icon
        name={icon}
        size={25}
        color={'white'}
        onPress={iconPress}
        style={{marginLeft: wp(3)}}
      />
      <Text
        // numberOfLines={1}
        style={{
          ...styles.label,
          textAlign: 'left',
          flex: 1,
          textTransform: 'capitalize',
        }}>
        {headerlabel}
      </Text>

      {type === 'left_icon' ? (
        <MaterialCommunityIcons
          name={searchicon}
          size={25}
          color={'white'}
          // style={{ marginLeft: wp(25) }}
          onPress={onpresseacrh}
        />
      ) : null}
      {/* <Icon
        name={searchicon}
        size={25}
        color={"white"}
        style={{marginLeft:wp(30)}}
        onPress={onpresseacrh}
      /> */}

      {rightText && (
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 5,
            paddingVertical: 3,
            borderRadius: 3,
          }}
          onPress={onRightTextPress}>
          <Text
            // numberOfLines={1}
            style={{
              color: Colors.Appthemecolor,
              // marginLeft: wp(8),
              fontSize: hp(1.3),
              fontFamily: fontFamily.Poppins_Regular,
              textAlign: 'center',
              textAlign: 'left',
            }}>
            {rightText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;
