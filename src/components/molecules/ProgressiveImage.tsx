import React from 'react';
import { Animated } from 'react-native';
import FastImage, {
  FastImageProps,
  OnProgressEvent,
} from 'react-native-fast-image';
import Pressable from 'components/atoms/Pressable';
import { colors } from 'utils/theme';

const AnimatedImage = Animated.createAnimatedComponent(FastImage);

interface Props extends FastImageProps {
  disabled?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: string;
  onPress?: () => void;
}

const ProgressiveImage: React.FC<Props> = ({
  disabled = true,
  width = 200,
  height = 200,
  backgroundColor = colors.gray,
  onPress,
  ...props
}) => {
  const opacity = React.useRef<Animated.Value>(new Animated.Value(1)).current;
  const loadingImage = React.useRef<boolean>(false);

  /** image is still loading, apply opacity animation once image is loaded */
  const onProgress = React.useCallback(({ nativeEvent }: OnProgressEvent) => {
    if (!loadingImage.current) {
      loadingImage.current = true;
      opacity.setValue(0);
    }

    if (nativeEvent.loaded / nativeEvent.total >= 1) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  return (
    <Pressable
      disabled={disabled}
      style={{ width, height, backgroundColor, overflow: 'hidden' }}
      onPress={onPress}
    >
      <AnimatedImage
        {...props}
        style={{ width, height, backgroundColor, opacity }}
        onProgress={onProgress}
      />
    </Pressable>
  );
};

const arePropsEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.source === nextProps.source;
};

export default React.memo(ProgressiveImage, arePropsEqual);
