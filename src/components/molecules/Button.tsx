import React from 'react';
import { StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import {
  MotiPressable,
  MotiPressableInteractionProp,
  MotiPressableInteractionState,
  MotiPressableProps,
  MotiPressableTransitionProp,
} from 'moti/interactions';
import Text from 'components/atoms/Text';
import { colors } from 'utils/theme';

interface Props extends MotiPressableProps {
  label: string;
  backgroundColor?: string;
}

const Button: React.FC<Props> = ({ label, backgroundColor, ...props }) => {
  const animate = React.useCallback<MotiPressableInteractionProp>(
    ({ hovered, pressed }) => {
      'worklet';

      return {
        opacity: hovered || pressed ? 0.85 : 1,
        scale: hovered || pressed ? 0.95 : 1,
      };
    },
    []
  );

  const transition = React.useMemo<MotiPressableTransitionProp>(
    () =>
      ({ hovered, pressed }: MotiPressableInteractionState) => {
        'worklet';

        return {
          delay: hovered || pressed ? 0 : 100,
        };
      },
    []
  );

  return (
    <MotiView style={styles.container}>
      <MotiPressable
        {...props}
        style={[
          styles.button,
          { backgroundColor: backgroundColor ? backgroundColor : colors.blue },
        ]}
        animate={animate}
        transition={transition}
      >
        <Text
          fontSize={16}
          lineHeight={16}
          fontWeight="bold"
          color={colors.white}
        >
          {label}
        </Text>
      </MotiPressable>
    </MotiView>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    maxWidth: 500,
  },
  button: {
    height: '100%',
    width: '100%',
    maxWidth: 500,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
