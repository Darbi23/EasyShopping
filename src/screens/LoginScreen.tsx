import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const checkLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const storedEmail = user.email;
        const storedPassword = user.password;
        // Perform the login check here
        if (email === storedEmail && password === storedPassword) {
          // Login successful, navigate to the HomeScreen
          navigation.navigate('HomeTab');
        } else {
          Alert.alert('Incorrect email or password');
        }
      } else {
        Alert.alert('No user found');
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button title={'Login'} onPress={checkLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.switchText}>"Don't have an account? Register"</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  switchText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
  },
});

export default LoginScreen;
