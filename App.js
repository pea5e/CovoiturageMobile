import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from './Components/Login';
import Map from './Components/Map';
import Post from './Components/Post';
import { Signup } from './Components/Signup';
import Voyages from './Components/Voyages';
import ChooseTime from './Components/ChooseTime';
import Conducteur from './Components/Conducteur';
import { Form } from './Components/Form';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" screenOptions={{ 
       headerShown: false
    }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Welcome'}}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen options={{headerShown: true}} name="Signup" component={Signup} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen options={{headerShown: true}} name="Voyages" component={Voyages} />
      <Stack.Screen options={{headerShown: true}} name="Form" component={Form} />
      <Stack.Screen name="Conducteur" component={Conducteur} />
      <Stack.Screen name="Time" component={ChooseTime} />
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
