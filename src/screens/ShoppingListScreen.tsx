import React, {useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResultsDetail from '../components/ResultsDetail';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import EventRegister from '../components/EventRegister';

const ShoppingListScreen = () => {
  interface ShoppingListItem {
    id: number;
  }

  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchShoppingList = async () => {
        try {
          const shoppingListData = await AsyncStorage.getItem('shoppingList');
          const shoppingListArray = shoppingListData
            ? JSON.parse(shoppingListData)
            : [];
          setShoppingList(shoppingListArray);
        } catch (error) {
          console.error('Error while retrieving Shoppiing list:', error);
        }
      };

      fetchShoppingList();
    }, []),
  );

  const EmptyShoppingList = () => {
    setShoppingList([]);
  };

  const showLogoutConfirmation = () => {
    Alert.alert(
      'Buy Item(s)',
      'Are you sure you want to buy?',
      [
        {text: 'Yes', onPress: EmptyShoppingList},
        {text: 'No', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const handleRemoveShoppingList = async (id: number) => {
    const newShoppingList = shoppingList.filter(item => item.id !== id);
    await AsyncStorage.setItem('shoppingList', JSON.stringify(newShoppingList));
    setShoppingList(newShoppingList);

    EventRegister.emit('itemDeleted', id);
  };
  return (
    <View style={styles.container}>
      {shoppingList.length > 0 ? (
        <FlatList
          data={shoppingList}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <ResultsDetail result={item} additionalData={false} />
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => handleRemoveShoppingList(item.id)}>
                <Icon name="trash" size={35} color="#000" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noFavoritesText}>Shopping list is empty</Text>
      )}
      <View style={styles.logoutButtonContainer}>
        {shoppingList.length > 0 ? (
          <Button
            title="Buy"
            onPress={showLogoutConfirmation}
            color="white"
            accessibilityLabel="Logout button"
          />
        ) : null}
      </View>
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
    bottom: 15,
    right: 20,
  },
  logoutButtonContainer: {
    width: '30%',
    alignSelf: 'center',
    backgroundColor: 'green',
    borderRadius: 25,
    marginVertical: 20,
  },
});

export default ShoppingListScreen;
