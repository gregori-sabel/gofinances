
import React, { useState, useEffect } from 'react';
import { Modal, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form'
import { useNavigation, NavigationProp, ParamListBase, } from '@react-navigation/native'

import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { CategorySelect } from '../CategorySelect'

import { Container, Header, Title, Form, Fields, TransactionsTypes } from './styles';
import { useAuth } from '../../hooks/auth';

export type FormData = {
  [name: string]: any;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome e obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Valor e obrigatório')
})

export function Register() {
  const [ transactionType, setTransactionType ] = useState<'positive' | 'negative' | ''>('');
  const [ categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  const { user } = useAuth();

  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria',
  }) 

  const { navigate }: NavigationProp<ParamListBase> = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  async function handleRegister(form: FormData){
    if(!transactionType) 
      return Alert.alert('Selecione o tipo de transação')

    if(category.key === 'category') 
      return Alert.alert('Selecione a categoria')      


    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try{
      const dataKey = `@gofinances:transactions_user:${user.id}`;      
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : []

      const dataFormatted = [
        ...currentData,
        newTransaction
      ];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigate('Listagem')

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar");
    }
  }


  return(
    <TouchableWithoutFeedback 
      onPress={Keyboard.dismiss} 
      containerStyle={{ flex:1 }}
      style={{ flex: 1}} 
    >
      <Container>

        <Header>
          <Title>Cadastro</Title>
        </Header>
        
        <Form>
          <Fields>
            <InputForm 
              name="name"
              control={control}
              placeholder='Nome' 
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm 
              name="amount"
              control={control}
              placeholder='Preço' 
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton  
                type='up' 
                title='Income'
                onPress={() => handleTransactionTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton  
                type='down' 
                title='Outcome'
                onPress={() => handleTransactionTypeSelect('negative')}
                isActive={transactionType === 'negative'}
                />
            </TransactionsTypes>
            
            <CategorySelectButton 
              title={category.name}             
              onPress={handleOpenSelectCategoryModal}
              />

          </Fields>

          <Button 
            title='Enviar'
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  );
}