import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Header from "../../components/Header";
import { Button, Icon, Input } from "@rneui/base";
import AddFoodModal from "../../components/AddFoodModal/addFoodModal";
import UseFoodStorage from "../../hooks/useFoodStorage";
import { ScrollView } from "react-native";
import MealItem from "../../components/MealItem/MealItem";
import { Meal } from "../../types";
import styleGlobal from "../../styleGlobal";

const AddFood = ({navigation}) => {
    const [visible, setVisible] = useState<boolean>(false); 
    const [foods, setFoods] = useState([]);
    const [search, setSearch] = useState('')
    const { onGetFoods } = UseFoodStorage(); 

    const loadFoods = async() => {
        try{
            const foodResponse = await onGetFoods();
            // console.log(foodResponse);
            setFoods(foodResponse);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        loadFoods().catch(null);    
    }, []);

    const handleModalClose = async (shouldUpdate?: boolean) => {
        if(shouldUpdate ){
            Alert.alert('¡Comida guardada exitosamente!');
            loadFoods();
        }
        setVisible(false);
    }

    const handleSearchPress = async() => {
        try{
            const result = await onGetFoods();
            setFoods(result.filter((item: Meal) => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())));
        }catch(error){
            console.error(error);
            setFoods([]);
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            
            <View style={styles.addFoodContainer}>
                <View style={styles.legendContainer}>
                    <Text style={styles.addFoodLegend}>Add Food</Text>
                </View>
                <View style={styles.addFoodBtnContainer}>
                    {/* <Button 
                        icon={<Icon name="add-circle-outline" color={'#fff'} />} 
                        radius={"lg"}
                        color="#4ecb71"
                        onPress={() => setVisible(true)}
                    /> */}
                    <TouchableOpacity style={[styles.btnAdd]} onPress={() => setVisible(true)}>
                        <Icon name="add-circle-outline" color="white"/>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.searchContainer}>
                <View style={styles.inputContainer}>
                    <Input placeholder="apples, pie, soda..." value={search} onChangeText={(text:string) => setSearch(text)}/>
                </View>
                <View>
                    {/* <Button 
                        title={"Search"} 
                        radius={"lg"} 
                        color="#4ecb71" 
                        titleStyle={styles.searchBtn}
                        onPress={handleSearchPress}    
                    /> */}
                    <TouchableOpacity style={styles.btnAdd} onPress={handleSearchPress} >
                        <Text style={styles.searchBtn}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content}>
                {foods?.map(meal => (
                    <MealItem key={`my-meal-item-${meal.name}`} {...meal} isAbleToAdd/>
                ))}
            </ScrollView>

            <AddFoodModal visible={visible} onClose={handleModalClose} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    content: {

    },
    container: {
        paddingTop: 50,
        padding: 15,
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 15
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
    addFoodLegend: {
        fontSize: 20
    },
    searchContainer: {
        flexDirection: 'row'
    },
    inputContainer: {
        flex: 1,
        marginLeft: -12
    },
    searchBtn: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    btnAdd: {
        backgroundColor: styleGlobal.backgroundGlobal.background, // AppStyles.backgroundGlobal.background,
        padding: 10, 
        borderRadius: 13
    },
})

export default AddFood;