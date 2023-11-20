import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import HomePage from '../src/screens/HomePage';
//to avoid async storage import fail with test jest
jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

test('renders task list correctly', async () => {
  
  const { getByText, getByTestId } = render(<HomePage />);

  const openModalButton = getByTestId('openModal')
  fireEvent.press(openModalButton)

  //test select priority 
  const priorityButton3 = getByTestId('priority3')
  fireEvent.press(priorityButton3)
  const priorityButton2 = getByTestId('priority2')
  fireEvent.press(priorityButton2)
  const priorityButton1 = getByTestId('priority1')
  fireEvent.press(priorityButton1)

  //test adding process
  const input = getByTestId("newMission");
  const addButton = getByTestId('ekle');

  fireEvent.changeText(input, 'Yeni görev');
  fireEvent.press(addButton);

  // Görevin listeye eklenip eklenmediğini kontrol et
  await waitFor(() => getByText('Yeni görev'), { timeout: 3000 });

  // Silme işlemi
  const deleteButton = getByTestId('deleteButton-2'); // 1 + 1 id for any delete button of task
  fireEvent.press(deleteButton);

});
