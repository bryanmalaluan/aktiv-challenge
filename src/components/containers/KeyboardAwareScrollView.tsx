import React from 'react';
import {
  KeyboardAwareScrollView as RNKeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

interface Props extends KeyboardAwareScrollViewProps {}

const KeyboardAwareScrollView: React.FC<Props> = ({ ...props }) => {
  return (
    <RNKeyboardAwareScrollView
      enableOnAndroid
      scrollEventThrottle={16}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="interactive"
      nestedScrollEnabled
      {...props}
    />
  );
};

export default KeyboardAwareScrollView;
