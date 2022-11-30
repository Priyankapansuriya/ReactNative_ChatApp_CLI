import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import chattt from '../../../../Assets/chattt.png';
import {containerFull, hr80, logo1} from '../../../Common/Pagecss';
import {
  formHead,
  formInput,
  formTextLinkRight,
  formbtn,
  formTextLinkCenter,
} from '../../../Common/Formcss';

const Login = ({navigation}) => {
  return (
    <View style={containerFull}>
      <Image source={chattt} style={logo1} />
      <Text style={formHead}>Login</Text>
      <TextInput placeholder="Enter Your Email" style={formInput} />
      <TextInput
        placeholder="Enter Your Password"
        style={formInput}
        secureTextEntry={true}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate('ForgetPassword_EnterEmail')}>
        Forgot Password?
      </Text>
      <Text style={formbtn} onPress={() => navigation.navigate('Mainpage')}>
        Login
      </Text>
      <View style={hr80}></View>
      <Text style={formTextLinkCenter}>
        Don't have an account?
        <Text
          style={{color: 'white'}}
          onPress={() => navigation.navigate('Signup_EnterEmail')}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
