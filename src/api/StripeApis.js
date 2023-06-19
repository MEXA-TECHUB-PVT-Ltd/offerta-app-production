import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";

export const get_stripe_payment_detail = async (props) => {
  return axios.post(BASE_URL + "stripefinal/stripe.php", {
    email: props?.email,
    currency: props?.currency,
    amount: props?.amount,
    name: props?.name,
  });
};
