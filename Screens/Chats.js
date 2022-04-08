import React,{useState,useEffect} from "react";
import { View,Text,TouchableOpacity,FlatList } from "react-native";
import { Avatar } from 'react-native-elements';
import firebase from 'firebase/compat/app';


export default function Chats({navigation}){
    const [chatsuser,setChatsuser] = useState([]);
    console.log(chatsuser)
    const [name,setName] = useState();
    const [avatar,setAvatar] = useState([]);



    const _renderItem = ({item}) => {
      if (item.Chats[0] == name || item.Chats[1] == name) {
        
      
      return(
        <TouchableOpacity style={{flexDirection:"row",height:75,alignItems:"center",backgroundColor:"white",}} onPress={() => navigation.navigate("Message",{userid:item.key})}>
              <View style={{margin:10,}}>
              <Avatar
              title={item.Chats.find((x) => x !== name ).split(" ").reduce((prev,current) =>prev + current[0], "")}
              size={55}
              containerStyle={{backgroundColor:"gray"}} 
              rounded
              />
              </View>
             <Text style={{marginLeft:10,}}>{item.Chats.find((x) => x !== name )}</Text>
            </TouchableOpacity>
      )
      }
    }

    useEffect(() => {
      firebase.firestore().collection("user").onSnapshot((QuerySnapshot)=>{
        const data1 = [];
           QuerySnapshot.forEach((doc)=> {
             data1.push({
               ...doc.data(),
               
             }) 
             setAvatar(data1);
           })
         })
    }, [])



    useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
        if(!user){
          navigation.navigate("Login")
        }
        else{
        firebase.firestore().collection("user").doc(user.uid).onSnapshot(user => {
          setName(user.data().username)
        })
      }
      })

            firebase.firestore().collection("chats").onSnapshot(QuerySnapshot => {
                const data = [];
      QuerySnapshot.forEach((doc)=> {
        data.push({
          ...doc.data(),
          key: doc.id,
        }) 
      })
      setChatsuser(data)
            })
        
    },[] )
    return(
    <View style={{flex:1,}}>
      
        <FlatList
         data={chatsuser}
         renderItem={_renderItem}
        />
    </View>
    );
}