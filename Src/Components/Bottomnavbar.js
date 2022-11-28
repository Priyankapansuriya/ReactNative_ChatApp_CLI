import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  Icon  from 'react-native-vector-icons/Entypo'
import  Icon  from 'react-native-vector-icons/Feather'
import { icons1 } from '../Common/Pagecss'


const Bottomnavbar = () => {
  return (
    <View style={styles.container}>
      <Text>Bottomnavbar</Text>
      <Icon name='home' size={24} color="black" style={icons1}/>
      <Icon name='search' size={24} color="black" style={icons1}/>
      <Icon name='user' size={24} color="black" style={icons1}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        position: "absolute",
        bottom: 0,
        width: "100%",
        zIndex: 100,
    }
})

export default Bottomnavbar

