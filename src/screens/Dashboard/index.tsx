import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from 'styled-components'

import { useFocusEffect } from '@react-navigation/native'

import { 
  Transactions, 
  Title, 
  Container, 
  Header, 
  HighlightCards, 
  Icon, 
  Photo, 
  User, 
  UserGreeting, 
  UserInfo, 
  UserName, 
  UserWrapper, 
  TransactionList,
  LoadContainer
} from './styles'
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ transactions, setTransactions ] = useState<DataListProps[]>([])
  const [ highlightData, setHighlightData ] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ){
    const lastTransaction = Math.max.apply(Math , collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime()))
  
      // return `${lastTransaction}`
      return Intl
      .DateTimeFormat('pt-BR',{
        day: '2-digit',
        month: 'long',
        // year: '2-digit'
      }).format(new Date(lastTransaction));
  }
  
  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensesTotal = 0;
    
    const transactionsFormatted: DataListProps[] = transactions
    .map( (item: DataListProps) => {

      if(item.type === 'positive'){
        entriesTotal += Number(item.amount)
      } else {
        expensesTotal += Number(item.amount)
      }

      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR',{
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
    });
    
    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionExpenses}` 
  

    const total = entriesTotal - expensesTotal

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      expenses: {
        amount: expensesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionExpenses}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);
  
  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return(
    <Container >
      
      { isLoading 
        ? <LoadContainer>
            <ActivityIndicator color={theme.colors.primary} size="large"/>
          </LoadContainer> 
        : <>
          < Header>

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
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HighlightCard 
              type="down"
              title="Saídas" 
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lastTransaction}
            />
            <HighlightCard 
              type="total"        
              title="Total" 
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}  
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TransactionCard data={item}/> }
            />
              

          </Transactions>

        </>}

    </Container>
  )
}
