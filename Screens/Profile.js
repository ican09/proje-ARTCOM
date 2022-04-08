import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View,FlatList, Dimensions,TouchableOpacity,Platform,Modal,Alert,Image, SnapshotViewIOSBase} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {Ionicons} from "@expo/vector-icons"
//firebase---------------------------------
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
//-----------------------------------------

function ProfileScreen({navigation}) {

  const [follow,setFollow] = useState(0);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user=>{
      if(!user){
        navigation.navigate("Login")
      }
      else{
      firebase.firestore().collection("user").doc(user.uid).collection("takip").onSnapshot((QuerySnapshot)=>{
        const data = [];
      QuerySnapshot.forEach((doc)=> {
        data.push({
          ...doc.data(),
        }) 
        setFollow(data.length);
      })
      })
    }
  })
  }, [])
  const [follower,setFollower] = useState(0);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      firebase.firestore().collection("user").doc(user.uid).collection("takipci").onSnapshot((QuerySnapshot)=>{
        const data = [];
      QuerySnapshot.forEach((doc)=> {
        data.push({
          ...doc.data(),
        }) 
        setFollower(data.length);
      })
      })
    })
  }, [])

//---------------------------------------
  const [gonderi,setGonderi] = useState(0);
  
//---------------------------------------

  const [image ,setImage] = useState()
  useEffect(() => {
 
   firebase.auth().onAuthStateChanged(user =>{
     if(!user){
       navigation.navigate("Login")
     }else{
  firebase.firestore().collection("user").doc(user.uid).onSnapshot(user => {
    setImage(user.data().profilephoto);
 })
}
   })
  }, [])
 
  //----------------------------------------------------
  

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const profilepickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      profileuploadimage(result.uri).then(() => {
        const filename = result.uri.split("/").pop();
      photourl(filename);
      })
      .catch(error => {
        Alert.alert('Error:', error.message)
      });
    }
   
  };
  const profileopenCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    // console.log(result);

    if (!result.cancelled) {
      profileuploadimage(result.uri).then(() => {
        // Alert.alert("succes");
        const filename = result.uri.split("/").pop();
      photourl(filename);
      })
      .catch(error => {
        Alert.alert('Error:', error.message)
      });
      

    }
  }
  const profileuploadimage = async (uri) =>{
    const filename = uri.split("/").pop();
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref("images/").child(filename);
    return ref.put(blob);
    
  }
  const [avatar, setAvatar] = useState("");
  const photourl = async (filename) =>{
    firebase.storage().ref("images/").child(filename).getDownloadURL().then((url) => {
      firebase.auth().onAuthStateChanged(user =>{
        firebase.firestore().collection("user").doc(user.uid).set({
          profilephoto: url,
        }, {merge:true})
         })
    }).catch(error => {
      Alert.alert('Error:', error.message)
    });
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user =>{
    if(!user){
      navigation.navigate("Login")
    }else{
      firebase.firestore().collection("user").doc(user.uid).onSnapshot(user => {
       setAvatar(user.data().profilephoto);
     })
    }
       })
  },)
    
  

  //----------------------------------------------------

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      uploadimage(result.uri).then(() => {
        const filename = result.uri.split("/").pop();
      photourllist(filename);
      })
      .catch(error => {
        Alert.alert('Error:', error.message)
      });
    }
   
  };
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    // console.log(result);

    if (!result.cancelled) {
      uploadimage(result.uri).then(() => {
        const filename = result.uri.split("/").pop();
      photourllist(filename);
      })
      .catch(error => {
        Alert.alert('Error:', error.message)
      });
    }
  }
    
  const uploadimage = async (uri) =>{
    const filename = uri.split("/").pop() 
    
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref("images/").child(filename);
    return ref.put(blob);
  }

  const photourllist = async (filename) =>{
    firebase.storage().ref("images/").child(filename).getDownloadURL().then((url) => {
      firebase.auth().onAuthStateChanged(user =>{
        firebase.firestore().collection("user").doc(user.uid).collection("images").add({
          imagesphoto: url,
          username:username,
          profilephoto:avatar,
          userid:user.uid
        })
         })
    }).catch(error => {user
      Alert.alert('Error:', error.message)
    });
  }
const [photo,setPhoto] = useState([]);
console.log(photo)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user =>{
    if(!user){
      navigation.navigate("Login")
    }else{
      firebase.firestore().collection("user").doc(user.uid).collection("images").onSnapshot(user => {
        const DATA = []
        user.forEach((doc) => {
          DATA.push({
            ...doc.data()
          })
          setPhoto(DATA)
       setGonderi(DATA.length)

        })

     })
    }
       })
  },[])
  //----------------------------------------------------

  const [username,setUsername] = useState();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
        navigation.navigate("Login")
      }
      else{
      firebase.firestore().collection("user").doc(user.uid).onSnapshot(snapshot => {
        setUsername(snapshot.data().username)
      })
    }
    })
  }, [])

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2,setModalVisible2] = useState(false);

  const [name ,setName] = useState("");




  useEffect(() => {
    
    firebase.auth().onAuthStateChanged((user) =>{
      if(!user){
        navigation.navigate("Login")
      }else{
      setName(user?.displayName ?? "")
      user.displayName
    }
    })
    
  }, [])



//---------------------------------------------------------------------------------------------------------------


    return (
      
      <View style={{flex:1,backgroundColor:"white"}}>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginLeft:10,marginRight:10,marginTop:5,}}>
          <TouchableOpacity onPress={() => navigation.navigate('Chats') }>
        <Icon
          name='sc-telegram'
          type='evilicon'
          color='#517fa4'
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Icon
          name='ellipsis-horizontal-circle-outline'
          type='ionicon'
          color='#517fa4'
        />
        </TouchableOpacity>
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex:1,justifyContent:"flex-end",backgroundColor:"#000000aa",}}>
          <View style={{backgroundColor:"#ededed",borderTopLeftRadius:15,borderTopRightRadius:15,}}>
            <TouchableOpacity style={{borderTopLeftRadius:15,borderTopRightRadius:15,alignItems:"center",backgroundColor:"white",}} onPress={profilepickImage}><Text style={{padding:10,}}>Galeriden ekle</Text></TouchableOpacity>
            <TouchableOpacity style={{borderBottomLeftRadius:15,borderBottomRightRadius:15,alignItems:"center",backgroundColor:"white",}} onPress={profileopenCamera}><Text style={{padding:10,}}>Fotoğraf çek</Text></TouchableOpacity>
            <TouchableOpacity style={{marginTop:10,marginBottom:10,borderRadius:15,alignItems:"center",backgroundColor:"white",marginRight:100,marginLeft:100,}} onPress={() => setModalVisible(false)}><Text style={{padding:10,}}>Geri gel</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
<View style={{flex:1,justifyContent:"flex-end",backgroundColor:"#000000aa",}}>
          <View style={{backgroundColor:"#ededed",borderTopLeftRadius:15,borderTopRightRadius:15,}}>
            <TouchableOpacity style={{borderTopLeftRadius:15,borderTopRightRadius:15,alignItems:"center",backgroundColor:"white",}} onPress={pickImage}><Text style={{padding:10,}}>Galeriden ekle</Text></TouchableOpacity>
            <TouchableOpacity style={{borderBottomLeftRadius:15,borderBottomRightRadius:15,alignItems:"center",backgroundColor:"white",}} onPress={openCamera}><Text style={{padding:10,}}>Fotoğraf çek</Text></TouchableOpacity>
            <TouchableOpacity style={{marginTop:10,marginBottom:10,borderRadius:15,alignItems:"center",backgroundColor:"white",marginRight:100,marginLeft:100,}} onPress={() => setModalVisible2(false)}><Text style={{padding:10,}}>Geri gel</Text></TouchableOpacity>
          </View>
        </View>

      </Modal>
        <View style={styles.Profile}>

          <View style={styles.Profilealt}>
            <View style={styles.Avatar}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>

{
  avatar ==  "" ?

  <Avatar
  source={require("../images.jpg")}
rounded
size="large"
>
</Avatar>

:

<Avatar
source= {{uri:avatar}}
rounded
size="large"
>
</Avatar>

}

           
</TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.Tanıt}>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20,}}>
        <View style={{marginLeft:15,marginBottom:10,}}>
                <Text style={{fontWeight:"bold",}}>{name}</Text>
              </View>
          
            <TouchableOpacity style={{marginRight:20,}} onPress={() => setModalVisible2(true)}>
              <Ionicons
                name='camera-outline'
                size={25}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Takip}>
            <View style={{alignItems:"center",flexDirection:"row",}}>
                <TouchableOpacity><Text style={{fontWeight:"bold",}}>{gonderi} <Text style={{color:"#517fa4",}}>Gönderi</Text></Text></TouchableOpacity>
              </View>
              <View style={{alignItems:"center",flexDirection:"row",}}>
              <TouchableOpacity onPress={() => navigation.navigate('Followup')}><Text style={{fontWeight:"bold",}}>{follow} <Text style={{color:"#517fa4",}}>Takip</Text></Text></TouchableOpacity>
              </View>
              <View style={{alignItems:"center",flexDirection:"row",}}>
              <TouchableOpacity onPress={() => navigation.navigate('Follower')}><Text style={{fontWeight:"bold",}}>{follower} <Text style={{color:"#517fa4",}}>Takipçi</Text></Text></TouchableOpacity>
              </View>
            </View>
          </View>
        <View style={styles.ProfileFotoAlan}>
          <FlatList
            data = {photo}
            renderItem ={({item})  => 
            
            (

              <View style={{alignItems:"center", paddingTop:5}}>
              <Image 
              style={{width:Dimensions.get("screen").width / 1.1,height:400,borderWidth:5,borderColor:"white"}} 
              source={{uri:item.imagesphoto}} 
              />
              
              </View>
       
            )
            
          }
          keyExtractor = {(item, index)=> index.toString()}

          />
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  Profile:{
    flex:0.8,
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
  itemtext:{
    height:250,
  },
})
export default ProfileScreen