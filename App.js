import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//////////////notification/////////////////
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import {Provider, useDispatch, useSelector} from 'react-redux';
import {Store} from './src/redux/store';

//Screens
import AuthNav from './src/navigation/AuthNav/AuthNav';
///////////////Drawer stack///////////////
import Drawerroute from './src/navigation/Drawer/Drawer';
import AddBanner from './src/screens/Drawer/Banner/AddBanner';
import PaymentMethod from './src/screens/Drawer/Banner/PaymentMethod';
import UpdateShippingAddress from './src/screens/Drawer/ShippingAdress/UpdateShippingAdress';
import ShippingAddress from './src/screens/Drawer/ShippingAdress/ShippingAdress';

///////////////////Bottomtab stack//////////
import Categories from './src/screens/StackScreens/Dashboard/Categories';
import Filter from './src/screens/StackScreens/Dashboard/Filter';
import ChatScreen from './src/screens/StackScreens/Chat/ChatScreen';
import Search from './src/screens/StackScreens/Dashboard/Search';
import Settings from './src/screens/StackScreens/Settings/Settings';

//////////////////Home screens/////////////
import MainListingsDetails from './src/screens/StackScreens/Dashboard/OtherListings/MainListingDetails';
//////////////Buy//////////////
import PaymentOptions from './src/screens/StackScreens/Dashboard/OtherListings/Buy/PaymentOptions';
import ConfirmAddress from './src/screens/StackScreens/Dashboard/OtherListings/Buy/ConfirmAddress';
import Checkout from './src/screens/StackScreens/Dashboard/OtherListings/Buy/Checkout';
import CardDetails from './src/screens/StackScreens/Dashboard/OtherListings/Buy/CardDetails';
import CommentsDetails from './src/screens/StackScreens/Dashboard/OtherListings/CommentsDetails';
import OtherProfile from './src/screens/StackScreens/Dashboard/OtherListings/OtherProfile';
import SelectedList from './src/screens/StackScreens/Dashboard/OtherListings/SelectedList';
import ExchangeOfferList from './src/screens/StackScreens/Dashboard/OtherListings/ExchangeOfferList';
import ExchangeOffer from './src/screens/StackScreens/Dashboard/OtherListings/ExchangeOffer';
import PriceOffer from './src/screens/StackScreens/Dashboard/OtherListings/PriceOffer';
import FilterListings from './src/screens/StackScreens/Dashboard/FilterListings';

import CounterOffer from './src/screens/StackScreens/Dashboard/OtherListings/CounterOffer';

/////////////////Profile///////////////
import Listings from './src/screens/StackScreens/Profile/Listings';
import LikedItems from './src/screens/StackScreens/Profile/LikedItems';
import Promotions from './src/screens/StackScreens/Profile/Promotions';
import SalesOrders from './src/screens/StackScreens/Profile/SalesOrders';
import Followers from './src/screens/StackScreens/Profile/Followers';
import Followings from './src/screens/StackScreens/Profile/Followings';
import Reviews from './src/screens/StackScreens/Profile/Reviews';

////////Exchanges Screens////////
import Exchanges from './src/screens/StackScreens/Profile/Exchange/Exchanges';
import IncomingExchange from './src/screens/StackScreens/Profile/Exchange/IncomingExchange';
import OutGoingExchange from './src/screens/StackScreens/Profile/Exchange/OutGoingExchange';
import SucessExchange from './src/screens/StackScreens/Profile/Exchange/SucessExchange';
import FailedExchange from './src/screens/StackScreens/Profile/Exchange/FailedExchnange';
import PriceOfferList from './src/screens/StackScreens/Profile/PriceOffer';

//////////Listings Screens/////////////
import ListingsDetails from './src/screens/StackScreens/Profile/Listings/ListingsDetails';
import Insights from './src/screens/StackScreens/Profile/Listings/Insights';
import Promote from './src/screens/StackScreens/Profile/Promote/Promote';
import Payment from './src/screens/StackScreens/Profile/Promote/Payment';
import EditList from './src/screens/StackScreens/Profile/Listings/EditList';

////////////////////camera//////////////////////
import CameraViewScreen from './src/components/CameraBottomSheet/CameraView';

/////////////////drawer///////////
import BlogsDetails from './src/screens/StackScreens/Drawer/BlogsDetails';

import PaymentMethods from './src/screens/StackScreens/PaymentMethods';
import PaypalPayment from './src/screens/StackScreens/PaymentMethods/PaypalPayment';
import PaymentMethods1 from './src/screens/StackScreens/PaymentMethods/PaymentMethos1';
import PaypalMonthlySubscription from './src/screens/StackScreens/PaymentMethods/PaypalMonthlySubscription';

//////////////////location////////////////
import Location from './src/screens/Location/Location';

///////////////////setting screens////////////////
import EditProfile from './src/screens/StackScreens/Settings/EditProfile';
import ChangePassword from './src/screens/StackScreens/Settings/ChangePassword';
import VerifyCode from './src/screens/StackScreens/Settings/Verify/VerifyCode';
import VerifyAccount from './src/screens/StackScreens/Settings/Verify/VerifyAccount';
import VerificationDocuments from './src/screens/StackScreens/Settings/VerificationDocuments';

/////////////////////Notification//////////////////
import ExchangeNoti from './src/screens/StackScreens/Notification/ExchangeRequestNoti';
import PriceOfferNoti from './src/screens/StackScreens/Notification/PriceOfferNoti';

import AllListingsByCategory from './src/screens/StackScreens/Profile/Listings/AllListingsByCategory';
import AccountVerification from './src/screens/Auth/AccountVerification';

import BuyersList from './src/screens/StackScreens/Profile/Listings/BuyersList';

import {navigationRef} from './RootNavigation';
import StripePayment from './src/screens/StackScreens/Payment/StripePayment';
import Coinbase from './src/screens/StackScreens/Payment/Coinbase';

import LiveStreaming from './src/screens/LiveStreaming';
import Live from './src/screens/Live';
import AudiencePage from './src/screens/LiveStreaming/AudiencePage';
import HostPage from './src/screens/LiveStreaming/HostPage';
import CreateLive from './src/screens/LiveStreaming/CreateLive';
import WatchLiveStream from './src/screens/LiveStreaming/WatchLiveStream';

const Stack = createNativeStackNavigator();
function App() {
  // const dispatch = useDispatch();
  // const { chatCount, notificationCount } = useSelector(
  //   (state) => state.userReducer
  // );
  //const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const [initialRoute, setInitialRoute] = React.useState('Home');
  // React.useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   //   messaging().onMessage(remoteMessage => {
  //   //     navigation.navigate('GooglePassword');
  //   //     console.log(props.navigation)
  //   // });
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification.body,
  //     );
  //     AsyncStorage.setItem('Notification', remoteMessage.notification.body);

  //     //navigation.navigate('UpdateProfile');
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification.body,
  //         );
  //         AsyncStorage.removeItem('Notification');
  //         AsyncStorage.setItem('Notification', remoteMessage.notification.body);
  //         //navigation.navigate('UpdateProfile');s
  //         //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //         //setInitialRoute(remoteMessage.data.type);
  //       }
  //       setLoading(false);
  //     });
  //   if (loading) {
  //     return null;
  //   }
  // }, []);

  return (
    <Provider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LiveStreaming"
            component={LiveStreaming}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Live"
            component={Live}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CreateLive"
            component={CreateLive}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="WatchLiveStream"
            component={WatchLiveStream}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AudiencePage"
            component={AudiencePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HostPage"
            component={HostPage}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Drawerroute"
            component={Drawerroute}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddBanner"
            component={AddBanner}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentMethod"
            component={PaymentMethod}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Coinbase"
            component={Coinbase}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Filter"
            component={Filter}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Listings"
            component={Listings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Exchanges"
            component={Exchanges}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="IncomingExchange"
            component={IncomingExchange}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OutGoingExchange"
            component={OutGoingExchange}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SucessExchange"
            component={SucessExchange}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FailedExchange"
            component={FailedExchange}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LikedItems"
            component={LikedItems}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Promotions"
            component={Promotions}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SalesOrders"
            component={SalesOrders}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ListingsDetails"
            component={ListingsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Insights"
            component={Insights}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Promote"
            component={Promote}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Followers"
            component={Followers}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Followings"
            component={Followings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Reviews"
            component={Reviews}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MainListingsDetails"
            component={MainListingsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentOptions"
            component={PaymentOptions}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentMethods"
            component={PaymentMethods}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaymentMethods1"
            component={PaymentMethods1}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="PaypalPayment"
            component={PaypalPayment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PaypalMonthlySubscription"
            component={PaypalMonthlySubscription}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ConfirmAddress"
            component={ConfirmAddress}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CardDetails"
            component={CardDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StripePayment"
            component={StripePayment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CommentsDetails"
            component={CommentsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CounterOffer"
            component={CounterOffer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OtherProfile"
            component={OtherProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SelectedList"
            component={SelectedList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ExchangeOfferList"
            component={ExchangeOfferList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ExchangeOffer"
            component={ExchangeOffer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PriceOffer"
            component={PriceOffer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FilterListings"
            component={FilterListings}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CameraViewScreen"
            component={CameraViewScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BlogsDetails"
            component={BlogsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Location"
            component={Location}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UpdateShippingAddress"
            component={UpdateShippingAddress}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ShippingAddress"
            component={ShippingAddress}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VerificationDocuments"
            component={VerificationDocuments}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ExchangeNoti"
            component={ExchangeNoti}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PriceOfferNoti"
            component={PriceOfferNoti}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PriceOfferList"
            component={PriceOfferList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditList"
            component={EditList}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VerifyAccount"
            component={VerifyAccount}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="VerifyCode"
            component={VerifyCode}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="AllListingsByCategory"
            component={AllListingsByCategory}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AccountVerification"
            component={AccountVerification}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="BuyersList"
            component={BuyersList}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
