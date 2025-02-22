import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput} from 'react-native';
import { StackActions } from '@react-navigation/native';


export  function Form({route,navigation}) {


    var token ;
    try{
      token  = route.params.token;
      console.log(token)
    }
    catch(e)
    {
      token = "";
    }
    var vId ;
    try{
      vId  = route.params.voyageID;
      console.log(vId)
    }
    catch(e)
    {
      vId = "";
    }
    var price ;
    try{
      price  = route.params.price;
      console.log(price)
    }
    catch(e)
    {
      price = "";
    }
    const [Nom, setName] = React.useState('');
    const [Card, setCard] = React.useState('');
    const [Exp, setExp] = React.useState('');
    const [Sec, setSec] = React.useState('');



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
                onChangeText={text => { 
                    if(text.length>=21)
                        return;
                    else if(text.length<Card.length)
                        setCard(text)
                    else
                        setCard(text+((text.length+1)%5==0&&text.length<=19?' ':''))

                }
                }
                value={Card}
                keyboardType='numeric'
                placeholder="Carte Bancaire"
            />
             <TextInput
                style={styles.label}
                onChangeText={text => setExp(text)}
                value={Exp}
                placeholder="Date d'expiration"
            />
             <TextInput
                style={styles.label}
                onChangeText={text => setSec(text)}
                value={Sec}
                placeholder="Security Number"
            />
        </View>
        <View style={styles.register}>
            <Pressable 
                style={styles.signup}
                // onPress={resgister}
                onPress={()=>
                {
                    console.log(`mutation{
                        pay(payment:{
                            Nom: "${Nom}"
                            Card: "${Card}"
                            Expiry: "${Exp}"
                            Security: "${Sec}"
                            VoyageID:${vId}
                        }
                        )
                        }`)
                
                  fetch("http://10.0.2.2:8099/graphql",{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' ,
                        'Authorization' : `Bearer ${token}`
                    },
                    body: JSON.stringify({
                      query : `mutation{
                        pay(payment:{
                            Nom: "${Nom}"
                            Card: "${Card}"
                            Expiry: "${Exp}"
                            Security: "${Sec}"
                            VoyageID:${vId}
                        }
                        )
                        }`,
                    })
                  })
                  .then(res => 
                    res.text()
                  )
                  .then(res => 
                    {
                        console.log(res)
                      navigation.dispatch(
                            StackActions.replace('Voyages',{
                                "token":token
                              })
                        );
                    })
                    .catch(err=>console.log(err))
                  
                }
              }
            >
                <Text style={styles.signuptext}>Payer {price}</Text>
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
