import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Src/Screens/LoginSignup/Login/Login';
import Signup_EnterEmail from './Src/Screens/LoginSignup/Signup/Signup_EnterEmail';
import Signup_EnterVerificationCode from './Src/Screens/LoginSignup/Signup/Signup_EnterVerificationCode';
import Signup_ChoosePassword from './Src/Screens/LoginSignup/Signup/Signup_ChoosePassword';
import Signup_ChoseUsername from './Src/Screens/LoginSignup/Signup/Signup_ChoosePassword';
import Signup_AccountCreated from './Src/Screens/LoginSignup/Signup/Signup_AccountCreated';
import ForgetPassword_AccountRecoverd from './Src/Screens/LoginSignup/ForgetPassword/ForgetPassword_AccountRecoverd';
import ForgetPassword_ChoosePassword from './Src/Screens/LoginSignup/ForgetPassword/ForgetPassword_ChoosePassword';
import ForgetPassword_EnterEmail from './Src/Screens/LoginSignup/ForgetPassword/ForgetPassword_EnterEmail';
import ForgetPassword_EnterVerificationCode from './Src/Screens/LoginSignup/ForgetPassword/ForgetPassword_EnterVerificationCode';
import Mainpage from './Src/Screens/Mainpage/Mainpage';
import All_Chats from './Src/Screens/ChatSection/All_Chats';
import SearchUserPage from './Src/Screens/Mainpage/SearchUserPage';
import Notification from './Src/Screens/Mainpage/Notification';
import MyUserProfile from './Src/Screens/Profile/MyUserProfile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup_EnterEmail" component={Signup_EnterEmail} />
        <Stack.Screen
          name="Signup_EnterVerificationCode"
          component={Signup_EnterVerificationCode}
        />
        <Stack.Screen
          name="Signup_ChooseUsername"
          component={Signup_ChoseUsername}
        />
        <Stack.Screen
          name="Signup_ChoosePassword"
          component={Signup_ChoosePassword}
        />
        <Stack.Screen
          name="Signup_AccountCreated"
          component={Signup_AccountCreated}
        />
        <Stack.Screen
          name="ForgetPassword_AccountRecoverd"
          component={ForgetPassword_AccountRecoverd}
        />
        <Stack.Screen
          name="ForgetPassword_ChoosePassword"
          component={ForgetPassword_ChoosePassword}
        />
        <Stack.Screen
          name="ForgetPassword_EnterEmail"
          component={ForgetPassword_EnterEmail}
        />
        <Stack.Screen
          name="ForgetPassword_EnterVerificationCode"
          component={ForgetPassword_EnterVerificationCode}
        />
        <Stack.Screen name="Mainpage" component={Mainpage} />
        <Stack.Screen
          name="All_Chats"
          component={All_Chats}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="SearchUserPage"
          component={SearchUserPage}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="MyUserProfile"
          component={MyUserProfile}
          options={{
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
export default App;
