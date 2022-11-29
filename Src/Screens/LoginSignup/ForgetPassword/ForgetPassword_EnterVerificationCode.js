import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { containerFull, goback, logo, logo1 } from '../../../Common/Pagecss'
import Icon from 'react-native-vector-icons/Ionicons';
import chattt from "../../../../Assets/chattt.png"
import { formHead3, formInput,formbtn} from "../../../Common/Formcss";

const ForgetPassword_EnterVerificationCode = ({navigation}) => {
  return (
    <View style={containerFull}>
      <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={goback}>
       <Icon name="arrow-back" size={30} color="grey" />
        <Text style={{color: "grey",fontSize:16, marginLeft:10}}
        >Go Back</Text>
      </TouchableOpacity>
      <Image source={chattt} style={logo1}/>
      <Text style={formHead3}>Verification code has been send to your Email</Text>
      <TextInput placeholder='Enter 6-Digit code ' style={formInput}/> 
      <Text style={formbtn}
      onPress={()=> navigation.navigate("ForgetPassword_ChoosePassword")}
      >Next</Text>
    </View>
  )
}

export default ForgetPassword_EnterVerificationCode

const styles = StyleSheet.create({})