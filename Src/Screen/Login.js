import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import images from '../images'
import { TabBar, TabView } from 'react-native-tab-view'
import TextInputGB from '../Component/TextInput'
import ButtonWithBackground from '../Component/ButtonWithBackground'
import MainContainer from '../Component/MainContainer'
const Login = () => {
    const [loading, setLoading] = useState(false);
    const [EmaiId, setEmaiId] = useState('');
    const [EmaiIcode, setEmaiIdcode] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Mobilecode, setMobilecode] = useState('');
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'email', title: 'Email' },
        { key: 'phone', title: 'Phone' },
    ]);

    const HandleValidation = () => {
        setLoading(true);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (EmaiId == "" || EmaiId == undefined || EmaiId == "") {
            setLoading(false);
            Alert.alert("", "Please Enter Email Id")
        }
        else if (!emailRegex.test(EmaiId)) {
            setLoading(false);
            Alert.alert("", "Please Enter a valid Email Id")
        } else {
            setLoading(false);
            HandleLogin();
        }
    }

    const HandleLogin = () => {
        setLoading(true);
        try {
            var formdata = new FormData();
            formdata.append("email", EmaiId);
            fetch(`https://beta-gateway.theboxme.net/api/login`, {
                method: 'POST',
                body: formdata,
            })
                .then(response => {
                    if (response.ok) return response.json();
                    setLoading(false);
                    Alert.alert("", "Internet Error")
                    throw new Error('Network response was not ok');
                })
                .then((responseJson) => {
                    if (responseJson.mtype == "success") {
                        console.log("User data", responseJson)
                        if (responseJson) {
                            setLoading(false);
                            Alert.alert("", responseJson.message);
                        }
                        else {
                            setLoading(false);
                            Alert.alert("", responseJson.message);
                        }
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    Alert.alert("", 'Please try again after some time');
                })
        }
        catch {
            setLoading(false);
            Alert.alert("", 'Please try again after some time');
        }
    }

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            pressColor={'gray'}
            indicatorStyle={{ backgroundColor: '#93D500', height: 3 }}
            style={{ backgroundColor: 'white' }}
            renderLabel={({ route, focused }) => (
                <Text
                    style={{
                        fontSize: 14,
                        color: 'black'
                    }}>
                    {route.title}
                </Text>
            )} />
    );

    const renderScene = (route) => {
        switch (route.key) {
            case 'email':
                return (
                    <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
                        <View style={{ marginTop: 10 }}>
                            <TextInputGB
                                placeholder={'Enter registered email address'}
                                value={EmaiId}
                                onChangeText={(text) => {
                                    setEmaiId(text)
                                }}
                                maxLength={50}
                            />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: '5%', marginBottom: 20 }}>
                            <ButtonWithBackground
                                onPress={() => HandleValidation()}
                                text={'Get Verification Code'}
                            />
                        </View>

                        {/* <View style={{ marginTop: 10 }}>
                            <TextInputGB
                                value={EmaiIcode}
                                placeholder={'Enter 6 digit verification code.'}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    setEmaiIdcode(text)
                                }}
                                maxLength={50}
                            />
                        </View> */}
                    </View>
                );
            case 'phone':
                return (
                    <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
                        <View style={{ marginTop: 10 }}>
                            <TextInputGB
                                placeholder={'Enter registered phone number'}
                                value={Mobile}
                                onChangeText={(text) => {
                                    setMobile(text)
                                }}
                                maxLength={10}
                                keyboardType={'numeric'}
                            />
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: '5%', marginBottom: 20 }}>
                            <ButtonWithBackground
                                // onPress={() => HandleGetInTouch()}
                                text={'Get Verification Code'}
                            />
                        </View>
                        {/* <View style={{ marginTop: 10 }}>
                            <TextInputGB
                                value={Mobilecode}
                                placeholder={'Enter 6 digit verification code.'}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    setMobilecode(text)
                                }}
                                maxLength={50}
                            />
                        </View> */}
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <MainContainer loading={loading}>
            <View style={{ flex: 1, }}>
                <ScrollView contentContainerStyle={{ flex: 1, paddingHorizontal: 20, paddingVertical: 12, flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                    <Image source={images.logo} style={{ height: 35, width: 100, marginTop: 30 }} resizeMode="cover" />
                    <Image source={images.welcome} style={{ height: 30, width: 170, marginTop: '20%' }} resizeMode="cover" />
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: 'black', fontSize: 16, textAlign: "center" }}>Log in to continue your experience with</Text>
                        <Text style={{ color: 'black', fontSize: 16, textAlign: "center" }}>The Box</Text>
                    </View>
                    <View style={styles.container}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={(props) => renderScene(props.route)}  // Pass the data for the corresponding route
                            onIndexChange={setIndex}
                            renderTabBar={renderTabBar}
                            initialLayout={{ width: Dimensions.get('window').width }}
                        />
                    </View>
                </ScrollView>
            </View>
        </MainContainer>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15,
    },
})