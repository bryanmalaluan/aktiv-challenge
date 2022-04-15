import React from 'react';
import { MotiView } from 'moti';
import Text from 'components/atoms/Text';

interface Props {
  title: string;
  value: string;
  delay?: number;
}

const AnimatedDetails: React.FC<Props> = ({ title, value, delay = 400 }) => {
  return (
    <MotiView
      from={{
        opacity: 0,
        translateX: -10,
      }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      transition={{
        type: 'timing',
        duration: 1000,
        delay,
      }}
      style={{ width: '100%', paddingBottom: 16 }}
    >
      <Text fontWeight="500" style={{ marginBottom: 4 }}>
        {title}
      </Text>

      <Text fontSize={18} lineHeight={22} fontWeight="bold">
        {value}
      </Text>
    </MotiView>
  );
};

export default AnimatedDetails;
