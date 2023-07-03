import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TranslationStrings from '../../utills/TranslationStrings';

const BottomTabs = ({selectedTab, onTabPress, showBottomView}) => {
  return (
    <View style={styles.bottomTabContainer}>
      <TouchableOpacity
        onPress={() => {
          onTabPress && onTabPress(0);
        }}
        style={{
          ...styles.tabBtn,
          borderBottomWidth: selectedTab == 0 ? 2 : 0,
        }}>
        <Text style={styles.tabText}>{TranslationStrings.COMMENTS}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onTabPress && onTabPress(1);
        }}
        style={{
          ...styles.tabBtn,
          borderBottomWidth: selectedTab == 1 ? 2 : 0,
        }}>
        <Text style={styles.tabText}>{TranslationStrings.PRODUCTS}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onTabPress && onTabPress(2);
        }}
        style={{
          ...styles.tabBtn,
        }}>
        {showBottomView ? (
          <AntDesign name="upcircleo" color={'white'} size={20} />
        ) : (
          <AntDesign name="downcircleo" color={'white'} size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  tabBtn: {
    marginHorizontal: 10,
    borderColor: 'white',
  },
  tabText: {color: 'white'},
});
