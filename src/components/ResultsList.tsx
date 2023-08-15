import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ResultsDetail from './ResultsDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultsList = ({results}: {results: any}) => {
  const navigation: any = useNavigation();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<any[]>([]);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    const favoritesData = await AsyncStorage.getItem('favorites');
    const favoritesArray = favoritesData ? JSON.parse(favoritesData) : [];
    setFavorites(favoritesArray.map((favorite: any) => favorite.id));
  };

  const handleToggleFavorite = async (item: any) => {
    let favoritesData = await AsyncStorage.getItem('favorites');
    let favoritesArray = favoritesData ? JSON.parse(favoritesData) : [];

    if (favoritesArray.some((favorite: any) => favorite.id === item.id)) {
      // Remove from favorites
      favoritesArray = favoritesArray.filter(
        (favorite: any) => favorite.id !== item.id,
      );
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setFavorites(favoritesArray.map((favorite: any) => favorite.id));
    } else {
      // Add to favorites
      favoritesArray.push(item);
      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
      setFavorites(prev => [...prev, item.id]);
    }
  };

  const addToShoppingList = async (item: any) => {
    let shoppingListData = await AsyncStorage.getItem('shoppingList');
    let shoppingListArray = shoppingListData
      ? JSON.parse(shoppingListData)
      : [];

    if (
      shoppingListArray.some((shoppingItem: any) => shoppingItem.id === item.id)
    ) {
      // Remove from favorites
      shoppingListArray = shoppingListArray.filter(
        (favorite: any) => favorite.id !== item.id,
      );
      await AsyncStorage.setItem(
        'shoppingList',
        JSON.stringify(shoppingListArray),
      );
      setShoppingList(
        shoppingListArray.map((shoppingItem: any) => shoppingItem.id),
      );
    } else {
      // Add to favorites
      shoppingListArray.push(item);
      await AsyncStorage.setItem(
        'shoppingList',
        JSON.stringify(shoppingListArray),
      );
      setShoppingList(prev => [...prev, item.id]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          const isFavorite = favorites.includes(item.id);
          const isShoppingListItem = shoppingList.includes(item.id);
          return (
            <TouchableOpacity
              style={styles.list}
              onPress={() => {
                navigation.navigate('ResultsShow', {id: item.id});
              }}>
              <ResultsDetail result={item} additionalData={false} />
              <TouchableOpacity
                style={styles.favoriteIcon}
                onPress={() => handleToggleFavorite(item)}>
                <Icon
                  name={isFavorite ? 'star' : 'star-o'}
                  size={35}
                  color={isFavorite ? 'white' : 'white'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => addToShoppingList(item)}
                style={{
                  width: 100,
                  height: 35,
                  borderRadius: 6,
                  backgroundColor: isShoppingListItem ? '#ffcc00' : 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: isShoppingListItem ? 'white' : 'black'}}>
                  {isShoppingListItem ? 'Added' : 'Add to cart'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 70,
  },
  container: {
    marginBottom: 10,
  },
  list: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  shoppingIcon: {
    position: 'absolute',
    top: 10,
    right: 50,
  },
  addToCart: {},
});

export default ResultsList;
