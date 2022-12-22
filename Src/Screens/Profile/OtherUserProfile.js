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
import Icon from 'react-native-vector-icons/Foundation';

const OtherUserProfile = ({navigation, route}) => {
  const [userdata, setUserdata] = useState(null);
  const [issameuser, setIssameuser] = React.useState(false);

  const ismyprofile = otheruser => {
    AsyncStorage.getItem('user').then(loggeduser => {
      const loggeduserobj = JSON.parse(loggeduser);
      if (loggeduserobj.user._id == otheruser._id) {
        setIssameuser(true);
      } else {
        setIssameuser(false);
      }
    });
  };
  const {user} = route.params;
  // console.log(user)
  const loaddata = async () => {
    fetch('http://192.168.43.155:3000/otheruserdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: user.email}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'User Found') {
          setUserdata(data.user);
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
  };
  useEffect(() => {
    loaddata();
  }, []);

  console.log('userdata ', userdata);

  const FollowThisUser = async () => {
    console.log('FollowThisUser');
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);
    fetch('http://192.168.43.155:3000/followuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: userdata.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'User Followed') {
          // alert('Followed')
          loaddata();
          setIsfollowing(true);
        } else {
          alert('Something Went Wrong');
        }
      });
  };

  const [isfollowing, setIsfollowing] = React.useState(false);
  const CheckFollow = async otheruser => {
    AsyncStorage.getItem('user').then(loggeduser => {
      const loggeduserobj = JSON.parse(loggeduser);
      fetch('http://192.168.43.155:3000/checkfollow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followfrom: loggeduserobj.user.email,
          followto: otheruser.email,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message == 'User in following list') {
            setIsfollowing(true);
          } else if (data.message == 'User not in following list') {
            setIsfollowing(false);
          } else {
            // loaddata()
            alert('Something Went Wrong');
          }
        });
    });
  };

  const UnfollowThisUser = async () => {
    console.log('UnfollowThisUser');
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);
    fetch('http://192.168.43.155:3000/unfollowuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: userdata.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'User Unfollowed') {
          // alert('Followed')
          loaddata();
          setIsfollowing(false);
        } else {
          alert('Something Went Wrong');
        }
      });
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} page={'OtherUserProfile'} />
      <Bottomnavbar navigation={navigation} page={'SearchUserPage'} />
      {/* <Icon
        name="refresh"
        size={30}
        color="maroon"
        style={styles.refresh}
        onPress={() => loaddata()}
      /> */}
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
          <View style={styles.c1}>
            {issameuser ? (
              <></>
            ) : (
              <View style={styles.row}>
                {isfollowing ? (
                  <Text
                    style={styles.follow}
                    onPress={() => UnfollowThisUser()}>
                    Following
                  </Text>
                ) : (
                  <Text style={styles.follow} onPress={() => FollowThisUser()}>
                    Follow
                  </Text>
                )}
                <Text
                  style={styles.message}
                  onPress={() => {
                    navigation.navigate('MessagePage', {
                      fuseremail: userdata.email,
                      fuserid: userdata._id,
                    });
                  }}>
                  Message
                </Text>
              </View>
            )}
          </View>
          {isfollowing || issameuser ? (
            <View>
              {userdata.posts.length > 0 ? (
                <View style={styles.c1}>
                  <Text style={styles.c4}>Posts</Text>
                  <View style={styles.c13}>
                    {userdata.posts?.map(item => {
                      return (
                        <Image
                          key={item.post}
                          style={styles.postpic}
                          source={{uri: item.post}}
                        />
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={styles.c2}>
                  <Text style={styles.txt1}>
                    This user has not posted anything yet
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.c2}>
              <Text style={styles.txt1}>Follow to see posts</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="white" />
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
  follow: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  message: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
  },
});

export default OtherUserProfile;
