import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { icons1 } from '../Common/Pagecss'


const Bottomnavbar = () => {
  return (
    <View style={styles.container}>
      <Icon name='home' size={24} color="black" style={icons1}/>
      <Icon name='search' size={24} color="black" style={icons1}/>
      <Icon name='heart' size={24} color="black" style={icons1}/>
      <Icon name='user' size={24} color="black" style={icons1}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: "#111111",
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
}
})

export default Bottomnavbar

