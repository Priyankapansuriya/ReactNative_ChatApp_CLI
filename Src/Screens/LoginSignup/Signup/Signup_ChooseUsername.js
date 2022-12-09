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

const Signup_ChooseUsername = ({navigation, route}) => {
  const {email} = route.params;
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(false);

  const handleUsername = () => {
    if (username == '') {
      alert('Please Enter Username');
    } else {
      setLoading(true);
      fetch('http://192.168.43.155:3000/changeusername', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Username Available') {
            setLoading(false);
            alert('Username has been set successfully');
            navigation.navigate('Signup_ChoosePassword', {
              email: email,
              username: username,
            });
          } else {
            setLoading(false);
            alert('Username not available');
          }
        })
        .catch(err => {
          console.log(err);
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
      <Text style={formHead2}>Choose Username</Text>
      <TextInput
        placeholder="Enter Username"
        style={formInput}
        onChangeText={text => setUsername(text)}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={formbtn} onPress={() => handleUsername()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default Signup_ChooseUsername;

const styles = StyleSheet.create({});
