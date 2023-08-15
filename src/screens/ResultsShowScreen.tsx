import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import ResultsDetail from '../components/ResultsDetail';
import {useRoute} from '@react-navigation/native';

const ResultsShowScreen = () => {
  const route = useRoute();
  const itemData = route.params?.itemData;
  return (
    <ScrollView>
      <View style={styles.flex}>
        <ResultsDetail result={itemData} additionalData />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  flex: {
    marginHorizontal: 20,
    marginTop: 40,
  },
});

export default ResultsShowScreen;
