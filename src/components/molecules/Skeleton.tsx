import React from 'react';
import { MotiView } from 'moti';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  height: number;
  width: number;
  marginLeft?: number;
  marginBottom?: number;
}

const Skeleton: React.FC<Props> = ({
  width,
  height,
  marginLeft = 0,
  marginBottom = 0,
}) => {
  return (
    <MotiView
      from={{
        opacity: 1,
      }}
      animate={{
        opacity: 0.4,
      }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 500,
      }}
      style={{
        height,
        width,
        marginLeft,
        marginBottom,
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          'rgba(218, 218, 218, 0.8)',
          'rgba(218, 218, 218, 0.5)',
          'rgba(218, 218, 218, 0.2)',
        ]}
        style={{ height: '100%', width: '100%' }}
      />
    </MotiView>
  );
};

export default Skeleton;
