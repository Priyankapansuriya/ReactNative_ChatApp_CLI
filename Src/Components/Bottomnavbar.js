import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {icons1} from '../Common/Pagecss';

const Bottomnavbar = ({navigation, page}) => {
  return (
    <View style={styles.container}>
      {page === 'Mainpage' ? (
        <Icon
          name="home"
          size={24}
          color="black"
          style={styles.activeicons1}
          onPress={() => navigation.navigate('Mainpage')}
        />
      ) : (
        <Icon
          name="home"
          size={24}
          color="black"
          style={icons1}
          onPress={() => navigation.navigate('Mainpage')}
        />
      )}
      {page === 'SearchUserPage' ? (
        <Icon
          name="search"
          size={24}
          color="black"
          style={styles.activeicons1}
          onPress={() => navigation.navigate('SearchUserPage')}
        />
      ) : (
        <Icon
          name="search"
          size={24}
          color="black"
          style={icons1}
          onPress={() => navigation.navigate('SearchUserPage')}
        />
      )}
      {page === 'Notification' ? (
        <Icon
          name="notifications"
          size={24}
          color="black"
          style={styles.activeicons1}
          onPress={() => navigation.navigate('Notification')}
        />
      ) : (
        <Icon
          name="notifications"
          size={24}
          color="black"
          style={icons1}
          onPress={() => navigation.navigate('Notification')}
        />
      )}
      {page === 'MyUserProfile' ? (
        <Icon
          name="supervised-user-circle"
          size={24}
          color="black"
          style={styles.activeicons1}
          onPress={() => navigation.navigate('MyUserProfile')}
        />
      ) : (
        <Icon
          name="supervised-user-circle"
          size={24}
          color="black"
          style={icons1}
          onPress={() => navigation.navigate('MyUserProfile')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#111111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeicons1: {
    backgroundColor: 'white',
    borderRadius: 50,
    fontSize: 30,
    padding: 10,
  },
});

export default Bottomnavbar;
