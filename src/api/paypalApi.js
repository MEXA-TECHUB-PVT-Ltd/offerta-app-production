// const baseUrl = 'https://api.sandbox.paypal.com';
const baseUrl = "https://api-m.sandbox.paypal.com";
var base64 = require("base-64");

import { CLIENT_ID_PAYPAL, SECRET_KEY_PAYPAL } from "../utills/paymentKeys";

import axios from "axios";
import moment from "moment";
// let clientId =
//   "AQl4zv6sYhOq7N5bcOSXSXTVB3o3qWyIvRzXn5IFCF5XSBaBsPSodZOeAO3-6SOMl9llyPOWBBwJsRSW";
// let secretKey =
//   "EGOpa53RGGRFlZle4oqeKR_HMyruc_1oJde7FUQNma6QjM-__Xe_wT0OmNvQajyWx0g_DgFlw5VA2ss3";
let clientId = CLIENT_ID_PAYPAL;
let secretKey = SECRET_KEY_PAYPAL;

// let orderDetail = {
//   intent: 'CAPTURE',
//   purchase_units: [
//     {
//       items: [
//         {
//           name: 'Create Account',
//           description: '',
//           quantity: '1',
//           unit_amount: {
//             currency_code: 'USD',
//             value: '1.00',
//           },
//         },
//       ],
//       amount: {
//         currency_code: 'USD',
//         value: '1.00',
//         breakdown: {
//           item_total: {
//             currency_code: 'USD',
//             value: '1.00',
//           },
//         },
//       },
//     },
//   ],
//   application_context: {
//     return_url: 'https://example.com/return',
//     cancel_url: 'https://example.com/cancel',
//   },
// };

const generateToken = () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append(
    "Authorization",
    "Basic " + base64.encode(`${clientId}:${secretKey}`)
  );

  var requestOptions = {
    method: "POST",
    headers: headers,
    body: "grant_type=client_credentials",
  };
  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v1/oauth2/token", requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let { access_token } = JSON.parse(response);
        resolve(access_token);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createOrder = (token = "", orderDetail) => {
  console.log("order detail pass..", orderDetail);
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + "/v2/checkout/orders", requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let res = JSON.parse(response);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const capturePayment = (id, token = "", orderDetail) => {
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let res = JSON.parse(response);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getSubscriptionPlans = (token) => {
  var requestOptions = {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Prefer: "",
    },
    // body: JSON.stringify(data),
  };

  return new Promise((resolve, reject) => {
    fetch(
      baseUrl + `/v1/billing/plans?page_size=10&page=1&total_required=true`,
      requestOptions
    )
      .then((response) => response.text())
      .then((response) => {
        let res = JSON.parse(response);
        console.log("res  : ", res?.plans);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getPlanDetail = (token, planId) => {
  var requestOptions = {
    method: "GET",
    headers: {
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v1/billing/plans/${planId}`, requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let res = JSON.parse(response);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
const subscribePlan = (token = "", plan_id) => {
  let data = {
    plan_id: plan_id,
    start_time: moment(new Date()).add(1, "minute"),
    // start_time: "2023-06-07T00:00:00Z",
    // shipping_amount: {
    //   currency_code: "USD",
    //   value: "1.00",
    // },2
    // subscriber: {
    //   name: {
    //     given_name: "FooBuyer",
    //     surname: "Jones",
    //   },
    //   email_address: "foobuyer@example.com",
    //   shipping_address: {
    //     name: {
    //       full_name: "John Doe",
    //     },
    //     address: {
    //       address_line_1: "2211 N First Street",
    //       address_line_2: "Building 17",
    //       admin_area_2: "San Jose",
    //       admin_area_1: "CA",
    //       postal_code: "95131",
    //       country_code: "US",
    //     },
    //   },
    // },
    application_context: {
      brand_name: "Oferta SV",
      locale: "en-US",
      shipping_preference: "SET_PROVIDED_ADDRESS",
      user_action: "SUBSCRIBE_NOW",
      payment_method: {
        payer_selected: "PAYPAL",
        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
      },
      return_url: "https://example.com/return",
      cancel_url: "https://example.com/cancel",
    },
  };
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v1/billing/subscriptions`, requestOptions)
      .then((response) => response.text())
      .then((response) => {
        let res = JSON.parse(response);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const cancelSubscription = (subscription_id, token) => {
  console.log("id passed to unsubscribe plan  : ", subscription_id);
  var requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
  };

  return new Promise((resolve, reject) => {
    fetch(
      baseUrl + `/v1/billing/subscriptions/${subscription_id}/cancel`,
      requestOptions
    )
      .then((response) => response.text())
      .then((response) => {
        // let res = JSON.parse(response);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment,
  subscribePlan,
  cancelSubscription,
  getSubscriptionPlans,
  getPlanDetail,
};
