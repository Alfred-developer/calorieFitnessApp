import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";

const staticInfo = {
    name: 'Alfredo Navarro',
    uri: 'https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg'
};

const Header = ({navigation}) => {
    const { canGoBack, goBack } = useNavigation();
    const [ name, setName ] = useState('');
    const [ imgUser, setImgUser ] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => { 
        console.log('recargo header');
        getDataUser();
    }, []);

    const getDataUser = async () => {
        setName(await AsyncStorage.getItem('name'));
        setImgUser(await AsyncStorage.getItem('imageProfileUser'));
    }

    const handleClickPofile = () => {
        navigation.navigate('MiPerfil');
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getDataUser();
        setTimeout(() => {
        setRefreshing(false);
        }, 1000);
    }, []);

    return(
        <><View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            {canGoBack() ? (
                <Pressable onPress={handleClickPofile} style={{ width: '100%', marginTop: 20, flexDirection: 'row' }}>
                    <View>
                        <Button
                            icon={<Icon name="arrow-back" size={24} />}
                            type="clear"
                            onPress={() => goBack()} />
                    </View>
                    <View style={styles.leftContainer}>
                        <Text style={styles.name}>{`Hello ${name !== null ? name : ""}`}</Text>
                        <Text style={styles.subtitle}>Welcome back to you goal</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Image source={imgUser} style={styles.profileImage} />
                    </View>
                </Pressable>
            ) :
                <Pressable onPress={handleClickPofile} style={{ width: '100%', marginTop: 20, flexDirection: 'row' }}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.name}>{`Hello ${name !== null ? name : ""}`}</Text>
                        <Text style={styles.subtitle}>Welcome back to you goal</Text>
                    </View>
                    <View style={styles.rightContainer}>
                        <Image source={imgUser} style={styles.profileImage} />
                    </View>
                </Pressable>
            }
            </ScrollView>
        </View></>
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
        width: 50,
        height: 50,
        borderRadius: 24,
        backgroundColor: '#0553'
    },
    scrollView: {
        // flex: 1,
    },
})

export default Header;