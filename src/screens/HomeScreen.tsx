import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from 'react-native';
import useResults from '../hooks/useResults';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import EventRegister from '../components/EventRegister';

const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [searchApi, results, errorMsg] = useResults();
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(10);

  const loadMore = () => {
    setOffset(prevOffset => prevOffset + 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await searchApi(term, offset);
      setIsLoading(false);
    };

    fetchData();

    let listener: any = null;

    listener = EventRegister.addEventListener('itemDeleted', async () => {
      fetchData();
    });

    return () => {
      if (listener) {
        EventRegister.removeEventListener(listener);
      }
    };
  }, [term, offset]);

  useEffect(() => {
    if (errorMsg) {
      Alert.alert('Error', errorMsg);
    }
  }, [errorMsg]);

  return (
    <>
      <View style={{flex: 1}}>
        <SearchBar
          term={term}
          onTermChange={setTerm}
          onSubmit={() => searchApi(term)}
        />

        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : results && results.length > 0 ? (
          <>
            <ResultsList results={results} />
          </>
        ) : (
          <View style={styles.noResultsContainer}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/6134/6134065.png',
              }}
              style={styles.noResultsImage}
            />
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        )}
      </View>
      <Button title="Load More" onPress={loadMore}></Button>
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  noResultsText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'red',
  },
  loadMore: {},
});

export default HomeScreen;
