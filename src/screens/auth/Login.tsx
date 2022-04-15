import React from 'react';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KeyboardAwareScrollView from 'components/containers/KeyboardAwareScrollView';
import Text from 'components/atoms/Text';
import InputField from 'components/molecules/InputField';
import Col from 'components/containers/Col';
import Button from 'components/molecules/Button';
import { colors } from 'utils/theme';
import routes from 'navigation/routes';
import handleError from 'utils/handleError';
import { storeData } from 'utils/asyncStorage';
import { storage } from 'utils/constants';

const LoginScreen = ({ navigation }: StackScreenProps<any, any>) => {
  const insets = useSafeAreaInsets();

  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  const [usernameError, setUsernameError] = React.useState<boolean>(false);
  const [passwordError, setPasswordError] = React.useState<boolean>(false);

  const onPressLogin = React.useCallback(async () => {
    if (!username || !password) {
      setUsernameError(!username);
      setPasswordError(!password);
      return;
    }

    setUsernameError(false);
    setPasswordError(false);

    if (username === 'admin' && password === 'admin') {
      /**
       * login successful, navigate to main stack navigator
       * store data in local storage
       * set data in redux state
       */
      await storeData(storage.user, { username, password });

      return navigation.reset({
        index: 0,
        routes: [{ name: routes.navigator.mainStack }],
      });
    }
    return handleError('Invalid username or password');
  }, [username, password]);

  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      extraScrollHeight={insets.bottom + 16}
      style={{ backgroundColor: colors.white }}
      contentContainerStyle={[
        styles.contentContainerStyle,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 16,
        },
      ]}
    >
      <Col
        alignItems="center"
        justifyContent="center"
        style={{ flex: 1, width: '100%' }}
      >
        <Text
          fontSize={36}
          fontWeight="bold"
          lineHeight={36}
          style={{ marginBottom: 24 }}
        >
          Aktiv Challenge
        </Text>

        <InputField
          value={username}
          placeholder="Username"
          placeholderTextColor={colors.gray}
          fontSize={16}
          lineHeight={18}
          autoCapitalize="none"
          textContentType="username"
          error={usernameError ? 'Username is required' : undefined}
          marginBottom={16}
          onChangeText={setUsername}
        />

        <InputField
          value={password}
          placeholder="Password"
          placeholderTextColor={colors.gray}
          fontSize={16}
          lineHeight={18}
          autoCapitalize="none"
          textContentType="password"
          error={passwordError ? 'Password is required' : undefined}
          secureTextEntry={secureTextEntry}
          onChangeText={setPassword}
          onPressShow={() => setSecureTextEntry(!secureTextEntry)}
        />
      </Col>

      <Button label="Login" onPress={onPressLogin} />
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
