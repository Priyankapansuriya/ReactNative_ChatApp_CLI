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
import {firebase} from '../../Firebase/Config';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

const ChangeUserProfile = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const takephoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image, path);
      this.bs.current.handleUpload();
    });
  };
  const choosefromlibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image, path);
      this.bs.current.handleUpload();
    });
  };
  const handleUpload = () => {
    AsyncStorage.getItem('user').then(data => {
      setLoading(true);

      takephoto().then(url => {
        fetch('http://192.168.43.155:3000/setprofilepic', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: JSON.parse(data).user.email,
            profilepic: url,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'Profile picture updated successfully') {
              setLoading(false);
              alert('Profile picture updated successfully');
              navigation.navigate('Settings_1');
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
            console.log(err);
          });
      });
      choosefromlibrary().then(url => {
        fetch('http://192.168.43.155:3000/setprofilepic', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: JSON.parse(data).user.email,
            profilepic: url,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message === 'Profile picture updated successfully') {
              setLoading(false);
              alert('Profile picture updated successfully');
              navigation.navigate('Settings_1');
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
            console.log(err);
          });
      });
    });
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
      <Text style={formHead2}>Choose a profile Image</Text>

      {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <Text style={formbtn} onPress={() => handleUpload()}>
          Take Photo
        </Text>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <Text style={formbtn} onPress={() => handleUpload()}>
          Choose From Library
        </Text>
      )}
    </View>
  );
};

export default ChangeUserProfile;

const styles = StyleSheet.create({});
