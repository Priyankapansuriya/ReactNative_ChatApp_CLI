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
import Icon from 'react-native-vector-icons/Ionicons';
import l1 from '../../../../Assets/l1.png';
import {formHead2, formInput, formbtn} from '../../../Common/Formcss';
import {containerFull, goback, logo1} from '../../../Common/Pagecss';

const Signup_ChoosePassword = ({navigation, route}) => {
  const {email, username} = route.params;
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handlePassword = () => {
    if (password == '' || confirmpassword == '') {
      alert('Please enter password');
    } else if (password != confirmpassword) {
      alert('Password does not match');
    } else {
      setLoading(true);
      fetch('http://192.168.43.155:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'User Registered Successfully') {
            setLoading(false);
            alert(data.message);
            navigation.navigate('Signup_AccountCreated');
          } else {
            setLoading(false);
            alert('Please try again');
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
        <ActivityIndicator />
      ) : (
        <Text style={formbtn} onPress={() => handlePassword()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default Signup_ChoosePassword;

const styles = StyleSheet.create({});
