import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import chattt from "../../Assets/chattt.png"
import { icons1, logo2 } from '../Common/Pagecss'
import  Icon  from 'react-native-vector-icons/Ionicons'

const Topnavbar = () => {
  return (
    <View style={styles.container}>
      <Image source={chattt} style={logo2}/>
      <Icon name='chatbubbles-outline' size={24} color="black" style={icons1}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: "#111111",

    }
})

export default Topnavbar

