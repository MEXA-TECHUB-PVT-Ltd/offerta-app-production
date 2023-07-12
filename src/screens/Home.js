import {StyleSheet, Text, View, Linking} from 'react-native';
import React, {useEffect} from 'react';

const Home = ({navigation, route}) => {
  console.log('route  : ', route?.params);
  useEffect(() => {
    Linking.getInitialURL().then(url => {
      console.log(`url`, url);
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
