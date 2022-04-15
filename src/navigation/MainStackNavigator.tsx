import React from 'react';
import { TransitionPresets } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import routes from './routes';
import DetailsScreen from 'screens/main/Details';
import BottomTabNavigator from './BottomTabNavigator';

const MainStack = createSharedElementStackNavigator();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName={routes.navigator.bottomTab}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <MainStack.Screen
        name={routes.navigator.bottomTab}
        component={BottomTabNavigator}
      />

      <MainStack.Screen
        name={routes.main.details}
        component={DetailsScreen}
        options={{
          gestureEnabled: false,
        }}
        sharedElements={route => {
          const { item } = route.params;
          return [`item.${item.id}.photo`];
        }}
      />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
