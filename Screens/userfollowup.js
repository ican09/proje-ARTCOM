import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,ScrollView,SafeAreaView,FlatList} from 'react-native';
import {ListItem,Avatar} from 'react-native-elements';
import firebase from 'firebase/compat/app';




export default function userFollowupScreen({navigation,route}){

  const [follow,setFollow] = useState();
  console.log(follow)
  useEffect(() => {
      firebase.firestore().collection("user").doc(route.params.userid).collection("takip").onSnapshot((QuerySnapshot)=>{
        const data = [];
      QuerySnapshot.forEach((doc)=> {
        data.push({
          ...doc.data(),
        }) 
        setFollow(data);
      })
      })
  
  }, [])

    return(
        <View style={{flex:1,justifyContent:"flex-end",backgroundColor:"lightgray",}}>
            <View style={{flex:1,justifyContent:"flex-end",alignItems:"center",}}>
                <Text style={{fontWeight:"bold",fontSize:20,paddingBottom:10,paddingRight:40,paddingLeft:40,paddingTop:10,backgroundColor:"white",borderTopLeftRadius:20,borderTopRightRadius:20,}}>Takip Ettiklerim</Text>
            </View>
            
            <View style={{flex:8,backgroundColor:"white",borderTopLeftRadius:10,borderTopRightRadius:10,}}>
            
            
            <FlatList
            data={follow}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate("UserProfile",{userid:item.takipid})} style={{height:75,flexDirection:"row",alignItems:"center"}}>
         <View style={{margin:10,}}>
         {
  item.profilephoto ==  "" ?

  <Avatar
  source={require("../images.jpg")}
rounded
size={55}
>
</Avatar>

:

<Avatar
source= {{uri:item.profilephoto}}
rounded
size={55}

>
</Avatar>

}
         </View>
         <View style={{marginLeft:10,}}>
         <Text style={{fontWeight:"bold",}}>{item.username} </Text>
         <Text>{item.name}</Text>
         </View>
        </TouchableOpacity>
            )}
          keyExtractor = {(item, index)=> index.toString()}

            />
            </View>
           
        </View>
    );
}