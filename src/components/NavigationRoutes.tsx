import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, View} from 'react-native';
import {DoctorHome} from '../screens/Doctor/DoctorHome';
import {PillConfiguration} from '../screens/Doctor/PillConfiguration';
import Login from '../screens/Login';
import {PatientInfo} from '../screens/Doctor/PatientInfo';
import Signup from '../screens/Signup';
import {Splash} from '../screens/Splash';
import Verify from '../screens/Verify';
import {Patient} from '../screens/Patient';
const Stack = createStackNavigator();

export const NavigationRoutes = () => {
  const header = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          elevation: 5,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>
          Dispenser System
        </Text>
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{title: '', headerTransparent: true}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Verify" component={Verify} />
      <Stack.Screen name="Signup" component={Signup} />
      
      <Stack.Screen
        name="DoctorHome"
        component={DoctorHome}
        options={{headerShown: true, header: header}}
      />
      <Stack.Screen
        name="Patient"
        component={Patient}
        options={{headerShown: true, header: header}}
      />
      <Stack.Screen
        name="PatientInfo"
        component={PatientInfo}
        options={{
          headerShown: true,
          headerTitle: 'Patient Details',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="PillConfiguration"
        component={PillConfiguration}
        options={{
          headerShown: true,
          headerTitle: 'Pill Configuration',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationRoutes;
