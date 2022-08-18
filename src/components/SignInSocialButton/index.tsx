import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg';
import { TouchableOpacityProps } from "react-native";

import {
  Button,
  ImageContainer,
  Text,
} from './styles'

interface Props extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInSocialButton({
  title,
  svg: Svg,
  ...rest
}: Props) {

  return(
    <Button {...rest} activeOpacity={0.8}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Text>
        {title}
      </Text>
    </Button>
  );
}