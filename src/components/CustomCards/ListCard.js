import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

////////app styles////////////
import styles from './styles';

/////////////app height and width/////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////app images///////////
import {appImages} from '../../constant/images';
import Colors from '../../utills/Colors';
import TranslationStrings from '../../utills/TranslationStrings';
import {post_Follow_Users} from '../../api/PostApis';

const ListCard = props => {
  const [followID, setFollowID] = useState('');

  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={props.image}
            style={{width: wp(12), height: hp(6), borderRadius: wp(10)}}
            resizeMode="contain"
          />
          <View style={{marginLeft: wp(3)}}>
            <Text style={styles.balancetext}>{props.username}</Text>
            <Text style={styles.balancetext}>{props.fullname}</Text>
          </View>
        </View>
        {props?.user_type === 'other_user' ? null : (
          <>
            {props?.list_type == 'followings' ? (
              <TouchableOpacity
                onPress={props?.onPress && props?.onPress}
                style={[
                  styles.btnview,
                  {
                    backgroundColor: Colors.Appthemecolor,
                    // backgroundColor:
                    //   props.type === true
                    //     ? Colors.activetextinput
                    //     : Colors.Appthemecolor,
                  },
                ]}>
                <Text style={styles.btntext}>
                  {TranslationStrings.UNFOLLOW}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                // onPress={() => {
                //   follow_user();
                // }}
                onPress={props?.onFollowPress && props?.onFollowPress}
                style={[
                  styles.btnview,
                  {
                    backgroundColor:
                      props.type === true
                        ? Colors.activetextinput
                        : Colors.Appthemecolor,
                  },
                ]}
                disabled={props.btnstatus}>
                <Text style={styles.btntext}>
                  {props.type === true
                    ? TranslationStrings.FOLLOWING
                    : TranslationStrings.FOLLOW}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default ListCard;
