import React,{useState,useEffect} from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import firebase from 'firebase/compat/app';


export default function Message ({route}){
    const [messages,setMessages] = useState()
    const [uid,setUid] = useState()
    const [name,setName] = useState()

    useEffect(() => {
        return firebase.firestore().doc("chats/" + route.params.userid).onSnapshot((snapshot) => {
            setMessages(snapshot.data()?.messages ?? [])
        })
    }, [])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setUid(user.uid)
            setName(user.displayName)
        })
    }, [route.params.userid])

    const onSend = (m = []) => {
        firebase.firestore().collection("chats").doc(route.params.userid).set({
            messages: GiftedChat.append(messages, m)
        },{merge:true})
    }
    return(
        <View style={{backgroundColor:"white", flex:1,}}>
        <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: uid,
        name: name
      }}
    />
    </View>
    );
}