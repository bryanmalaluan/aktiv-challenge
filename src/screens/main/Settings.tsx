import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Alert } from 'react-native';
import Container from 'components/containers/Container';
import Button from 'components/molecules/Button';
import Row from 'components/containers/Row';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/slice/authSlice';
import { storeData } from 'utils/asyncStorage';
import { storage } from 'utils/constants';
import routes from 'navigation/routes';

const SettingsScreen = ({ navigation }: StackScreenProps<any, any>) => {
  const dispatch = useDispatch();

  const onPressLogout = () => {
    Alert.alert(
      '',
      'Are you sure you want to logout?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            /**
             * handle user logout
             * redirect to login screen
             */
            dispatch(setUser({ username: '', password: '' }));
            await storeData(storage.user, null);
            navigation.reset({
              index: 0,
              routes: [{ name: routes.navigator.authStack }],
            });
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Container
      alignItems="center"
      justifyContent="center"
      style={{ paddingHorizontal: 24 }}
    >
      <Row style={{ width: 200 }}>
        <Button label="Logout" onPress={onPressLogout} />
      </Row>
    </Container>
  );
};

export default SettingsScreen;
