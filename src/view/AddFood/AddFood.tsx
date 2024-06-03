import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/base";

const AddFood = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Header />
            
            <View style={styles.addFoodContainer}>
                <View style={styles.legendContainer}>
                    <Text>Add Food</Text>
                </View>
                <View style={styles.addFoodBtnContainer}>
                    <Button icon={<Icon name="add-circle-outline" color={'#fff'} />} 
                        radius={"lg"}
                        color="#4ecb71"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container: {
        paddingTop: 50,
        padding: 15
    },
    addFoodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24
    },
    legendContainer: {
        flex: 1
    },
    addFoodBtnContainer: {
        flex: 1,
        alignItems: 'flex-end'
    },
})

export default AddFood;