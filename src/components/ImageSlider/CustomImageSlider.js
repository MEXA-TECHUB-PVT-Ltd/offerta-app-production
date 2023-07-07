import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ImageBackground,
} from 'react-native';
// import Carousel, { Pagination } from "react-native-snap-carousel";

import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {Pagination} from 'react-native-swiper-flatlist/src/components';

export const SLIDER_WIDTH = Dimensions.get('window').width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../utills/Colors';
import {BASE_URL, IMAGE_URL} from '../../utills/ApiRootUrl';

import {Snackbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: 1,
    name: 'React JS',
    url: 'https://icon-library.com/images/react-icon/react-icon-29.jpg',
  },
  {
    id: 2,
    name: 'JavaScript',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Javascript_Logo.png',
  },
  {
    id: 3,
    name: 'Node JS',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/NodeJS.png',
  },
];

const renderItem = ({item}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Image source={{uri: item.url}} style={{width: 200, height: 200}} />
      <Text style={{marginVertical: 10, fontSize: 20, fontWeight: 'bold'}}>
        {item.name}
      </Text>
    </View>
  );
};

const CustomImageSlider = ({imagearray, type}) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);
  const navigation = useNavigation();
  return (
    <View style={{width: wp(100), marginVertical: 10}}>
      {imagearray ? (
        <SwiperFlatList
          autoplay={type == 'upload_item' ? false : true}
          autoplayDelay={2}
          autoplayLoop
          //   index={2}
          showPagination
          data={imagearray}
          renderItem={({item}) => {
            return (
              <>
                {type == 'upload_item' ? (
                  <View onPress={() => {}} style={styles.sliderCard}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CameraViewScreen')}
                      style={styles.btnChange}>
                      <Text style={styles.btnChangeText}>Change</Text>
                    </TouchableOpacity>
                    {/* <ImageBackground
                      blurRadius={4}
                      resizeMode="cover"
                      source={{
                        uri: item?.path,
                      }}
                      style={{ flex: 1, justifyContent: "center" }}
                    > */}
                    <Image
                      source={{
                        uri: item?.path,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode={'cover'}
                    />
                    {/* </ImageBackground> */}
                  </View>
                ) : type == 'edit_item' ? (
                  <View style={styles.sliderCard}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CameraViewScreen')}
                      style={styles.btnChange}>
                      <Text style={styles.btnChangeText}>Change</Text>
                    </TouchableOpacity>
                    {/* <ImageBackground
                      blurRadius={4}
                      resizeMode="cover"
                      source={{
                        uri: item?.path ? item?.path : IMAGE_URL + item,
                      }}
                      style={{flex: 1, justifyContent: 'center'}}> */}
                    <Image
                      source={{
                        uri: item?.path ? item?.path : IMAGE_URL + item,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode={'cover'}
                    />
                    {/* </ImageBackground> */}
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item?.app_img_link).catch(err => {
                        setsnackbarValue({
                          value: 'Something went wrong.Unable to open url',
                          color: 'red',
                        });
                        setVisible(true);
                      });
                    }}
                    style={styles.sliderCard}>
                    {/* <ImageBackground
                      blurRadius={4}
                      resizeMode="cover"
                      source={{
                        uri: `${IMAGE_URL}${item?.app_img}`,
                      }}
                      style={{flex: 1, justifyContent: 'center'}}> */}
                    <Image
                      source={{
                        uri: `${IMAGE_URL}${item?.app_img}`,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      resizeMode={'cover'}
                    />
                    {/* </ImageBackground> */}
                  </TouchableOpacity>
                )}
              </>
            );
          }}
          paginationStyleItemInactive={{
            marginHorizontal: 6,
          }}
          paginationStyleItemActive={{
            marginHorizontal: 6,
          }}
          paginationStyleItem={{
            height: 9,
            width: 9,
            // margin: 0,
          }}
          PaginationComponent={props => {
            return (
              <Pagination
                {...props}
                paginationStyle={styles.paginationContainer}
                paginationStyleItem={styles.pagination}
                paginationDefaultColor={Colors.border}
                paginationActiveColor={Colors.activetextinput}
              />
            );
          }}
        />
      ) : null}

      <Snackbar
        duration={2000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        style={{
          backgroundColor: snackbarValue.color,
          marginBottom: hp(20),
          zIndex: 999,
        }}>
        {snackbarValue.value}
      </Snackbar>
    </View>
  );
};

export default CustomImageSlider;

// const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {height: 190, width: wp(90), justifyContent: 'center'},
  text: {fontSize: wp(100) * 0.5, textAlign: 'center'},
  paginationContainer: {
    bottom: -40,
  },
  pagination: {
    // borderRadius: 20,
    // width: 30,
    // height: 8,
    // backgroundColor: "red",

    width: wp(3.5),
    height: hp(0.7),
    borderRadius: 15,
    marginHorizontal: -3,

    padding: 0,
    margin: 0,
    // marginVertical: 10,
  },
  btnChange: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'green',
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  btnChangeText: {
    color: 'white',
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    fontWeight: 'bold',
  },
  sliderCard: {
    width: wp(90),
    marginHorizontal: wp(5),
    height: hp(25),
    alignSelf: 'center',
    borderRadius: hp(2.5),
    //   backgroundColor: item,
    borderWidth: 0.5,
    // marginTop: 35,
    overflow: 'hidden',
  },
});

// import React, { useState, useRef } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
//   Image,
// } from "react-native";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from "react-native-responsive-screen";

// import { SliderBox } from "react-native-image-slider-box";
// const SCREEN_WIDTH = Dimensions.get("window").width;
// const SCREEN_HEIGHT = Dimensions.get("window").height;
// const CustomImageSlider = ({ data, onChange }) => {
//   const flatListRef = useRef(null);
//   ``;
//   const [activeIndex, setActiveIndex] = useState(1);

//   let onScrollEnd = (e) => {
//     // console.log(e);
//     console.log("scrooll....");
//     let pageNumber = Math.min(
//       Math.max(
//         Math.floor(e.nativeEvent.contentOffset.x / SCREEN_WIDTH + 0.5) + 1,
//         0
//       ),
//       data.length
//     );
//     console.log(pageNumber);
//     setActiveIndex(pageNumber);
//   };
//   return (
//     <View style={{ height: hp(25) }}>
//       <View
//         style={{
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <SliderBox
//           //   images={data}
//           images={[
//             "https://source.unsplash.com/1024x768/?nature",
//             "https://source.unsplash.com/1024x768/?water",
//             "https://source.unsplash.com/1024x768/?girl",
//             "https://source.unsplash.com/1024x768/?tree", // Network image // Local image
//           ]}
//           style={{
//             width: wp(89),
//             height: hp(23),
//             alignSelf: "center",
//             // marginHorizontal: 5,
//             borderRadius: hp(2),
//           }}
//           dotColor="#00CE30"
//           inactiveDotColor="#838383"
//           ImageComponent={(props) => {
//             return (
//               <View {...props}>
//                 <Image
//                   {...props}
//                   source={{ uri: props.source.uri }}
//                   style={{
//                     width: wp(89),
//                     height: hp(23),
//                     alignSelf: "center",
//                     // marginHorizontal: 5,
//                     borderRadius: hp(2),
//                   }}
//                 />
//                 {/* {onChange && (
//                   <TouchableOpacity
//                     activeOpacity={0.6}
//                     onPress={onChange}
//                     style={{
//                       height: hp(4),
//                       width: responsiveWidth(20),
//                       backgroundColor: '#00ce30',
//                       position: 'absolute',
//                       right: responsiveWidth(4),
//                       top: responsiveWidth(3),
//                       borderRadius: responsiveWidth(0.8),
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                     }}>
//                     <Text
//                       style={{
//                         fontFamily: fontFamily.OpenSans_Bold,
//                         color: '#fff',
//                         fontSize: responsiveFontSize(1.7),
//                         borderRadius: 2,
//                       }}>
//                       CHANGE
//                     </Text>
//                   </TouchableOpacity>
//                 )} */}
//               </View>
//             );
//           }}
//           imageLoadingColor="#00CE30"
//           paginationBoxStyle={{
//             bottom: -15,
//           }}
//           dotStyle={{
//             width: wp(5.5),
//             height: hp(0.7),
//             borderRadius: 15,
//             marginHorizontal: -3,
//             padding: 0,
//             margin: 0,
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default CustomImageSlider;

// const styles = StyleSheet.create({
//   dotContainer: {
//     // backgroundColor: 'red',
//     flexDirection: "row",
//     // width: 50,
//     justifyContent: "space-between",
//     alignSelf: "center",
//     marginTop: 5,
//   },
//   dot: {
//     width: 20,
//     height: 6,
//     marginHorizontal: 5,
//     borderRadius: 9,
//     backgroundColor: "pink",
//   },
// });
