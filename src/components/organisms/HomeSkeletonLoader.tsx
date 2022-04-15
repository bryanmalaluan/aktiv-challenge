import React from 'react';
import Skeleton from 'components/molecules/Skeleton';
import Row from 'components/containers/Row';

const SPACER = 2;

interface Props {
  count?: number;
  height: number;
  width: number;
}

const HomeSkeletonLoader: React.FC<Props> = ({ count = 6, height, width }) => {
  return (
    <Row
      style={{
        width: '100%',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {Array.from({ length: count }).map((_, index) => {
        return (
          <Skeleton
            key={`skeleton-${index}`}
            height={height}
            width={width}
            marginLeft={index % 2 === 1 ? SPACER : 0}
            marginBottom={4}
          />
        );
      })}
    </Row>
  );
};

export default HomeSkeletonLoader;
