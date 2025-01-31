import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

export default function ButtonWithBackground({text,onPress}) {
  return (
    <TouchableOpacity onPress={onPress}
    style={{paddingVertical:10 ,backgroundColor: '#93D500',margin: 15, width:'100%', borderRadius: 15, shadowColor: 'black', elevation: 3, shadowOpacity: .5 }}>
        <Text style={{color:'black',textAlign:'center',fontSize:16}}>
            {text}
        </Text>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({})