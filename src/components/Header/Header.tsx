import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

const staticInfo = {
    name: 'Alfredo Navarro',
    uri: 'https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg'
};

const Header = ({navigation}) => {
    const { canGoBack, goBack } = useNavigation();
    const [name, setName] = useState('');

    useEffect(() => { 
        console.log('recargo header');
        getNameUSer();
    }, []);

    const getNameUSer = async () => {
        setName(await AsyncStorage.getItem('name'));
    }

    const handleClickPofile = () => {
        navigation.navigate('MiPerfil');
    }

    return(
        <View style={styles.container}>
            { canGoBack() ?  (
                <View style={styles.arrowContainer}>
                    <Button 
                        icon={<Icon name="arrow-back" size={24} />}  
                        type="clear" 
                        onPress={() => goBack()}
                    />
                </View>
            ): 
            undefined
            }

            { canGoBack() ?  (
                <Pressable onPress={handleClickPofile} style={{width: '90%', marginTop: 20, flexDirection: 'row'}}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.name}>{`Hello ${name !== null ? name : ""}`}</Text>
                        <Text style={styles.subtitle}>Welcome back to you goal</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Image source={require('../../assets-expo/avatar.png')} style={styles.profileImage} />
                    </View>
                </Pressable>
            ): 
                <Pressable onPress={handleClickPofile} style={{width: '100%', marginTop: 20, flexDirection: 'row'}}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.name}>{`Hello ${name !== null ? name : ""}`}</Text>
                        <Text style={styles.subtitle}>Welcome back to you goal</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Image source={require('../../assets-expo/avatar.png')} style={styles.profileImage} />
                    </View>
                </Pressable>
            }

            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },
    rightContainer: {
        flex: .5,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14
    },
    subtitle: {
        fontSize: 12,
        color: '#808080'
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 24,
        backgroundColor: '#0553'
    },
    arrowContainer: {
        marginLeft: -12,
        position: 'relative',
        top: 20
    }
})

export default Header;