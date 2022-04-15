import { Alert } from 'react-native';

const handleError = (message: string) => {
  return Alert.alert('', message);
};

export default handleError;
