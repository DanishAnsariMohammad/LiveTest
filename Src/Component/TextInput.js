import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

export default function TextInputGB ({placeholder, maxLength,placeholderTextColor,keyboardType,value,onChangeText,editable,onFocus, ...props}) {
  const handleFocus = (event) => {
    if (onFocus) {
      onFocus(event);
    }
  };

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderColor: 'gray', borderRadius: 10, borderWidth: 1,}}>
    <TextInput
    placeholder={placeholder}
    placeholderTextColor={placeholderTextColor}
    keyboardType={keyboardType}
    value={value}
    onChangeText={onChangeText}
    editable={editable}
    style={{color:'black',width:'100%',paddingHorizontal:10}}
    onFocus={handleFocus}
    maxLength={maxLength}
    {...props}
    />
   </View>
  )
}

const styles = StyleSheet.create({})