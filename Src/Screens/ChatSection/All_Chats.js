import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {formHead} from '../../Common/Formcss';
import Chat_Card from '../../Card/Chat_Card';

const All_Chats = ({navigation}) => {
  let chat = [
    {
      username: 'Priyanka',
      lastmessage: 'hello',
      time: '12:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
    {
      username: 'Darshit',
      lastmessage: 'hello,how r u ?',
      time: '1:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
    {
      username: 'Hemali',
      lastmessage: 'hiii',
      time: '2:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
    {
      username: 'Amy',
      lastmessage: 'Bye',
      time: '10:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
    {
      username: 'Monali',
      lastmessage: 'Okay',
      time: '9:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
    {
      username: 'Bhumi',
      lastmessage: 'Fine',
      time: '8:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
    {
      username: 'Jaladhi',
      lastmessage: 'hello',
      time: '12:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
    {
      username: 'priya',
      lastmessage: 'hello',
      time: '12:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
    {
      username: 'Jigar',
      lastmessage: 'hello',
      time: '12:00',
      profile_image:
        'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
    },
  ];

  const [keyboard, setKeyboard] = useState('');

  return (
    <ScrollView style={styles.container}>
      <Icon
        name="arrow-back"
        size={30}
        color="grey"
        style={styles.gohomeicon}
        onPress={() => navigation.navigate('Mainpage')}
      />
      <View style={styles.c1}>
        <Text style={formHead}>Your Chats</Text>
        <TextInput
          style={styles.searchbar}
          placeholder="Search"
          onChangeText={text => setKeyboard(text)}
        />
      </View>
      <View style={styles.c2}>
        {chat
          .filter(chat => {
            if (keyboard == '') {
              return chat;
            } else if (
              chat.username.toLowerCase().includes(keyword.toLowerCase()) ||
              chat.lastmessage.toLowerCase().includes(keyword.toLowerCase())
            ) {
              return chat;
            }
          })
          .map(chat => {
            return <Chat_Card key={chat.username} chat={chat} />;
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  gohomeicon: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 10,
    color: 'white',
    fontSize: 30,
  },
  c1: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#111111',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'grey',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 18,
  },
  c2: {
    width: '100%',
    padding: 10,
  },
});

export default All_Chats;
