
    ////////////////Locations STATES and Function/////////////////////
    export const SET_COUNTRY_ID = 'SET_COUNTRY_ID';
    export const SET_COUNTRY_NAME = 'SET_COUNTRY_NAME';
    export const SET_STATE_ID = 'SET_STATE_ID';
    export const SET_STATE_NAME = 'SET_STATE_NAME';
    export const SET_CITY_ID = 'SET_CITY_ID';
    export const SET_CITY_NAME = 'SET_CITY_NAME';
  
    export const setCountryName = country_name => dispatch => {
      dispatch({
          type: SET_COUNTRY_NAME,
          payload: country_name,
      });
  };
  export const setCountryId = country_id => dispatch => {
      dispatch({
          type: SET_COUNTRY_ID,
          payload: country_id,
      });
  };
  export const setStateName = state_name => dispatch => {
      dispatch({
          type: SET_STATE_NAME,
          payload: state_name,
      });
  };
  export const setStateId = state_id => dispatch => {
      dispatch({
          type: SET_STATE_ID,
          payload: state_id,
      });
  };
  export const setCityName = city_name => dispatch => {
      dispatch({
          type: SET_CITY_NAME,
          payload: city_name,
      });
  };
  export const setCityId = city_id => dispatch => {
      dispatch({
          type: SET_CITY_ID,
          payload: city_id,
      });
  };
  
       ////////////////APP LOGIN STATES/////////////////////
       export const SET_LOCATION_LAT = 'SET_LOCATION_LAT';
       export const SET_LOCATION_LNG = 'SET_LOCATION_LNG';
       export const SET_LOCATION_ADDRESS = 'SET_LOCATION_ADDRESS';
  
    ///////////////User Login Info///////////////
    export const setLocationLat = location_lat => dispatch => {
      dispatch({
          type: SET_LOCATION_LAT,
          payload: location_lat,
      });
  };
  export const setLocationLng = location_lng => dispatch => {
      dispatch({
          type: SET_LOCATION_LNG,
          payload: location_lng,
      });
  };
  export const setLocationAddress = location_address => dispatch => {
      dispatch({
          type: SET_LOCATION_ADDRESS,
          payload:location_address,
      });
  };
  