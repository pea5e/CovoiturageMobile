import React, { Component , useState , useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { StyleSheet, Text, View, Pressable  ,Image ,TextInput,Linking} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { Dimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";


const width = Dimensions.get('window').width;
export default function ChooseTime({route,navigation}) {

  
    var token ;
    try{
      token  = route.params.token;
      console.log(token)
    }
    catch(e)
    {
      token = "";
    }

    var query;

    try{
      query  = route.params.query;
      console.log(query)
    }
    catch(e)
    {
      query = "";
    }

    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(true);
    const [showTime, setShowTime] = useState(false);



  const onChangeTime = (e, selectedDate) => {
    setDate(selectedDate);
    setShowTime(false);
  };

  const onChangeDate = (e, selectedDate) => {
    setDate(selectedDate);
    setShowDate(false);
    setShowTime(true);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:40,color:"#89c227"}}>Programmer</Text>
      <View>
        {
          showDate && (
            <DateTimePicker
              value={date}
              display={"spinner"}
              mode={"date"}
              is24Hour={true}
              onChange={onChangeDate}
            />
          )
        }
        {
          showTime && (
            <DateTimePicker
              value={date}
              display={"spinner"}
              mode={"time"}
              is24Hour={true}
              onChange={onChangeTime}
            />
          )
        }
      </View>
      <Pressable
        onPress={ ()=>{
          setShowDate(true);
          }
        }
      >

        <Text style={{fontSize:20,color:"#89c227"}}>{date.toLocaleString()}</Text>
      </Pressable>
      
    <Pressable style={styles.letsgo} 
                    onPress={async ()=>{
                            console.log(date.toISOString())
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
                            console.log(query+`
                              time:${date.toISOString()}
                            })
                            }`)
                            fetch("http://10.0.2.2:8099/graphql",{
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json',
                                  'Authorization' : `Bearer ${token}`
                                 },
                                body: JSON.stringify({
                                  query: query+`
                                  time:"${date.toISOString()}"
                                })
                                }`
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
    backgroundColor:"#89c227",
    justifyContent:"center",
    borderRadius:16,
    marginTop:200
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
