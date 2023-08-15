import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

type UserData = {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
};

const SettingsScreen = () => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);

  const navigation = useNavigation();

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData !== null) {
        const user: UserData = JSON.parse(userData);
        setUserInfo(user);
        setName(user.name);
        setSurname(user.surname);
        setPhoneNumber(user.phoneNumber);
        setEmail(user.email);
      }
    } catch (error) {
      console.error('Error while fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    if (userInfo && currentPassword === userInfo.password) {
      if (newPassword === confirmNewPassword) {
        const updatedUserInfo: UserData = {
          ...userInfo,
          name,
          surname,
          phoneNumber,
          email,
          password: newPassword,
        };
        try {
          await AsyncStorage.setItem('user', JSON.stringify(updatedUserInfo));
          setUserInfo(updatedUserInfo);
          setEditMode(false);
          Alert.alert('Success', 'Your profile has been updated.');
        } catch (error) {
          console.error('Error while updating user data:', error);
          Alert.alert(
            'Error',
            'There was an error while updating your profile.',
          );
        }
      } else {
        Alert.alert('Error', 'The new passwords do not match.');
      }
    } else {
      Alert.alert('Error', 'The current password is incorrect.');
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login', {});
  };

  const showLogoutConfirmation = () => {
    Alert.alert(
      'Logout',
      'Do you want to log out from the system?',
      [
        {text: 'Yes', onPress: handleLogout},
        {text: 'No', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profile}>
          <View style={styles.profileInfo}>
            <Icon name="user" size={26} color="#000" />
            <Text style={styles.heading}>Profile Info</Text>
          </View>
          {editMode ? (
            <>
              <Button title="Save" onPress={handleUpdate} />
              <Button title="Cancel" onPress={toggleEditMode} />
            </>
          ) : (
            <Button title="Edit" onPress={toggleEditMode} />
          )}
        </View>

        <View style={styles.userInfoContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Name:</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.value}>{name}</Text>
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Surname:</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                placeholder="Surname"
                value={surname}
                onChangeText={setSurname}
              />
            ) : (
              <Text style={styles.value}>{surname}</Text>
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            ) : (
              <Text style={styles.value}>{phoneNumber}</Text>
            )}
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email:</Text>
            {editMode ? (
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.value}>{email}</Text>
            )}
          </View>
        </View>
        {editMode ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
            />
          </>
        ) : null}
      </ScrollView>
      <View style={styles.logoutButtonContainer}>
        <Button
          title="Log out"
          onPress={showLogoutConfirmation}
          color="white"
          accessibilityLabel="Logout button"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderWidth: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userInfoContainer: {
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  logoutButtonContainer: {
    width: '40%',
    alignSelf: 'center',
    backgroundColor: '#f44336',
    borderRadius: 25,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  editBtn: {
    position: 'absolute',
    top: 70,
    right: 10,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
  },
  profileInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default SettingsScreen;
