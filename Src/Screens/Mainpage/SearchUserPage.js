import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Bottomnavbar from '../../Components/Bottomnavbar';
import Topnavbar from '../../Components/Topnavbar';
import {searchbar} from '../../Common/Pagecss';
import User_Card from '../../Card/User_Card';

const SearchUserPage = ({navigation}) => {
  let data = [
    {
      username: 'priyanka',
      profile_image: 'https://picsum.photos/id/200/300',
    },
    {
      username: 'darshit',
      profile_image: 'https://picsum.photos/id/237/200/300',
    },
    {
      username: 'Prishit',
      profile_image: 'https://picsum.photos/id/237/200/300',
    },
    {
      username: 'user1',
      profile_image: 'https://picsum.photos/id/200/300',
    },
    {
      username: 'dhara',
      profile_image: 'https://picsum.photos/id/200/300',
    },
    {
      username: 'user3',
      profile_image: 'https://picsum.photos/id/200/300',
    },
    {
      username: 'priya',
      profile_image: 'https://picsum.photos/id/200/300',
    },
    {
      username: 'pili',
      profile_image: 'https://picsum.photos/id/200/300',
    },
    {
      username: 'user6',
      profile_image: 'https://picsum.photos/id/200/300',
    },
  ];

  const [keyword, setKeyword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar />
      <Topnavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={'SearchUserPage'} />
      <TextInput
        placeholder="Search By Username"
        style={searchbar}
        onChangeText={text => {
          setKeyword(text);
        }}
      />
      <ScrollView style={styles.userlists}>
        {data
          .filter(user => {
            if (keyword === '') {
              return null;
            } else if (
              user.username.toLowerCase().includes(keyword.toLowerCase())
            ) {
              return user;
            }
          })
          .map((item, index) => {
            return <User_Card key={item.username} user={item} />;
          })}
      </ScrollView>
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
  userlists: {
    width: '100%',
    marginTop: 20,
  },
});

export default SearchUserPage;
