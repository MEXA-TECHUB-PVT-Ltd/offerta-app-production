////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cloudinaryKeys from "../utills/cloudinaryKeys";

////////////LISTING LIKES//////////
export const post_Item_Images = async (props) => {
  const formData = new FormData();
  formData.append("product_id", props.item_id);
  console.log("props.item_images____________________", props.item_images);
  props.item_images.forEach((image, index) => {
    var filename = image.path.split("/").pop();
    console.log("filename : ", filename);
    formData.append(`images[]`, {
      uri: image.path,
      type: "image/jpeg",
      // name: "image.jpg",
      name: filename,
    });
  });
  console.log("formData  : ", formData);
  return fetch(BASE_URL + "productImages.php", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
};
export const post_Listing_Video = async (listing_id, video) => {
  let url = await post_Listing_Video_to_cloudinary(video);
  console.log("uploaded video url : ________________________", url);
  if (url) {
    const formData = new FormData();
    formData.append("listing_id", listing_id);
    var filename = video?.split("/").pop();
    console.log("filename : ", filename);
    formData.append(`video`, url);
    console.log("formData  : ", formData);
    return fetch(BASE_URL + "videoupload.php", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  }
};
export const post_Listing_Video_to_cloudinary = async (video) => {
  return new Promise((resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("upload_preset", cloudinaryKeys.upload_preset);
      formData.append("cloud_name", cloudinaryKeys.cloud_name);
      var filename = video?.split("/").pop();

      formData.append(`file`, {
        uri: video,
        type: "video/mp4",
        name: filename,
      });
      console.log("formData  : ", formData);
      return fetch(cloudinaryKeys.video_upload_url, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("response__________________ : ", response);
          let url = response?.url ? response?.url : "";
          if (url) {
            resolve(url);
          } else {
            resolve(false);
          }
        });
    } catch (error) {
      resolve(false);
    }
  });
};

////////////LISTING LIKES//////////
export const edit_Item_Images = async (props) => {
  const formData = new FormData();
  formData.append("product_id", props.item_id);
  props.item_images.forEach((image, index) => {
    formData.append(`images[]`, {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
  });

  return fetch(BASE_URL + "productImages.php", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
};
