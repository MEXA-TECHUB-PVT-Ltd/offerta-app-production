import {
  
    ////////////////Locations STATES/////////////////////
    SET_COUNTRY_NAME,
    SET_COUNTRY_ID,
    SET_STATE_NAME,
    SET_STATE_ID,
    SET_CITY_NAME,
    SET_CITY_ID,
  
    ////////////////Order Location detail//////////////
    SET_LOCATION_LAT,
    SET_LOCATION_LNG,
    SET_LOCATION_ADDRESS,
  
  
  } from './actions';
  
  const initialState = {

    ////////////////Locations STATES/////////////////////
    country_name: '',
    country_id: '',
    state_name: '',
    state_id: '',
    city_name: '',
    city_id: '',
  
    ////////////////Order Location detail//////////////
    location_lat: '',
    location_lng: '',
    location_address: '',
  
  };
  
  function locationReducer(state = initialState, action) {
    switch (action.type) {

      ////////////////Locations STATES/////////////////////
      case SET_COUNTRY_NAME:
        return {...state, country_name: action.payload};
      case SET_COUNTRY_ID:
        return {...state, country_id: action.payload};
      case SET_STATE_NAME:
        return {...state, state_name: action.payload};
      case SET_STATE_ID:
        return {...state, state_id: action.payload};
      case SET_CITY_NAME:
        return {...state, city_name: action.payload};
      case SET_CITY_ID:
        return {...state, city_id: action.payload};
  
      ////////////////Order Location Detail//////////////
      case SET_LOCATION_LAT:
        return {...state, location_lat: action.payload};
      case SET_LOCATION_LNG:
        return {...state, location_lng: action.payload};
      case SET_LOCATION_ADDRESS:
        return {...state, location_address: action.payload};

  
      default:
        return state;
    }
  }
  
  export default locationReducer;
  