import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from 'navigation/RootStackNavigator';
import { QueryClientProvider } from 'react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getData } from 'utils/asyncStorage';
import { storage } from 'utils/constants';
import store from 'redux/store';
import queryClient from 'network/queryClient';
import { UserType } from 'redux/types/authType';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  const [userData, setUserData] = React.useState<UserType | null>(null);
  const [initCompleted, setInitCompleted] = React.useState<boolean>(false);

  React.useEffect(() => {
    /** retrieve user data from local storage */
    const fetchLocalStorage = async () => {
      const ret = await getData(storage.user);

      if (ret) {
        setUserData(ret);
      }
      setInitCompleted(true);
    };
    fetchLocalStorage();
  }, []);

  if (!initCompleted) {
    return null;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStackNavigator userData={userData} />
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
