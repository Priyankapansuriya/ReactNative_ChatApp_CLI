import { StyleSheet, Text, View,Image, TextInput } from 'react-native'
import React from 'react'
import logo2 from "../../../../Assets/logo2.jpg"
import { containerFull ,hr80,logo} from '../../../Common/Pagecss'
import {formInput,formHead,formTextLinkRight,formbtn,formTextLinkCenter} from "../../../Common/Formcss"; 

const Login = ({navigation}) => {
  return (
    <View style={containerFull}>
      <Image source={logo2} style={logo}/>
      <Text style={formHead}>Login</Text>
      <TextInput placeholder='Enter Your Email' style={formInput} />
      <TextInput placeholder='Enter Your Password' style={formInput}
        secureTextEntry={true}
      />  
      <Text style={formTextLinkRight} 
      onPress={()=> navigation.navigate("ForgetPassword_EnterEmail")}
      >Forgot Password?</Text> 
      <Text style={formbtn} 
      onPress={()=> navigation.navigate("Mainpage") }
      >Login</Text>

    <View style={hr80}></View>  
    <Text style={formTextLinkCenter}>
     Don't Have Account? Signup <Text style={{color:"White"}}
     onPress = {() => navigation.navigate("Signup_EnterEmail")}
     >Here</Text> 
    </Text>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})