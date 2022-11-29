import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import chattt from "../../../../Assets/chattt.png"
import { formHead2, formInput,formbtn} from "../../../Common/Formcss";
import { containerFull, goback, logo1, row } from '../../../Common/Pagecss';

const Signup_AccountCreated = ({navigation}) => {
  return (
    <View style={containerFull}>
      <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={goback}>
       <Icon name="arrow-back" size={30} color="grey" />
        <Text style={{color: "grey",fontSize:16, marginLeft:10}}>Go Back</Text>
      </TouchableOpacity>
      <Image source={chattt} style={logo1}/>
      <View style={row}>
      <Icon name="check-decagram" size={30} color="#99883c" />
      <Text style={formHead2}> Account Creadted Succesfully</Text>
      </View>
      <Text style={formbtn}
      onPress={()=> navigation.navigate("Login")}
      >Let's Go</Text>
    </View>
  )
}

export default Signup_AccountCreated

const styles = StyleSheet.create({})