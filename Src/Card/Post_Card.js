import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {icons1} from '../Common/Pagecss';

const Post_Card = ({post_pic, profile_image, username, likes, comments}) => {
  //console.log(username)

  const [isliked, setIsliked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.c1}>
        <Image source={{uri: profile_image}} style={styles.profilepic} />
        <Text style={styles.username}> {username}</Text>
      </View>
      <Image source={{uri: post_pic}} style={styles.image} />
      <View style={styles.s2}>
        {isliked ? (
          <View style={styles.s21}>
            <Icon
              name="heart"
              size={24}
              color="black"
              style={styles.iconliked}
              onPress={() => setIsliked(false)}
            />
            <Text style={styles.liked}>{likes.length + 1}</Text>
          </View>
        ) : (
          <View style={styles.s21}>
            <Icon
              name="heart-outline"
              size={24}
              color="black"
              style={styles.iconliked}
              onPress={() => setIsliked(true)}
            />
            <Text style={styles.notliked}>{likes.length}</Text>
          </View>
        )}
        <View style={styles.s22}>
          <Icon
            name="comment"
            size={24}
            color="black"
            style={icons1}
            onPress={() => {
              setShowComments(!showComments);
            }}
          />
        </View>
      </View>
      {showComments === true && (
        <View style={styles.s3}>
          {comments.map((item, index) => {
            return (
              <View style={styles.s31} key={item.id}>
                <Text style={styles.commentuser}>{item.username}</Text>
                <Text style={styles.commenttext}>{item.comment}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    // height: 350,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 1,
  },
  c1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
  },
  profilepic: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1,
  },
  username: {
    color: 'white',
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  s2: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
  },
  s21: {
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  notliked: {
    color: 'grey',
    marginLeft: 5,
    fontSize: 25,
  },
  liked: {
    color: '#DC143C',
    marginLeft: 5,
    fontSize: 25,
  },
  iconliked: {
    color: '#DC143C',
    fontSize: 30,
  },
  s22: {
    marginLeft: 20,
  },
  s3: {
    width: '100%',
    backgroundColor: '#111111',
    padding: 10,
  },
  commentuser: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  commenttext: {
    color: 'grey',
    fontSize: 17,
    marginLeft: 5,
  },
  s31: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
});

export default Post_Card;
