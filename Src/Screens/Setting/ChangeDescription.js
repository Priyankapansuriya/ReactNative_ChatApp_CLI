import {
  AsyncStorage,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback, hr80, logo1} from '../../Common/Pagecss';
import l1 from '../../../Assets/l1.png';
import {
  formbtn,
  formHead,
  formHead2,
  formHead3,
  formInput,
  formTextLinkCenter,
  formTextLinkRight,
} from '../../Common/Formcss';
import Icon from 'react-native-vector-icons/Ionicons';

const ChangeDescription = ({navigation}) => {
  const [description, setdescription] = useState('');
  const [loading, setLoading] = useState(false);
  const handleDescription = () => {
    if (description == '') {
      alert('Please enter username');
    } else {
      setLoading(true);
      AsyncStorage.getItem('user')
        .then(data => {
          fetch('http://192.168.43.155:3000/setdescription', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              description: description,
            }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.message === 'Description Updated Successfully') {
                setLoading(false);
                alert('Description has been set successfully');
                navigation.navigate('Setting1');
              } else if (data.error === 'Invalid Credentials') {
                alert('Invalid Credentials');
                setLoading(false);
                navigation.navigate('Login');
              } else {
                setLoading(false);
                alert('Please Try Again');
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
      <Text style={formHead2}>Change Description</Text>
      <TextInput
        placeholder="Enter new description"
        style={formInput}
        onChangeText={text => setdescription(text)}
        multiline={true}
        numberOfLines={5}
      />

      {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <Text style={formbtn} onPress={() => handleDescription()}>
          Save
        </Text>
      )}
    </View>
  );
};

export default ChangeDescription;

const styles = StyleSheet.create({});
