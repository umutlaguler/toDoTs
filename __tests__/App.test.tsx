import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import App from '../App';

test('renders task list correctly', async () => {
  const { getByText, getByTestId } = render(<App />);

  const openModalButton = getByTestId('openModal')
  fireEvent.press(openModalButton)
  // Ekleme işlemi
  const input = getByTestId("newMission");
  const addButton = getByText('Ekle');

  fireEvent.changeText(input, 'Yeni görev');
  fireEvent.press(addButton);

  // Görevin listeye eklenip eklenmediğini kontrol et
  await waitFor(() => getByText('Yeni görev'), { timeout: 3000 });

  // Silme işlemi
  const deleteButton = getByTestId('deleteButton-1'); // Örnek olarak, 1. görevin 'Sil' butonunu seçiyoruz
  fireEvent.press(deleteButton);

  // Görevin silinip silinmediğini kontrol et
  // await waitFor(() => expect(queryByText('Yeni görev')).toBeNull(), { timeout: 3000 });
});
