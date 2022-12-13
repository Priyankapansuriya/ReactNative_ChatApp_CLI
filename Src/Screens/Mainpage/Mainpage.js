import {AsyncStorage, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerFull} from '../../Common/Pagecss';
import {formHead} from '../../Common/Formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import Topnavbar from '../../Components/Topnavbar';
import FollowersRendomPost from '../../Components/FollowersRendomPost';

const Mainpage = ({navigation}) => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(data => {
        // console.log('async userdata ', data)
        setUserdata(JSON.parse(data));
      })
      .catch(err => alert(err));
  }, []);

  // console.log('userdata ', userdata)

  return (
    <View style={styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} page={'Mainpage'} />
      <Bottomnavbar navigation={navigation} page={'Mainpage'} />
      <FollowersRendomPost />
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

export default Mainpage;
