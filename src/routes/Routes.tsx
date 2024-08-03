import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../view/home/Home";
import AddFood from "../view/AddFood/AddFood";
import MiPerfil from "../view/MiPerfil/MiPerfil";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home"
                    component={Home}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name="AddFood"
                    component={AddFood}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name="MiPerfil"
                    component={MiPerfil}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;