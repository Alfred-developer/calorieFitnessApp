import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header/Header";
import { Button, Icon } from '@rneui/themed';
import UseFoodStorage from "../../hooks/useFoodStorage";
import { useFocusEffect } from "@react-navigation/native";
import { Meal } from "../../types";
import TodayCalories, { TodayCaloriesProps } from "../../components/TodayCalories/todayCalories";
import TodayMeals from "../../components/TodayMeals/todayMeals";

const totalCaloriesPerDay = 2000; 

const Home = ({navigation}) => {
    const [todayFood, setTodayFood] = useState<Meal[]>([])
    const { onGetTodayFood } = UseFoodStorage();
    const [todayStadistics, setTodayStadistics] = useState<TodayCaloriesProps>({
        consumed: 0,
        percentage: 0,
        remaining: 0,
        total: totalCaloriesPerDay
    });

    const calculatTodayStatics = (meals: Meal[]) => {
        try{
            const caloriesConsumed = meals.reduce((acum, curr) => acum + Number(curr.calories), 0);
            const remainigCalories = totalCaloriesPerDay - caloriesConsumed;
            const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;
            setTodayStadistics({
                consumed: caloriesConsumed,
                percentage,
                remaining: remainigCalories,
                total: totalCaloriesPerDay
            });
        }catch(error){
            console.error(error); 
        }
    }

    const loadTodayFood = useCallback(async() => {
        try{
            const todayFoodResponse = (await onGetTodayFood()) as Meal[];
            calculatTodayStatics(todayFoodResponse);
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

            <TodayCalories {...todayStadistics}/>

            <TodayMeals foods={todayFood} onCompleteAddRemove={() => loadTodayFood()}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 15
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