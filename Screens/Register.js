import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Button} from 'react-native';
import { } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker'
//firebase--------------------------------
import firebase from 'firebase/compat/app';
//----------------------------------------



export default function RegisterScreen ({navigation}) {
    
    const [email ,setEmail] = useState("");
    const [name ,setName] = useState("");
    const [password ,setPassword] = useState("");
    const [username ,setUsername] = useState("");

    const HesapOlustur = async () => {
        try{
           const response = await firebase
           .auth()
           .createUserWithEmailAndPassword(email,password);
        await response.user.updateProfile({displayName: name})

        const userId = response.user.uid;
        await firebase.firestore().collection("user").doc(userId).set({
            name: name,
            email:email,
            username: username,
            profilephoto: ""
        })

        navigation.navigate('Login')
        } catch (e) {
            alert(e.message)
        }
    }

    return(
        <View style={{flex:1}}>
                <View style={{flex:1,justifyContent:"center",}}>
                    <View style={{alignItems:"center",}}> 
                    <Text style={{marginBottom:50,}}>ARTCOM LOGO</Text> 
                    </View>
                
                    <TextInput
                        style={styles.input}
                        placeholder="Gmail"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType='email-address'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Adınız" 
                        value={name}
                        onChangeText={(text) => setName(text)}
                        maxLength={35}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Kullanıcı adınız"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        maxLength={20}
                    />  
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <View style={{alignItems:"center",}}>
                        <TouchableOpacity onPress={ () => HesapOlustur()} style={styles.Kayıtol}><Text>KAYIT OL</Text></TouchableOpacity>
                    </View>
                    
                </View>
        </View>
    );
}
const styles = StyleSheet.create({
    input:{
        height:50,
        marginRight:50,
        marginLeft:50,
        borderRadius:25,
        borderColor:"black",
        borderWidth:1,
        paddingLeft:7,
        marginBottom:12,

    },
    Kayıtol:{
        backgroundColor:"lightblue",
        height:40,
        width:125,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:25,
        marginTop:20,
    },
})