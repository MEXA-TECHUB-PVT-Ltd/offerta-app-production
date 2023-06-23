import axios from 'axios';
import {BASE_URL} from '../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const get_stripe_payment_detail = async props => {
  return axios.post(BASE_URL + 'stripefinal/stripe.php', {
    email: props?.email,
    currency: props?.currency,
    amount: props?.amount,
    name: props?.name,
  });
};
export const get_stripe_recurring_payment_detail = async props => {
  return axios.post(BASE_URL + 'accountpayment/sub.php', {
    mode: props?.mode,
    email: props?.email,
    name: props?.name,
    price_id: props?.price_id,
    user_id: props?.user_id,
    amount: props?.amount,
    currency: props?.currency,
    amount: props?.amount,
  });
};
export const cancel_stripe_subscription = async props => {
  var user_id = await AsyncStorage.getItem('Userid');
  return axios.post(BASE_URL + 'accountpayment/unsubscribe.php', {
    user_id: user_id,
    subscription_id: props,
  });
};
