import React from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { fontScale } from 'utils/dataFormat';

interface Props extends TextProps {
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  lineHeight?: number;
  color?: string;
}

const StyledText = styled.Text<Props>`
  font-size: ${props => (props.fontSize ? fontScale(props.fontSize) : 14)}px;
  font-weight: ${props => props.fontWeight || 'normal'};
  line-height: ${props =>
    props.lineHeight ? fontScale(props.lineHeight) : 14}px;
  color: ${props => props.color || '#000'};
`;

const Text: React.FC<Props> = ({ ...props }) => {
  return <StyledText {...props} accessibilityRole="text" />;
};

export default Text;
