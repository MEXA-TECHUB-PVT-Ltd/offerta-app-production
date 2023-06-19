import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../utills/Colors';

const THUMB_RADIUS = 12;

const Thumb = () => {
  return (
    <>
    <View>
    <View style={styles.root}>
    <View style={styles.root1}/>
    </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 1.8,
    height: THUMB_RADIUS * 1.8,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: Colors.Appthemecolor,
    backgroundColor: Colors.Appthemecolor,
  },
  root1: {
    width: THUMB_RADIUS * 1.5,
    height: THUMB_RADIUS * 1.5,
    borderRadius: THUMB_RADIUS,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default memo(Thumb);
