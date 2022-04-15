import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from 'screens/main/Home';
import SettingsScreen from 'screens/main/Settings';
import { fontScale } from 'utils/dataFormat';
import routes from './routes';
import { colors } from 'utils/theme';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      initialRouteName={routes.main.home}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          height: 56 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          backgroundColor: colors.white,
        },
        tabBarLabelStyle: {
          fontSize: fontScale(12),
          fontWeight: '800',
        },
      }}
    >
      <BottomTab.Screen
        name={routes.main.home}
        component={HomeScreen}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: 'Home',
        }}
      />

      <BottomTab.Screen
        name={routes.main.settings}
        component={SettingsScreen}
        options={{
          tabBarIcon: () => null,
          tabBarLabel: 'Settings',
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
