import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import noprofile from '../../../Assets/noprofile.png';
import Icon from 'react-native-vector-icons/Ionicons';

const MessagePage = ({navigation, route}) => {
  const {fuseremail} = route.params;
  const [ouruserdata, setOuruserdata] = useState(null);
  const [fuserdata, setFuserdata] = useState(null);
  useEffect(() => {
    loaddata();
    //console.log(fuseremail);
  }, []);

  const loaddata = async () => {
    AsyncStorage.getItem('user')
      .then(async value => {
        //console.log('async userdata', data);
        //setOuruserdata(JSON.stringify(data));
        fetch('http://192.168.43.155:3000/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(value).token,
          },
          body: JSON.stringify({email: JSON.parse(value).user.email}),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'User Found') {
              console.log('our user data', data.user.username);
              setOuruserdata(data.user);

              fetch('http://192.168.43.155:3000/otheruserdata', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: fuseremail}),
              })
                .then(res => res.json())
                .then(data => {
                  if (data.message == 'User Found') {
                    //console.log('fuser data ', data.user.username);
                    setFuserdata(data.user);
                    ismyprofile(data.user);
                    CheckFollow(data.user);
                  } else {
                    alert('User Not Found');
                    navigation.navigate('SearchUserPage');
                    // navigation.navigate('Login')
                  }
                })
                .catch(err => {
                  // console.log(err)
                  alert('Something Went Wrong');
                  navigation.navigate('SearchUserPage');
                });
            } else {
              alert('Login Again');
              navigation.navigate('Login');
            }
          })
          .catch(err => {
            navigation.navigate('Login');
          });
      })
      .catch(err => {
        navigation.navigate('Login');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.s1}>
        <TouchableOpacity
          onPress={() => navigation.navigate('All_Chats')}
          style={styles.goback}>
          <Icon name="arrow-back" size={30} color="grey" />
        </TouchableOpacity>
        {fuserdata?.profilepic ? (
          <Image
            source={{uri: fuserdata?.profilepic}}
            style={styles.profilepic}
          />
        ) : (
          <Image source={noprofile} style={styles.profilepic} />
        )}
        <Text style={styles.username}>{fuserdata?.username}</Text>
      </View>
      <View style={styles.sbottom}>
        <TextInput
          style={styles.sbottominput}
          placeholder="Type a message"
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity style={styles.sbottombtn}>
          <Icon name="ios-send-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagePage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  profilepic: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  username: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  s1: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#111111',
    padding: 10,
  },
  sbottom: {
    width: '100%',
    height: 50,
    backgroundColor: '#111111',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    borderRadius: 30,
  },
  sbottominput: {
    width: '80%',
    height: 40,
    fontSize: 17,
    color: 'white',
  },

  message: {
    width: '100%',
    // padding:10,
    borderRadius: 10,
    // marginVertical:5,
    // backgroundColor:'red',
  },
  messageView: {
    width: '100%',
    marginBottom: 50,
  },
  messageRight: {
    width: '100%',
    alignItems: 'flex-end',
    // backgroundColor:'red'
  },
  messageTextRight: {
    color: 'white',
    backgroundColor: '#1e90ff',
    // width:'min-content',
    minWidth: 100,
    padding: 10,
    fontSize: 17,
    borderRadius: 20,
    margin: 10,
  },
  messageLeft: {
    width: '100%',
    alignItems: 'flex-start',
    // backgroundColor:'red'
  },
  messageTextLeft: {
    color: 'white',
    backgroundColor: '#222222',
    color: 'white',
    fontSize: 17,
    minWidth: 100,
    padding: 10,
    borderRadius: 20,
    margin: 10,
  },
});
