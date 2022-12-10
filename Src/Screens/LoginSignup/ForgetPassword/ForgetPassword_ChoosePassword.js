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

const ForgetPassword_ChoosePassword = ({navigation, route}) => {
  const {email} = route.params;
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handlePasswordChange = () => {
    if (password == '' || confirmpassword == '') {
      alert('Please enter password');
    } else if (password != confirmpassword) {
      alert('Password does not match');
    } else {
      setLoading(true);
      fetch('http://192.168.43.155:3000/resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password}),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Password Changed Successfully') {
            setLoading(false);
            alert(data.message);
            navigation.navigate('ForgetPassword_AccountRecoverd');
          } else {
            setLoading(false);
            alert('Something went wrong');
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
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={goback}>
        <Icon name="arrow-back" size={30} color="grey" />
        <Text style={{color: 'grey', fontSize: 16, marginLeft: 10}}>
          Go Back
        </Text>
      </TouchableOpacity>
      <Image source={l1} style={logo1} />
      <Text style={formHead2}>Choose Strong Password</Text>
      <TextInput
        placeholder="Enter Password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setpassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setconfirmpassword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <Text style={formbtn} onPress={() => handlePasswordChange()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ForgetPassword_ChoosePassword;

const styles = StyleSheet.create({});
