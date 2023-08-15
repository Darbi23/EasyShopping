import React, {useState} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResultsDetail from '../components/ResultsDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import EventRegister from '../components/EventRegister';

const FavoritesScreen = () => {
  interface FavoriteItem {
    id: number;
  }

  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchFavorites = async () => {
        try {
          const favoritesData = await AsyncStorage.getItem('favorites');
          const favoritesArray = favoritesData ? JSON.parse(favoritesData) : [];
          setFavorites(favoritesArray);
        } catch (error) {
          console.error('Error while retrieving favorites:', error);
        }
      };

      fetchFavorites();
    }, []),
  );

  const handleRemoveFavorite = async (id: number) => {
    const newFavorites = favorites.filter(item => item.id !== id);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);

    EventRegister.emit('itemDeleted', id);
  };

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <ResultsDetail result={item} additionalData={false} />
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => handleRemoveFavorite(item.id)}>
                <Icon name="trash" size={35} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noFavoritesText}>No favorites found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  noFavoritesText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    marginBottom: 10,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
  },
  removeIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default FavoritesScreen;
