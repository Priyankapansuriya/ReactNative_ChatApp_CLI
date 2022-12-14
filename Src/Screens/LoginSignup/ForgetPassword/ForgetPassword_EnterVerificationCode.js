import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback, logo, logo1} from '../../../Common/Pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import l1 from '../../../../Assets/l1.png';
import {formHead3, formInput, formbtn} from '../../../Common/Formcss';

const ForgetPassword_EnterVerificationCode = ({navigation, route}) => {
  const {useremail, userVerificationCode} = route.params;
  console.log(useremail, userVerificationCode);

  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationCode = () => {
    if (verificationCode != userVerificationCode) {
      alert('Invalid Verification Code');
    } else if (verificationCode == userVerificationCode) {
      alert('Verification Code Matched');
      navigation.navigate('ForgetPassword_ChoosePassword', {email: useremail});
    } else {
      alert('Please Try Again');
    }
  };
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={goback}>
        <Icon name="arrow-back" size={30} color="grey" />
        <Text style={{color: 'grey', fontSize: 16, marginLeft: 10}}>
          Go Back
        </Text>
      </TouchableOpacity>
      <Image source={l1} style={logo1} />
      <Text style={formHead3}>
        Verification code has been send to your Email
      </Text>
      <TextInput
        placeholder="Enter 6-Digit code "
        style={formInput}
        onChangeText={text => setVerificationCode(text)}
      />
      <Text style={formbtn} onPress={() => handleVerificationCode()}>
        Next
      </Text>
    </View>
  );
};

export default ForgetPassword_EnterVerificationCode;

const styles = StyleSheet.create({});
