import React from "react";
import { Feather } from '@expo/vector-icons'

import { Container, Header, HightlightCards, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper
 } from './styles'
import { HightlightCard } from "../../components/HighlightCard";

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

          <Icon name='power'/>

        </UserWrapper>
      </Header>

      <HightlightCards>
        <HightlightCard 
          type="up"
          title="Entradas" 
          amount="R$ 17.400,00" 
          lastTransaction="Última entrada dia 13 de agosto"
        />
        <HightlightCard 
          type="down"
          title="Saídas" 
          amount="R$ 1.259,00" 
          lastTransaction="Última transação ontem"
        />
        <HightlightCard 
          type="total"
          title="Total" 
          amount="R$ 16.141,00" 
          lastTransaction="Última transação ontem"
        />
      </HightlightCards>

    </Container>
  )
}
