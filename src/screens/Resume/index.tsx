import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HistoryCard } from "../../components/HistoryCard";
import { VictoryPie } from 'victory-native'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useTheme } from "styled-components";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from './style'
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { ActivityIndicator } from "react-native";

interface TransactionData {  
  type: 'positive' | 'negative'
  name: string;
  amount: string;
  category: string; 
  date: string;
}

interface CategoryData{
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ selectedDate, setSelectedDate] = useState(new Date())
  const [ totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const { user } = useAuth();
  const theme = useTheme();
  const bottomTabBarHeight = useBottomTabBarHeight();

  function handleDateChange(action: 'next' | 'prev') {
    if(action === 'next'){
      setSelectedDate(addMonths(selectedDate, 1))
    } else {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;     
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : []

    const expenses = responseFormatted
      .filter((response:TransactionData) => 
        response.type === 'negative' &&
        new Date(response.date).getMonth() === selectedDate.getMonth() &&
        new Date(response.date).getFullYear() === selectedDate.getFullYear() 
      );


    const expensesTotal = expenses
      .reduce((acc: number, expenses: TransactionData ) => {
        return acc + Number(expenses.amount)
      },0);


    const totalByCategory: CategoryData[] = [];
    categories.forEach(category => {
      let categorySum = 0

      expenses.forEach((expense: TransactionData) => {
        if(expense.category === category.key){
          categorySum += Number(expense.amount)
        }        
      });

      if (categorySum){
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })        
      }
      
    })
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }
  

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]));

  return(
    <Container>

          <Header>
            <Title>Resumo por categoria</Title>
          </Header>
      { isLoading 
      ? <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large"/>
        </LoadContainer> 
      : 
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: bottomTabBarHeight
          }}
        >

          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('prev')}>
              <MonthSelectIcon name="chevron-left"/>
            </MonthSelectButton>

            <Month>
              { format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right"/>
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie 
              data={totalByCategories}
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: { 
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>
          {
            totalByCategories.map(item => (
              <HistoryCard 
                key={item.key}
                title={item.name}
                color={item.color}
                amount={item.totalFormatted}
              />          
            ))
          }
        </Content>
      }
    </Container>
  )
}