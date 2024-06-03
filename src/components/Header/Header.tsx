import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/base";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const staticInfo = {
    name: 'Alfredo Navarro',
    uri: 'https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg'
};

const Header = () => {
    const { canGoBack, goBack } = useNavigation();

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
            ): undefined

            }
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{`Hello ${staticInfo.name}`}</Text>
                <Text style={styles.subtitle}>Welcome back to you goal</Text>
            </View>
            <View style={styles.rightContainer}>
                <Image source={require('../../assets-expo/avatar.png')} style={styles.profileImage} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContainer: {
        flex: 1,
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
        marginLeft: -12
    }
})

export default Header;