import {StatusBar, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {formHead, formHead2} from '../../Common/Formcss';

const Setting1 = ({navigation}) => {
  const logout = () => {
    AsyncStorage.removeItem('user').then(() => {
      alert('Logged out successfully');
      navigation.navigate('Login');
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Icon
        name="arrow-back"
        size={30}
        color="grey"
        style={styles.gohomeicon}
        onPress={() => navigation.navigate('MyUserProfile')}
      />
      <Text style={formHead}>Settings</Text>
      <Text
        style={styles.txt1}
        onPress={() => navigation.navigate('EditProfile')}>
        Edit Profile
      </Text>
      <Text
        style={styles.txt1}
        onPress={() => navigation.navigate('ChangePassword')}>
        Change Password
      </Text>
      <Text style={styles.txt1} onPress={() => logout()}>
        Logout
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  gohomeicon: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 10,
    color: 'white',
    fontSize: 30,
  },
  txt1: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default Setting1;
