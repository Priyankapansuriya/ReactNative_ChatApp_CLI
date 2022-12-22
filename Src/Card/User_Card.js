import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import noprofile from '../../Assets/noprofile.png';

const User_Card = ({user, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OtherUserProfile', {user: user});
      }}>
      <View style={styles.ChatCard}>
        {user.profilepic ? (
          <Image source={{uri: user.profilepic}} style={styles.image} />
        ) : (
          <Image source={noprofile} style={styles.image} />
        )}

        <View style={styles.c1}>
          <Text style={styles.username}>{user.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ChatCard: {
    backgroundColor: '#111111',
    width: '100%',
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  username: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  c1: {
    marginLeft: 20,
  },
  lastmessage: {
    color: 'gray',
    fontSize: 19,
  },
});

export default User_Card;
