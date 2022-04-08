import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView,TouchableOpacity,SafeAreaView} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import Constants from 'expo-constants';

function OpenPhotoScreen({navigation}) {
  const kulad = "izzet can"; //veri tabanından çekilecek
  const photoyorum ="fotografın yorumu buraya gelecek fotografın yorumu buraya gelecek fotografın yorumu buraya gelecek fotografın yorumu buraya gelecek fotografın yorumu buraya gelecek"; //veri tabanından çekilecek
  
  
  const [click1, setClick1] = useState(false);
  const [iconName1, setİconName1] = useState('bookmark-outline');
  function Icononclick1(){
  // console.log(click);
  var focus;
  if(click1 == false){
    setClick1(true);
    setİconName1('bookmark')
  }
  else if(click1 == true){
    setClick1(false);
    setİconName1("bookmark-outline")

  }
  }
  const [click2, setClick2] = useState(false);
  const [iconName2, setİconName2] = useState('chatbubble-outline');
  function Icononclick2(){
    // console.log(click);
    var focus;
    if(click2 == false){
      setClick2(true);
      setİconName2('chatbubble')
    }
    else if(click2 == true){
      setClick2(false);
      setİconName2("chatbubble-outline")
  
    }
  }
  const [click3, setClick3] = useState(false);
  const [iconName3, setİconName3] = useState('heart-outline');
  function Icononclick3(){
    // console.log(click);
    var focus;
    if(click3 == false){
      setClick3(true);
      setİconName3('heart')
    }
    else if(click3 == true){
      setClick3(false);
      setİconName3("heart-outline")
  
    }
  }

    return (
      <View style={{ flex: 1,}}>
        <ScrollView>
        <View style={styles.HomeShareScreen}>
          <View style={styles.HomeShareProfile}>
            <View style={{marginRight:7,marginLeft:5,}}>
            <TouchableOpacity>
            <Avatar
  rounded
  source={require('../images.jpg')} 
/>
</TouchableOpacity>
            </View>
            <View >
              <Text>İzzet Can</Text>
            </View>
          </View>

          <View style={styles.HomeSharePhoto}>
            {/* <View style={{backgroundColor:"red",}}>
              <View>FOTO ALAN</View>
            </View> */}
          </View>

          <View style={styles.HomeShareCommend}>
           
            
            <View style={{flexDirection:"row"}}>
            <View>

                <Icon name={iconName3} type='ionicon' onPress={Icononclick3} />
                </View>
                <View style={{paddingHorizontal:6}}>

              <Icon name="chatbubble-outline" type='ionicon' />
                </View>
            </View>
            <View>
                <Icon name={iconName1} type='ionicon' onPress={Icononclick1} />
              </View>
            
          </View>
          <View>
              <Text style={{marginLeft:5,marginTop:5,}}><Text style={{fontWeight:"bold"}}>{kulad}:</Text> {photoyorum}</Text>
            </View>
        </View>

        </ScrollView>
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
    marginHorizontal:6
  },
})

export default OpenPhotoScreen