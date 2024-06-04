import React, { FC } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Meal } from "../../types";
import { Button, Icon } from "@rneui/themed";
import UseFoodStorage from "../../hooks/useFoodStorage";

const MealItem: FC<Meal> = ({calories, portion, name}) => {
    const { onSaveTodayFood } = UseFoodStorage();
    const handleAddItemPress = async() => {
        try{
            await onSaveTodayFood({calories, portion, name});
            Alert.alert('¡Comida agregada al dia!');
        }catch(error){
            Alert.alert('¡Error!, comida no agregada');
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.portion}>{portion}</Text>
            </View>
            <View style={styles.rightContiner}>
                <Button 
                    icon={<Icon name="add-circle-outline" />} 
                    type="clear" 
                    style={styles.iconBtn}
                    onPress={handleAddItemPress}
                />
                <Text style={styles.calories}>{calories} cal</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4ecb71',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
    },
    portion: {
        fontSize: 13,
        color: '#808080',
        fontWeight:'500'
    },
    calories: {
        fontSize: 18
    },
    iconBtn: {
        marginBottom: -8
    }
})

export default MealItem;