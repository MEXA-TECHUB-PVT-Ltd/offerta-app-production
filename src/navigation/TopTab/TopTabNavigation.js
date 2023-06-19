import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SaleTab from '../../screens/TopTab/SaleTab';
import {View, Text, Image, } from 'react-native';

//////////////////images///////////
import { appImages } from '../../constant/images';

//////////////////colors////////////////
import Colors from '../../utills/Colors';

const Tab = createMaterialTopTabNavigator();

export default function ToptabNavigator() {
  return (
    <Tab.Navigator
    initialRouteName='SaleToptab'
      screenOptions={{
        tabBarOptions:{
          labelStyle: { textTransform: 'none' }
        }
      }}
      >
      <Tab.Screen
        name="Sale"
        component={SaleTab}
        options={{
      
          tabBarLabelStyle: {color: 'black', fontWeight: 'bold', fontSize: 14, textTransform:'lowercase'},
          tabBarIcon: ({color}) => (
            <Image
            source={appImages.SaleIcon}
            style={{
              width: 20,
              height: 20,
             // alignSelf: 'center',
            }}
          />
          ),
        }}
      />
      <Tab.Screen
        name="Pets"
        component={SaleTab}
        options={{
          tabBarShowLabel: true,
          tabBarLabelStyle: {color: 'black', fontWeight: 'bold', fontSize: 14,textTransform:'lowercase'},
          tabBarIcon: ({color}) => (
            <Image
            source={appImages.PetsIcon}
            style={{
              width: 20,
              height: 20,
             // alignSelf: 'center',
            }}
          />
          ),
        }}
      />
      <Tab.Screen
        name="Vehicle"
        component={SaleTab}
        options={{
          //tabBarShowLabel: true,
          tabBarLabelStyle: {color: Colors.activetextinput, fontSize: 12,textTransform:'lowercase'},
          tabBarIcon: ({color}) => (
            <Image
            source={appImages.VehicleIcon}
            style={{
              width: 20,
              height: 20,
             // alignSelf: 'center',
            }}
          />
          ),
        }}
      />
      <Tab.Screen
        name="Property"
        component={SaleTab}
        options={{
   
          tabBarShowLabel: true,
          tabBarLabelStyle: {color: 'black', fontWeight: 'bold', fontSize: 11,textTransform:'lowercase'},
          tabBarIndicatorStyle:{width:10,height:20},
          tabBarIcon: ({color}) => (
            <Image
            source={appImages.PropertyIcon}
            style={{
              width: 20,
              height: 20,
             // alignSelf: 'center',
            }}
          />
          ),
        }}
      />
      <Tab.Screen
        name="Cloth"
        component={SaleTab}
        options={{
          tabBarShowLabel: true,
          tabBarLabelStyle: {color: 'black', fontWeight: 'bold', fontSize: 11,textTransform:'lowercase'},
          tabBarIcon: ({color}) => (
            <Image
            source={appImages.ClothIcon}
            style={{
              width: 20,
              height: 20,
             // alignSelf: 'center',
             // top:10
            }}
          />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
