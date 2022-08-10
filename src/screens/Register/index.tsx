
import React, { useState } from 'react';
import { Modal, Keyboard, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'

import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { CategorySelect } from '../CategorySelect'

import { Container, Header, Title, Form, Fields, TransactionsTypes } from './styles';

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
})

export function Register() {
  const [ transactionType, setTransactionType ] = useState<'up' | 'down' | ''>('');
  const [ categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria',
  }) 

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FormData){
    if(!transactionType) 
      return Alert.alert('Selecione o tipo de transação')

    if(category.key === 'category') 
      return Alert.alert('Selecione a categoria')      


    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
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
                onPress={() => handleTransactionTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton  
                type='down' 
                title='Outcome'
                onPress={() => handleTransactionTypeSelect('down')}
                isActive={transactionType === 'down'}
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