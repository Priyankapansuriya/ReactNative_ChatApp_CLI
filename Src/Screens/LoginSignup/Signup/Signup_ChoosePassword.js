import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import l1 from '../../../../Assets/l1.png';
import {formHead2, formInput, formbtn} from '../../../Common/Formcss';
import {containerFull, goback, logo1} from '../../../Common/Pagecss';

const Signup_ChoosePassword = ({navigation}) => {
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={goback}>
        <Icon name="arrow-back" size={30} color="grey" />
        <Text style={{color: 'grey', fontSize: 16, marginLeft: 10}}>
          Go Back
        </Text>
      </TouchableOpacity>
      <Image source={l1} style={logo1} />
      <Text style={formHead2}>Choose Strong Password</Text>
      <TextInput
        placeholder="Enter Password"
        style={formInput}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        style={formInput}
        secureTextEntry
      />
      <Text
        style={formbtn}
        onPress={() => navigation.navigate('Signup_AccountCreated')}>
        Next
      </Text>
    </View>
  );
};

export default Signup_ChoosePassword;

const styles = StyleSheet.create({});
