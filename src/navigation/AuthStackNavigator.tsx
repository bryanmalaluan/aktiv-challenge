import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import routes from './routes';
import LoginScreen from 'screens/auth/Login';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={routes.auth.login}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <AuthStack.Screen name={routes.auth.login} component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
