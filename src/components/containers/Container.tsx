import React from 'react';
import { FlexAlignType } from 'react-native';
import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface Props extends ViewProps {
  width?: string | number;
  height?: string | number;
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

const StyledView = styled.View<Props>`
  flex: 1;
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  background-color: ${props => props.backgroundColor || '#fff'};
`;

const Container: React.FC<Props> = ({ ...props }) => {
  return <StyledView {...props} accessibilityRole="none" />;
};

export default Container;
