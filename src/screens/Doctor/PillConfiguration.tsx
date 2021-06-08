import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Checkbox, TextInput} from 'react-native-paper';
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

  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);

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
    let timings = '';
    if (checked1) timings += ' Morning ';
    if (checked2) timings += ' Afternoon ';
    if (checked3) timings += ' Night ';

    pills.push({pill_name: PillName, quantity: Qty, timing: timings});

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

      <View>
        <Checkbox.Item
          label="Morning"
          color="purple"
          status={checked1 ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked1(!checked1);
          }}
        />

        <Checkbox.Item
          label="Afternoon"
          color="purple"
          status={checked2 ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked2(!checked2);
          }}
        />

        <Checkbox.Item
          label="Night"
          color="purple"
          status={checked3 ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked3(!checked3);
          }}
        />
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
