import { StyleSheet, View, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'

const MainContainer = ({ children, Loading,
}) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar barStyle={"dark-content"} backgroundColor={!Loading ? 'white' : 'gray'} />
            {
                Loading == true ? (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <ActivityIndicator size={"large"} color={'#93D500'} />
                    </View>
                ) : (
                    <View style={{ flex: 1, }}>
                        {children}
                    </View>
                )
            }
        </SafeAreaView>
    )
}

export default MainContainer

const styles = StyleSheet.create({})