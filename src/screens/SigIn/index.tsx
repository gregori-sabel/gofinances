import React from 'react'
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SigInTitle,
  Footer,
  FooterWrapper,
} from './styles';

// ID de cliente: 1087412212408-0ua9ok9rf47jglsba5okjsn8ec95b71u.apps.googleusercontent.com
// chave secreta: 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

export function SignIn() {
  const { signInWithGoogle } = useAuth();

  async function handleSignInWithGoogle(){
    try{
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google');
    }
  }
  
  return(
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SigInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SigInTitle>
      </Header>
        
        <Footer>
          <FooterWrapper>
            <SignInSocialButton 
              title='Entrar com Google'
              svg={GoogleSvg}
              onPress={handleSignInWithGoogle}
            />
            <SignInSocialButton 
              title='Entrar com Apple'
              svg={AppleSvg}
            />
            

          </FooterWrapper>
        </Footer>
    </Container>
  );
}