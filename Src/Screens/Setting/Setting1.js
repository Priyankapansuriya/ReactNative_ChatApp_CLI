import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerFull} from '../../Common/Pagecss';
import {formHead} from '../../Common/Formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import Topnavbar from '../../Components/Topnavbar';
import FollowersRendomPost from '../../Components/FollowersRendomPost';

const Setting1 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Text>Setting</Text>
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

export default Setting1;