import React from 'react';
import {StyleSheet, View, Image, Text, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {IconButton} from 'react-native-paper';

//////////////app icons///////////
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

//////////////////app styles///////////////////
import Colors from '../../utills/Colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//////////////////app images////////////
import {appImages} from '../../constant/images';

///////////app fonts////////////
import {fontFamily} from '../../constant/fonts';

const Tab = createBottomTabNavigator();

//screeens
import Home from '../../screens/BottomTab/Home/Dashboard';
import ChatList from '../../screens/BottomTab/ChatList/ChatList';
import UploadItem from '../../screens/StackScreens/Dashboard/UploadItem';
import Notification from '../../screens/BottomTab/Notification/Notification';
import Profile from '../../screens/BottomTab/Profile/Profile';
import {useSelector} from 'react-redux';

function BottomTab() {
  const {chatCount, notificationCount} = useSelector(
    state => state.userReducer,
  );

  return (
    <Tab.Navigator
      labeled={false}
      activeColor={Colors.Appthemecolor}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Colors.Appthemecolor,
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          height: Platform.OS == 'android' ? hp(8) : hp(9),
          backgroundColor: 'white',
          shadowColor: '#000',
          shadowOffset: {
            width: 10,
            height: 12,
          },
          paddingTop:Platform.OS=='ios'? hp(2):0,
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
      }}
      // tabBarOptions={{
      //   activeTintColor: Colors.Appthemecolor,

      //   labelStyle: {
      //     fontSize: 12,
      //     marginBottom: 12,
      //     padding: 0,
      //     fontWeight: 'bold',
      //   },

      // }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,

          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab, focused ? style.selectedTab : null]}>
                <IconButton
                  icon={appImages.HomeIcon}
                  iconColor={!focused ? 'grey' : 'white'}
                  style={{
                    backgroundColor: focused ? null : 'white',
                    color: 'red',
                  }}
                  size={22}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{
          headerShown: false,
          tabBarBadge: chatCount == 0 ? null : chatCount,
          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab, focused ? style.selectedTab : null]}>
                <IconButton
                  icon={appImages.ChatIcon}
                  iconColor={!focused ? 'grey' : 'white'}
                  style={{
                    backgroundColor: focused ? null : 'white',
                    color: 'red',
                  }}
                  size={22}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="UploadItem"
        component={UploadItem}
        options={{
          headerShown: false,

          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab, focused ? style.selectedTab : null]}>
                <IconButton
                  icon={appImages.AddIcon}
                  iconColor={!focused ? 'grey' : 'white'}
                  style={{
                    backgroundColor: focused ? null : 'white',
                    color: 'red',
                  }}
                  size={22}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          tabBarBadge: notificationCount == 0 ? null : notificationCount,
          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab, focused ? style.selectedTab : null]}>
                <IconButton
                  icon={appImages.BellIcon}
                  iconColor={!focused ? 'grey' : 'white'}
                  style={{
                    backgroundColor: focused ? null : 'white',
                    color: 'red',
                  }}
                  size={22}
                />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,

          tabBarIcon: ({color, focused}) => (
            <View style={style.maintabview}>
              <View style={[style.tab, focused ? style.selectedTab : null]}>
                <IconButton
                  icon={appImages.PersonIcon}
                  iconColor={!focused ? 'grey' : 'white'}
                  style={{
                    backgroundColor: focused ? null : 'white',
                    color: 'red',
                  }}
                  size={22}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
const style = StyleSheet.create({
  maintabview: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  tab: {
    width: wp(12),
    height: hp(5.5),
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection:'row'
  },
  tabtextcolor: {
    color: Colors.BottomTabcolor,
    fontSize: hp(1.5),
    fontWeight: '300',
    fontFamily: fontFamily.Poppins_Medium,
    marginLeft: wp(1),
  },
  selectedTab: {
    backgroundColor: Colors.activetextinput,
    borderRadius: wp(10),
    width: wp(10),
    height: hp(4.8),
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
export default BottomTab;
