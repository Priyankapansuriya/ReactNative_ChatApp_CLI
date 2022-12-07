import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Bottomnavbar from '../../Components/Bottomnavbar';
import Topnavbar from '../../Components/Topnavbar';
import {formHead} from '../../Common/Formcss';

const Notification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={'Notification'} />
      <View style={styles.c1}>
        <View style={styles.notification}>
          <Text>Notifications</Text>
        </View>
        <View style={styles.notification}>
          <Text>Notifications</Text>
        </View>
        <View style={styles.notification}>
          <Text>Notifications</Text>
        </View>
        <View style={styles.notification}>
          <Text>Notifications</Text>
        </View>
        <View style={styles.notification}>
          <Text>Notifications</Text>
        </View>
      </View>
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
  c1: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  notification: {
    width: '98%',
    height: 50,
    backgroundColor: '#111111',
    marginTop: 10,
  },
});
export default Notification;
