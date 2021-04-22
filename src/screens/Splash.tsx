import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {auth} from '../../firebase-setup';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

interface SplashProps {
  navigation: any;
}

export const Splash: React.FC<SplashProps> = ({navigation}) => {
  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .get()
      .then(user => {
        if (user.exists) {
          if (user.get('role') == 'Doctor') navigation.replace('DoctorHome');
          else
            navigation.replace('Patient', {
              id: auth().currentUser?.uid.toString(),
            });
        } else
          navigation.replace('Signup', {
            phone: auth().currentUser?.phoneNumber,
          });
      })
      .catch(err => {
        if (err) {
          Snackbar.show({
            text: 'Some Error Occured',
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      });
  };

  setTimeout(() => {
    if (auth().currentUser?.uid != null) {
      getUser();
    } else {
      navigation.replace('Login');
    }
  }, 2000);

  return (
    <View style={styles.parent}>
      <Text style={styles.logo}>Dispenser System</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 35,
    fontFamily: 'Roboto-Medium',
    fontWeight: 'bold',
  },
});
