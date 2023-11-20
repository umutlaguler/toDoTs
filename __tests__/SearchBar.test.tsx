import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import SearchBar from '../src/components/SearchBar';

test('renders task list correctly', async () => {

    const onSearchMock = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onSearch={onSearchMock}/>)

    const searchInput = getByPlaceholderText(' Search for plan');
    fireEvent.changeText(searchInput, 'example text');
    
    await waitFor(() => {
        expect(onSearchMock).toHaveBeenCalledWith('example text');
    });
  });
  