import React, { useEffect, useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import PagerView from 'react-native-pager-view';
import { Input } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";

const arryColors = [
    {
        color: '#4ecb71',
        id: 1
    },
    {
        color: 'red',
        id: 2
    },
    {
        color: 'orange',
        id: 3
    },
    {
        color: 'pink',
        id: 4
    },
    {
        color: 'gray',
        id: 5
    },
    {
        color: '#e63950',
        id: 6
    },
    {
        color: '#46aaca',
        id: 7
    },
    {
        color: '#6af3f3',
        id: 8
    },
    {
        color: '#f5a842', // orange
        id: 9
    }
]

const MiPerfil = ({navigation}) => {
    const { canGoBack, goBack } = useNavigation();
    const [colorPressabled, setColorPressabled] = useState(false);
    const inputName = useRef(null);
    const inputAge = useRef(null);
    const inputWeight = useRef(null); // Peso
    const inputHeight = useRef(null); // Altura
    const [nameUser, setNameUser] = useState('');
    const [ageUser, setAgeUser] = useState('');
    const [weightUser, setWeightUser] = useState(null);
    const [heightUser, setHeightUser] = useState(null);
    const [imcUser, setImcUser] = useState(null);

    useEffect(() => {
        getDataProfileUser();
        calcularImc();
    }, []);

    const calcularImc = async () => {
        var peso =  await AsyncStorage.getItem('weight');
        var altura = await AsyncStorage.getItem('height');
        var imc =  Number(peso) / (Number(altura) * Number(altura));
        setImcUser(String(imc).substring(0, 5));
    }

    const getDataProfileUser = async () => {
        setNameUser(await AsyncStorage.getItem('name'));
        setAgeUser(await AsyncStorage.getItem('age'));
        setWeightUser(await AsyncStorage.getItem('weight'));
        setHeightUser(await AsyncStorage.getItem('height'));
    }

    const setDataLocalStorage = async (e, val) => {
        console.log('Data => ', e.nativeEvent.text);
        switch( val ){
            case 1: 
                await AsyncStorage.setItem('name', e.nativeEvent.text);

            break;
            case 2:
                await AsyncStorage.setItem('age', e.nativeEvent.text);
            break;
            case 3:
                await AsyncStorage.setItem('weight', e.nativeEvent.text);
                calcularImc();
            break;
            case 4:
                await AsyncStorage.setItem('height', e.nativeEvent.text); 
                calcularImc();
            break;
        }
    }

    const handleClickEdit = ( val ) => {
        switch(val){
            case 1:
                inputName.current.focus();
            break
            case 2:
                inputAge.current.focus();
            break
            case 3:
                inputWeight.current.focus();
            break
            case 4:
                inputHeight.current.focus();
            break
        }
    }

    const handleColorSelected = (index) => {
        console.log(index);
        setColorPressabled(true);

    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.arrowContainer}>
                <Button 
                    icon={<Icon name="arrow-back" size={24} />}  
                    type="clear" 
                    onPress={() => goBack()}
                />
            </View>

            <ScrollView>
            <View style={styles.containerDataUser}>
                <Image source={require('../../assets-expo/avatar.png')} style={styles.imgProfile} />
                
                {/* <View style={styles.contentName}>
                    <Text style={styles.nameUser}>Alfredo Navarro Lizarraga</Text>
                </View> */}
            </View>

            

            <View style={styles.containerData}>
                <View style={styles.contentData}>
                    <Text style={styles.titleData}>Nombre:</Text>
                    <Input 
                        style={styles.subtitleData} 
                        rightIcon={<Icon name="edit" onPress={() => handleClickEdit(1)}></Icon>} 
                        ref={inputName}
                        placeholder="Ingresa tu nombre"
                        onChange={(e) => setDataLocalStorage(e, 1)}
                        defaultValue={nameUser}
                    />
                </View>
                <View style={styles.contentData}>
                    <Text style={styles.titleData}>Edad:</Text>
                    <Input 
                        style={styles.subtitleData} 
                        rightIcon={<Icon name="edit" onPress={() => handleClickEdit(2)}></Icon>} 
                        ref={inputAge}
                        placeholder="Ingresa tu edad"
                        onChange={(e) => setDataLocalStorage(e, 2)}
                        defaultValue={ageUser}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.contentData}>
                    <Text style={styles.titleData}>Peso:</Text>
                    <Input 
                        style={styles.subtitleData} 
                        rightIcon={<Icon name="edit" onPress={() => handleClickEdit(3)}></Icon>} 
                        ref={inputWeight}
                        placeholder="Ingresa tu peso"
                        onChange={(e) => setDataLocalStorage(e, 3)}
                        defaultValue={weightUser}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.contentData}>
                    <Text style={styles.titleData}>Altura:</Text>
                    <Input 
                        style={styles.subtitleData} 
                        rightIcon={<Icon name="edit" onPress={() => handleClickEdit(4)}></Icon>} 
                        ref={inputHeight}
                        placeholder="Ingresa tu altura"
                        onChange={(e) => setDataLocalStorage(e, 4)}
                        defaultValue={heightUser}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.contentData}>
                    <Text style={styles.titleData}>IMC:</Text>
                    <Input 
                        style={[styles.subtitleData, {color: 'black', opacity: 1}]} 
                        defaultValue={imcUser}
                        disabled={true}
                    />
                </View>
            </View>

            <View style={styles.containerSwiper}>
                <View>
                    <Text style={styles.titleData}>Selecciona el color para la app</Text>
                </View>
                <View style={styles.containerPager}>
                    <ScrollView horizontal>
                        { arryColors.map((resp, index) => 
                            <TouchableOpacity 
                                style={[
                                    // colorPressabled ? styles.colorSelected : null, 
                                    resp.id === index && styles.colorSelected,
                                    styles.btnColorsArry,
                                    {backgroundColor: `${resp.color}`}
                                ]}
                                key={`colors-${index}`}
                                onPress={() => {handleColorSelected(index)}}
                            />
                        )}
                    </ScrollView>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    arrowContainer: {
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 10,
        marginTop: 0,

    },
    containerDataUser: {
        alignItems: 'center',
        marginTop: -15,
        marginBottom: 10,
    },
    imgProfile: {
        width: 150, 
        height: 150
    },
    nameUser: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    contentName: {
        marginTop: 10
    },
    containerSwiper: {
        flex: 0.5,
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 0
    },
    containerPager: {
        // width: '100%',
        marginTop: 15,
        flexDirection: 'row',
        marginLeft: 10
    },
    containerData: {
        paddingHorizontal: 20,
        marginTop: 0
    },
    titleData: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
        paddingLeft: 10,
        marginBottom: -10
    },
    subtitleData: {
        fontSize: 19,
        marginLeft: 0
    },
    contentData: {
        marginTop: 0,
        marginBottom: -10
    },
    colorSelected: {
        borderColor: '#e0e0e0',
        borderWidth: 5,
        opacity: 2
    },
    btnColorsArry: {
        width: 50, height: 50, borderRadius: 40, marginRight: 25
    }
});

export default MiPerfil;