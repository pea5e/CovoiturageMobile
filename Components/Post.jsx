import React, { Component , useState , useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput,Linking} from 'react-native';
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
    var token ;
    try{
      token  = route.params.token;
      console.log(token)
    }
    catch(e)
    {
      token = "";
    }

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
      <Image
                  style={styles.logo}
                  source={require('../assets/cloud.png')}
        />
      <View>
        <View style={styles.readable}>
            <View 
                style={styles.readableInput}
            >
                <Text style={styles.inputtext} >départ : {destination}</Text>
            </View>
        </View>
        <View style={styles.readable}>
            <View 
                style={styles.readableInput}
            >
                <Text style={styles.inputtext} >destination : {target}</Text>
            </View>
        </View>
        <View style={styles.readable}>
            <View 
                style={styles.readableInput}
            >
                <Text style={styles.inputtext} >distance : {distance/1000} km</Text>
            </View>
        </View>
        <View style={styles.readable}>
            <View 
                style={styles.readableInput}
            >
                <Text style={styles.inputtext} >{time/3600|0} : {time/60%60|0} : {time%60|0}</Text>
            </View>
        </View>
        <View style={{ flexDirection:"column"}}>
            <TextInput 
                style={styles.Input}
                keyboardType='numeric'
                onChangeText={(price)=> setPrice(price)}
                value={price}
                placeholder="Saisir le Prix"
            >
               
            </TextInput>
        </View>
        </View>
        <Pressable style={styles.letsgo} 
        onPress={()=>{
            Linking
                .openURL(`https://www.google.com/maps/dir/${From.x},${From.y}/${To.x},${To.y}`)
                .catch(err => console.error('Error', err));
        }}  
    >
        <Text style={{color:"#fff",textAlign:"center",fontSize:20,}}>itinéraire</Text>
    </Pressable>
    <Pressable style={styles.letsgo} 
                    onPress={async ()=>{
                          
                            // var req = await fetch("http://10.0.2.2:8095/graphql",{
                            //   method: 'POST',
                            //   headers: { 'Content-Type': 'application/json' },
                            //   body: JSON.stringify({
                            //     query: `query{
                            //         Authenticate(
                            //           email:${Identifiant}
                            //           password:${Password}
                            //         )
                            //       }`
                            //   })
                            // })
                            // let status =  req.status
                            // console.log(status)
                            //  req.json()
                            // fetch("http://10.0.2.2:8095/").then(res=>res.text()).then(res=>console.log(res))
                            fetch("http://10.0.2.2:8099/graphql",{
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json',
                                  'Authorization' : `Bearer ${token}`
                                 },
                                body: JSON.stringify({
                                  query: `mutation{
                                      saveVoyage(voyage:{
                                        destinationX:${To.x}
                                        destinationY:${To.y}
                                        emplacementX:${From.x}
                                        emplacementY:${From.y}
                                        labelDestination:"${destination}"
                                        labelEmplacement:"${target}"
                                        Tarif:${price}
                                        Duree:${time|0}
                                        Distance:${distance|0}
                                      })
                                    } `
                                })
                              }).then(res=>res.text()).then(res=>console.log(res)).catch(e=>console.log(e))
                                navigation.dispatch(
                                  StackActions.replace('Home', {token: token})
                                );
                                  // navigation.dispatch(
                                  //   StackActions.replace('Home',{identifiant:Identifiant})
                                  // );
                          }
                        }
            
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
