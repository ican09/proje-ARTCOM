
import React, {useEffect, useState} from 'react';

//Navigation---------------------------------------
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//-------------------------------------------------
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens------------------------------------
import HomeScreen from './Screens/Home';
import SearchScreen from './Screens/Search';
import ProfileScreen from './Screens/Profile';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import OpenPhotoScreen from './Screens/openphoto';
import FollowerScreen from './Screens/follower';
import FollowupScreen from './Screens/followup';
import UsersProfileScreen from './Screens/usersprofil';
import Chats from './Screens/Chats';
import Settings from './Screens/Settings';
import Message from './Screens/Message';
import userFollowerScreen from './Screens/userfollower';
import userFollowupScreen from './Screens/userfollowup';
//------------------------------------------------
import firebase from 'firebase/compat/app';



const Tab = createBottomTabNavigator();

const TabBottom = ({navigation})=>{


  const [username ,setUsername] = useState()
 useEffect(() => {

  firebase.auth().onAuthStateChanged(user =>{
    if(!user){
      navigation.navigate("Login")
    }
    else{
 firebase.firestore().collection("user").doc(user.uid).onSnapshot(user => {
  setUsername(user.data().username);
})
}
  })
 }, [])


 
return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === "profile"){
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerTitle:"Artcom"}} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="profile" component={ProfileScreen} options={{headerTitle:username}}/>
      </Tab.Navigator>
);
}
//profileScreen kısmında name yerine veri tabanından kullanıcı adı gelecek



const Stack = createNativeStackNavigator();

const Tabs = () => {
return(
    
    <Stack.Navigator> 
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Main" component={TabBottom} options={{headerShown:false}}/>
      <Stack.Screen name="OpenPhoto" component={OpenPhotoScreen} />
      <Stack.Screen name="Follower" component={FollowerScreen} />
      <Stack.Screen name="Followup" component={FollowupScreen} />
      <Stack.Screen name="UserProfile" component={UsersProfileScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Chats" component={Chats}/>
      <Stack.Screen name="Settings" component={Settings}/>
      <Stack.Screen name="Message" component={Message}/>
      <Stack.Screen name='userFollower' component={userFollowerScreen}/>
      <Stack.Screen name='userFollowup' component={userFollowupScreen}/>
    </Stack.Navigator>
  
)
}

export default Tabs;