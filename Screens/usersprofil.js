import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect}from 'react';
import { StyleSheet, Text, View,FlatList, ScrollView, Dimensions,TouchableOpacity,Platform,useRoute,} from 'react-native';
import { Avatar, Button, Image,Icon } from 'react-native-elements';
import firebase from 'firebase/compat/app';
import {Ionicons} from "@expo/vector-icons"
import Constants from 'expo-constants';



const dataList = [{key:"1"},{key:"2"},{key:"3"},{key:"4"},{key:"5"},{key:"6"},{key:"7"},{key:"8"},{key:"9"},{key:"10"}]
const numColumns = 3
const WIDTH = Dimensions.get("window").width



function UsersProfileScreen({navigation,route}) {

const [name,setName] = useState();
const [name1,setName1] = useState();
const [profilephoto,setProfilephoto] = useState();
const [profilephoto1,setProfilephoto1] = useState();
const [username,setUsername] = useState();
const [username1,setUsername1] = useState()




const [follow,setFollow] = useState(0);
  useEffect(() => {
    
      firebase.firestore().collection("user").doc(route.params.userid).collection("takip").onSnapshot((QuerySnapshot)=>{
        const data = [];
      QuerySnapshot.forEach((doc)=> {
        data.push({
          ...doc.data(),
        }) 
        setFollow(data.length);
      })
      })
  
  }, [])


  const [follower,setFollower] = useState(0);
  useEffect(() => {
      firebase.firestore().collection("user").doc(route.params.userid).collection("takipci").onSnapshot((QuerySnapshot)=>{
        const data = [];
      QuerySnapshot.forEach((doc)=> {
        data.push({
          ...doc.data(),
        }) 
        setFollower(data.length);
      })
      })
  
  }, [])

  useEffect(() => {
    firebase.firestore().collection("user").doc(route.params.userid).onSnapshot((x) =>{
      
      setName(x.data().name)
      setProfilephoto(x.data().profilephoto)
      setUsername(x.data().username)

    })
    
  })

  const [photo,setPhoto] = useState();
  const [gonderi,setGonder] = useState(0);
  useEffect(() => {
    firebase.firestore().collection("user").doc(route.params.userid).collection("images").onSnapshot(user => {
      const DATA = []
      user.forEach((doc) => {
        DATA.push({
          ...doc.data()
        })
        setPhoto(DATA)
        setGonder(DATA.length)

      })

   })
  }, [])
  console.log(photo)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
        navigation.navigate("Login")
      }
      else{
      firebase.firestore().collection("user").doc(user.uid).onSnapshot(x => {
        setUsername1(x.data().username)
        setName1(x.data().name)
        setProfilephoto1(x.data().profilephoto)
      })
    }
    })
  }, [])

const goMessage = () =>{
  firebase.firestore().collection("chats").doc(route.params.userid).set({
    Chats:[username1,username]
  })
  navigation.navigate("Message",{userid:route.params.userid})
}
   
  function _renderItem  ({item,index})  {
    if(item.empty) {
      return <View style={styles.Item}/>
    }
      return(
        <TouchableOpacity style={styles.Item} onPress={() => navigation.navigate('OpenPhoto')}>
        <View >
          <Text style={styles.itemtext}>{item.key}</Text>
        </View>
        </TouchableOpacity>
      )
    }

    function FormatData (dataList,numColumns){
      const totalRows = Math.floor( dataList.length / numColumns)
      let totalLastRows = dataList.length - (totalRows * numColumns)

      while(totalLastRows !== 0 && totalLastRows !== numColumns){
        dataList.push({key: "blank", empty: true})
        totalLastRows++
      }
      return dataList
        }


  const [click, setClick] = useState();
  const [Title, setTitle] = useState("Takip Et");
  const [Type, setType] = useState("solid");

  
  useEffect(() => {
    
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
        navigation.navigate("Login")
      }
      else{
      firebase.firestore().collection("user").doc(user.uid).collection("takip").where("username","==",username).get().then((snapshot) => {
        setClick(snapshot.empty)
        console.log(snapshot.empty)
        if (snapshot.empty == true) {
          setTitle("Takip Et")
          setType("solid")
      }else{
        setTitle("Takipten Çık")
        setType("outline")
      }
        
      })
    }
    })
    
  },)

  const btntakip = () => {

    

    if(click == true){
      firebase.auth().onAuthStateChanged(user => {
        firebase.firestore().collection("user").doc(user.uid).collection("takip").doc(route.params.userid).set({
          takipid:route.params.userid,
          takip:true,
          name:name,
          username:username,
          profilephoto:profilephoto
        }, {merge:true})

        firebase.firestore().collection("user").doc(route.params.userid).collection("takipci").doc(user.uid).set({
          takipciid:user.uid,
          name:name1,
          username:username1,
          profilephoto:profilephoto1,
        },  {merge:true})


        
        setTitle("Takipten Çık")
        setType("outline")
          
        
      })
      
    }else{
      firebase.auth().onAuthStateChanged(user => {
        firebase.firestore().collection("user").doc(user.uid).collection("takip").doc(route.params.userid).delete();
        firebase.firestore().collection("user").doc(route.params.userid).collection("takipci").doc(user.uid).delete();
        setTitle("Takip Et")
          setType("solid")
    })
      
      
    }
  }
    return (
      <View style={{flex:1,backgroundColor:"white",marginTop: Constants.statusBarHeight}}>
        <View style={{borderBottomWidth:1,borderColor:"#d8d8d8",paddingTop:10,paddingBottom:10,}}>
          <View style={{marginLeft:11,marginRight:11,marginTop:3,marginBottom:3,flexDirection:"row",alignItems:"center",}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons
          name='arrow-back-outline'
          color='black'
          size={24}
        />
        </TouchableOpacity>
        <Text style={{marginLeft:10,fontWeight:"bold",}}>{username}</Text>
        </View>
        </View>
        <View style={styles.Profile}>

          <View style={styles.Profilealt}>
            <View style={styles.Avatar}>
            {
  profilephoto ==  "" ?

  <Avatar
  source={require("../images.jpg")}
size="large"
rounded
>
</Avatar>

:

<Avatar
source= {{uri:profilephoto}}
size="large"
rounded

>
</Avatar>

}
            </View>
            <View>
              <Button title={Title} type={Type} onPress={btntakip}/>
            </View>
          </View>




        </View>
        <View style={styles.Tanıt}>
        <View style={{marginLeft:15,marginBottom:10,flexDirection:"row",justifyContent:"space-between",}}>
                <Text style={{fontWeight:"bold",}}>{name}</Text>
                <TouchableOpacity style={{marginRight:20,borderWidth:1,padding:3,borderColor:"#076bb7",borderRadius:15,}} onPress={goMessage}>
              <Text>mesaj gönder</Text>
            </TouchableOpacity>
              </View>
          <View style={styles.Takip}>
          <View style={{alignItems:"center",flexDirection:"row",}}>
                <TouchableOpacity><Text style={{fontWeight:"bold",}}>{gonderi} <Text style={{color:"#076bb7",}}>Gönderi</Text></Text></TouchableOpacity>
              </View>
              <View style={{alignItems:"center",flexDirection:"row",}}>
              <TouchableOpacity onPress={() => navigation.navigate('userFollowup',{userid:route.params.userid})}><Text style={{fontWeight:"bold",}}>{follow}<Text style={{color:"#076bb7",}}>Takip</Text></Text></TouchableOpacity>
              </View>
              <View style={{alignItems:"center",flexDirection:"row",}}>
              <TouchableOpacity onPress={() => navigation.navigate('userFollower',{userid:route.params.userid})}><Text style={{fontWeight:"bold",}}>{follower} <Text style={{color:"#076bb7",}}>Takipçi</Text></Text></TouchableOpacity>
              </View>
            </View>
          </View>
        <View style={styles.ProfileFotoAlan}>
          <View style={styles.container}>
          <FlatList
            data = {photo}
            renderItem ={({item}) => (
              <View style={{alignItems:"center", paddingTop:5}}>
              <Image 
              style={{width:Dimensions.get("screen").width / 1.1,height:400,borderWidth:5,borderColor:"white"}} 
              source={{uri:item.imagesphoto}} 
              />
              
              </View>
            )}
            keyExtractor = {(item, index)=> index.toString()}
            
          />
          </View>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  Profile:{
    flex:1,
    backgroundColor:"white",
    justifyContent:"center",
  },
  Profilealt:{
    backgroundColor:"white",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
  },
  Takip:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
    marginBottom:20,
  },
  Durum:{
    width:110,
    marginLeft:20,
    marginBottom:20,
  },
  Tanıt:{
    backgroundColor:"white",
  },
  ProfileFotoAlan:{
    flex:2.2,
    flexDirection:"row",
  },
  Avatar:{
    marginBottom:10,
    alignItems:"center",
  },
  Foto:{
    flex:1,
  },
  container:{
    flex:1,
  },
  Item: {
    backgroundColor:"white",
    alignItems: "center",
    justifyContent:"center",
    height:100,
    flex:1,
    margin:1,
    height: WIDTH / numColumns,
  },
  itemtext:{
    color:"#ccc",
    fontSize:50,
  },
})
export default UsersProfileScreen
