import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import Snackbar from 'react-native-snackbar';
import {auth} from '../../../firebase-setup';

interface DoctorHomeProps {
  navigation: any;
}

export const DoctorHome: React.FC<DoctorHomeProps> = ({navigation}) => {
  let [data, setData] = useState<
    FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>
  >();

  const getData = async () => {
    const FieldPath = new firestore.FieldPath('role');

    await firestore()
      .collection('users')
      .where(FieldPath, '==', 'Patient')
      .get()
      .then(data => {
        setData(data);
        if (data.empty) {
          console.log('empty');
          return;
        } else {
          data.docs.map(value => {
            console.log(value.get('name'));
          });
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.parent}>
      <Text style={{fontSize: 18}}>Patients List</Text>

      <View style={{marginTop: 20, padding: 10}}>
        {data?.docs.map(value => (
          <TouchableOpacity
            key={value.id}
            onPress={() =>
              navigation.navigate('PatientInfo', {
                id: value.id,
              })
            }>
            <Card style={{padding: 15, margin: 5}}>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {value.get('name')}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      <FAB
        style={styles.fab}
        icon={require('../../assets/logout.png')}
        color="white"
        onPress={() => {
          Snackbar.show({
            text: 'Logged Out',
            duration: Snackbar.LENGTH_SHORT,
          });
          auth().signOut();
          navigation.replace('Login');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    padding: 10,
    paddingTop: 55,
    backgroundColor: 'white',
  },
  box: {
    flex: 1,
    padding: 10,
    elevation: 5,
    height: '30%',
  },
  fab: {
    position: 'absolute',
    margin: 5,
    right: 10,
    backgroundColor: 'purple',
    bottom: 20,
  },
});
