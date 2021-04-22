import React, {useState} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {TextInput, Button, Menu, Divider} from 'react-native-paper';
import {auth} from '../../firebase-setup';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

interface SignupProps {
  navigation: any;
  route: {
    params: {
      phone: string;
    };
  };
}

export const Signup: React.FC<SignupProps> = ({navigation, route}) => {
  const [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [age, setAge] = useState('');
  let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let regNames = /^[a-z ,.'-]+$/i;

  const [visibleMenu, setVisibleMenu] = useState(false);
  const [menuTitle, setmenuTitle] = useState('Select Role');
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  const [visibleMenu2, setVisibleMenu2] = useState(false);
  const [menuTitle2, setmenuTitle2] = useState('Select Gender');
  const openMenu2 = () => setVisibleMenu2(true);
  const closeMenu2 = () => setVisibleMenu2(false);

  const register = async () => {
    email = email.trim();
    if (name == '' || email == '') {
      Snackbar.show({
        text: 'Please fill all the above details',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    if (regEmail.test(email) == false) {
      Snackbar.show({
        text: 'Invalid Email ID!!!',
      });
      return;
    }

    if (regNames.test(name) == false) {
      Snackbar.show({
        text: 'Dont use special charaters',
        duration: Snackbar.LENGTH_SHORT,
      });
      return;
    }

    firestore()
      .collection('users')
      .doc(auth().currentUser?.uid)
      .set({
        name: name,
        email: email,
        role: menuTitle,
        age: age,
        gender: menuTitle2,
      })
      .then(() => {
        if (menuTitle == 'Doctor') navigation.replace('DoctorHome');
        else navigation.replace('Patient', {id: auth().currentUser?.uid});
      });
  };

  return (
    <View style={styles.parent}>
      <View style={{alignItems: 'center'}}></View>
      <View style={{marginTop: 30}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'center',
            marginBottom: 10,
          }}>
          Register
        </Text>

        <TextInput
          label="Name"
          mode="outlined"
          style={styles.inputTextStyle}
          onChangeText={text => setName(text)}
          textContentType="name"
        />

        <TextInput
          label="Email ID"
          mode="outlined"
          keyboardType="email-address"
          style={styles.inputTextStyle}
          onChangeText={text => setEmail(text)}
          textContentType="emailAddress"
        />

        <View style={{alignSelf: 'center'}}>
          <Menu
            visible={visibleMenu}
            onDismiss={closeMenu}
            contentStyle={{width: 350, backgroundColor: 'white'}}
            anchor={
              <Button
                style={{width: 350}}
                mode="contained"
                color="purple"
                onPress={openMenu}>
                {menuTitle}
              </Button>
            }>
            <Menu.Item
              onPress={() => {
                setmenuTitle('Doctor');
                closeMenu();
              }}
              titleStyle={{color: 'purple'}}
              title="Doctor"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setmenuTitle('Patient');
                closeMenu();
              }}
              titleStyle={{color: 'purple'}}
              title="Patient"
            />
          </Menu>
        </View>

        {menuTitle == 'Patient' && (
          <View>
            <TextInput
              label="Age"
              mode="outlined"
              style={styles.inputTextStyle}
              onChangeText={text => setAge(text)}
              keyboardType="number-pad"
            />

            <View style={{alignSelf: 'center'}}>
              <Menu
                visible={visibleMenu2}
                onDismiss={closeMenu2}
                contentStyle={{width: 350, backgroundColor: 'white'}}
                anchor={
                  <Button
                    style={{width: 350}}
                    mode="contained"
                    color="purple"
                    onPress={openMenu2}>
                    {menuTitle2}
                  </Button>
                }>
                <Menu.Item
                  onPress={() => {
                    setmenuTitle2('Male');
                    closeMenu2();
                  }}
                  titleStyle={{color: 'purple'}}
                  title="Male"
                />
                <Divider />
                <Menu.Item
                  onPress={() => {
                    setmenuTitle2('Female');
                    closeMenu2();
                  }}
                  titleStyle={{color: 'purple'}}
                  title="Female"
                />
              </Menu>
            </View>
          </View>
        )}

        <Button
          mode="contained"
          color="purple"
          style={{marginTop: 10}}
          onPress={() => {
            register();
          }}>
          SUBMIT
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
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  logo: {
    width: 260,
    height: 90,
  },

  inputTextStyle: {
    width: '100%',
    paddingBottom: 20,
  },

  text: {
    fontFamily: 'Poppins-Medium',
  },
});

export default Signup;
