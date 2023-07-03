import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {fontFamily} from '../../constant/fonts';
import TranslationStrings from '../../utills/TranslationStrings';

const CommentInput = ({value, onChangeValue, onPress}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    function onKeyboardDidShow(e) {
      // Remove type here if not using TypeScript
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }

    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardDidHide,
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View
      style={{
        ...styles.textInputContainer,
        bottom:
          keyboardHeight == 0 || isFocus == false ? 0 : keyboardHeight * 0.96,
      }}>
      <TextInput
        placeholder={`${TranslationStrings.TYPE_SOMETHING}...`}
        placeholderTextColor={'white'}
        value={value}
        onChangeText={text => onChangeValue(text)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={{
          width: '90%',
          marginHorizontal: 10,
          color: 'white',
          fontSize: 12,
          fontFamily: fontFamily.Poppins_Regular,
          marginBottom: -2,
        }}
      />
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons
          name="send"
          color={'white'}
          size={25}
          style={{
            transform: [{rotate: '-30deg'}],
            marginBottom: 10,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: '#00000059',
    borderRadius: 35,
    flexDirection: 'row',
    paddingRight: 30,
    alignItems: 'center',
  },
});
