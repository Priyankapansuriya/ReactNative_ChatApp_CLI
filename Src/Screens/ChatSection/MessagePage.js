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
import React, {useEffect, useRef, useState} from 'react';
import noprofile from '../../../Assets/noprofile.png';
import Icon from 'react-native-vector-icons/Ionicons';
import io from 'socket.io-client';

const socket = io('http://192.168.43.155:3001');

const MessagePage = ({navigation, route}) => {
  const {fuseremail, fuserid} = route.params;
  const [ouruserdata, setOuruserdata] = useState(null);
  const [fuserdata, setFuserdata] = useState(null);
  const [userid, setUserid] = useState(null);
  const [roomid, setRoomid] = useState(null);
  const [chat, setChat] = useState(['']);

  useEffect(() => {
    loaddata();
    //console.log(fuseremail);
  }, []);

  useEffect(() => {
    socket.on('receive_message', data => {
      console.log('recieved message - ', data);
      loadMessages(roomid);
    });
  }, [socket]);

  const sortroomid = (id1, id2) => {
    if (id1 > id2) {
      return id1 + id2;
    } else {
      return id2 + id1;
    }
  };

  const loaddata = async () => {
    AsyncStorage.getItem('user')
      .then(async value => {
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
              setUserid(data.user._id);

              fetch('http://192.168.43.155:3000/otheruserdata', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: fuseremail}),
              })
                .then(res => res.json())
                .then(async data1 => {
                  if (data1.message == 'User Found') {
                    console.log('fuser data ', data1.user.username);
                    setFuserdata(data1.user);
                    let temproomid = await sortroomid(fuserid, data.user._id);

                    setRoomid(temproomid);
                    // console.log('room id ', temproomid)
                    socket.emit('join_room', {roomid: temproomid});
                    loadMessages(temproomid);
                  } else {
                    alert('User Not Found');
                    navigation.navigate('SearchUserPage');
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

  const [currentmessage, setCurrentmessage] = useState(null);

  const sendMessage = async () => {
    const messagedata = {
      message: currentmessage,
      roomid: roomid,
      senderid: userid,
      recieverid: fuserdata._id,
    };
    fetch('http://192.168.43.155:3000/savemessagetodb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messagedata),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'Message saved successfully') {
          socket.emit('send_message', messagedata);
          loadMessages(roomid);
          console.log('message sent');

          setCurrentmessage('');
        } else {
          alert('Network Error');
          setCurrentmessage('');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadMessages(roomid);
  }, [chat]);

  const loadMessages = temproomid => {
    fetch('http://192.168.43.155:3000/getmessages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({roomid: temproomid}),
    })
      .then(res => res.json())
      .then(data => {
        setChat(data);
      });
  };

  const scrollViewRef = useRef();

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

      <ScrollView
        style={styles.messageView}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {chat.map((item, index) => {
          return (
            <View style={styles.message} key={index}>
              {item.senderid == userid && (
                <View style={styles.messageRight}>
                  <Text style={styles.messageTextRight}>{item.message}</Text>
                </View>
              )}
              {item.senderid != userid && item != '' && (
                <View style={styles.messageLeft}>
                  <Text style={styles.messageTextLeft}>{item.message}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.sbottom}>
        <TextInput
          style={styles.sbottominput}
          placeholder="Type a message"
          placeholderTextColor={'grey'}
          onChangeText={text => setCurrentmessage(text)}
          value={currentmessage}
        />
        <TouchableOpacity>
          {currentmessage ? (
            <Icon
              name="ios-send-outline"
              size={24}
              color="white"
              onPress={() => sendMessage()}
            />
          ) : (
            <Icon name="ios-send-outline" size={24} color="white" />
          )}
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
