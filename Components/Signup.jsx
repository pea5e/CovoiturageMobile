import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput} from 'react-native';
import { StackActions } from '@react-navigation/native';


export  function Signup({navigation}) {

    const [Nom, setName] = React.useState('');
    const [Prenom, setPrenom] = React.useState('');
    const [Email, setEmail] = React.useState('');
    const [Telephone, setTelephone] = React.useState('');
    const [Sexe, setSexe] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [Cin, setCin] = React.useState('');
    const [Age, setAge] = React.useState('0');

    
    // var def = () => {
    //   fetch(apiUrl()+"/api/auth/valid",{
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //           'Id' : 0,
    //           'Name' : Name,
    //           'Email': Identifiant,
    //           'Password': Password,
    //           'Cin' : Cin,
    //           'Tel' : Tel

    //         })
    //       })
    //       .then(res => res.text())
    //       .then(res => 
    //         {
    //           console.log(res=='true')
    //           if(res=='true')
    //           {
    //             resgister = () => {};
    //             console.log(bordercolor)
    //             bordercolor = "#CC0202"
                
    //           }
    //           else 
    //           {
    //             resgister = def;
    //           }
    //         })
    //         .catch(err=>console.log(err))
    //       navigation.navigate('Login', {iden: Identifiant,pass:Password})
    //   }

    // var resgister = def;


  return (
    <View style={styles.container}>
        
        <View>
            <TextInput
                style={styles.label}
                onChangeText={text => setName(text)}
                value={Nom}
                placeholder="Nom"
            />
            <TextInput
                style={styles.label}
                onChangeText={text => setPrenom(text)}
                value={Prenom}
                placeholder="Prenom"
            />
            <TextInput
                style={[styles.label,styles.email_label]}
                onChangeText={text => {
                  setEmail(text)
                  
                  //   fetch(apiUrl()+"/api/auth/valid",{
                  //     method: 'POST',
                  //     headers: { 'Content-Type': 'application/json' },
                  //     body: JSON.stringify({
                  //       'Email': text,
                  //     })
                  //   })
                  //   .then(res => res.text())
                  //   .then(res => 
                  //     {
                  //       console.log(res=='true')
                  //       if(res=='true')
                  //       {
                  //         resgister = () => {};
                  //         console.log(bordercolor)
                  //         bordercolor = "#CC0202"
                          
                  //       }
                  //       else 
                  //       {
                  //         resgister = def;
                  //       }
                  //     })
                  //     .catch(err=>console.log(err))
                  }
                }
                value={Email}
                placeholder="Email"
            />
            <TextInput
                style={styles.label}
                onChangeText={text => {
                  if(text.length<=16)
                    setPassword(text)
                }}
                value={Password}
                onFocus={()=>{}}
                placeholder="Mot de Passe"
                secureTextEntry={true}
                autoCapitalize={'none'}
            />
            <TextInput
                style={styles.label}
                onChangeText={text => {
                  if(text.length<=8)
                    setCin(text)
                }}
                value={Cin}
                placeholder="Cin"
                autoCapitalize={'characters'}
            />
             <TextInput
                style={styles.label}
                onChangeText={text => {
                  if(text.length<=10)
                    setTelephone(text)
                }}
                value={Telephone}
                placeholder="Telephone"
                keyboardType="numeric"
                />
            {/* <TextInput
                style={styles.label}
                onChangeText={text => {
                  if(text.length<=10)
                    setAge(text)
                }}
                value={Age}
                placeholder="Age"
                keyboardType="numeric"
            /> */}
        </View>
        <View style={styles.register}>
            <Pressable 
                style={styles.signup}
                // onPress={resgister}
                onPress={()=>
                {
                if(Email.length==0 || ! Email.match(
                    /^[a-zA-Z0-9\.\-\_]+@(?:[a-zA-Z0-9\-\_]+(?:\.[a-zA-Z0-9\-\_]+)?)+\.[a-zA-Z0-9]{2,}$/
                  ))
                  toast('email invalide')
                else if(Password.length<8)
                  toast('Mot de Passe Obligatoire')
                else if(Cin.length==0)
                  toast('Cin Obligatoire')
                else
                  fetch("http://10.0.2.2:8095/graphql",{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      query : `mutation{
                        createUser(userDto :{
                            nom:"${Nom}"
                            password:"${Password}"
                            prenom:"${Prenom}"
                            telephone:"${Telephone}"
                            email:"${Email}"
                            age:${Age}
                            cin:"${Cin}"
                        }
                        )
                        }`,
                    })
                  })
                  .then(res => {
                    res.status
                    return res.json()
                  })
                  .then(res => 
                    {
                      if(res.data.createUser.startsWith("<200"))
                      {
                        navigation.dispatch(
                            StackActions.replace('Login')
                        );
                      }
                      else 
                      {
                        toast('Identifiant déjà utilisé')
                      }
                    })
                    .catch(err=>console.log(err))
                  
                }
              }
            >
                <Text style={styles.signuptext}>Signup</Text>
            </Pressable>
        </View>
    
  </View>
  );
};

var bordercolor = '#000'

// borderColor: "#CC0202",

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom:260,
  },
  logo : {
    width:233,
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
  email_label:{
    borderColor : bordercolor
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
    backgroundColor: '#89c227',
    marginRight:10,
    width: 233,
  },
  signuptext:{
    color:"#ffffff"
  }
});
