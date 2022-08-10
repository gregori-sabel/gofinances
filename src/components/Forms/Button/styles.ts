import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler'
import { PropsWithChildren } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends PropsWithChildren<TouchableOpacityProps>{

}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  width: 100%;
  background-color: ${({theme}) => theme.colors.secondary};

  justify-content: center;
  align-items: center;
  
  padding: 18px;
  border-radius: 5px;
`
export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({theme}) => theme.colors.shape};


`