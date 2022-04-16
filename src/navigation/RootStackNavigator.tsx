import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/slice/authSlice';
import { UserType } from 'redux/types/authType';

const RootStack = createStackNavigator();

interface Props {
  userData: UserType | null;
}

const RootStackNavigator = ({ userData }: Props) => {
  const dispatch = useDispatch();

  /** store user data in redux state */
  React.useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData]);

  /**
   * set initial route name
   * user is already logged in, redirect to main stack
   * */
  const initialRouteName = React.useMemo(() => {
    if (userData) {
      return routes.navigator.mainStack;
    }
    return routes.navigator.authStack;
  }, [userData]);

  return (
    <RootStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen
        name={routes.navigator.authStack}
        component={AuthStackNavigator}
      />

      <RootStack.Screen
        name={routes.navigator.mainStack}
        component={MainStackNavigator}
      />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
