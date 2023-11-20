import React from 'react';
import { StyleSheet, TextInput, View, Image } from 'react-native';
import { PhoneHeight, PhoneWidth } from '../constants/config';

interface SearchBarProps {
  onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <View style = {styles.container}> 
        <Image
            style={styles.searchLogo}
            source={require('../../assets/search.png')}
        />
        <TextInput
            style={styles.input}
            placeholder=" Search for plan"
            onChangeText={onSearch}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: PhoneWidth * 0.9,
    alignSelf:'center',
    justifyContent: 'center'
  },
  input: {
    height: PhoneHeight * 0.05,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: PhoneHeight * 0.02,
  },
  searchLogo: {
    width: 20,
    height: 20,
    marginTop: PhoneHeight * 0.02,
    marginRight: 5
  }
});

export default SearchBar;
