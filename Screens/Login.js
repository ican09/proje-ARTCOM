import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Button} from 'react-native';
import { } from 'react-native-elements';
import Home from './Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//firebase----------------------------
import firebase from 'firebase/compat/app';
//------------------------------------

export default function LoginScreen ({navigation}) {

    const [email ,setEmail] = useState("");
    const [password ,setPassword] = useState("");

    const [isloading ,setIsloading] = useState(false);

    const GirisYap = async () => {
        setIsloading(true)
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password)
            navigation.navigate('Main')
        } catch (e) {
            setIsloading(true)
            alert(e.message)
        }
    }
    return(
        <View style={{flex:1}}>
                <View style={{flex:1,justifyContent:"center",alignItems:"center",}}>
                    <Text style={{marginBottom:100,}}>ARTCOM LOGO</Text>
                
                    <TextInput
                        style={styles.input}
                        placeholder="Gmail"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType='email-address'
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="Password"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry 
                    />
                    <View style={{flexDirection:"row",}}>
                        <Text style={{fontSize:10,}}>Hesabınız yokmu</Text><TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{fontSize:11,color:"blue"}}> KAYIT OL</Text></TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => GirisYap()} loading={isloading} style={styles.Girisbtn}><Text>Giriş yap</Text></TouchableOpacity>
                    </View>
                    
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        height:50,
        width:275,
        borderRadius:25,
        borderColor:"black",
        borderWidth:1,
        paddingLeft:7,
        margin:12,
    },
    Girisbtn:{
        backgroundColor:"lightblue",
        height:40,
        width:125,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:25,
        marginTop:40,
    }
})