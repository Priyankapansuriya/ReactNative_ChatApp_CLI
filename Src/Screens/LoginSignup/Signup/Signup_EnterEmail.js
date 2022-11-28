import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { containerFull, goback, logo } from '../../../Common/Pagecss'
import Icon from 'react-native-vector-icons/Ionicons';
import logo2 from "../../../../Assets/logo2.jpg"
import { formHead2, formInput,formbtn} from "../../../Common/Formcss";


const Signup_EnterEmail = ({navigation}) => {
  return (
    <View style={containerFull}>
      <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={goback}>
       <Icon name="arrow-back" size={30} color="grey" />;
        <Text style={{color: "grey",fontSize:16, marginLeft:10}}
        >Go Back</Text>
      </TouchableOpacity>
      <Image source={logo2} style={logo}/>
      <Text style={formHead2}>Create New Account</Text>
      <TextInput placeholder='Enter Your Email' style={formInput}/> 
      <Text style={formbtn}
      onPress={()=> navigation.navigate("Signup_EnterVerificationCode")}
      >Next</Text>
    </View>
  )
}

export default Signup_EnterEmail

const styles = StyleSheet.create({})