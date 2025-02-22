import React, { Component, useState,useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Dimensions } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

const width = Dimensions.get('window').width;
export default function Home({route,navigation}) {

  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      console.log('Expo Push Token:', token);
    });

    // Listen for incoming notifications
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Received Notification:', notification);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    // if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      console.log(finalStatus)
  
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        Alert.alert('Error', 'Failed to get push token for push notifications!');
        return;
      }
  
      const t = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("token",t)
      return t;
    // } else {
    //   Alert.alert('Error', 'Must use a physical device for push notifications');
    // }
  }

    var token ;
    try{
      token  = route.params.token;
      console.log(token)
    }
    catch(e)
    {
      token = "";
    }
  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../assets/logo.jpg')}
        />
        <Text style={styles.label}>Êtes-vous?</Text>
        <View style={styles.register}>
            <Pressable 
                style={styles.signup}
                onPress={() =>{
                      navigation.navigate(
                        "Conducteur",{
                          "token":token
                        }
                      );
                    }
                }
            >
                <Text>conducteur</Text>
            </Pressable>
            <Text style={styles.label}>ou</Text>
            <Pressable 
                style={styles.login}
                onPress={()=>{
                          navigation.navigate(
                            "Voyages",{
                                "token":token
                              }
                          );
                        }
                }
            >
                <Text style={styles.logintext} >passager</Text>
            </Pressable>
        </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop:120,
    paddingBottom:180,
  },
  logo : {
    width:width,
    height:85,
  },
  label:{
    fontSize:15,
    paddingTop: 15,
  },
  register:{
    flexDirection:"row",
    justifyContent:"center"
  },
  signup:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    marginRight:10
  },
  login:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#89c227',
    marginLeft:10
  },
  logintext:{
    color:"#ffffff"
  }
});
