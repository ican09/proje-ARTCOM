import React, {useEffect,useState} from 'react'
import { View, Text ,TouchableOpacity} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HastaGiris from './HastaGiris';
import DoktorGiris from './DoktorGiris';


const Login = ({navigation}) => {

    
    return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center",}}>
           <TouchableOpacity onPress={()=>navigation.navigate("Hastagrş")}> <Text>Hasta giriş</Text></TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate("Doktorgrş")}> <Text>Doktor giriş</Text></TouchableOpacity>
        </View>
    )
}
const tab = createNativeStackNavigator();
const Tabs = () => {
    return(
    <NavigationContainer>
        <tab.Navigator>
        <tab.Screen name="Login" component={Login}></tab.Screen>
            <tab.Screen name="Hastagrş" component={HastaGiris}></tab.Screen>
            <tab.Screen name="Doktorgrş" component={DoktorGiris}></tab.Screen>
        </tab.Navigator>
    </NavigationContainer>
    );
}




export default Tabs
