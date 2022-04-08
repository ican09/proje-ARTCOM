import React, {useEffect,useState}  from 'react'
import { View, Text } from 'react-native'
import MainComp from './MainComp'


const HastaGiris = () => {
    const [ad,setAd] = useState("");
    
    useEffect(() => {
        setAd("izzet");    
        return () => {
            ad
        }
    }, [])
    return (
            <MainComp 
            btntitle={ad}
            />

    )
}


export default HastaGiris
