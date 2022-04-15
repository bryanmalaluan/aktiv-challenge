import React from 'react';
import { FlexAlignType, PressableProps } from 'react-native';
import styled from 'styled-components/native';

interface Props extends PressableProps {
  flexDirection?: 'column' | 'row';
  alignItems?: FlexAlignType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

const StyledPressable = styled.Pressable<Props>`
  flex-direction: ${props => props.flexDirection || 'column'};
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
`;

const Pressable: React.FC<Props> = ({ ...props }) => {
  return <StyledPressable {...props} accessibilityRole="button" />;
};

export default Pressable;
