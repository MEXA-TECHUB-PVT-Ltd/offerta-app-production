import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useRef, useState, useEffect, memo} from 'react';
import {Avatar} from 'react-native-paper';
import {appImages} from '../../constant/images';
import {fontFamily} from '../../constant/fonts';
import {IMAGE_URL} from '../../utills/ApiRootUrl';

const CommentsList = ({data}) => {
  const ref_CommentFlatList = useRef(null);
  return (
    <View>
      <FlatList
        fadingEdgeLength={100}
        ref={ref_CommentFlatList}
        onContentSizeChange={() =>
          ref_CommentFlatList.current?.scrollToEnd({
            animated: true,
          })
        }
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {item?.profile ? (
                <Avatar.Image
                  source={{uri: IMAGE_URL + item?.profile}}
                  size={30}
                />
              ) : (
                <Avatar.Image
                  source={appImages.User}
                  size={30}
                  style={{backgroundColor: 'white'}}
                />
              )}
              <View
                style={{
                  justifyContent: 'center',
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: fontFamily.Poppins_Medium,
                    fontSize: 12,
                  }}>
                  {item?.user_name ? item?.user_name : 'Anonymous'}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontFamily: fontFamily.Poppins_Regular,
                    fontSize: 10,
                  }}>
                  {item?.comment}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default memo(CommentsList);

const styles = StyleSheet.create({});
