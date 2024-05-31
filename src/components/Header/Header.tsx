import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const staticInfo = {
    name: 'Alfredo Navarro',
    uri: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2022/03/avatar-facebook-2632445.jpg?tf=3840x'
};

const Header = () => {
    return(
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{`Hello ${staticInfo.name}`}</Text>
                <Text style={styles.subtitle}>Welcome back to you goal</Text>
            </View>
            <View style={styles.rightContainer}>
                <Image source={{uri: staticInfo.uri}} style={styles.profileImage}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    leftContainer: {

    },
    rightContainer: {

    },
    name: {

    },
    subtitle: {

    },
    profileImage: {
        
    }
})

export default Header;