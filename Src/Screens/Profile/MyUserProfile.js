import {
  ActivityIndicator,
  AsyncStorage,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Bottomnavbar from '../../Components/Bottomnavbar';
import Topnavbar from '../../Components/Topnavbar';
import noprofile from '../../../Assets/noprofile.png';

const MyUserProfile = ({navigation}) => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(async value => {
        //console.log('async userdata', data);
        //setUserdata(JSON.stringify(data));
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
              setUserdata(data.user);
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
  }, []);

  console.log('userdata ', userdata);

  // const data = {
  //   username: 'Priyanka_Vasoya',
  //   followers: 1000,
  //   following: 1500,
  //   description: '" La via este belle 😃🌻 "',
  //   profile_image: 'https://picsum.photos/300/800',
  //   posts: [
  //     {
  //       id: 1,
  //       post_image: 'https://picsum.photos/300/400',
  //     },
  //     {
  //       id: 2,
  //       post_image: 'https://picsum.photos/400/400',
  //     },
  //     {
  //       id: 3,
  //       post_image: 'https://picsum.photos/400/500',
  //     },
  //     {
  //       id: 4,
  //       post_image: 'https://picsum.photos/500/600',
  //     },
  //     {
  //       id: 5,
  //       post_image: 'https://picsum.photos/600/400',
  //     },
  //     {
  //       id: 6,
  //       post_image: 'https://picsum.photos/100/400',
  //     },
  //     {
  //       id: 7,
  //       post_image: 'https://picsum.photos/600/300',
  //     },
  //     {
  //       id: 8,
  //       post_image: 'https://picsum.photos/600/200',
  //     },
  //     {
  //       id: 9,
  //       post_image: 'https://picsum.photos/700/400',
  //     },
  //     {
  //       id: 10,
  //       post_image: 'https://picsum.photos/600/500',
  //     },
  //     {
  //       id: 11,
  //       post_image: 'https://picsum.photos/100/200',
  //     },
  //     {
  //       id: 12,
  //       post_image: 'https://picsum.photos/700/800',
  //     },
  //   ],
  // };

  const [] = useState();

  return (
    <View style={styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} page={'MyUserProfile'} />
      <Bottomnavbar navigation={navigation} page={'MyUserProfile'} />
      {userdata ? (
        <ScrollView>
          <View style={styles.c11}>
            {userdata.profilepic.length > 0 ? (
              <Image
                style={styles.profilepic}
                source={{uri: userdata.profilepic}}
              />
            ) : (
              <Image style={styles.profilepic} source={noprofile} />
            )}

            <View style={styles.c111}>
              <Text style={styles.txt2}>{userdata.followers.length}</Text>
              <Text style={styles.txt1}>Followers</Text>
            </View>
            <View style={styles.c111}>
              <Text style={styles.txt2}>{userdata.following.length}</Text>
              <Text style={styles.txt1}>Following</Text>
            </View>
            <View style={styles.c111}>
              <Text style={styles.txt2}>{userdata.posts.length}</Text>
              <Text style={styles.txt1}>Posts</Text>
            </View>
          </View>
          <Text style={styles.txt}>@{userdata.username}</Text>
          {userdata.description.length > 0 && (
            <Text style={styles.description}>{userdata.description}</Text>
          )}
          {userdata.posts.length > 0 ? (
            <View style={styles.c1}>
              <Text style={styles.c4}>Your Posts</Text>
              <View style={styles.c13}>
                {data.posts.map(item => {
                  return (
                    <Image
                      key={item.id}
                      style={styles.postpic}
                      source={{uri: item.post_image}}
                    />
                  );
                })}
              </View>
            </View>
          ) : (
            <View style={styles.c2}>
              <Text style={styles.txt1}>You Didn't Post Anything Yet</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="maroon" />
      )}
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
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profilepic: {
    width: 100,
    height: 100,
    borderRadius: 75,
    margin: 10,
    alignSelf: 'flex-start',
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  txt1: {
    color: 'white',
    fontSize: 15,
  },
  txt2: {
    color: 'white',
    fontSize: 20,
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  c111: {
    marginTop: 30,
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'white',
  },
  description: {
    color: 'white',
    fontSize: 14,
    margin: 20,
    marginTop: 0,
    alignSelf: 'flex-start',
  },
  postpic: {
    width: '30%',
    height: 120,
    margin: 5,
  },
  c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center',
  },
  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  refresh: {
    position: 'absolute',
    top: 50,
    right: 5,
    zIndex: 1,
  },
  c4: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#111111',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
export default MyUserProfile;
