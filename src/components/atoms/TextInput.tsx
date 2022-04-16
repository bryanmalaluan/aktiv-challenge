import React from 'react';
import { TextInputProps } from 'react-native';
import styled from 'styled-components/native';

export type AutoCapitalizeType = 'none' | 'sentences' | 'words' | 'characters';

export type TextContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode';

interface Props extends TextInputProps {
  fontSize?: number;
  lineHeight?: number;
  autoCapitalize?: AutoCapitalizeType;
  textContentType?: TextContentType;
}

const StyledTextInput = styled.TextInput<Props>`
  flex: 1;
  height: 100%;
  font-size: ${props => props.fontSize || 14}px;
  line-height: ${props => props.lineHeight || 16}px;
  font-weight: 500;
  padding-top: 0px;
  padding-bottom: 0px;
`;

const TextInput: React.FC<Props> = ({ ...props }) => {
  return <StyledTextInput {...props} accessibilityRole="none" />;
};

export default TextInput;
