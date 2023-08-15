import React from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SearchBarProps {
  term: string;
  onTermChange: (newTerm: string) => void;
  onSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  term,
  onTermChange,
  onSubmit,
}) => {
  return (
    <View style={styles.searchView}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.searchText}
        placeholder="Search"
        value={term}
        onChangeText={onTermChange}
      />
      <TouchableOpacity style={styles.searchBtn} onPress={onSubmit}>
        <Icon style={styles.searchIcon} name="search" size={26} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 20,
    borderRadius: 20,
    height: 40,
    alignItems: 'center',
    overflow: 'hidden',
    marginVertical: 20,
  },
  searchText: {
    fontSize: 18,
    color: '#000',
    marginLeft: 20,
    width: '80%',
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  searchBtn: {
    height: 30,
    alignItems: 'center',
    borderRadius: 6,
  },
  searchBtnText: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default SearchBar;
