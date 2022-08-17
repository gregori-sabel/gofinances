import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler'
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";


export const Button = styled(TouchableOpacity)`
  height: ${RFValue(56)}px;

  background-color: ${({ theme }) => theme.colors.shape};

  border-radius: 5px;

  flex-direction: row;
  align-items: center;

  margin-bottom: 20px;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;

  padding: ${RFValue(16)}px;
  border-right-color: ${({ theme }) => theme.colors.background};
  border-right-width: 1px;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;

  font-family: ${({ theme }) => theme.fonts.regular};  
  font-size: ${RFValue(14)}px;
`;
