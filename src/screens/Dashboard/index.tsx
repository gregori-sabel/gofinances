import React from "react";

import { getBottomSpace } from 'react-native-iphone-x-helper'

import { Transactions, Title, Container, Header, HighlightCards, Icon, Photo, User, UserGreeting, UserInfo, UserName, UserWrapper, TransactionList
 } from './styles'
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {

  const data: DataListProps =[
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { name: 'Vendas', icon: 'dollar-sign' },
      date: "13/04/2020",
    },
    {
      id: '2',
      type: 'negative',
      title: "Desenvolvimento de site",
      amount: "R$ 7.000,00",
      category: { name: 'Alimentação', icon: 'coffee' },
      date: "13/04/2020",
    },
    {
      id: '3',
      type: 'negative',
      title: "aluguel",
      amount: "R$ 10.000,00",
      category: { name: 'Casa', icon: 'shopping-bag' },
      date: "13/04/2020",
    },
  ]

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

      <HighlightCards>
        <HighlightCard 
          type="up"
          title="Entradas" 
          amount="R$ 17.400,00" 
          lastTransaction="Última entrada dia 13 de agosto"
        />
        <HighlightCard 
          type="down"
          title="Saídas" 
          amount="R$ 1.259,00" 
          lastTransaction="Última transação ontem"
        />
        <HighlightCard 
          type="total"
          title="Total" 
          amount="R$ 16.141,00" 
          lastTransaction="Última transação ontem"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}  
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item}/> }
        />
          

      </Transactions>

    </Container>
  )
}
