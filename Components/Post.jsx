import React, { Component , useState , useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Dimensions } from "react-native";

const width = Dimensions.get('window').width;
export default function Post({route,navigation}) {
    const Identifiant = route.params.identifiant;
    const From = route.params.from;
    const To = route.params.to;
    console.log(From)
    console.log(To)
    console.log("hello")

    const [destination, setDestination] = useState(null);
    const [target, setTarget] = useState(null);
    const [distance, setDistance] = useState(null);
    const [time, setTime] = useState(null);
    const [price, setPrice] = useState(null);
  
    useEffect(() => {
      fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${From.x}&lon=${From.y}&apiKey=a1402f057e664267a454b5321905b64c`).then(
        res => res.json() ).then(res =>
        {
          setDestination(res.features[0].properties.city)
          console.log(res)
        }
        ).catch(err=>console.log(err))
      fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${To.x}&lon=${To.y}&apiKey=a1402f057e664267a454b5321905b64c`).then(
        res => res.json() ).then(res =>
        {
          setTarget(res.features[0].properties.city)
          console.log(res)
        }
        ).catch(err=>console.log(err))
      fetch(`https://api.geoapify.com/v1/routing?waypoints=${From.x},${From.y}|${To.x},${To.y}&mode=drive&apiKey=a1402f057e664267a454b5321905b64c`).then(
        res => res.json() ).then(res =>
        {
          setDistance(res.features[0].properties.distance)
          setTime(res.features[0].properties.time)
          console.log(res)
        }
        ).catch(err=>console.log(err))
    }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.readable}>
            <View 
                style={styles.readableInput}
            >
                <Text style={styles.inputtext} >de : {destination}</Text>
            </View>
        </View>
        <View style={styles.readable}>
            <View 
                style={styles.readableInput}
            >
                <Text style={styles.inputtext} >a : {target}</Text>
            </View>
        </View>
        <View style={styles.readable}>
            <View 
                style={styles.readableInput}
            >
                <Text style={styles.inputtext} >{distance} m</Text>
            </View>
        </View>
        <View style={styles.readable}>
            <View 
                style={styles.readableInput}
            >
                <Text style={styles.inputtext} >{time} minutes</Text>
            </View>
        </View>
        <View style={{ flexDirection:"column"}}>
            <Text style={styles.inputtext} >prix:</Text>
            <TextInput 
                style={styles.Input}
                keyboardType='numeric'
                onChangeText={(price)=> setPrice(price)}
                value={price}
            >
               
            </TextInput>
        </View>
        </View>
        <Pressable style={styles.letsgo} 
        onPress={()=>{
            Linking
                .openURL(`https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/${target.latitude},${target.longitude}`)
                .catch(err => console.error('Error', err));
        }}  
    >
        <Text style={{color:"#fff",textAlign:"center",fontSize:20,}}>itinéraire</Text>
    </Pressable>
    <Pressable style={styles.letsgo} 
        onPress={()=>{
            // fetch("")
        }}  
    >
        <Text style={{color:"#fff",textAlign:"center",fontSize:20,}}>Annoncez</Text>
    </Pressable>
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
  letsgo:{
    width:200,
    height:50,
    backgroundColor:"#791617",
    justifyContent:"center",
    borderRadius:16
  },
  logo : {
    width:width,
    height:85,
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#aaa',
    marginRight:10,
    width:220
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
    width:220
  },
  inputtext:{
    color:"#000"
  }
});
