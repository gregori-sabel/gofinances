import React from "react";
import { Text } from 'react-native'

import { Container, Header, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper
 } from './styles'

export function Dashboard() {
  return(
    <Container >
      <Header>

        <UserWrapper>
          <UserInfo>
            <Photo 
              source={{ uri: 'https://avatars.githubusercontent.com/u/55760643?v=4'}}
            />
            <User>
              <UserGreeting>Ola, </UserGreeting>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>
        </UserWrapper>
        
      </Header>
    </Container>
  )
}
