import { StatusBar } from 'expo-status-bar';
import MapView ,{ Marker} from 'react-native-maps';
import { StyleSheet, Text, View ,PermissionsAndroid ,Pressable,Linking} from 'react-native';
import React, { useState , useEffect} from 'react';
import * as Location from 'expo-location';

export default function Map({route,navigation}) {
    const Identifiant = route.params.identifiant;
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState();
    const [hidden, setHidden] = useState(1);
    const [target, setTarget] = useState(null);
    var token ;
    try{
      token  = route.params.token;
      console.log(token)
    }
    catch(e)
    {
      token = "";
    }
  
    useEffect(() => {
      const getPermissions = async () => {
        // const granted = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        //     {
        //       title: 'Covoiturage APP',
        //       message:
        //         'Covoiturage APP voulez accéder à votre localisation' ,
        //       buttonNegative: 'Cancel',
        //       buttonPositive: 'OK',
        //     },
        //   );
        //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     console.log('You can use the location');
        //   } else {
        //     console.log('location permission denied');
        //   }
        // console.log("1");
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log("Please grant location permissions");
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log("Location:");
        console.log(currentLocation);
      };
      getPermissions();
    }, []);
  if(location==null)
    return (
    <>
    
    </>
    )
  return (
  <View style={styles.container}>
    <MapView style={styles.map}  initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta:  0.05654126425331185,
              longitudeDelta: 0.03894466906787386,
          }}
          onLongPress={(coord)=>{
            console.log(coord.nativeEvent)
            setHidden(0)
            setTarget(coord.nativeEvent.coordinate)
          }}
          >
        <Marker  coordinate={{latitude: location.coords.latitude,
            longitude: location.coords.longitude}}
            title={"Ta localisation"} />
        {hidden===0 && <Marker 
            coordinate={{latitude: target.latitude,
                longitude: target.longitude}}
                pinColor={"blue"}
                title={"Ta Destination"}
        />}
    </MapView>
    <Pressable style={[{display:(hidden===1?"none":"flex")},styles.letsgo]} 
        onPress={()=>{
          navigation.navigate(
            "Post",{
              "token":token,
              "identifiant":Identifiant,
              "from":{'x':location.coords.latitude,'y':location.coords.longitude},
              "to":{'x':target.latitude,'y':target.longitude}
            }
          );
            // Linking
            //     .openURL(`https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/${target.latitude},${target.longitude}`)
            //     .catch(err => console.error('Error', err));
        }}  
    >
        <Text style={{color:"#fff",textAlign:"center",fontSize:20,}}>Let's GO?</Text>
    </Pressable>
  </View>
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
  letsgo:{
    position:"absolute",
    bottom:20,
    width:200,
    height:50,
    backgroundColor:"#791617",
    justifyContent:"center",
    borderRadius:16
  }
});
