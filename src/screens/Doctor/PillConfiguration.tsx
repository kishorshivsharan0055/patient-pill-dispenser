import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Divider, Menu, TextInput} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import {PillDetails} from '../../utils/types';

interface pill_configurationProps {
  navigation: any;
  route: {
    params: {
      id: string;
    };
  };
}

export const PillConfiguration: React.FC<pill_configurationProps> = ({
  navigation,
  route,
}) => {
  const [PillName, setPillName] = useState('');
  const [Qty, setQty] = useState('');
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [menuTitle, setmenuTitle] = useState('Select Time');
  const openMenu = () => setVisibleMenu(true);
  const closeMenu = () => setVisibleMenu(false);

  let [pills, setPills] = useState<Array<PillDetails>>([]);

  const getData = async () => {
    console.log('in getdata');
    await firestore()
      .collection('users')
      .doc(id)
      .get()
      .then(value => {
        if (value.data().pills != null) setPills(value.data().pills);
      });

    pills.map(value => {
      console.log(value.pill_name, value.quantity, value.timing);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const {id} = route.params;

  const savePillConfiguration = () => {
    pills.push({pill_name: PillName, quantity: Qty, timing: menuTitle});

    firestore()
      .collection('users')
      .doc(id)
      .update({
        pills,
      })
      .then(() => {
        Snackbar.show({
          text: 'Pill added',
          duration: Snackbar.LENGTH_SHORT,
        });
        setPillName('');
        setQty('');
        setmenuTitle('Select Time');
      });
  };

  return (
    <View style={styles.parent}>
      <Text style={{fontSize: 15, fontWeight: 'bold'}}>Set Pill Details</Text>

      <TextInput
        label="Pill Name"
        mode="outlined"
        value={PillName}
        style={styles.inputTextStyle}
        onChangeText={text => setPillName(text)}
        textContentType="name"
      />

      <TextInput
        label="Quantity"
        mode="outlined"
        value={Qty}
        keyboardType="number-pad"
        style={styles.inputTextStyle}
        onChangeText={text => setQty(text)}
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
              setmenuTitle('Morning');
              closeMenu();
            }}
            titleStyle={{color: 'purple'}}
            title="Morning"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setmenuTitle('Afternoon');
              closeMenu();
            }}
            titleStyle={{color: 'purple'}}
            title="Afternoon"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              setmenuTitle('Night');
              closeMenu();
            }}
            titleStyle={{color: 'purple'}}
            title="Night"
          />
        </Menu>
      </View>

      <Button
        style={{width: 350, marginTop: 30}}
        mode="contained"
        color="purple"
        onPress={savePillConfiguration}>
        Confirm
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: '100%',
    marginTop: 40,
    padding: 32,
  },
  inputTextStyle: {
    width: '100%',
    paddingBottom: 20,
  },
});
