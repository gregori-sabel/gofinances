import React, { useState } from 'react';
import { Container, Header, Title, Form, Fields, TransactionsTypes } from './styles';
import { Modal } from 'react-native';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { CategorySelect } from '../CategorySelect'

export function Register() {
  const [ transactionType, setTransactionType ] = useState<'up' | 'down' | ''>('');
  const [ categoryModalOpen, setCategoryModalOpen] = useState(false);

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  return(
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />

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
          
          <CategorySelectButton title='Category' />

        </Fields>

        <Button title='Enviar' />
      </Form>

      <Modal visible={false}>
        <CategorySelect />
      </Modal>

    </Container>
  );
}