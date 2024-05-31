import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header/Header";

const Home = () => {
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Header />
                <Text>Home</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        paddingTop: 40
    }
})

export default Home;