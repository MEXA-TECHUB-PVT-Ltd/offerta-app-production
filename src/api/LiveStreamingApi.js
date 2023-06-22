import axios from 'axios';
import {BASE_URL} from '../utills/ApiRootUrl';

export const createLiveStream = async obj => {
  return axios.post(
    BASE_URL + 'livestreaming/sample/RtcTokenBuilderSample.php',
    obj,
  );
};
export const joinLiveStream = async obj => {
  console.log('obj passed to joinLiveStream :  ', obj);
  return axios.post(BASE_URL + 'livestreaming/sample/tokengenerate1.php', obj);
};
export const getALLLiveStreams = async obj => {
  return axios.post(BASE_URL + 'livestreaming/sample/getallstreams.php', obj);
};
export const getStreamDetail = async id => {
  let obj = {
    id: id,
  };
  return axios.post(BASE_URL + 'getsinglestream.php', obj);
};
export const updateStreamViews = async (id, views) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append(`views`, views);

  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };

  return axios.post(
    BASE_URL + 'livestreaming/sample/update.php',
    formData,
    headers,
  );
};
export const addThumbnail = async (id, url, views) => {
  const formData = new FormData();
  formData.append('id', id);
  var filename = url?.split('/').pop();
  formData.append(`image`, {
    uri: url,
    type: 'image/jpeg',
    name: filename,
  });
  formData.append(`views`, views);

  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };

  return axios.post(
    BASE_URL + 'livestreaming/sample/View&Image.php',
    formData,
    headers,
  );
};

export const endStream = async (id, duration) => {
  let end_time = new Date(new Date()).toUTCString();
  const formData = new FormData();
  formData.append('id', id);
  formData.append('active_status', 'false');
  formData.append('duration', '0');
  formData.append('end_time', end_time);
  console.log('formdata :  ', formData);

  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };

  return axios.post(
    BASE_URL + 'livestreaming/sample/updatendtimestatus.php',
    formData,
    headers,
  );
};
