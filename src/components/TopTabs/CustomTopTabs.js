import * as React from 'react';
import {View,Text} from 'react-native';

///////////app styles/////////////
import Colors from '../../utills/Colors';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} 
from 'react-native-responsive-screen';

////////////////app fonts////////////
import { fontFamily } from '../../constant/fonts';

const CustomTopTabs = (props) => {

    return(

<View style={{
                        alignItems:'center',justifyContent:'center',                 
width:wp(props.width)
}}>
                        <Text style={{
                            color:props.state===true?Colors.Appthemeorangecolor:'#AAAAAA',
                        fontWeight:"400",fontSize:hp(1.7),
                        fontFamily:fontFamily.Poppins_Regular,
                        }}>
                            {props.title}</Text>

                            <View style={{height:hp(0.7),width:wp(props.width),
                            marginTop:hp(1.5),
                            backgroundColor:props.state===true?Colors.Appthemeorangecolor:'#AAAAAA',
                            borderRadius:wp(2)}}>

                            </View>
                        </View>

    )
};

export default CustomTopTabs;