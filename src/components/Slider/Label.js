import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';

import { widthPercentageToDP as wp, heightPercentageToDP as hp }
  from 'react-native-responsive-screen';

const Label = ({ text, ...restProps }) => {
  return (
    <View style={styles.root} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingTop:wp(2),
    paddingBottom:wp(2),
    paddingRight:wp(7),
    paddingLeft:wp(7),
    backgroundColor: Colors.Appthemecolor,
    borderRadius: wp(5),
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default memo(Label);
