import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";

///////////////////app pakages///////////////
import RBSheet from "react-native-raw-bottom-sheet";

/////////////icons///////////
import Ionicons from "react-native-vector-icons/Ionicons";

////////////app styles//////////////
import styles from "./styles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

////////////////////redux////////////
import { useSelector, useDispatch } from "react-redux";
import { setCountryName } from "../../../redux/Location/actions";

//////////////////////////app api/////////////////////////
import axios from "axios";
import TranslationStrings from "../../../utills/TranslationStrings";

const CountryDropDown = (props) => {
  /////////////redux states///////
  const { condition } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  //seacrh states
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  //search textfield
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.country
          ? item.country.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  //////////dropdownlink data/////////////
  const [data, setdata] = useState();

  ///////////////CarCondition function///////////////
  const GetCountry = async () => {
    axios({
      method: "GET",
      url: "https://countriesnow.space/api/v0.1/countries",
    })
      .then(function (response) {
        setFilteredDataSource(response.data.data);
        setMasterDataSource(response.data.data);
        setdata(response.data.data);
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  useEffect(() => {
    GetCountry();
  }, []);
  return (
    <RBSheet
      //sstyle={{flex:1}}
      ref={props.refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      openDuration={50}
      closeDuration={50}
      animationType="fade"
      //height={500}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(52, 52, 52, 0.5)",
        },
        draggableIcon: {
          backgroundColor: "white",
        },
        container: {
          borderTopLeftRadius: wp(10),
          borderTopRightRadius: wp(10),
          height: hp(90),
          maxHeight: hp(90),
        },
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 0,
        }}
      >
        <Text style={styles.bottomsheettext}>
          {TranslationStrings.SELECT_COUNTRY}
        </Text>
      </View>
      <View style={styles.textView}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.textInput}
          placeholder={TranslationStrings.SEARCH}
          placeholderTextColor="#999"
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
        />
      </View>
      <FlatList
        data={filteredDataSource}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              dispatch(setCountryName(item.country)),
                props.refRBSheet.current.close();
            }}
          >
            <View style={styles.card}>
              <Text style={styles.cardtext}>{item.country}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
    </RBSheet>
  );
};

export default CountryDropDown;
