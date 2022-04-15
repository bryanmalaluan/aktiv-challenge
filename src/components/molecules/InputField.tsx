import React from 'react';
import { StyleSheet, TextInputProps } from 'react-native';
import TextInput, {
  AutoCapitalizeType,
  TextContentType,
} from 'components/atoms/TextInput';
import Row from 'components/containers/Row';
import Pressable from 'components/atoms/Pressable';
import Text from 'components/atoms/Text';
import Col from 'components/containers/Col';
import { colors } from 'utils/theme';

interface Props extends TextInputProps {
  fontSize?: number;
  lineHeight?: number;
  autoCapitalize?: AutoCapitalizeType;
  textContentType?: TextContentType;
  error?: string;
  marginBottom?: number;
  clearButton?: boolean;
  onPressShow?: () => void;
  onPressClear?: () => void;
}

const InputField: React.FC<Props> = ({
  error,
  marginBottom,
  clearButton = false,
  onPressShow,
  onPressClear,
  ...props
}) => {
  /** display show button if text content type is password */
  const hasShowButton = React.useMemo(() => {
    return props.textContentType === 'password';
  }, [props.textContentType]);

  /** change text if password has been shown */
  const showText = React.useMemo(() => {
    if (props.textContentType === 'password' && !props.secureTextEntry) {
      return 'Hide';
    }
    return 'Show';
  }, [props.secureTextEntry, props.textContentType]);

  return (
    <Col style={[styles.container, { marginBottom }]}>
      <Row style={styles.row}>
        <TextInput {...props} />

        {hasShowButton && (
          <Pressable
            alignItems="center"
            justifyContent="center"
            style={styles.showButton}
            onPress={onPressShow}
          >
            <Text color={colors.blue} fontWeight="500">
              {showText}
            </Text>
          </Pressable>
        )}

        {clearButton && (
          <Pressable
            alignItems="center"
            justifyContent="center"
            style={styles.showButton}
            onPress={onPressClear}
          >
            <Text color={colors.blue} fontWeight="500">
              Clear
            </Text>
          </Pressable>
        )}
      </Row>

      {!!error && (
        <Text
          fontSize={12}
          fontWeight="bold"
          lineHeight={12}
          color={colors.red}
          style={{ marginTop: 8 }}
        >
          {error}
        </Text>
      )}
    </Col>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
  },
  row: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    padding: 8,
  },
  showButton: {
    height: '100%',
    paddingHorizontal: 8,
  },
});
