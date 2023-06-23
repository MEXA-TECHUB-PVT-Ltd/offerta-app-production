import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Screens
import {DrawerContent} from './CustomDrawer';
import BottomTab from '../BottomTab/BottomTab';
import PrivacyTerms from '../../screens/Drawer/Privacy_Policy';
import TermsCondition from '../../screens/Drawer/Terms_Conditions';
import Language from '../../screens/Drawer/Language';
import InviteFriends from '../../screens/Drawer/InviteFriends';
import BannerAdvertisment from '../../screens/Drawer/Banner/BannerAdvertisment';
import ShippingAddressList from '../../screens/Drawer/ShippingAdress/ShippingAddressList';
import Blogs from '../../screens/Drawer/Blogs';
import StripePayments from '../../screens/Drawer/StripePayment';
import PaypalMonthlySubscription from '../../screens/StackScreens/PaymentMethods/PaypalMonthlySubscription';
import LiveUsers from '../../screens/LiveStreaming/LiveUsers';
import StripeMonthlySubscription from '../../screens/StackScreens/Payment/StripeMonthlySubscription';

const Drawer = createDrawerNavigator();

export default function Drawerroute() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="BottomTab"
        component={BottomTab}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="PrivacyTerms"
        component={PrivacyTerms}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="LiveUsers"
        component={LiveUsers}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="TermsCondition"
        component={TermsCondition}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="Language"
        component={Language}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="InviteFriends"
        component={InviteFriends}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="BannerAdvertisment"
        component={BannerAdvertisment}
      />

      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="ShippingAddressList"
        component={ShippingAddressList}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="Blogs"
        component={Blogs}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="StripePayments"
        component={StripePayments}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="PaypalMonthlySubscription"
        component={PaypalMonthlySubscription}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
        }}
        name="StripeMonthlySubscription"
        component={StripeMonthlySubscription}
      />
    </Drawer.Navigator>
  );
}
