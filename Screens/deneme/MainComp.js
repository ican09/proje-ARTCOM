import React from 'react'
import { View, Text,TextInput,Button } from 'react-native'

const MainComp = ({btntitle,}) => {
    return (
        <View style={{flex:1, justifyContent:"center",alignItems:"center",}}>
            <TextInput style={{height:50,
        width:275,
        borderRadius:25,
        borderColor:"black",
        borderWidth:1,
        paddingLeft:7,
        margin:12,}}></TextInput>
            <TextInput style={{height:50,
        width:275,
        borderRadius:25,
        borderColor:"black",
        borderWidth:1,
        paddingLeft:7,
        margin:12,}}></TextInput>
            <Button title={btntitle}></Button>
        </View>
    )
}


export default MainComp
