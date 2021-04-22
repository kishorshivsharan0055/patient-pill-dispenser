import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';

type loginProps = {
  navigation: any;
};

const Login: React.FC<loginProps> = ({navigation}) => {
  const [phone, setPhone] = useState('');
  let reg = /^[0-9\b]+$/;

  const signInWithPhoneNumber = async () => {
    if (phone == '') {
      Snackbar.show({
        text: 'Fill in the phone number',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }

    if (phone.length == 10 && reg.test(phone) == true) {
      navigation.replace('Verify', {
        phone: '+91' + phone,
      });
    } else {
      Snackbar.show({
        text: 'Fill the valid phone number',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.logo}>Dispenser System</Text>

      <View style={{marginTop: 30}}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: 'Poppins-Medium',
          }}>
          Login
        </Text>

        <TextInput
          label="Phone No"
          mode="outlined"
          textContentType="telephoneNumber"
          style={{
            width: '100%',
            marginTop: 10,
          }}
          onChangeText={text => setPhone(text)}
        />

        <Button
          mode="contained"
          color="purple"
          style={{marginTop: 15, height: 45}}
          onPress={() => {
            signInWithPhoneNumber();
          }}>
          Get OTP
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    justifyContent: 'center',
    padding: 32,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  logo: {
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
  },
});

export default Login;
