import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../types';

const My_Food_Key = '@MyFood:Key';
const My_Today_Food_Key = '@MyTodayFood:Key'

const UseFoodStorage = () => {
    const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
        try{
            const currentSavedFood = await AsyncStorage.getItem(storageKey);

            if(currentSavedFood !== null){
                const currentSavedFoodParse = JSON.parse(currentSavedFood);
                currentSavedFoodParse.push(meal);

                await AsyncStorage.setItem(storageKey, JSON.stringify(currentSavedFoodParse));

                return Promise.resolve();
            }

            await AsyncStorage.setItem(
                storageKey, 
                JSON.stringify([
                    meal
                ])
            )

            return Promise.resolve();
        }catch(error){
            console.error(error)
            return Promise.reject(error);
        }
    }

    const handleSaveFood = async({calories, name, portion}: Meal) => {
        try{
            const result = await saveInfoToStorage(My_Food_Key, {calories, name, portion});
            return Promise.resolve(result);
        }catch(error){
            return Promise.reject(error);
        }
    };

    const handleGetFoods = async() => {
        try{
            const foods = await AsyncStorage.getItem(My_Food_Key);
            if(foods !== null ){
                const parsedFood = JSON.parse(foods);
                return Promise.resolve(parsedFood);
            }
        }catch(error){
            return Promise.reject(error);
        }
    };

    const handleSaveTodayFoods = async ({calories, name, portion, date}: Meal) => {
        try{
            const result = await saveInfoToStorage(My_Today_Food_Key, {
                calories, 
                name, 
                portion, 
                date: new Date().toISOString()
            });
            return Promise.resolve(result);
        }catch(error){
            return Promise.reject(error);
        }
    };

    const handleGetTodayFood = async() => {
        try{
            const foods = await AsyncStorage.getItem(My_Today_Food_Key);
            if(foods !== null ){
                const parsedFood = JSON.parse(foods);
                return Promise.resolve(parsedFood);
            }
        }catch(error){
            return Promise.reject(error);
        }
    }

    return{
        onSaveFood: handleSaveFood,
        onGetFoods: handleGetFoods,
        onSaveTodayFood: handleSaveTodayFoods,
        onGetTodayFood: handleGetTodayFood
    }
}

//  Metodo para guardar informacion de comida del dia de hoy
//  Metodo para obtener la comida del dia de hoy
export default UseFoodStorage;