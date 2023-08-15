import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [nameError, setNameError] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');

  const navigation: any = useNavigation();

  const handleRegister = async () => {
    let isValid = true;

    // Check name
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    // Check surname
    if (!surname) {
      setSurnameError('Surname is required');
      isValid = false;
    } else {
      setSurnameError('');
    }

    // Check phone number
    if (!phoneNumber) {
      setPhoneNumberError('Phone number is required');
      isValid = false;
    } else if (!/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError('Phone number should only contain numbers');
      isValid = false;
    } else {
      setPhoneNumberError('');
    }

    // Check email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Check password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Check password confirmation
    if (!passwordConfirmation) {
      setPasswordConfirmationError('Password confirmation is required');
      isValid = false;
    } else if (password !== passwordConfirmation) {
      setPasswordConfirmationError(
        'Password confirmation does not match password',
      );
      isValid = false;
    } else {
      setPasswordConfirmationError('');
    }

    // If any field is not valid, stop the registration process
    if (!isValid) {
      return;
    }

    // Save user data to async storage
    try {
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({name, surname, phoneNumber, email, password}),
      );
      Alert.alert('Registration Successful');
      setName('');
      setSurname('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert(
        'Registration Error',
        'There was an error while trying to save user data. Please try again.',
      );
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    if (!text) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
  };

  const handleSurnameChange = (text: string) => {
    setSurname(text);
    if (!text) {
      setSurnameError('Surname is required');
    } else {
      setSurnameError('');
    }
  };

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text);
    const phoneNumberRegex = /^[0-9]*$/;
    if (!text) {
      setPhoneNumberError('Phone number is required');
    } else if (!phoneNumberRegex.test(text)) {
      setPhoneNumberError('Phone number can only contain numbers');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!text) {
      setEmailError('Email is required');
    } else if (!emailRegex.test(text)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (!text) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordConfirmationChange = (text: string) => {
    setPasswordConfirmation(text);
    if (!text) {
      setPasswordConfirmationError('Password confirmation is required');
    } else if (password !== text) {
      setPasswordConfirmationError('Passwords do not match');
    } else {
      setPasswordConfirmationError('');
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          autoCapitalize="none"
          onChangeText={(text: string) => {
            setName(text);
            handleNameChange(text);
          }}
        />
        {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Surname"
          value={surname}
          autoCapitalize="none"
          onChangeText={(text: string) => {
            setSurname(text);
            handleSurnameChange(text);
          }}
        />
        {surnameError ? <Text style={styles.error}>{surnameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={(text: string) => {
            setPhoneNumber(text);
            handlePhoneNumberChange(text);
          }}
        />
        {phoneNumberError ? (
          <Text style={styles.error}>{phoneNumberError}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text: string) => {
            setEmail(text);
            handleEmailChange(text);
          }}
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text: string) => {
            setPassword(text);
            handlePasswordChange(text);
          }}
        />
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={passwordConfirmation}
          secureTextEntry={true}
          onChangeText={(text: string) => {
            setPasswordConfirmation(text);
            handlePasswordConfirmationChange(text);
          }}
        />
        {passwordConfirmationError ? (
          <Text style={styles.error}>{passwordConfirmationError}</Text>
        ) : null}

        <Button title="Register" onPress={handleRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchText}>
            "Already have an account? Login"
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    marginTop: 150,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 6,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  switchText: {
    marginTop: 10,
    textAlign: 'center',
    color: 'blue',
  },
  scrollView: {
    flex: 1,
  },
});

export default RegistrationScreen;
