import React, { Component , useState , useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput,Linking,ScrollView} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Dimensions } from "react-native";
import { Driver } from './Icons/Driver';
import { Coin } from './Icons/Coin';

const width = Dimensions.get('window').width;
export default function Voyages({route,navigation}) {

    var token ;
    try{
      token  = route.params.token;
      console.log(token)
    }
    catch(e)
    {
      token = "";
    }

    const [voyages, setVoyages] = useState(null);
  
    useEffect(() => {
      fetch(`http://10.0.2.2:8099/get`).then(
        res => res.json() ).then(res =>
        {
            setVoyages(res)
        }
        ).catch(err=>console.log(err))
    }, []);

  return (
    // <ScrollView style={styles.container}>
      <View style={styles.container}>
      {/* <Text style={{fontSize:40,marginBottom:30}}>Voyages</Text> */}
      {   voyages &&
                  voyages.map((voyage, index) => (
                  <View
                    key={index}
                    
                    style={{width:width,height:50,backgroundColor:"#eee",borderBottomWidth:1,flexDirection:"row"}}
                  >
                      <Text style={{fontSize:20,marginRight:40}}>{voyage.emplacement.label}{"->"}{voyage.destination.label}</Text>
                      <Driver/><Text style={{fontSize:20,marginLeft:10,marginRight:40}}>{voyage.driver.prenom}</Text><Coin/><Text style={{fontSize:20,marginLeft:10}}>{voyage.tarif}</Text>
                  </View>
            ))}
        </View>
  // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom:180,
  },
  letsgo:{
    width:200,
    height:50,
    backgroundColor:"#3e3dcc",
    justifyContent:"center",
    borderRadius:16,
    marginBottom:10
  },
  logo : {
    width:240,
    height:200,
  },
  label:{
    fontSize:15,
    paddingTop: 15,
  },
  readable:{
    flexDirection:"row",
    justifyContent:"center"
  },
  readableInput:{
    alignItems: 'left',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginRight:10,
    width:width
  },
  Input:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#eee',
    marginRight:10,
    width:width,
    marginBottom:20
  },
  inputtext:{
    color:"#000",
    fontSize:25
  }
});
