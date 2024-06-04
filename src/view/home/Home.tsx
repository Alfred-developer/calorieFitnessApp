import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header/Header";
import { Button, Icon } from '@rneui/themed';
import UseFoodStorage from "../../hooks/useFoodStorage";
import { useFocusEffect } from "@react-navigation/native";
import { Meal } from "../../types";

const Home = ({navigation}) => {
    const [todayFood, setTodayFood] = useState<Meal[]>([])
    const { onGetTodayFood } = UseFoodStorage();

    const loadTodayFood = useCallback(async() => {
        try{
            const todayFoodResponse = await onGetTodayFood();
            setTodayFood(todayFoodResponse);
        }catch(error){
            setTodayFood([]);
            console.log(error);
        }
    }, []);

    useFocusEffect(useCallback(() => {
        loadTodayFood().catch(null);
    }, [loadTodayFood]));

    const handleAddCaloriesPress = () => {
        navigation.navigate('AddFood');
    }

    console.log(todayFood);

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Header />
                <View style={styles.caloriesContainer}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.caloriesLegend}>Calories</Text>
                    </View>
                    <View style={styles.rightContainer}>
                    <Button radius={"lg"} type="solid" color="#4ecb71"  onPress={handleAddCaloriesPress}>
                        <Icon name="add-circle-outline" color="white"/>
                    </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 15,
        backgroundColor: '#fff'
    },
    caloriesContainer: {
        flexDirection: 'row',
        alignItems:'center',
        marginVertical: 24
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    caloriesLegend: {
        fontSize: 20
    }
})

export default Home;