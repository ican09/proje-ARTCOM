import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import firebase from 'firebase/compat/app';



function HomeScreen({navigation,route}) {


  const [users,setUsers] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
        navigation.navigate("Login")
      }
      else{
      firebase.firestore().collection("user").doc(user.uid).collection("takip").get().then(snapshot => {
        const DATA = []

      snapshot.forEach((doc)=> {
        firebase.firestore().collection("user").doc(doc.id).collection("images").onSnapshot(snapshot => {
        snapshot.forEach((doc) => {
          DATA.push({
            ...doc.data()
          })
          setUsers(DATA)
          console.log(DATA)
        })
        })
      })
      })
    }
    })


  }, [])
  
  

    return (
      <View style={{ flex: 1, }}>

        <FlatList
          data={users}
          renderItem={({item}) => (
            <View style={styles.HomeShareScreen}>
          <View style={styles.HomeShareProfile}>
          <TouchableOpacity style={{flexDirection:"row",alignItems:"center",}} onPress={() => navigation.navigate('UserProfile',{userid:item.userid})}>
            <View style={{marginRight:7,marginLeft:5,}}>
            
            {
  item.profilephoto ==  "" ?

  <Avatar
  source={require("../images.jpg")}
rounded
>
</Avatar>

:

<Avatar
source= {{uri:item.profilephoto}}
rounded

>
</Avatar>

}

            </View>
            <View >
              <Text>{item.username}</Text>
            </View>
            </TouchableOpacity>
          </View>

          <View >
          <Image 
              style={{height:400}} 
              source={{uri:item.imagesphoto}} 
              />
          </View>
        </View>

          )}
          keyExtractor = {(item, index)=> index.toString()}

        />
      </View>
    );
}
const styles = StyleSheet.create({
  HomeShareScreen: {
    backgroundColor:"white",
    marginBottom:50,
  },
  HomeShareProfile: {
    height:55,
    backgroundColor:"white",
    alignItems:"center",
    flexDirection:"row",
    
  },
  HomeSharePhoto: {
    height:400,
    backgroundColor:"gray",
    alignItems:"center",
    justifyContent:"center",
  },
  HomeShareCommend: {
    backgroundColor:"white",
    flexDirection:"row",
    justifyContent:"space-between",
    marginHorizontal:6,
    height:40,
    alignItems:"center"
  },
})
export default HomeScreen