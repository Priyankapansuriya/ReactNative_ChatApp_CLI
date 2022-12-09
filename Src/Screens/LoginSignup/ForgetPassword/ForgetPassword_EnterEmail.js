import {
  ActivityIndicator,
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
import {formHead2, formInput, formbtn} from '../../../Common/Formcss';

const ForgetPassword_EnterEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleEmail = () => {
    if (email == '') {
      alert('Please enter email');
    } else {
      setLoading(true);
      fetch('http://192.168.43.155:3000/verifyfp', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error === 'Invalid Credentials') {
            // alert('Invalid Credentials')
            alert('Invalid Credentials');
            setLoading(false);
          } else if (data.message === 'Verification Code Sent to your Email') {
            setLoading(false);
            alert(data.message);
            navigation.navigate('ForgetPassword_EnterVerificationCode', {
              useremail: data.email,
              userVerificationCode: data.VerificationCode,
            });
          }
        });
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
      <Text style={formHead2}>Verify your Email</Text>
      <TextInput
        placeholder="Enter Your Email"
        style={formInput}
        onChangeText={text => setEmail(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <Text style={formbtn} onPress={() => handleEmail()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ForgetPassword_EnterEmail;

const styles = StyleSheet.create({});
