import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import l1 from '../../../../Assets/l1.png';
import {containerFull, hr80, logo1} from '../../../Common/Pagecss';
import {
  formHead,
  formInput,
  formTextLinkRight,
  formbtn,
  formTextLinkCenter,
} from '../../../Common/Formcss';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    if (email == '' || password == '') {
      alert('Please Fill All Details');
    } else {
      setLoading(true);
      fetch('http://192.168.43.155:3000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      })
        .then(res => res.json())
        .then(async data => {
          if (data.error) {
            setLoading(false);
            alert(data.error);
          } else if (data.message == 'Successfully Signed In') {
            setLoading(false);

            navigation.navigate('Mainpage', {data});
          }
        })
        .catch(err => {
          setLoading(false);
          alert(err);
        });
    }
  };

  return (
    <View style={containerFull}>
      <Image source={l1} style={logo1} />
      <Text style={formHead}>Login</Text>
      <TextInput
        placeholder="Enter Your Email"
        style={formInput}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Enter Your Password"
        style={formInput}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate('ForgetPassword_EnterEmail')}>
        Forgot Password?
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <Text style={formbtn} onPress={() => handleLogin()}>
          Login
        </Text>
      )}

      <View style={hr80}></View>

      <Text style={formTextLinkCenter}>
        Don't have an account?
        <Text
          style={{color: 'white'}}
          onPress={() => navigation.navigate('Mainpage')}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
