////////////////api////////////////
import axios from "axios";
import { BASE_URL } from "../utills/ApiRootUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

////////////LISTING LIKES//////////
export const post_Item_Images = async (props) => {
  const formData = new FormData();
  formData.append("product_id", props.item_id);
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
