import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

let min = 10.0;
let max = 100.0;
let randomValue: String;

const ResultsDetail = ({
  result,
  additionalData,
}: {
  result: any;
  additionalData: boolean;
}) => {
  const navigation: any = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          randomValue = (Math.random() * (max - min) + min).toFixed(2);
          navigation.navigate('ResultsShow', {itemData: result});
        }}>
        <Image style={styles.image} source={{uri: result.image_url}} />
      </TouchableOpacity>
      <Text style={styles.name}>{result.name}</Text>

      {additionalData ? (
        <>
          <Text style={styles.name}>phone: {result.phone}</Text>
          <Text style={styles.name}>rating: {result.rating}</Text>
          <Text style={styles.name}>Price: {randomValue} $</Text>
          <Text style={styles.name}>
            Latitude: {result.coordinates.latitude}
          </Text>
          <Text style={styles.name}>
            Longitude: {result.coordinates.longitude}
          </Text>
          <Text style={styles.name}>review count: {result.review_count}</Text>
          <Text style={styles.name}>Website: {result.url}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 2,
  },
  name: {
    fontWeight: '700',
    fontSize: 18,
    marginVertical: 10,
  },
});

export default ResultsDetail;
