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
import ImagePicker, {openPicker} from 'react-native-image-crop-picker';

const ChangeUserProfile = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      width: 300,
      height: 400,
      cropping: true,
      aspect: [1, 1],
    });
    console.log(result);
    if (!result.cancelled) {
      const source = {uri: result.uri};
      setImage(source);

      const response = await fetch(result.uri);
      const blob = await response.blob();
      const fileName = result.uri.substring(result.uri);

      const ref = firebase.storage().ref().child(fileName);
      const snapshot = await ref.put(blob);
      const url = await snapshot.ref.getDownloadURL();

      console.log(url);
      return url;
    } else {
      return null;
    }
  };
  const handleUpload = () => {
    //  pickImage();
    AsyncStorage.getItem('user').then(data => {
      setLoading(true);
      pickImage().then(url => {
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
            console.log(err);
          })
          .catch(err => {
            console.log(err);
            throw err;
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

      {/* {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <Text style={formbtn} onPress={() => handleUpload()}>
          Take Photo
        </Text>
      )} */}
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
