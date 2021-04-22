import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FAB} from 'react-native-paper';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import database, {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import {PillDetails} from '../utils/types';
import {auth} from '../../firebase-setup';
import Snackbar from 'react-native-snackbar';

interface PatientInfoProps {
  route: {
    params: {
      id: string;
    };
  };
  navigation: any;
}

export const Patient: React.FC<PatientInfoProps> = ({navigation, route}) => {
  const {id} = route.params;
  let [data, setData] = useState<
    FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
  >();
  console.log(id);
  let [
    parameters,
    setParameters,
  ] = useState<FirebaseDatabaseTypes.DataSnapshot>();

  let [pills, setPills] = useState<Array<PillDetails> | null>([]);

  useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${id}`)
      .on('value', snapshot => {
        setParameters(snapshot);
        console.log('User data: ', snapshot.child('SpO2').val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/users/${id}`).off('value', onValueChange);
  }, [id]);

  const getData = async () => {
    await firestore()
      .collection('users')
      .doc(id)
      .get()
      .then(value => {
        setData(value);
        if (value.data().pills != null) {
          setPills(value.data().pills);
          pills.map(value => {
            console.log(value.pill_name, value.quantity, value.timing);
          });
        } else setPills(null);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.parent}>
      <View
        style={{
          padding: 10,
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Personal Details</Text>
        <View style={{flexDirection: 'row'}}>
          <Text>Name: </Text>
          <Text style={styles.shiftRight}> {data?.get('name')} </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text>Age: </Text>
          <Text style={styles.shiftRight}> {data?.get('age')} </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text>Gender: </Text>
          <Text style={styles.shiftRight}> {data?.get('gender')} </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          padding: 10,
          elevation: 0.8,
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          Health Parameters
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <View>
            <AnimatedCircularProgress
              size={100}
              width={3}
              fill={parameters?.child('temp').val() | 0}
              tintColor="purple"
              backgroundColor="gray">
              {fill => (
                <View style={{justifyContent: 'center'}}>
                  <Text style={{fontSize: 12}}>Temperature</Text>
                  <Text style={{textAlign: 'center'}}>
                    {parameters?.child('temp').val()}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>

          <View>
            <AnimatedCircularProgress
              size={100}
              width={3}
              fill={parameters?.child('SpO2').val() | 0}
              tintColor="purple"
              backgroundColor="gray">
              {fill => (
                <View style={{justifyContent: 'center'}}>
                  <Text>SpO2</Text>
                  <Text style={{textAlign: 'center'}}>
                    {parameters?.child('SpO2').val()}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>

          <AnimatedCircularProgress
            size={100}
            width={3}
            style={{marginLeft: 10}}
            fill={parameters?.child('heart_rate').val() | 0}
            tintColor="purple"
            backgroundColor="gray">
            {fill => (
              <View style={{justifyContent: 'center'}}>
                <Text>Heart Rate</Text>
                <Text style={{textAlign: 'center'}}>
                  {parameters?.child('heart_rate').val()}
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          padding: 10,
          elevation: 0.8,
        }}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Pill Details</Text>

        {pills != null ? (
          <View style={{padding: 10}}>
            {pills.map(value => (
              <View
                style={{
                  backgroundColor: 'white',
                  elevation: 2,
                  marginBottom: 10,
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {' '}
                  {value.pill_name}{' '}
                </Text>
                <Text> Quantity: {value.quantity} </Text>
                <Text> Time: {value.timing} </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text>No Pills Assigned</Text>
        )}
      </View>

      <FAB
        style={styles.fab}
        icon={require('../assets/logout.png')}
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
  shiftRight: {
    position: 'absolute',
    right: 0,
  },
  fab: {
    position: 'absolute',
    margin: 5,
    right: 10,
    backgroundColor: 'purple',
    bottom: 20,
  },
});
