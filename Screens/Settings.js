import React, {useState} from "react";
import { View,Text,TouchableOpacity,Modal,TextInput } from "react-native";
import { Icon } from 'react-native-elements';
import firebase from 'firebase/compat/app';

export default function Settings({navigation}) {
    const [modalVisible1,setModalVisible1] = useState(false);
    const [modalVisible2,setModalVisible2] = useState(false);
    const [ name,setName] = useState();
    const [username,setUsername] = useState();

    const Adınıdeğiştir = () =>{
        firebase.auth().currentUser.updateProfile({
            displayName:name
        })
        firebase.auth().onAuthStateChanged(user =>{
            firebase.firestore().collection("user").doc(user.uid).set({
              name:name
            }, {merge:true})
             })
             console.log("succes")
             navigation.navigate("profile")
    }

    const KulAdıDegistir = () => {
        firebase.auth().onAuthStateChanged(user => {
            firebase.firestore().collection("user").doc(user.uid).set({
                username:username
            },{merge:true})
        })
            console.log("succes")
             navigation.navigate("profile")
    }

    return(
        <View style={{flex:1,backgroundColor:"white",}}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert("Modal has been closed.");
          setModalVisible1(!modalVisible1);
        }}
      >
          <View style={{flex:1,justifyContent:"center",backgroundColor:"#000000aa",}}>
          <View style={{backgroundColor:"white",justifyContent:"center",marginRight:30,marginLeft:30,borderRadius:20,}}>

              <TextInput style={{height:50,borderWidth:1,borderColor:"black",marginLeft:30,marginRight:30,padding:5,borderRadius:30,marginTop:40,}}
                        placeholder="Yeni Adınız" 
                        value={name}
                        onChangeText={(text) => setName(text)}
                        maxLength={35}/>
                        <View style={{flexDirection:"row",justifyContent:"space-between",margin:20,}}>
                <TouchableOpacity style={{height:30,borderWidth:1,borderColor:"red",justifyContent:"center",borderRadius:20,}} onPress={() => setModalVisible1(false)}> 
                    <Text style={{marginLeft:10,marginRight:10,}}>iptal</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={Adınıdeğiştir} style={{height:30,borderWidth:1,borderColor:"green",justifyContent:"center",borderRadius:20,}} > 
                    <Text style={{marginLeft:10,marginRight:10,}}>Onayla</Text> 
                </TouchableOpacity>
                </View>
          </View>
          </View>
      </Modal>
                {/*------------------------------------------------------------------------------------------------------------*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
          <View style={{flex:1,justifyContent:"center",backgroundColor:"#000000aa",}}>
          <View style={{backgroundColor:"white",justifyContent:"center",marginRight:30,marginLeft:30,borderRadius:20,}}>

              <TextInput style={{height:50,borderWidth:1,borderColor:"black",marginLeft:30,marginRight:30,padding:5,borderRadius:30,marginTop:40,}}
                        placeholder="Yeni Kullanıcı Adınız" 
                        value={name}
                        onChangeText={(text) => setUsername(text)}
                        maxLength={35}/>
                        <View style={{flexDirection:"row",justifyContent:"space-between",margin:20,}}>
                        
                <TouchableOpacity style={{height:30,borderWidth:1,borderColor:"red",justifyContent:"center",borderRadius:20,}} onPress={() => setModalVisible2(false)}> 
                    <Text style={{marginLeft:10,marginRight:10,}}>iptal</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={KulAdıDegistir} style={{height:30,borderWidth:1,borderColor:"green",justifyContent:"center",borderRadius:20,}} > 
                    <Text style={{marginLeft:10,marginRight:10,}}>Onayla</Text> 
                </TouchableOpacity>
                </View>
          </View>
          </View>
      </Modal>
            <TouchableOpacity onPress={() => setModalVisible1(true)} style={{backgroundColor:"white",padding:10,flexDirection:"row",borderColor:"lightgrey",borderWidth:1,}}>
            <Icon  name='sync-outline' type='ionicon'  color='#517fa4'  /><Text> Adını değiştir </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible2(true)} style={{backgroundColor:"white",padding:10,flexDirection:"row",borderColor:"lightgrey",borderWidth:1,}}>
            <Icon  name='sync-outline' type='ionicon'  color='#517fa4'  /><Text> Kullanıcı adı değiştir </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> firebase.auth().signOut()} style={{backgroundColor:"white",padding:10,flexDirection:"row",borderColor:"lightgrey",borderWidth:1,}}>
            <Icon  name='exit-outline' type='ionicon'  color='red'  /><Text style={{color:"red",}}> Çıkış yap </Text>
            </TouchableOpacity>
        </View>
    );
}