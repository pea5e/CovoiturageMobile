import React, { Component , useState , useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput,Linking,ScrollView} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Dimensions } from "react-native";
import { Driver } from './Icons/Driver';
import { Coin } from './Icons/Coin';
import { To } from './Icons/To';

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

      // setVoyages([{"destination": {"label": "Mountain View", "x": 37.702079845927905, "y": -121.92006055265665}, "distance": 58006, "driver": {"age": 22, "banned": false, "cin": "bf342432", "email": "alaouisalim30@gmail.com", "id": 1, "nom": "alaoui", "nombre_voya": 0, "password": null, "prenom": "salim", "sexe": null, "telephone": "0782812992"}, "duree": 2554, "emplacement": {"label": "Dublin", "x": 37.4219983, 
      //   "y": -122.084}, "id": 1, "review": 0, "tarif": 500, "time": "2025-02-01T17:07:38.076", "userId": 1}, {"destination": {"label": "Mountain View", "x": 37.25625946655729, "y": -122.41656694561242}, "distance": 70753, "driver": {"age": 22, "banned": false, "cin": "bf342432", "email": "alaouisalim30@gmail.com", "id": 1, "nom": "alaoui", "nombre_voya": 0, "password": null, "prenom": "salim", "sexe": null, "telephone": 
      //   "0782812992"}, "duree": 3019, "emplacement": {"label": "Pescadero", "x": 37.4219983, "y": -122.084}, "id": 2, "review": 0, "tarif": 340, "time": "2025-06-01T17:28:00", "userId": 1}])
      fetch(`http://10.0.2.2:8099/get`).then(
        res => res.json() ).then(res =>
        {
          console.log(res)
            setVoyages(res)
        }
        ).catch(err=>console.log(err))
    }, []);

  return (
    // <ScrollView style={styles.container}>
      <ScrollView style={styles.container}>
      {/* <Text style={{fontSize:40,marginBottom:30}}>Voyages</Text> */}
      {   voyages &&
                  voyages.map((voyage, index) => (
                  <View
                    key={index}
                    
                    style={[{height:50,backgroundColor:"#eee",flexDirection:"column",alignItems:"center"},styles.card]}
                  >
                    <View style={{flexDirection:"row",alignItems:"center",marginTop:15}}>
                      <Text style={{fontSize:22}}>{voyage.emplacement.label}</Text><View style={{marginLeft:20}}><To/></View><Text style={{fontSize:22,marginLeft:30}}>{voyage.destination.label}</Text>
                    </View>
                      <Text style={[styles.inputtext,{color:"#89c227"}]} >{voyage.duree > 3600 ? (voyage.duree/3600|0).toString()+' hours' :""} {voyage.duree/60%60|0} minutes</Text>
                      <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Driver/><Text style={{fontSize:20,marginLeft:10,marginRight:40}}>{voyage.driver.prenom}</Text><Coin/><Text style={{fontSize:20,marginLeft:10}}>{voyage.tarif}</Text>
                      </View>
                      <Text style={{fontSize:22}}>{new Date(Date.parse(voyage.time)).toLocaleString()}</Text>
                      <Pressable
                        onPress={()=>
                        {
                          navigation.navigate(
                            "Form",{
                              "token":token,
                              "voyageID":voyages[index].id,
                              "price":voyages[index].tarif
                            }
                          );
                        }
                        }
                      >
                        <Text style={{marginTop:16,width:width-40,height:40,backgroundColor:"#496912",borderRadius:10,fontSize:26,color:"white",textAlign:"center"}}>Voyager</Text>
                      </Pressable>
                  </View>
                  
            ))}
        </ScrollView>
  // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom:180,
    backgroundColor:"#89c227"
  },
  card:{
    borderRadius:10,
    backgroundColor:"white",
    width:width-40,
    marginLeft:20,
    marginTop:15,
    height:190,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
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
