import React, { Component } from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Dimensions } from "react-native";
// function readtoken (){
//     console.log(FileSystem.cacheDirectory);
// }
const width = Dimensions.get('window').width;
export default function Login({route,navigation}) {
    

    const [Token,setToken] = React.useState(''); 
    // const [visible, setVisible] = React.useState(false);
    const [Identifiant, setIdentifiant] = React.useState('');
    const [Password, setPassword] = React.useState('');
    // readtoken();
    // if (route.params)
    // {
    //   var { iden,pass } = route.params;
    //   if(iden && pass)
    //     {
    //       setIdentifiant(iden)
    //       setPassword(pass)
    //     }
    //   navigation.setParams({iden: null,pass: null});
    // }


  return (
    <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require('../assets/logo.jpg')}
        />
        <View>
            <TextInput
                style={styles.label}
                onChangeText={text => setIdentifiant(text)}
                value={Identifiant}
                placeholder="Identifiant"
            />
            <TextInput
                style={styles.label}
                onChangeText={text => setPassword(text)}
                value={Password}
                placeholder="Mot de Passe"
                secureTextEntry={true}
                autoCapitalize={'none'}
            />
        </View>
        <View style={styles.register}>
            <Pressable 
                style={styles.signup}
                onPress={() =>
                navigation.navigate('Signup')
                }
            >
                <Text>Signup</Text>
            </Pressable>
            <Pressable 
                style={styles.login}
                onPress={async ()=>{
                  try{
                    console.log("login")
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
                    fetch("http://10.0.2.2:8095/graphql",{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          query: `query{
                              Authenticate(
                                email:"${Identifiant}"
                                password:"${Password}"
                              )
                            }`
                        })
                      }).then(res=>
                      {
                        return res.json()
                      }
                      )
                    .then(tok=>
                      {
                        if(tok.data.Authenticate!=null)
                          {
                            navigation.dispatch(
                              StackActions.replace('Home', {token: tok.data.Authenticate})
                            );
                          }
                          else
                          {
                            toast("Invalid credentials");
                          }
                    })
                  }
                  catch(err){
                    console.log(err);
                  }
                          // navigation.dispatch(
                          //   StackActions.replace('Home',{identifiant:Identifiant})
                          // );
                  }
                }
            >
                <Text style={styles.logintext} >Login</Text>
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
    borderRadius:10,
    height: 45,
    width: 233,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    margin:15,
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
    backgroundColor: '#791617',
    marginLeft:10
  },
  logintext:{
    color:"#ffffff"
  }
});
