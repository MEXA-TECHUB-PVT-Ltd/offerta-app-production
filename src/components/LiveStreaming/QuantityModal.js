import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButtonhere from '../Button/CustomButton';
import {Modal} from 'react-native-paper';
import {fontFamily} from '../../constant/fonts';
import Colors from '../../utills/Colors';
import CustomTextInput from '../TextInput/CustomTextInput';
import {appImages} from '../../constant/images';

const QuantityModal = ({visible, setVisible, value, setValue, onPress}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={() => {
        setVisible(false);
      }}
      contentContainerStyle={{
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 15,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: fontFamily.Poppins_Bold,
            color: Colors.Appthemecolor,
          }}>
          Enter Quantity
        </Text>
        {/* <CPaperInput
        placeholder="Enter Quantity"
        style={{ width: "90%", marginTop: 10 }}

      /> */}
        <View style={{marginVertical: 15, marginTop: 20}}>
          <CustomTextInput
            icon={appImages.email}
            type={'withouticoninput'}
            texterror={'invalid'}
            width={'95%'}
            height={50}
            placeholder={'Quantity'}
            keyboard_type={'numeric'}
            term={value}
            onTermChange={desc => setValue(desc)}
          />

          <CustomButtonhere
            title={'NEXT'}
            widthset={40}
            topDistance={2}
            onPress={onPress}
          />
        </View>
      </View>
    </Modal>
  );
};

export default QuantityModal;

const styles = StyleSheet.create({});
