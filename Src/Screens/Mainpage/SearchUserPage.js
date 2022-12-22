import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Bottomnavbar from '../../Components/Bottomnavbar';
import Topnavbar from '../../Components/Topnavbar';
import {searchbar} from '../../Common/Pagecss';
import User_Card from '../../Card/User_Card';
import {formHead2} from '../../Common/Formcss';

const SearchUserPage = ({navigation}) => {
  // let data = [
  //   {
  //     username: 'priyanka',
  //     profile_image: 'https://picsum.photos/id/200/300',
  //   },
  //   {
  //     username: 'darshit',
  //     profile_image: 'https://picsum.photos/id/237/200/300',
  //   },
  //   {
  //     username: 'Prishit',
  //     profile_image: 'https://picsum.photos/id/237/200/300',
  //   },
  //   {
  //     username: 'user1',
  //     profile_image: 'https://picsum.photos/id/200/300',
  //   },
  //   {
  //     username: 'dhara',
  //     profile_image: 'https://picsum.photos/id/200/300',
  //   },
  //   {
  //     username: 'user3',
  //     profile_image: 'https://picsum.photos/id/200/300',
  //   },
  //   {
  //     username: 'priya',
  //     profile_image: 'https://picsum.photos/id/200/300',
  //   },
  //   {
  //     username: 'pili',
  //     profile_image: 'https://picsum.photos/id/200/300',
  //   },
  //   {
  //     username: 'user6',
  //     profile_image: 'https://picsum.photos/id/200/300',
  //   },
  // ];

  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getallusers = async () => {
    if (keyword.length > 0) {
      setLoading(true);
      fetch('http://192.168.43.155:3000/searchuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({keyword: keyword}),
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          if (data.error) {
            setData([]);
            setError(data.error);
            setLoading(false);
          } else if (data.message == 'User Found') {
            setError(null);
            setData(data.user);
            setLoading(false);
          }
        })
        .catch(err => {
          setData([]);
          setLoading(false);
        });
    } else {
      setData([]);
      setError(null);
    }
  };

  useEffect(() => {
    getallusers();
  }, [keyword]);
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
      {loading ? (
        <ActivityIndicator size="large" color="maroon" />
      ) : (
        <>
          {error ? (
            <Text style={formHead2}>{error}</Text>
          ) : (
            <ScrollView style={styles.userlists}>
              {data.map((item, index) => {
                return (
                  <User_Card
                    key={item.username}
                    user={item}
                    navigation={navigation}
                  />
                );
              })}
            </ScrollView>
          )}
        </>
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
  userlists: {
    width: '100%',
    marginTop: 20,
  },
});

export default SearchUserPage;
