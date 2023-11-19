import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { PhoneHeight, PhoneWidth } from '../constants/config';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search for plan"
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: PhoneHeight * 0.05,
    width: PhoneWidth * 0.9,
    borderColor: 'gray',
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: PhoneHeight * 0.02,
  },
});

export default SearchBar;
