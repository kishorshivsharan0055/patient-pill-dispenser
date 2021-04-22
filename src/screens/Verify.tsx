import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Headline, TextInput} from 'react-native-paper';
import {auth} from '../../firebase-setup';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface VerifyProps {
  navigation: any;
  route: {
    params: {
      phone: string;
    };
  };
}

export const Verify: React.FC<VerifyProps> = ({navigation, route}) => {
  const [code, setCode] = useState('');
  const phoneNumber = route.params.phone;
  const [
    confirm,
    setConfirm,
  ] = useState<FirebaseAuthTypes.ConfirmationResult>();

  const signInWithPhoneNumber = async () => {
    await auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(res => {
        Snackbar.show({
          text: 'OTP is sent to your mobile number',
          duration: Snackbar.LENGTH_SHORT,
        });
        setConfirm(res);
      });
  };

  useEffect(() => {
    signInWithPhoneNumber();
  }, []);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .get()
      .then(user => {
        if (user.exists) {
          if (user.get('role') == 'Doctor') navigation.replace('DoctorHome');
          else navigation.navigate('Patient', {id: auth().currentUser?.uid});
        } else navigation.replace('Signup', {phone: phoneNumber});
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

  const confirmCode = async () => {
    if (confirm) {
      try {
        const res = await confirm.confirm(code);
        if (res) {
          Snackbar.show({
            text: 'Phone Verified',
            duration: Snackbar.LENGTH_SHORT,
          });
          getUser();
        }
      } catch (err) {
        if (auth().currentUser?.uid) {
          Snackbar.show({
            text: 'Phone Verified',
            duration: Snackbar.LENGTH_SHORT,
          });

          getUser();
        }
      }
    }
  };

  return (
    <View style={styles.parent}>
      <Headline style={styles.text}>Verify</Headline>

      <TextInput
        label="Enter OTP"
        mode="outlined"
        textContentType="telephoneNumber"
        style={{
          width: '100%',
          marginTop: 10,
        }}
        onChangeText={text => setCode(text)}
      />

      <Button
        mode="contained"
        style={{marginTop: 15}}
        onPress={() => {
          confirmCode();
        }}>
        VERIFY
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    justifyContent: 'center',
    padding: 32,
    marginTop: 40,
  },

  borderStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 1,
    color: 'red',
  },

  underlineStyleHighLighted: {
    borderColor: 'red',
  },

  text: {
    fontFamily: 'Poppins-Medium',
    fontWeight: 'bold',
  },
});

export default Verify;
