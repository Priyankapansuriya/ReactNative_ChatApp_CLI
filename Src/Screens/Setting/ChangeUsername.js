import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback, hr80, logo1} from '../../Common/Pagecss';
import {
  formbtn,
  formHead,
  formHead2,
  formHead3,
  formInput,
  formTextLinkCenter,
  formTextLinkRight,
} from '../../Common/Formcss';
import l1 from '../../../Assets/l1.png';
import Icon from 'react-native-vector-icons/Ionicons';

const ChangeUsername = ({navigation}) => {
  const [username, setusername] = useState('');
  const [loading, setLoading] = useState(false);
  const handleUsername = () => {
    if (username == '') {
      alert('Please enter username');
    } else {
      setLoading(true);
      AsyncStorage.getItem('user')
        .then(data => {
          fetch('http://192.168.43.155:3000/setusername', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              username: username,
            }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.message === 'Username Updated Successfully') {
                setLoading(false);
                alert('Username has been set successfully');
                navigation.navigate('Setting1');
              } else if (data.error === 'Invalid Credentials') {
                alert('Invalid Credentials');
                setLoading(false);
                navigation.navigate('Login');
              } else {
                setLoading(false);
                alert('Username not available');
              }
            })
            .catch(err => {
              alert('Something went wrong');
              setLoading(false);
            });
        })
        .catch(err => {
          alert('Something went wrong');
          setLoading(false);
        });
    }
  };
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Setting1')}
        style={goback}>
        <Icon name="arrow-back" size={30} color="grey" />
        <Text
          style={{
            color: 'gray',
            fontSize: 16,
          }}>
          Go Back
        </Text>
      </TouchableOpacity>

      <Image source={l1} style={logo1} />
      <Text style={formHead2}>Change Username</Text>
      <TextInput
        placeholder="Enter new username"
        style={formInput}
        onChangeText={text => setusername(text)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <Text style={formbtn} onPress={() => handleUsername()}>
          Save
        </Text>
      )}
    </View>
  );
};

export default ChangeUsername;

const styles = StyleSheet.create({});
