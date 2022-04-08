import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState} from 'react';
import { SafeAreaView,StyleSheet, Text, View,FlatList,Alert,TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import { Avatar } from 'react-native-elements';

export default function SearchScreen({navigation}) {
  const [users,setUsers] = useState([]);
  useEffect(() => {
    firebase.firestore().collection("user").onSnapshot((QuerySnapshot)=>{
   const data = [];
      QuerySnapshot.forEach((doc)=> {
        data.push({
          ...doc.data(),
          key: doc.id
        }) 
        setUsers(data);
      })
    })
  }, [])
console.log(users)
return(
  
  <View>
    <FlatList
     data={users}
     renderItem={({item}) =>     
     (
       
       <>
       <TouchableOpacity onPress={() => navigation.navigate("UserProfile",{userid:item.key})} style={{height:75,flexDirection:"row",alignItems:"center"}}>
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
       </>
     )}
     keyExtractor = {(item, index)=> index.toString()}

    />
  </View>
);
}
