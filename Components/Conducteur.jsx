import React, { Component } from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;
export default function Conducteur({route,navigation}) {
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
        <View style={styles.register}>
            <Pressable 
                style={styles.signup}
                onPress={() =>{
                      navigation.navigate(
                        "Map",{
                          "token":token
                        }
                      );
                    }
                }
            >
                <Text>Ajouter Voyage</Text>
            </Pressable>
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
                <Text style={styles.logintext} >Consulter Historique</Text>
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
    flexDirection:"column",
    justifyContent:"center"
  },
  signup:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#fff'
  },
  login:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#89c227',
    marginTop:30
  },
  logintext:{
    color:"#ffffff"
  }
});
