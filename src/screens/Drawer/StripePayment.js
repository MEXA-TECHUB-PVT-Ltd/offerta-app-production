import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

//////////////////app components///////////////
import CustomHeader from "../../components/Header/CustomHeader";
import { StripeProvider,CardField, useStripe } from '@stripe/stripe-react-native';

/////////////app styles////////////////
import styles from "./styles";
import Colors from "../../utills/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const StripePayments = ({ navigation, route }) => {

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
    <StripeProvider
      publishableKey={"pk_test_51MbdpMC4IPpapKHGYt3RMk3wxwAj1XwPXkyQDnPdtsw13CVqmbW25BVsl9RJNcyY53RHHqrIDfry65y4N0xd4yJW00JZoq8bmv"}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
       <CardField
      postalCodeEnabled={true}
      placeholders={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: 'red',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log('cardDetails', cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log('focusField', focusedField);
      }}
    />
    </StripeProvider>
    </SafeAreaView>
  );
};

export default StripePayments;
