import React, { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Meal } from "../../types";
import MealItem from "../MealItem/MealItem";

type TodayMealsProps = {
    foods: Meal[];
    onCompleteAddRemove?: () => void;
}

const TodayMeals:FC<TodayMealsProps> = ({ foods, onCompleteAddRemove }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Comidas</Text>
            <ScrollView style={styles.content}>
                { foods.map((meal: Meal, index) => <MealItem key={`today-meal-item-${meal.name}-${index}`} {...meal} onCompleteAddRemove={onCompleteAddRemove} itemPosition={index}/>) }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24
    },
    title: {
        fontSize: 16
    },
    content: {

    }
});

export default TodayMeals;