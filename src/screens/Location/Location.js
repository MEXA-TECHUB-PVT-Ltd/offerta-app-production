import React, { useState, useEffect, useRef } from "react";
// Import required components
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

//////////////////app components////////////////
import CustomButtonhere from "../../components/Button/CustomButton";

//////////////app pakages////////////
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

// Import Map and Marker
import Geocoder from "react-native-geocoding";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MapKeyApi } from "../../utills/MapKey";

//////////////////app styles////////////////
import styles from "./styles";

///////////////colors/////////////
import Colors from "../../utills/Colors";

///////////height and width/////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

////////////////app redux///////////
import { useSelector, useDispatch } from "react-redux";
import {
  setLocationAddress,
  setLocationLat,
  setLocationLng,
} from "../../redux/actions";

////////////////////app images/////////////////
import { appImages } from "../../../constant/images";

///////////////////curent location/////////////////
import {
  locationPermission,
  getCurrentLocation,
} from "../../api/CurrentLocation";
import TranslationStrings from "../../utills/TranslationStrings";

const Location = ({ navigation, route }) => {
  ////////////////previous data//////////
  const [predata] = useState(route.params);

  ////////////////////redux/////////////////////
  const { pickup_location_lat } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  ////////////isfocused//////////
  const isfocussed = useIsFocused();

  /////////////map states////////////
  const [eror, setError] = useState();
  const [region, setRegion] = useState();
  const [marker, setMarker] = useState("");
  const [pinlat, setPinLat] = useState(0);
  const [pinlog, setPinLog] = useState(0);
  const [address, setAddress] = useState(0);

  const getLiveLocation = async () => {
    Geocoder.init(MapKeyApi);
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const { latitude, longitude, heading } = await getCurrentLocation();
      // console.log("get live location after 4 second",latitude,longitude,heading)
      setPinLat(latitude);
      setPinLog(longitude);
      Geocoder.from(latitude, longitude).then((json) => {
        var addressComponent = json.results[0].formatted_address;
        setAddress(addressComponent);
      });
    }
  };
  useEffect(() => {
    if (isfocussed) {
      getLiveLocation();
    }
  }, [isfocussed]);

  return (
    <View style={[styles.container]}>
      {pinlat && pinlog > 0 ? (
        <MapView
          style={[styles.mapStyle]}
          // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          region={{
            latitude: pinlat,
            longitude: pinlog,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {pinlat && pinlog > 0 ? (
            <Marker
              draggable={true}
              coordinate={{
                latitude: pinlat,
                longitude: pinlog,
              }}
              onDragEnd={(item) => {
                // dispatch(setLocationAddress("San Salvador, El Salvador"));
                // dispatch(setLocationLat(13.794185));
                // dispatch(setLocationLng(-88.89653));
                // navigation.goBack();
                // return;

                Geocoder.init(MapKeyApi);
                Geocoder.from(
                  item.nativeEvent.coordinate.latitude,
                  item.nativeEvent.coordinate.longitude
                )
                  .then((json) => {
                    var address = json?.results[0]?.formatted_address;
                    let geometry = json?.results[0]?.geometry;

                    dispatch(setLocationAddress(address));

                    // var location = json.results[0].geometry.location;
                    dispatch(setLocationLat(geometry.location?.lat));
                    dispatch(setLocationLng(geometry.location?.lng));
                    setPinLat(geometry.location?.lat);
                    setPinLog(geometry.location?.lng);
                    setRegion({
                      latitude: geometry.location?.lat,
                      longitude: geometry.location?.lng,
                      latitudeDelta: 0.0462,
                      longitudeDelta: 0.0261,
                    });
                    setMarker({
                      latitude: geometry.location?.lat,
                      longitude: geometry.location?.lng,
                      latitudeDelta: 0.0462,
                      longitudeDelta: 0.0261,
                    });
                  })
                  .catch((error) => console.warn(error));
              }}
            />
          ) : null}
        </MapView>
      ) : null}

      <View
        style={{ marginLeft: wp(3), marginTop: hp(2), marginBottom: hp(1) }}
      >
        {/* <TouchableOpacity
          style={{
            position: "absolute",
            top: 10,
            zIndex: 999,
            // backgroundColor: "red",
          }}
        >
          <Ionicons
            name={"chevron-back"}
            size={30}
            color={Colors.Appthemecolor}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity> */}
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: wp(3),
            left: wp(5),
            zIndex: 999,
            // backgroundColor: "red",
          }}
        >
          <Ionicons
            name={"chevron-back"}
            size={30}
            color={Colors.Appthemecolor}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <GooglePlacesAutocomplete
          //ref={ref}
          placeholder={TranslationStrings.SEARCH}
          textInputProps={{
            placeholderTextColor: Colors.appgreycolor,
          }}
          // styles={{
          //   textInputContainer: {
          //     backgroundColor: "grey",
          //     width: wp(90),
          //   },
          //   textInput: {
          //     height: 38,
          //     color: "#5d5d5d",
          //     fontSize: 16,
          //     paddingHorizontal: wp(10),
          //     height: 45,
          //   },
          //   predefinedPlacesDescription: {
          //     color: "#1faadb",
          //   },
          // }}
          styles={{
            textInputContainer: styles.locationInput,
            textInput: { ...styles.inputTextStyles, paddingHorizontal: wp(10) },
            listView: styles.listView,
            description: styles.desc,
            predefinedPlacesDescription: {
              color: "yellow",
            },
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true

            dispatch(setLocationAddress(details.description));
            Geocoder.init(MapKeyApi);
            Geocoder.from(details.description)
              .then((json) => {
                var location = json.results[0].geometry.location;
                console.log("location.lat  :   ", location.lat);
                dispatch(setLocationLat(location.lat));
                dispatch(setLocationLng(location.lng));
                setPinLat(location.lat);
                setPinLog(location.lng);

                // setPinLat(latitude);
                // setPinLog(longitude);

                setRegion({
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.0462,
                  longitudeDelta: 0.0261,
                });
                setMarker({
                  latitude: location.lat,
                  longitude: location.lng,
                  latitudeDelta: 0.0462,
                  longitudeDelta: 0.0261,
                });
              })
              .catch((error) => console.warn(error));
          }}
          query={{
            key: MapKeyApi,
            language: "en",
          }}
        />
      </View>
      <View style={styles.lastView}>
        <CustomButtonhere
          title={TranslationStrings.ADD}
          widthset={78}
          topDistance={0}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default Location;
