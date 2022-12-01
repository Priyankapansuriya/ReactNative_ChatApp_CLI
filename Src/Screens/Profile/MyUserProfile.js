import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Bottomnavbar from '../../Components/Bottomnavbar';
import Topnavbar from '../../Components/Topnavbar';
import {formHead} from '../../Common/Formcss';

const MyUserProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={'MyUserProfile'} />
      <Text style={formHead}>User Profile</Text>
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
});
export default MyUserProfile;
