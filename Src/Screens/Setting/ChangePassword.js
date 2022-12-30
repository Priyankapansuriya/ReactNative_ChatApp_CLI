import {
  AsyncStorage,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback, logo1} from '../../Common/Pagecss';
import Icon from 'react-native-vector-icons/Ionicons';
import l1 from '../../../Assets/l1.png';
import {
  formHead2,
  formInput,
  formbtn,
  formTextLinkRight,
} from '../../Common/Formcss';

const ChangePassword = ({navigation}) => {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmnewpassword, setconfirmNewpassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = () => {
    if (oldpassword === '' || newpassword === '' || confirmnewpassword === '') {
      alert('Please fill all the fields');
    } else if (newpassword !== confirmnewpassword) {
      alert('New password and confirm new password must be same');
    } else {
      setLoading(true);
      AsyncStorage.getItem('user').then(data => {
        fetch('http://192.168.43.155:3000/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(data).tokens,
          },
          body: JSON.stringify({
            email: JSON.parse(data).user.email,
            oldpassword: oldpassword,
            newpassword: newpassword,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'Password Changed Successfully') {
              setLoading(false);
              alert('Password Changed Successfully');
              AsyncStorage.removeItem('user');
              navigation.navigate('Login');
            } else {
              alert('Wrong Password');
              setLoading(false);
            }
          });
      });
    }
  };
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Setting1')}
        style={goback}>
        <Icon name="arrow-back" size={30} color="grey" />
        <Text style={{color: 'grey', fontSize: 16, marginLeft: 10}}>
          Go Back
        </Text>
      </TouchableOpacity>
      <Image source={l1} style={logo1} />
      <Text style={formHead2}>Choose Strong Password</Text>
      <TextInput
        placeholder="Enter Old Password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setOldpassword(text)}
      />
      <TextInput
        placeholder="Enter New Password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setNewpassword(text)}
      />
      <TextInput
        placeholder=" Enter Confirm NewPassword"
        style={formInput}
        secureTextEntry
        onChangeText={text => setconfirmNewpassword(text)}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate('ForgetPassword_EnterEmail')}>
        Forgot Password?
      </Text>
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

export default ChangePassword;

const styles = StyleSheet.create({});
