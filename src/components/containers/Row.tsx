import React from 'react';
import { FlexAlignType } from 'react-native';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface Props extends ViewProps {
  alignItems?: FlexAlignType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  backgroundColor?: string;
}

const StyledRow = styled.View<Props>`
  flex-direction: row;
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  background-color: ${props => props.backgroundColor || '#fff'};
`;

const Row: React.FC<Props> = ({ ...props }) => {
  return <StyledRow {...props} accessibilityRole="none" />;
};

export default Row;
