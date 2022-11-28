import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {containerFull} from "../../Common/Pagecss"
import {formHead} from "../../Common/Formcss"
import Bottomnavbar from '../../Components/Bottomnavbar'

const Mainpage = ({navigation}) => {
  return (
    <View style={containerFull}>
    <StatusBar />
    <Bottomnavbar />
      <Text style={formHead}>Mainpage</Text>
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

export default Mainpage

